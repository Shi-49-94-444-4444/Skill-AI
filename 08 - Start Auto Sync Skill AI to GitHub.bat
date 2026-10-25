@echo off
setlocal
cd /d "%~dp0"
if exist ".skill-ai-sync.stop" del /q ".skill-ai-sync.stop"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0github_excel_sync.ps1"
if errorlevel 1 pause

