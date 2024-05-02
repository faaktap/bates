@echo off
echo --------------  We should be using 16.17.1 for fresh.
echo --------------  check below what is set please
echo.
echo. 
echo We can redirect output of npm to a file wuth npm run serve >> logABC.txt 2>>&1
nvm list
pause "--------------  Break out of version if not 16....."
start npm run serve 
