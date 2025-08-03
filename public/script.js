async function fetchStatus() {
  try {
    const statusRes = await fetch("/api/status");
    const statusData = await statusRes.json();
    const statusEl = document.getElementById("status");
    const qrImage = document.getElementById("qr-image");
    const shutdownBtn = document.getElementById("shutdown-btn");

    if (statusData.status === "qr") {
      statusEl.textContent = "📲 Silakan scan QR di bawah ini untuk login WhatsApp:";
      const qrRes = await fetch("/api/qr");
      const qrData = await qrRes.json();
      qrImage.src = qrData.image;
      qrImage.style.display = "block";
      shutdownBtn.style.display = "none";
    } else if (statusData.status === "ready") {
      statusEl.textContent = "✅ Bot sudah terhubung ke WhatsApp! Jangan tutup halaman ini.";
      qrImage.style.display = "none";
      shutdownBtn.style.display = "inline-block";
    } else {
      statusEl.textContent = "⏳ Menunggu koneksi ke WhatsApp...";
      qrImage.style.display = "none";
      shutdownBtn.style.display = "none";
    }
  } catch (e) {
    document.getElementById("status").textContent = "❌ WA Bot telah dimatikan. Silahkan tutup halaman ini.";
    document.getElementById("qr-image").style.display = "none";
    document.getElementById("shutdown-btn").style.display = "none";
  }
}


document.getElementById("shutdown-btn").addEventListener("click", async () => {
  const confirmed = confirm("Yakin ingin mematikan WA Bot?");
  if (confirmed) {
    await fetch("/shutdown");
    location.reload();
  }
});

setInterval(fetchStatus, 1000);
fetchStatus();
