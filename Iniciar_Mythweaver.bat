@echo off
chcp 65001 >nul
title Mythweaver - Hero Forge 5E & 5.5E
color 06

echo.
echo  ===================================================================
echo             ⚔️  MYTHWEAVER - HERO FORGE 5E ^& 5.5E  ⚔️
echo  ===================================================================
echo.

cd /d "C:\Users\natal\.gemini\antigravity\scratch\dnd-character-forge"

netstat -ano | findstr /R /C:":5175 .*LISTENING" >nul 2>&1
if %errorlevel% == 0 (
    echo  [!] El servidor ya se encuentra activo en http://localhost:5175/
    echo  [*] Abriendo Mythweaver en tu navegador predeterminado...
    start http://localhost:5175/
    echo.
    echo  Listo. Esta ventana se cerrará en unos segundos...
    timeout /t 4 >nul
    exit
)

echo  [*] Iniciando servidor local en el puerto 5175...
start /b cmd /c "timeout /t 2 >nul & start http://localhost:5175/"
npm.cmd run dev -- --port 5175 --host
