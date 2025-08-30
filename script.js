//-----------------------------

//ABOUT PAGE STUFF

// Random fact generator

const facts = [
  "Idk how to wink without scrunching my whole cheek up",
  "I have two cats, both were strays and adopted and now one of them is obese the other bullies her",
  "90% of my playlist on spotify has cover images from shuan the sheep",
  "I haven't touched coding since 6th grade (until now ofc)",
  "I have Convention on the Prevention and Punishment of the Crime of Genocide bookmarked in my browser (yea i was a mun kid)",
  "IMO victoria secret's love spell is a good scent sue me",
  "I'm learning german because once my insta reccs got flooded with german reels and i thought its a funny af language",
  "right before i graduated hs i gifted my history/government teacher a US flag with his face on it",
  "my biggest ego boost moment was when i went to the NSDA nationals 2024 and someone from taiwan asked us 'oh are y'all the only non-[Insert super good school name] team in taiwan who qualified PF?'",
  "sO YoU hAVe a moTheR? (iykyk)",
];

//ABOUT ME RANDOM FACT GENERATOR
function showRandomFact() {
  const output = document.getElementById("fact-output");
  const randomIndex = Math.floor(Math.random() * facts.length);
  output.textContent = facts[randomIndex];
}

//BUTTON SELECTOR-------------

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const buttons = document.querySelectorAll(".wallbutton");
    const allFilters = document.querySelectorAll(".filter-btn");

    // Remove 'active' class from all buttons first
    allFilters.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked one
    button.classList.add("active");

    // Show/hide site buttons based on tag
    buttons.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const buttons = document.querySelectorAll(".wallbutton");

    buttons.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

//CHANNEL SELECTOR---------------

document.querySelectorAll(".filter-chnl").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".channel");
    const allFilters = document.querySelectorAll(".filter-chnl");

    // Remove 'active' class from all buttons first
    allFilters.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked one
    button.classList.add("active");

    // Show/hide site buttons based on tag
    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".filter-chnl").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".channel");

    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

//MOVIES SELECTOR----------------------
document.querySelectorAll(".filter-mov").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".movie");
    const allFilters = document.querySelectorAll(".filter-mov");

    // Remove 'active' class from all buttons first
    allFilters.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked one
    button.classList.add("active");

    // Show/hide site buttons based on tag
    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".filter-mov").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".movie");

    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

