<#
.SYNOPSIS
  Install the Ferrari Dark Theme as a persistent DeepSeek Harness plugin.

.DESCRIPTION
  Copies the bundled plugin into the DSH home, then registers it in the active
  profile's `cordis.patch.yml` so DSH loads it on every start.

  The patch edit is idempotent: an existing `ferrari-dark-theme` row is replaced,
  not duplicated, and the previous file is kept as `cordis.patch.yml.bak`.

.PARAMETER Target
  Install directory. Defaults to `$env:DSH_HOME\plugins\ferrari-dark-theme`.

.PARAMETER ProfileDir
  Profile directory holding `cordis.patch.yml`. Defaults to `$env:DSH_PROFILE_DIR`,
  otherwise `$env:DSH_HOME\profiles\<DSH_PROFILE|desktop>`.

.PARAMETER Uninstall
  Remove the patch row (the copied files are left in place).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\install.ps1

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\install.ps1 -Uninstall
#>
[CmdletBinding()]
param(
  [string]$Target,
  [string]$ProfileDir,
  [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'

function Get-DshHome {
  if ($env:DSH_HOME) { return $env:DSH_HOME }
  return (Join-Path $HOME '.dsh')
}

function Resolve-ProfileDir {
  param([string]$Explicit)
  if ($Explicit) { return $Explicit }
  if ($env:DSH_PROFILE_DIR) { return $env:DSH_PROFILE_DIR }
  $home_ = Get-DshHome
  $name = if ($env:DSH_PROFILE) { $env:DSH_PROFILE } else { 'desktop' }
  $candidate = Join-Path $home_ (Join-Path 'profiles' $name)
  if (Test-Path (Join-Path $candidate 'cordis.patch.yml')) { return $candidate }
  foreach ($fallback in @('desktop', 'web')) {
    $candidate = Join-Path $home_ (Join-Path 'profiles' $fallback)
    if (Test-Path (Join-Path $candidate 'cordis.patch.yml')) { return $candidate }
  }
  throw "Could not locate a DSH profile with cordis.patch.yml. Pass -ProfileDir explicitly."
}

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pluginSource = Join-Path $repoRoot 'plugin'
if (-not (Test-Path (Join-Path $pluginSource 'lib/index.js'))) {
  throw "plugin/lib/index.js not found next to this script — run install.ps1 from the repository root."
}

$profileDir = Resolve-ProfileDir -Explicit $ProfileDir
$patchPath = Join-Path $profileDir 'cordis.patch.yml'
if (-not (Test-Path $patchPath)) { throw "Missing profile patch: $patchPath" }

if (-not $Target) { $Target = Join-Path (Get-DshHome) 'plugins\ferrari-dark-theme' }

$id = 'ferrari-dark-theme'
$marker = 'Ferrari Dark Theme'

# --- patch helpers -----------------------------------------------------------

function Get-PatchLines {
  param([string]$Path)
  # Build the list in place: returning a List through the pipeline would unwrap
  # it into a fixed-size array and break later Add/RemoveRange calls.
  $list = [System.Collections.Generic.List[string]]::new()
  foreach ($line in (Get-Content -LiteralPath $Path)) { [void]$list.Add($line) }
  return ,$list
}

function Remove-ThemeBlock {
  param([System.Collections.Generic.List[string]]$Lines)

  for ($i = 0; $i -lt $Lines.Count; $i++) {
    if ($Lines[$i] -match ('^\s*-\s*id:\s*' + [regex]::Escape($id) + '\s*$')) {
      # Walk back to the enclosing top-level `- insert:` entry.
      $start = $i
      for ($j = $i; $j -ge 0; $j--) {
        if ($Lines[$j] -match '^- insert:\s*$') { $start = $j; break }
        if ($Lines[$j] -match '^-[^-]' -and $j -ne $i) { $start = $j + 1; break }
      }
      # Walk forward while the entry is still part of this block.
      $end = $i
      for ($k = $i + 1; $k -lt $Lines.Count; $k++) {
        if ($Lines[$k] -match '^\s*$') { $end = $k; }
        elseif ($Lines[$k] -match '^\s') { $end = $k }
        else { break }
      }
      # Trim the comment lines an earlier install wrote above the entry.
      $startComment = $start
      $guard = 0
      while ($startComment -gt 0 -and $guard -lt 4 -and $Lines[$startComment - 1] -match '^#') {
        $startComment--
        $guard++
      }
      $Lines.RemoveRange($startComment, $end - $startComment + 1)
      return $true
    }
  }
  return $false
}

function Write-Patch {
  param([System.Collections.Generic.List[string]]$Lines, [string]$Path)
  Copy-Item -LiteralPath $Path -Destination "$Path.bak" -Force
  $text = ($Lines -join [Environment]::NewLine) + [Environment]::NewLine
  Set-Content -LiteralPath $Path -Value $text -NoNewline -Encoding UTF8
}

# --- uninstall ---------------------------------------------------------------

$lines = Get-PatchLines -Path $patchPath

if ($Uninstall) {
  $removed = Remove-ThemeBlock -Lines $lines
  if ($removed) {
    Write-Patch -Lines $lines -Path $patchPath
    Write-Host "Removed the $id row from $patchPath" -ForegroundColor Green
  } else {
    Write-Host "No $id row found in $patchPath — nothing to do." -ForegroundColor Yellow
  }
  Write-Host 'Restart DeepSeek Harness to drop the theme.'
  return
}

# --- install -----------------------------------------------------------------

if (Test-Path $Target) { Remove-Item -LiteralPath $Target -Recurse -Force }
New-Item -ItemType Directory -Force -Path $Target | Out-Null
Copy-Item -Path (Join-Path $pluginSource '*') -Destination $Target -Recurse -Force

$entry = Join-Path $Target 'lib/index.js'
if (-not (Test-Path $entry)) { throw "Copy failed: $entry is missing" }
$url = ([System.Uri]$entry).AbsoluteUri   # file:///D:/... with %20 escaping

[void](Remove-ThemeBlock -Lines $lines)
if ($lines.Count -gt 0 -and $lines[$lines.Count - 1] -ne '') { $lines.Add('') }
$lines.Add("# $marker - persistent install (host routes + injected browser script).")
$lines.Add('- insert:')
$lines.Add(('    - id: ' + $id))
$lines.Add(("      name: '" + $url + "'"))
Write-Patch -Lines $lines -Path $patchPath

Write-Host ''
Write-Host "Installed to : $Target" -ForegroundColor Green
Write-Host "Patch row    : $patchPath" -ForegroundColor Green
Write-Host "Entry        : $url"
Write-Host ''
Write-Host 'Next step: fully quit and reopen DeepSeek Harness, then send a message' -ForegroundColor Cyan
Write-Host 'to see the ignition chain and the sidebar wind tunnel.' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Verify after restart (both must answer 200 image/png):' -ForegroundColor DarkGray
Write-Host '  curl.exe -I http://127.0.0.1:19387/ferrari-background.png' -ForegroundColor DarkGray
Write-Host '  curl.exe -I http://127.0.0.1:19387/ferrari-theme.js' -ForegroundColor DarkGray
