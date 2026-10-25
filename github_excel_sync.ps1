[CmdletBinding()]
param(
  [string]$RepositoryUrl = 'https://github.com/Shi-49-94-444-4444/Skill-AI.git',
  [string]$DataBranch = 'skill-sheet',
  [string]$WorkbookName = 'Skill AI.xlsx',
  [switch]$Once
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Workbook = Join-Path $Root $WorkbookName
$SyncRoot = Join-Path ([System.IO.Path]::GetTempPath()) 'skill-ai-data-sync'
$StopFile = Join-Path $Root '.skill-ai-sync.stop'

function Invoke-Git([string[]]$Arguments) {
  & git @Arguments
  if ($LASTEXITCODE -ne 0) { throw "Git failed: git $($Arguments -join ' ')" }
}

function Sync-Workbook {
  if (-not (Test-Path -LiteralPath $Workbook)) { throw "Workbook not found: $Workbook" }
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git was not found in PATH.' }

  if (-not (Test-Path -LiteralPath (Join-Path $SyncRoot '.git'))) {
    New-Item -ItemType Directory -Force -Path $SyncRoot | Out-Null
    if (Test-Path -LiteralPath (Join-Path $SyncRoot '.git')) { Invoke-Git @('-C', $SyncRoot, 'fetch', 'origin') }
    else { Invoke-Git @('clone', $RepositoryUrl, $SyncRoot) }
  } else {
    Invoke-Git @('-C', $SyncRoot, 'fetch', 'origin', '--prune')
  }

  $remoteBranch = (& git -C $SyncRoot ls-remote --heads origin $DataBranch)
  if ($remoteBranch) {
    Invoke-Git @('-C', $SyncRoot, 'checkout', '-B', $DataBranch, "origin/$DataBranch")
  } else {
    Invoke-Git @('-C', $SyncRoot, 'checkout', '--orphan', $DataBranch)
    Invoke-Git @('-C', $SyncRoot, 'rm', '-r', '--cached', '--ignore-unmatch', '.')
    Get-ChildItem -LiteralPath $SyncRoot -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
  }

  $target = Join-Path $SyncRoot $WorkbookName
  $sourceHash = (Get-FileHash -LiteralPath $Workbook -Algorithm SHA256).Hash
  if (Test-Path -LiteralPath $target) {
    $targetHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    if ($sourceHash -eq $targetHash) { Write-Host "No changes: $WorkbookName"; return }
  }

  Copy-Item -LiteralPath $Workbook -Destination $target -Force
  Invoke-Git @('-C', $SyncRoot, 'add', '--', $WorkbookName)
  Invoke-Git @('-C', $SyncRoot, 'commit', '-m', "Update $WorkbookName")
  Invoke-Git @('-C', $SyncRoot, 'push', 'origin', $DataBranch)
  Write-Host "Synced $WorkbookName to branch $DataBranch."
}

do {
  if (Test-Path -LiteralPath $StopFile) { Remove-Item -LiteralPath $StopFile -Force; break }
  Sync-Workbook
  if ($Once) { break }
  Start-Sleep -Seconds 20
} while ($true)

