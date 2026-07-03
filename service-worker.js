/* Self-destructing service worker.
   The previous site (create-react-app) registered a precaching worker at this
   exact path; returning visitors would be served the stale build forever.
   This replacement installs over it, wipes every cache, unregisters itself,
   and reloads its clients onto the live network. */

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (e) {}
      try {
        await self.registration.unregister();
      } catch (e) {}
      const clients = await self.clients.matchAll({ type: "window" });
      for (const c of clients) {
        try { c.navigate(c.url); } catch (e) {}
      }
    })()
  );
});
