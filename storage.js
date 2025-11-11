
// Bu fonksiyon, LocalStorage’ın kaç byte yer kapladığını ekranda göstermek için kullanılıyor
import { updateStorageInfo } from "./utils.js";

export const NOTES_KEY = "ge_notes_v1";
export const PREFS_KEY = "ge_prefs_v1";


// Bu fonksiyon, LocalStorage’a veri kaydetmek için kullanılır.
export function saveToStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
  updateStorageInfo();
}



//LocalStorage’dan veriyi okur, yoksa yedek (fallback) değer döner
export function loadFromStorage(key, fallback) {
  try {
    const s = localStorage.getItem(key);

    
// JSON string’i geri objeye çevirir
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}
