Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\xampp\htdocs\wajs-web-bot"
WshShell.Run "cmd /c node server.js", 0, False
Set WshShell = Nothing
