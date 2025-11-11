import { escapeHtml } from "./utils.js";
import { loadFromStorage, saveToStorage, NOTES_KEY } from "./storage.js";



//renderNotes() fonksiyonu, ekrana notları çizmek için çağrılır.
// İlk olarak tüm notlar LocalStorage’dan alınır.
// Eğer hiç kayıt yoksa [] (boş dizi) döner.
export function renderNotes() {


//noteList adlı HTML elemanını bulur (örneğin <div id="noteList"></div>).
//Önce içeriğini temizler, böylece güncel notlar sıfırdan eklenir.
  const list = document.getElementById("notesList");
  const notes = loadFromStorage(NOTES_KEY, []);
  list.innerHTML = "";

  if (notes.length === 0) {
    list.innerHTML = '<div class="text-muted small">Henüz not yok.</div>';
    return;
  }

  notes.forEach((n, i) => {
    const item = document.createElement("div");
    item.className = "list-group-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(n.title)}</strong><br>
        <small class="text-muted">${escapeHtml(n.body)}</small><br>
        <small>${new Date(n.created).toLocaleString()}</small>
      </div>
      <button class="btn btn-sm btn-outline-danger" data-index="${i}">Sil</button>
    `;
    list.appendChild(item);
  });
}

export function bindNoteEvents(addNote, clearAllNotes, deleteNote) {
  document.getElementById("notesList").addEventListener("click", (e) => {
    if (e.target.matches("button[data-index]")) {
      deleteNote(e.target.dataset.index);
    }
  });
  document.getElementById("saveNote").addEventListener("click", addNote);
  document.getElementById("clearNotes").addEventListener("click", clearAllNotes);
}


//app.js içindeki renderNotes() çağrılır.
// ui.js içindeki renderNotes() notları çizer.
// Her kartın “Sil” butonu bindDeleteButtons() ile çalışır hale gelir.
// bindNoteEvents() ise yeni not ekleme ve tümünü silme butonlarını aktif eder.