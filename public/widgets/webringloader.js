// preconnect helps once these load
[
  "https://webring.ghostk.id/",
  "https://cdn.jsdelivr.net/",
  "https://town.thecozy.cat",
  "https://melonland.net/",
  "https://beaus-silly-folder.nekoweb.org/",
  "https://ghostring.neocities.org/",
  "https://webring.dinhe.net/",
  "https://awesome-sauce-directory.neocities.org/",
].forEach((h) => {
  const l = document.createElement("link");
  l.rel = "preconnect";
  l.href = h;
  l.crossOrigin = "";
  document.head.appendChild(l);
});

async function execScriptsIn(node) {
  // Replace inert <script> nodes with real ones so they execute
  const script = [...node.querySelectorAll("script")];
  for (const old of script) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      ["src", "type", "crossorigin", "referrerpolicy", "integrity"].forEach((a) => {
        if (old.hasAttribute(a)) s.setAttribute(a, old.getAttribute(a));
      });
      if (s.src) {
        s.onload = resolve;
        s.onerror = () => {
          console.warn("Webring script failed to load:", s.src);
          resolve(); 
        };
      }
      if (!s.src) s.textContent = old.textContent;
      old.replaceWith(s);
      if (!s.src) resolve();
    });
  }
}

async function mountTemplate(tplId, host) {
  const tpl = document.getElementById(tplId);
  if (!tpl || host.dataset.loaded) return;
  host.dataset.loaded = "1";
  const frag = tpl.content.cloneNode(true);
  host.appendChild(frag);
  await execScriptsIn(host);
}


function scheduleWebrings() {
  const host = document.getElementById("webrings");
  if (!host) return;

  const load = () => mountTemplate("webrings-tpl", host);

  // load when near viewport
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (ents, obs) => {
        if (ents.some((e) => e.isIntersecting)) {
          load();
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(host);
  }

  // backup: after page is calm
  if ("requestIdleCallback" in window) {
    requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 2000);
  }

  // first user interaction also triggers it
  const once = () => {
    load();
    document.removeEventListener("click", once, true);
    document.removeEventListener("keydown", once, true);
  };
  document.addEventListener("click", once, true);
  document.addEventListener("keydown", once, true);
}

// run after other stuff
document.addEventListener("DOMContentLoaded", () => {
  try {
    initPlayerUI?.();
  } catch {}
  scheduleWebrings();
});
