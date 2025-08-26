// preconnect helps once we load
[
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

function execScriptsIn(node) {
  // Replace inert <script> nodes with real ones so they execute
  node.querySelectorAll("script").forEach((old) => {
    const s = document.createElement("script");
    // copy common attributes
    [
      "src",
      "type",
      "async",
      "defer",
      "crossorigin",
      "referrerpolicy",
      "integrity",
    ].forEach((a) => {
      if (old.hasAttribute(a)) s.setAttribute(a, old.getAttribute(a));
    });
    if (!s.src) s.textContent = old.textContent;
    old.replaceWith(s);
  });
}

function mountTemplate(tplId, host) {
  const tpl = document.getElementById(tplId);
  if (!tpl || host.dataset.loaded) return;
  host.dataset.loaded = "1";
  const frag = tpl.content.cloneNode(true);
  // execute any scripts contained in the fragment
  execScriptsIn(frag);
  host.appendChild(frag);
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

// run after YOUR stuff
document.addEventListener("DOMContentLoaded", () => {
  try {
    initPlayerUI?.();
  } catch {}
  scheduleWebrings();
});
