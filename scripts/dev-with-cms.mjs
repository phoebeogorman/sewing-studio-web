import { spawn } from 'child_process';
import path from 'path';

const decapBin = path.resolve('node_modules/decap-server/dist/index.js');

console.log('[CMS] Starting Decap CMS Local Server on port 8081...');
const cms = spawn(process.execPath, [decapBin], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '8081' }
});

console.log('[Astro] Starting Astro Dev Server...');
const astro = spawn('npx.cmd', ['astro', 'dev'], {
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  cms.kill();
  astro.kill();
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
