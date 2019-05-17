@IF EXIST "%~dp0\/usr/local/bin/node.exe" (
  "%~dp0\/usr/local/bin/node.exe"  "%~dp0\..\peer-id\src\bin.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  /usr/local/bin/node  "%~dp0\..\peer-id\src\bin.js" %*
)