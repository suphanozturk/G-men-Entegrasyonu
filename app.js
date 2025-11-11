import { saveToStorage, loadFromStorage, NOTES_KEY } from "./storage.js";
import { renderNotes, bindNoteEvents } from "./ui.js";
import { updateStorageInfo } from "./utils.js";

// Sayfa yüklendiğinde
//DOMContentLoaded olayı, HTML tamamen yüklendiğinde çalışır.
//Yani bu satırdan itibaren yazılan her şey, sayfa açıldığında otomatik çalışır.
  document.addEventListener("DOMContentLoaded", () => {

    //updateStorageInfo() → Sayfanın alt kısmında “Tarayıcı Deposu: 256 bytes” gibi bilgiyi gösterir.
    //renderNotes() → LocalStorage’daki notları ekranda listeler.
    //Böylece kullanıcı sayfayı her açtığında eski notlarını görür.
  updateStorageInfo();
  renderNotes();

  bindNoteEvents(addNote, clearAllNotes, deleteNote);


  //Navbar’daki “Başlangıç” butonuna tıklanırsa bir alert() mesajı çıkar.
  //Bu basit bir hoş geldin ekranı görevi görür.
  document.getElementById("openOnboard").addEventListener("click", () => {
    alert("Hoş geldiniz! Bu uygulama göçmenlere rehberlik için tasarlandı.");
  });

  // Kaynak arama <kaynak kod htmlden alınır.>
  //#resList → kaynakların listeleneceği alan
  //searchRes → arama kutusu

  const resources = ["Dil kursu", "Sağlık hizmeti", "İstihdam ofisi", "Hukuki danışmanlık"];
  const resList = document.getElementById("resList");
  const searchRes = document.getElementById("searchRes");

  function renderRes(filter = "") {
    const f = filter.toLowerCase();
    resList.innerHTML = resources
      .filter((r) => r.toLowerCase().includes(f))
      .map((r) => `<div>${r}</div>`)
      .join("");
  }


   // Arama kutusuna her yazı yazıldığında (input olayı),
  // yukarıdaki renderRes() fonksiyonu çalışır.
//En alttaki renderRes(); → sayfa açıldığında ilk listeyi boş filtreyle gösterir.
  searchRes.addEventListener("input", (e) => renderRes(e.target.value));
  renderRes();
});


// Kullanıcının girdiği başlık ve not içeriği değerlerini alır.
// Eğer başlık boşsa “(Başlıksız)” olarak kaydedilir.
function addNote() {
  const title = document.getElementById("noteTitle").value.trim() || "(Başlıksız)";
  const body = document.getElementById("noteBody").value.trim();


//loadFromStorage() fonksiyonuyla mevcut notlar okunur.
//Eğer hiç yoksa [] (boş dizi) döner.
  const notes = loadFromStorage(NOTES_KEY, []);

//   Yeni not en başa eklenir (unshift → dizinin başına ekleme yapar).
// Ayrıca kaydedilen notun tarihini (created) ISO formatında tutar.
  notes.unshift({ title, body, created: new Date().toISOString() });

// Yeni notlar LocalStorage’a kaydedilir.
// renderNotes() tekrar çağrılarak ekran güncellenir (yeni not görünür).
  saveToStorage(NOTES_KEY, notes);
  renderNotes();


// Not eklendikten sonra giriş alanlarını sıfırlar.
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteBody").value = "";
}


// Belirtilen index numarasındaki notu siler (splice).
// Sonra kaydeder ve ekranı yeniler.
function deleteNote(index) {
  const notes = loadFromStorage(NOTES_KEY, []);
  notes.splice(index, 1);
  saveToStorage(NOTES_KEY, notes);
  renderNotes();
}


//“Tümünü Sil” butonuna basınca çalışır.
function clearAllNotes() {
  if (confirm("Tüm notlar silinecek. Emin misiniz?")) {
    saveToStorage(NOTES_KEY, []);
    renderNotes();
  }
}


//| Fonksiyon / Bölüm  | Görev                                   |
// | ------------------ | --------------------------------------- |
// | `DOMContentLoaded` | Sayfa açıldığında her şeyi başlatır     |
// | `addNote()`        | Yeni not oluşturur                      |
// | `deleteNote()`     | Tek bir notu siler                      |
// | `clearAllNotes()`  | Tüm notları siler                       |
// | `renderRes()`      | Kaynakları filtreleyerek listeler       |
// | Event bağlamaları  | Butonlara ve inputlara işlev kazandırır |
