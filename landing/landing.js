(() => {
  // --- CONFIG ------------------------------------------------------------
  const CONFIG = {
    // Only show on these paths
    showOn: (path) => path === "/" || /\/index\.html?$/.test(path),

    // Images (relative to site root or absolute)
    bgUrl: "/landing/landing-bg.jpg",
    signUrl: "/landing/elswhere-sign.png",

    // Text
    topLines: [
      "you've wandered the internet directionlessly far and wide.",
      "allow this sign to suggest your next destination?"
    ],
    noteLine: "this site is best viewed on a computer or laptop.",

    rememberForMinutes: 30,

    respectReducedMotion: true
  };
  // ----------------------------------------------------------------------

  const LS_KEY = "elswhere_landing_seen_at";

  if (!CONFIG.showOn(location.pathname)) return;

  // Skip if recently seen
  let shouldSkip = false;
  try {
    const storedTime = localStorage.getItem(LS_KEY);
    if (storedTime) {
      const timeDiff = Date.now() - parseInt(storedTime, 10);
      const minutesSince = timeDiff / (60 * 1000);
      if (minutesSince < CONFIG.rememberForMinutes) {
        shouldSkip = true;
      }
    }
  } catch (e) {}

  if (shouldSkip) return;

  // Build style - SIMPLE AND SAFE
  const style = document.createElement("style");
  style.textContent = `
    @font-face{
      font-family:"VT323";
      font-style:normal;font-weight:400;font-display:swap;
      src:url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2) format("woff2");
    }

    body.no-scroll { 
      overflow: hidden !important; 
      height: auto !important;
      min-height: 100vh !important;
    }

    #landing-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        background: url("${CONFIG.bgUrl}") center / cover no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    #landing-overlay.fade { 
        opacity: 0; 
        transition: opacity 0.3s;
    }

    .landing-text {
        color: white;
        font-family: 'VT323', monospace;
        font-size: 24px;
        text-align: left;
        margin: 2rem;
        align-self: flex-start;
        margin-left: 5rem;
       text-shadow: 2px 2px 4px rgba(0,0,0,.50);
    }

    .sign-area {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .sign-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        transform: translateY(15vh);
    }

    .sign-image {
        width: 800px;
        max-width: 80vw;
        height: auto;
        display: block;
    }

    .sign-button:hover .sign-image {
        transform: scale(1.05);
    }

    .sign-button::after {
        content: attr(data-tip);
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, -10px);
        background: rgba(0,0,0,.75);
        color: #fff;
        font: 18px 'VT323', monospace;
        padding: 6px 10px;
        border-radius: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
    }

    .sign-button:hover::after {
        opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Build overlay DOM - SIMPLE STRUCTURE
  const overlay = document.createElement("div");
  overlay.id = "landing-overlay";
  overlay.innerHTML = `
    <div class="landing-text">
      ${CONFIG.topLines.join(' ')}<br><br>
      ${CONFIG.noteLine}
    </div>
    <div class="sign-area">
      <button class="sign-button" data-tip="click to enter">
        <img src="${CONFIG.signUrl}" alt="enter elswhere" class="sign-image" />
      </button>
    </div>
  `;

  // Add to page safely
  document.body.classList.add("no-scroll");
  document.body.appendChild(overlay);

  console.log('Simple landing overlay created');

  // Close function
  const closeOverlay = () => {
    try { 
      localStorage.setItem(LS_KEY, String(Date.now())); 
    } catch {}
    
    overlay.classList.add("fade");
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("no-scroll");
      console.log('Overlay removed');
    }, 300);
  };

  // Event listeners
  const signButton = overlay.querySelector(".sign-button");
  signButton.addEventListener("click", closeOverlay);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('landing-overlay')) {
      e.preventDefault();
      e.stopPropagation();
      closeOverlay();
    }
  }, { once: true });

})();