//TV SELECTOR---------------------
document.querySelectorAll(".filter-tv").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".tv");
    const allFilters = document.querySelectorAll(".filter-tv");

    // Remove 'active' class from all buttons first
    allFilters.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked one
    button.classList.add("active");

    // Show/hide site buttons based on tag
    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".filter-tv").forEach((button) => {
  button.addEventListener("click", () => {
    const tag = button.getAttribute("data-tag");
    const channels = document.querySelectorAll(".tv");

    channels.forEach((btn) => {
      const tags = btn.getAttribute("data-tags").split(" ");

      if (tag === "all" || tags.includes(tag)) {
        btn.style.display = "inline-block";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

//-----------------------------
//DOMCONTENTLOADED STARTS HERE
document.addEventListener("DOMContentLoaded", function () {
  let path = window.location.pathname;

  let rootPath = "";
  if (path.includes("extra/mediarec/")) {
    rootPath = "../../../";
  } else if (path.includes("blog/posts/")) {
    rootPath = "../../";
  } else if (
    path.includes("blog/") ||
    path.includes("artworks/") ||
    path.includes("about/") ||
    path.includes("extra/")
  ) {
    rootPath = "../";
  } else {
    rootPath = ""; //main index.html
  }

  //UNIVERSALISE STUFF

  const nav = document.getElementById("navbar");

  const navbarHTML = `
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links">☰ Menu</button>
      <div class='nav-links-h' id='nav-links-h'>
        <ul>
            <li><a href="https://elswhere.neocities.org">Home</a></li>
            <li><a href="https://elswhere.neocities.org/about/">About</a></li>
            <li><a href="https://elswhere.neocities.org/blog/">Blog</a></li>
            <li><a href="https://elswhere.neocities.org/extra/">Extra</a></li>
        </ul>
      </div>
      <div class='nav-links-v' id='nav-links-v'>
        <ul>
            <li><a href="https://elswhere.neocities.org">Home</a></li>
            <li><a href="https://elswhere.neocities.org/about/">About</a></li>
            <li><a href="https://elswhere.neocities.org/blog/">Blog</a></li>
            <li><a href="https://elswhere.neocities.org/extra/">Extra</a></li>
        </ul>
      </div>`;
  document.getElementById("navbar").innerHTML = navbarHTML;

  const navBtn = nav.querySelector(".nav-toggle");
  const panel = nav.querySelector("#nav-links-v");
  if (!navBtn || !panel) { console.warn('nav bits missing'); }

  // Mobile menu toggle
  navBtn.addEventListener("click", () => {
    if (isMobile()) panel.classList.toggle("open");
  });

  const footerHTML = `
        <div class='buttonrow footerbuttons'>
            <p class='boxtext rowbutton footertext'>created by elsie 2025 | </p>
            <a href="https://neocities.org/site/elswhere" target="_blank" class='rowbutton footertext footerlink'>my neocities profile</a>
            <p class='boxtext rowbutton footertext'> | </p>
            <a href="https://github.com/elsieeeyjd/elswhere-neocities" target="_blank" class='rowbutton footertext footerlink'>github</a>
        </div>
        `;
  document.getElementById("footer").innerHTML = footerHTML;

  const leftSidebarHTML = `
        <h2 class='nicetext sidebartext'>Updates</h2>
        <div class="scrollbox" tabindex="0">
            <p class='sidebartextDark'>This site has been updated as of August 2025!</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>18. 8. 2025</h3>
            <p class='sidebartextDark boxtextDark'>better extra pages, new blog posts, and new comment box! (the css of the comment box was inspired by ribo.zone who used the same comment box engine cuz holy shit the html tags of that widget r crazy.</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>14. 8. 2025</h3>
            <p class='sidebartextDark boxtextDark'>top bar music player (oml i spent way too much time on this if only did wikiplayer just fucking worked)</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>10. 8. 2025</h3>
            <p class='sidebartextDark boxtextDark'>new banner!</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>25. 7. 2025</h3>
            <p class='sidebartextDark boxtextDark'>new blog post, accessibility options</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>9. 7. 2025</h3>
            <p class='sidebartextDark boxtextDark'>movies and youtube media rec pages</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>1. 7. 2025</h3>
            <p class='sidebartextDark boxtextDark'>new blog post, revamped main page menu</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>18. 6. 2025</h3>
            <p class='sidebartextDark boxtextDark'>more widgets, added extra page w new layout, comment section on blog</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>9. 6. 2025 (nice)</h3>
            <p class='sidebartextDark boxtextDark'>added (a shit ton of) buttons!! widget additions/fixes</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>5. 6. 2025</h3>
            <p class='sidebartextDark boxtextDark'>Universalise sidebar contents, added new blinkies & bumper stickers</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>3. 6. 2025</h3>
            <p class='sidebartextDark boxtextDark'>Created blog page + archive</p>
            <h3 class='sidebartextDark nicetext' style='font-size: 18px'>apr - may 2025</h3>
            <p class='sidebartextDark boxtextDark'>Website launch and other design stuff (i just moved everything to vscode lol so i dont have the timeline for what came before)</p>
        </div>
        <div class='dashedbox' style='border-color: var(--text-light); margin-top: 1rem; align-items: center; justify-content: center; flex-direction: column;'>
            <iframe src="https://elsieeeyjd.github.io/elswhere-neocities/data/hits.html" width="200px" height="45px" style="border:none; display: block; margin: 0 auto;" frameborder="0"></iframe> 
            <!-- FC2 Clap tag starts here -->
            <a href="https://clap.fc2.com/post/elsieee/?url=https%3A%2F%2Felswhere.neocities.org&title=Home" target="_blank" title="Web Clap by FC2"><img src="https://clap.fc2.com/images/button/white/elsieee?url=https%3A%2F%2Felswhere.neocities.org&amp;lang=en" alt="Web Clap by FC2" style="border:none;" /></a>
            <!-- FC2 Clap tag ends here -->
            <p class='sidebartext boxtext' style='font-size: 12px; margin-bottom: 5px;'>click to clap for me!!</p>
        </div>
        <a href="https://ko-fi.com/elsieee" target="_blank"><img src="${rootPath}buttons/tip-jar.png" id="tip-jar"></a>
        <h3 class="sidebartext nicetext">Blinkies!</h3>
        <div class="blinkiestack">
            <img src="${rootPath}blinkies/impatientbitch.gif" alt="impatientbitch" class='blinkie'>
            <img src="${rootPath}blinkies/rock-n-roll.gif" alt="rock-n-roll" class='blinkie'>
            <img src="${rootPath}blinkies/cat-destroy.gif" alt="cat-destroy" class='blinkie'>
            <img src="${rootPath}blinkies/forgot-to-save.gif" alt="forgot-to-save" class='blinkie'>
            <img src="${rootPath}blinkies/seal-approval.png" alt="seal-approval" class='blinkie'>
        </div>
        <h3 class = 'sidebartext nicetext'>Enjoy some music while you scroll</h3>
        <div class='nicebox'>
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2ICY7Wy10jOHTzfJAZTPsg?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
				`;

  if (document.getElementById("leftSidebar")) {
    document.getElementById("leftSidebar").innerHTML = leftSidebarHTML;
  }

  const rightSidebarHTML = `
          <div id="accessibility">
              <h3 class="sidebartext nicetext">Accessibility Options</h3>
              <button id="toggle-blink" class="accbutton">Gif bg: ON</button>
              <button id="toggle-font" class="accbutton">Font: Default</button>
          </div>

          <div class='sidebar-center'>

          <a href="https://elswhere.neocities.org/extra/#guestbook"><img src="${rootPath}buttons/guestbook.PNG" id="guestbookbtn"></a>
          <a  href="https://elswhere.neocities.org/extra/"class='impacttext sidebarlink lace-broider3' style='font-size: 18px; margin: 1rem 0; padding: 0 5px;'>you feel a strange urge to explore → </a>
          </div>
          <h3 class='nicetext sidebartext'>my button!</h3>
          <div class='sidebar-center'>
          <img src="${rootPath}buttons/elswhere-button.GIF" alt="elsiebutton" class='sidebarbutton'>
          <textarea class='buttoncode' readonly>
<a href="https://elswhere.neocities.org/" target="_blank"><img src="https://elswhere.neocities.org/buttons/elswhere-button.GIF"></a>
          </textarea>
          <p class='boxtext' style='font-size: 10px;'>button made in procreate by me :) link back appreciated</p>
            <p class='boxtext' style='font-size: 10px; margin-bottom: 10px;'>this site is:</p>
            <a href="https://lovesick.cafe/grrrl" target="_blank" style="margin-bottom: 1rem;"><img src="https://loves1ck.neocities.org/img/sozai/grrrl/madebya-h2-2.png" class='sidebarbutton'></a>
          </div>
          <h3 class='sidebartext nicetext sidebarlink'>Stuff I used & Resources</h3>
          <ul class='sidebarlinks'>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/projects/layout-builder/" target="_blank">Layout base by sadgrl</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://blinkies.cafe/" target="_blank">Blinkies cafe</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/" target="_blank">More resources by sadgrl</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://www.freepik.com/collection?id=14688295" target="_blank">Freepik assets</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://petrapixel.neocities.org/coding/bookmarks" target="_blank">PetraPixel's coding bookmarks</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://pixelsafari.neocities.org/" target="_blank">Pixel Safari</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://maxbittker.github.io/broider/" target="_blank">Cool borders by broider</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://www.tooooools.app/" target="_blank">img effects by toooools</a></li>
          </ul>
          <p class='boxtext sidebartext' style='font-size: 10px; margin-bottom: 10px;'>for more resources I used, check out the <a href="https://elswhere.neocities.org/extra/" class='sidebarlinks' style="color: var(--text-ultra-light); text-decoration-color: var(--text-light);">button wall</a>!!</p>`;
  if (document.getElementById("rightSidebar")) {
    document.getElementById("rightSidebar").innerHTML = rightSidebarHTML;
  }

  //Extra Page Layout

  const extraSidebarHTML = `
          <h3 class="sSidebartitle">Menu</h3>
            <p class="boxtext">completed pages: movies, youtube, tv show recs; art gallery</p>
            <a href='https://elswhere.neocities.org/extra/' class="sidebarsection" style="text-decoration: none; border-bottom: 2px dashed #cdcbed;">Main</a>
            <details class="sidebarsection">
              <summary>Media recs</summary>
              <ul>
                <li><a href="https://elswhere.neocities.org/extra/mediarec/books/">Books</a></li>
                <li><a href="https://elswhere.neocities.org/extra/mediarec/movies/">Movies/TV</a></li>
                <li><a href="https://elswhere.neocities.org/extra/mediarec/youtube/">Youtube</a></li>
                <li><a href="https://elswhere.neocities.org/extra/mediarec/others/">Others</a></li>
              </ul>
            </details>
            <details class="sidebarsection">
              <summary>Creations</summary>
              <ul>
                <li><a href="https://elswhere.neocities.org/extra/portfolio/">Writings</a></li>
                <li><a href="https://elswhere.neocities.org/coding-proj/">Coding</a></li>
                <li><a href="https://elswhere.neocities.org/artworks/">Art</a></li>
              </ul>
            </details>
            <details class="sidebarsection">
              <summary>Other</summary>
              <ul>
                <li>Coming soon!</li>
              </ul>
            </details>`;

  if (document.getElementById("extraSidebar")) {
    document.getElementById("extraSidebar").innerHTML = extraSidebarHTML;
  }

  //ACCESSIBILITY STUFF

  const bgToggleBtn = document.getElementById("toggle-blink");

  function updateBgToggleLabel() {
    const isOff = document.body.classList.contains("accessibility-no-blink");
    bgToggleBtn.textContent = isOff ? "Background: OFF" : "Background: ON";
  }

  bgToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("accessibility-no-blink");
    updateBgToggleLabel();

    // Optional: Save state
    const isOff = document.body.classList.contains("accessibility-no-blink");
    localStorage.setItem("bgBlinkOff", isOff);
  });

  // Load saved state on page load
  window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("bgBlinkOff");
    if (saved === "true") {
      document.body.classList.add("accessibility-no-blink");
    }
    updateBgToggleLabel();
  });

  let currentFont = "default"; // Track the current font state

  document.getElementById("toggle-font").addEventListener("click", () => {
    if (currentFont === "default") {
      document.body.classList.add("accessibility-serif");
      currentFont = "serif";
    } else if (currentFont === "serif") {
      document.body.classList.remove("accessibility-serif");
      document.body.classList.add("accessibility-dyslexic");
      currentFont = "dyslexic";
    } else {
      document.body.classList.remove("accessibility-dyslexic");
      currentFont = "default";
    }
  });

  const fonts = [
    { name: "Default", css: "'VCR', sans-serif" },
    { name: "Serif", css: "'Georgia', serif" },
    { name: "OpenDyslexic", css: "'OpenDyslexic', monospace" },
  ];

  let currentFontIndex = 0;

  function applyFont(index) {
    document.body.style.fontFamily = fonts[index].css;
    document.getElementById(
      "toggle-font"
    ).innerText = `Font: ${fonts[index].name}`;
  }

  document.getElementById("toggle-font").addEventListener("click", () => {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    applyFont(currentFontIndex);
  });

  // Optional: Load saved font on page load
  const savedIndex = localStorage.getItem("fontIndex");
  if (savedIndex !== null) {
    currentFontIndex = parseInt(savedIndex);
    applyFont(currentFontIndex);
  }

  // Optional: Save font choice on change
  function saveFontChoice() {
    localStorage.setItem("fontIndex", currentFontIndex);
  }

  //MAIN PAGE STUFF

  //Scroll button stuff

  const scrollContainer = document.getElementById("scrollRow");

  if (scrollContainer) {
    //Duplicate the content to create an infinite scrolling effect
    scrollContainer.innerHTML += scrollContainer.innerHTML;

    let scrollSpeed = 1; // Adjust this value to change the speed of scrolling

    let scrolling = true;

    function autoScroll() {
      if (scrolling) {
        scrollContainer.scrollLeft += scrollSpeed;
        //smooth loopy loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(autoScroll);
    }

    scrollContainer.addEventListener("mouseover", () => (scrolling = false));
    scrollContainer.addEventListener("mouseout", () => (scrolling = true));

    autoScroll(); // Start the auto-scrolling
  }

  // //HIT COUNTER SHIT

  // (() => {
  //   const url = "/data/hits.json?bust=" + Date.now(); // cache-buster
  //   fetch(url)
  //     .then((r) => {
  //       if (!r.ok) throw new Error(r.status + " " + r.statusText);
  //       return r.json();
  //     })
  //     .then(({ views }) => {
  //       document.getElementById("hitcount").textContent =
  //         Number(views).toLocaleString();
  //     })
  //     .catch((err) => {
  //       console.error("hit-counter error:", err);
  //       document.getElementById("hitcount").textContent = "—";
  //     });
  // })();

  if (isMobile()) {
    const mobWarning = `
     <div id='mobileWarning' class='mobile-warning' role='alert'>
      <button style='float: right;' class="mw-close" aria-label="Dismiss" >X</button>
      <h3 class='nicetext sidebartext'>WAIT! are you viewing from your phone?</h3>
      <p class='boxtext sidebartext'>this site is not yet optimized for mobile. Some features will not work properly and things will look very, very scuffed (as if it isn't already lmao)</p>
      <p class='boxtext sidebartext'>please view this on a desktop of a tablet for the best experience! I promise I'll optimize it soon :)</p>
      </div>
    `
    document.body.insertAdjacentHTML("afterbegin", mobWarning);
    console.log('mobile warning shown');
  }

  console.log('isMobile?', window.innerWidth <= 900);

  document.addEventListener('click', (e) => {
    if (e.target.closest('#mobileWarning .mw-close')) {
      document.getElementById('mobileWarning')?.remove();
    }
  });

  function isMobile() {
    return window.innerWidth <= 900;
  };
  
}); //END OF DOM CONTENT LOADED EVENT
