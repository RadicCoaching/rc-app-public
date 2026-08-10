// Minimal service worker til web push. Genskabt 2026-08-11 — filen har
// aldrig ligget i git (kun uploadet direkte til Simply engang, uden spor),
// og fandtes slet ikke på den nye GitHub Pages-udgivelse, hvilket er
// hovedårsagen til at "aktivér notifikationer" fejlede der.
self.addEventListener('push', (event) => {
  let data = { title: 'RC Coaching', body: 'Du har en ny besked' };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    // Ikke JSON — behold standardteksten ovenfor.
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'RC Coaching', {
      body: data.body || '',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
