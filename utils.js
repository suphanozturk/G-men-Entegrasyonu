export function escapeHtml(unsafe) {

//unsafe parametresi, kullanıcıdan gelen ham metni temsil eder.
// Bu genelde bir input alanına yazılan metin olur (örneğin not başlığı veya içerik).  
  return unsafe


// Metinde geçen & karakterlerinin tamamını HTML uyumlu hale getirir.
    ? unsafe.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
    : "";
}

// LocalStorage’ın ne kadar veri tuttuğunu hesaplayıp ekranda göstermek
export function updateStorageInfo() {
  const used = JSON.stringify(localStorage).length;
  document.getElementById("storageInfo").innerText = used + " bytes";
}
