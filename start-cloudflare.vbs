Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\xampp\htdocs\wajs-web-bot"
WshShell.Run "cmd /c cloudflared.exe tunnel run wa-bot", 0, False
Set WshShell = Nothing
