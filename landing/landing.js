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

    rememberForMinutes: 30, // Set to 0 for testing

    respectReducedMotion: true
  };
  // ----------------------------------------------------------------------

  const LS_KEY = "elswhere_landing_seen_at";

  if (!CONFIG.showOn(location.pathname)) return;

  // Skip if recently seen
  try {
    const storedTime = localStorage.getItem(LS_KEY);
    if (storedTime) {
      const timeDiff = Date.now() - parseInt(storedTime, 10);
      const minutesSince = timeDiff / (60 * 1000);
      if (minutesSince < CONFIG.rememberForMinutes) return;
    }
  } catch {}

  // Respect reduced motion? (Overlay still appears, but skips fade)
  const prefersReduce = CONFIG.respectReducedMotion &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build style - EXACTLY like your working prototype
  const style = document.createElement("style");
  style.textContent = `
    @font-face{
      font-family:"VT323";
      font-style:normal;font-weight:400;font-display:swap;
      src:url(https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJXUdVNF.woff2) format("woff2");
      unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    body.no-scroll { overflow: hidden; }
    html, body { height: 100%; }
    body { margin: 0; }

    #landing * {
        box-sizing: border-box;
    }

    /* FULLSCREEN OVERLAY */
    #landing.landing {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 8px;
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: url("${CONFIG.bgUrl}") center / cover no-repeat;
    }

    #landing.landing.fade { opacity: 0; pointer-events: none; }

    #landing .sign-container {
        grid-column: span 2 / span 2;
        grid-column-start: 2;
        grid-row-start: 2;
    }

    #landing .enter{
        position: relative;
        display: inline-block;
        background: none;
        border: 0;
        padding: 0;
        cursor: pointer;
        transform: translateY(31vh) translateX(20vh); 
    }

    #landing .enter::after{
        content: attr(data-tip);
        position: absolute;
        left: 50%;
        bottom: 100%;               /* sit above the sign */
        transform: translate(-50%, -10px);
        white-space: nowrap;
        background: rgba(0,0,0,.75);
        color: #fff;
        font: 18px 'VT323', monospace;
        padding: 6px 10px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,.25);
        opacity: 0;
        pointer-events: none;
    }

    /* show on hover or keyboard focus */
    #landing .enter:hover::after,
    #landing .enter:focus-visible::after,
    #landing .enter:hover::before,
    #landing .enter:focus-visible::before{
        opacity: 1;
    }

    /* the sign */
    #landing .landing-sign {
        min-width: 700px !important;
        display: block;
        cursor: pointer;
    }

    #landing .landing-sign:hover {
        transform: scale(1.05);
    }

    #landing .landingtext {
        font-family: 'VT323', monospace;
        color: white;
        margin-left: 5rem;
        grid-column: span 2 / span 2;
        transform: translateY(20vh) translateX(10vh);
        text-shadow: 0 4px 10px rgba(0,0,0,.5);
    }
  `;
  document.head.appendChild(style);

  // Build overlay DOM - matching your working structure
  const landing = document.createElement("div");
  landing.id = "landing";
  landing.className = "landing";
  landing.setAttribute("role", "dialog");
  landing.setAttribute("aria-modal", "true");
  
  landing.innerHTML = `
    <div class="landingtext" id="landing-desc">
      ${CONFIG.topLines.join(' ')}
      <br>
      <br>
      ${CONFIG.noteLine}
    </div>
    <div class="sign-container">
      <button class="enter" id="enter" data-tip="click to enter" aria-describedby="landing-desc">
        <img src="${CONFIG.signUrl}" alt="enter elswhere" class="landing-sign">
      </button>
    </div>
  `;

  // Prevent page scroll while overlay is shown
  document.documentElement.scrollTop = 0;
  document.body.classList.add("no-scroll");
  document.body.appendChild(landing);

  console.log('Landing overlay created');

  // Preload the background then set it
  const bgImg = new Image();
  bgImg.onload = () => { 
    landing.style.backgroundImage = `url("${CONFIG.bgUrl}")`;
  };
  bgImg.src = CONFIG.bgUrl;

  // Close logic
  const close = () => {
    console.log('Closing landing overlay');
    
    try { 
      localStorage.setItem(LS_KEY, String(Date.now())); 
    } catch {}
    
    landing.classList.add("fade");
    
    const removeNow = () => {
      landing.remove();
      document.body.classList.remove("no-scroll");
    };
    
    if (prefersReduce) { 
      removeNow(); 
    } else { 
      landing.addEventListener("transitionend", removeNow, { once: true }); 
    }
  };

  // Click sign to close 
  const enterBtn = landing.querySelector("#enter");
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });
  
  enterBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      close();
    }
  });

  // Optional: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('landing')) {
      close();
    }
  }, { once: true });

})();