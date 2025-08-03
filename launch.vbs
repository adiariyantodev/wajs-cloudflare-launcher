Set WshShell = CreateObject("WScript.Shell")

' Jalankan WAJS
WshShell.Run "C:\xampp\htdocs\wajs-web-bot\start-node.vbs", 0, False

' Jalankan Cloudflare
WshShell.Run "C:\xampp\htdocs\wajs-web-bot\start-cloudflare.vbs", 0, False

' Tunggu beberapa detik lalu buka browser
WScript.Sleep 5000
WshShell.Run "https://wa.smkdarulmusyawaroh.sch.id"

Set WshShell = Nothing
