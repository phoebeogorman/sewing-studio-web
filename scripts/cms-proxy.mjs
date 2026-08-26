/**
 * Local Decap CMS proxy wrapper.
 * Ensures `params.branch` defaults to 'main' for compatibility with Sveltia CMS.
 */
import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { spawn } from 'child_process';
import fileURLToPath from 'url';
import path from 'path';

const PORT = 8081;
const TARGET_PORT = 8082;

const decapBin = path.resolve('node_modules/decap-server/dist/index.js');

const decap = spawn(process.execPath, [decapBin], {
  stdio: 'inherit',
  env: { ...process.env, PORT: String(TARGET_PORT) }
});

const app = express();
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1', (req, res, next) => {
  if (req.body) {
    if (!req.body.params) req.body.params = {};
    const params = req.body.params;

    if (!params.branch) params.branch = 'main';

    if (req.body.action === 'persistEntry') {
      if (!params.assets) params.assets = [];
      if (!params.options) params.options = {};
      if (!params.options.commitMessage) params.options.commitMessage = 'Update content';
      if (params.options.useWorkflow === undefined) params.options.useWorkflow = false;
      if (!params.options.status) params.options.status = 'published';

      if (params.entry && !params.entry.slug) {
        params.entry.slug = params.entry.path ? path.basename(params.entry.path, path.extname(params.entry.path)) : 'entry';
      }
      if (Array.isArray(params.dataFiles)) {
        params.dataFiles.forEach(df => {
          if (!df.slug && df.path) {
            df.slug = path.basename(df.path, path.extname(df.path));
          }
        });
      }
    }

    if (req.body.action === 'persistMedia') {
      if (!params.options) params.options = {};
      if (!params.options.commitMessage) params.options.commitMessage = 'Upload asset';
    }

    if (req.body.action === 'deleteFile' || req.body.action === 'deleteFiles') {
      if (!params.options) params.options = {};
      if (!params.options.commitMessage) params.options.commitMessage = 'Delete asset';
    }
  }
  next();
});

app.use(createProxyMiddleware({
  target: `http://127.0.0.1:${TARGET_PORT}`,
  changeOrigin: true,
  on: {
    proxyReq: fixRequestBody,
  }
}));

app.listen(PORT, () => {
  console.log(`[CMS Proxy] Listening on http://localhost:${PORT} (proxying to decap-server on ${TARGET_PORT})`);
});

process.on('SIGINT', () => {
  decap.kill();
  process.exit();
});
