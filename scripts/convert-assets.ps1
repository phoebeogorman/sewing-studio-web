<#
.SYNOPSIS
    Converts the source photographs and logos into web formats.

.DESCRIPTION
    The originals live in Google Drive as HEIC and MOV, neither of which
    browsers can display. This script writes optimised WebP files into
    public/images/ and never modifies anything under the source root.

    It is idempotent: a file is skipped when its output already exists and is
    newer than the source. Pass -Force to convert regardless.

    Requires ImageMagick 7 with HEIC support. Verify with:
        magick -list format | Select-String HEIC

.PARAMETER SourceRoot
    The Drive folder holding the originals. Override it if Drive moves.

.PARAMETER Force
    Reconvert files even when the output is already up to date.
#>

[CmdletBinding()]
param(
    [string]$SourceRoot = "G:\.shortcut-targets-by-id\1sEfiGFDikUFFItqMgTHnFJ98erSSZovE\Adrian\Sewing Studio",
    [switch]$Force
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imagesOut = Join-Path $projectRoot "public\images"
$publicOut = Join-Path $projectRoot "public"

# Logos are still being iterated on, and a new version often lands in the
# repository's references folder before it is uploaded to Drive. Both places
# are checked and the newer file wins, so a redesign is never missed.
$logoFallbackRoot = Join-Path (Split-Path -Parent $projectRoot) "references"

function Resolve-LogoSource {
    param([string]$FileName)

    # @() around the pipeline matters: with a single match Sort-Object returns
    # a bare string, and indexing [0] into a string yields its first character
    # rather than the path.
    $candidates = @(
        @(
            (Join-Path $SourceRoot (Join-Path "Logos" $FileName)),
            (Join-Path $logoFallbackRoot $FileName)
        ) | Where-Object { Test-Path -LiteralPath $_ }
    )

    if ($candidates.Count -eq 0) { return $null }

    return @($candidates | Sort-Object { (Get-Item -LiteralPath $_).LastWriteTimeUtc } -Descending)[0]
}

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    throw "ImageMagick is not on PATH. Install ImageMagick 7 with HEIC support."
}

if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "Source root not found: $SourceRoot"
}

New-Item -ItemType Directory -Path $imagesOut -Force | Out-Null

# Quality and maximum edge for photographs.
#
# The service images sit in a two column grid capped at 1200px, so each one is
# painted at roughly 550px wide. 1600px still covers a 2x display and is a
# third of the weight of the 2400px version.
$photoQuality = 82
$photoMaxEdge = 1600

function Test-NeedsUpdate {
    param([string]$Source, [string]$Target)

    if ($Force) { return $true }
    if (-not (Test-Path -LiteralPath $Target)) { return $true }
    return (Get-Item -LiteralPath $Source).LastWriteTimeUtc -gt (Get-Item -LiteralPath $Target).LastWriteTimeUtc
}

function Convert-Photo {
    param([string]$Source, [string]$Target)

    if (-not (Test-NeedsUpdate -Source $Source -Target $Target)) {
        Write-Host ("  skip   {0}" -f (Split-Path $Target -Leaf)) -ForegroundColor DarkGray
        return
    }

    # -auto-orient is not optional: several HEIC files carry an EXIF rotation
    # flag and render sideways without it.
    & magick "$Source" -auto-orient -resize "${photoMaxEdge}x${photoMaxEdge}>" `
        -quality $photoQuality -strip "$Target"

    if ($LASTEXITCODE -ne 0) { throw "Conversion failed: $Source" }
    Write-Host ("  write  {0}  ({1} KB)" -f (Split-Path $Target -Leaf), [math]::Round((Get-Item -LiteralPath $Target).Length / 1KB, 0)) -ForegroundColor Green
}

function Convert-Logo {
    param([string]$Source, [string]$BaseName, [int[]]$Sizes)

    foreach ($size in $Sizes) {
        $target = Join-Path $imagesOut ("{0}-{1}.webp" -f $BaseName, $size)
        if (-not (Test-NeedsUpdate -Source $Source -Target $target)) {
            Write-Host ("  skip   {0}" -f (Split-Path $target -Leaf)) -ForegroundColor DarkGray
            continue
        }

        & magick "$Source" -auto-orient -resize "${size}x${size}" `
            -background none -quality 90 -strip "$target"

        if ($LASTEXITCODE -ne 0) { throw "Logo conversion failed: $Source" }
        Write-Host ("  write  {0}" -f (Split-Path $target -Leaf)) -ForegroundColor Green
    }
}

# --- Service photographs -------------------------------------------------
# One representative image per service, named after the section it belongs to.
# The source folder "Bepsoke" is misspelled in Drive; that is intentional here.

