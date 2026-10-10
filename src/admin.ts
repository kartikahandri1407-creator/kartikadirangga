// Kontrol edit hanya tampil jika situs dibuka dengan ?admin=1
export const IS_ADMIN =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('admin') === '1';