$serviceSources = @(
    @{ Folder = "Alterations";      File = "IMG_9368.HEIC";  Target = "alterations.webp" },
    @{ Folder = "Sewing Workshops"; File = "IMG_7554.HEIC";  Target = "workshops.webp" },
    @{ Folder = "Bepsoke";          File = "Bespoke 3.HEIC"; Target = "bespoke.webp" }
)

Write-Host "Service photographs" -ForegroundColor Cyan
foreach ($entry in $serviceSources) {
    $source = Join-Path $SourceRoot (Join-Path $entry.Folder $entry.File)
    if (-not (Test-Path -LiteralPath $source)) {
        Write-Warning ("  missing source: {0}" -f $source)
        continue
    }
    Convert-Photo -Source $source -Target (Join-Path $imagesOut $entry.Target)
}

# --- Logos ---------------------------------------------------------------
#
# Three marks, none of them interchangeable:
#
#   TSStextOrange.png    850x240    horizontal lockup, mark plus the studio
#                                   name. This is the header logo: it already
#                                   contains the wording, so it must never be
#                                   paired with a text label. A black version
#                                   (TSStextBlack.png) exists at identical
#                                   dimensions if the orange proves too loud
#                                   against the cream background.
#   IconTSS.png          1024x1024  square icon, no text. Favicons and app
#                                   icons only, where a square canvas is what
#                                   the platform expects.
#   TheSewingStudio.png  9949x9949  the full illustrated sewing machine. Very
#                                   fine line work, so it only survives at
#                                   large sizes.

Write-Host "Logos" -ForegroundColor Cyan

$wordmarkSource = Resolve-LogoSource "TSStextOrange.png"
$iconSource = Resolve-LogoSource "IconTSS.png"
$logoSource = Resolve-LogoSource "TheSewingStudio.png"

# Header lockup. Heights rather than widths: the navbar constrains the height
# and the aspect ratio does the rest.
if ($wordmarkSource) {
    foreach ($height in @(96, 48)) {
        $suffix = if ($height -eq 48) { "" } else { "@2x" }
        $target = Join-Path $imagesOut ("wordmark-the-sewing-studio{0}.webp" -f $suffix)
        if (Test-NeedsUpdate -Source $wordmarkSource -Target $target) {
            & magick "$wordmarkSource" -auto-orient -resize "x$height" `
                -background none -quality 90 -strip "$target"
            if ($LASTEXITCODE -ne 0) { throw "Wordmark conversion failed" }
            Write-Host ("  write  {0}" -f (Split-Path $target -Leaf)) -ForegroundColor Green
        }
    }
} else {
    Write-Warning "  missing wordmark: TSStextBlack.png"
}

# Favicons and app icons, all from the square mark.
if ($iconSource) {
    Convert-Logo -Source $iconSource -BaseName "icon-the-sewing-studio" -Sizes @(256, 128)

    foreach ($size in @(16, 32, 48, 180, 192, 512)) {
        $name = if ($size -eq 180) { "apple-touch-icon.png" } else { "favicon-$size.png" }
        $target = Join-Path $publicOut $name
        if (Test-NeedsUpdate -Source $iconSource -Target $target) {
            & magick "$iconSource" -auto-orient -resize "${size}x${size}" -background none -strip "$target"
            Write-Host ("  write  {0}" -f $name) -ForegroundColor Green
        }
    }

    $ico = Join-Path $publicOut "favicon.ico"
    if (Test-NeedsUpdate -Source $iconSource -Target $ico) {
        # A multi-resolution .ico: Windows and some feed readers still ask for
        # 16 and 32 rather than the PNG variants above.
        & magick "$iconSource" -auto-orient -background none `
            "(" -clone 0 -resize 16x16 ")" `
            "(" -clone 0 -resize 32x32 ")" `
            "(" -clone 0 -resize 48x48 ")" `
            -delete 0 -strip "$ico"
        Write-Host "  write  favicon.ico" -ForegroundColor Green
    }
} else {
    Write-Warning "  missing icon: IconTSS.png"
}

# The detailed mark, kept for places with room to render it properly.
if ($logoSource) {
    Convert-Logo -Source $logoSource -BaseName "logo-the-sewing-studio" -Sizes @(512, 256)
} else {
    Write-Warning "  missing logo: TheSewingStudio.png"
}

# --- Video ---------------------------------------------------------------
# Deferred. The MOV originals belong to the Phoebe O'Gorman brand and total
# roughly 300 MB; that site is still a Coming Soon placeholder. When the time
# comes, ffmpeg produces the webm/mp4 pair plus a poster frame.

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan
