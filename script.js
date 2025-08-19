//-----------------------------
//BLOG PAGE STUFF
let blogName = "elsie's brain dump";
let authorName = "elsie";
let authorLink = "elswhere.neocities.org"; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)

//==[ 2. POSTS ARRAY ]==

let postsArray = [
  ["posts/2025-07-25-the-'fuck-it-ill-do-it-myself'-mentality.html"],
  ["posts/2025-07-01-thoughts-in-the-filler-episodes.html"],
  ["posts/2025-06-09-why-i-made-this-site.html"],
  //[ "posts/2020-11-10-My-Second-Post-Example.html" ],
];

//==[ 3. GENERATING THE HTML SECTIONS TO BE INSERTED ]==

let url = window.location.pathname;

//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen.
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

//Check if you are in posts (if so, the links will have to go up a directory)
let relativePath = ".";
if (url.includes("posts/")) {
  relativePath = "..";
}

//To do the following stuff, we want to know where we are in the posts array (if we're currently on a post page).
let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf("posts/"));
//Depending on the web server settings (Or something?), the browser url may or may not have ".html" at the end. If not, we must add it back in to match the posts array. (12-19-2022 fix)
if (!currentFilename.endsWith(".html")) {
  currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if (postsArray[i][0] === currentFilename) {
    currentIndex = i;
  }
}

//Convert the post url to readable post name. E.g. changes "2020-10-10-My-First-Post.html" to "My First Post"
//Or pass along the "special characters" version of the title if one exists
function formatPostTitle(i) {
  // Check if there is an alternate post title
  if (postsArray[i].length > 1) {
    //Remember how we had to use encodeURI for special characters up above? Now we use decodeURI to get them back.
    return decodeURI(postsArray[i][1]);
  } else {
    //If there is no alternate post title, check if the post uses the date format or not, and return the proper title
    if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
      return postsArray[i][0].slice(17, -5).replace(/-/g, " ");
    } else {
      return postsArray[i][0].slice(6, -5).replace(/-/g, " ");
    }
  }
}

//Get the current post title and date (if we are on a post page)
let currentPostTitle = "";
let niceDate = "";
if (currentIndex > -1) {
  currentPostTitle = formatPostTitle(currentIndex);
  //Generate the "nice to read" version of date
  if (postDateFormat.test(postsArray[currentIndex][0].slice(6, 17))) {
    let monthSlice = postsArray[currentIndex][0].slice(11, 13);
    let month = "";
    if (monthSlice === "01") {
      month = "Jan";
    } else if (monthSlice === "02") {
      month = "Feb";
    } else if (monthSlice === "03") {
      month = "Mar";
    } else if (monthSlice === "04") {
      month = "Apr";
    } else if (monthSlice === "05") {
      month = "May";
    } else if (monthSlice === "06") {
      month = "Jun";
    } else if (monthSlice === "07") {
      month = "Jul";
    } else if (monthSlice === "08") {
      month = "Aug";
    } else if (monthSlice === "09") {
      month = "Sep";
    } else if (monthSlice === "10") {
      month = "Oct";
    } else if (monthSlice === "11") {
      month = "Nov";
    } else if (monthSlice === "12") {
      month = "Dec";
    }
    niceDate =
      postsArray[currentIndex][0].slice(14, 16) +
      " " +
      month +
      ", " +
      postsArray[currentIndex][0].slice(6, 10);
  }
}

//Generate the Post List HTML, which will be shown on the "Archive" page.

function formatPostLink(i) {
  let postTitle_i = "";
  if (postsArray[i].length > 1) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
    if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
      postTitle_i = postsArray[i][0].slice(17, -5).replace(/-/g, " ");
    } else {
      postTitle_i = postsArray[i][0].slice(6, -5).replace(/-/g, " ");
    }
  }
  if (postDateFormat.test(postsArray[i][0].slice(6, 17))) {
    return (
      '<li><a href="' +
      relativePath +
      "/" +
      postsArray[i][0] +
      '">' +
      postsArray[i][0].slice(6, 16) +
      " \u00BB " +
      postTitle_i +
      "</a></li>"
    );
  } else {
    return (
      '<li><a href="' +
      relativePath +
      "/" +
      postsArray[i][0] +
      '">' +
      postTitle_i +
      "</a></li>"
    );
  }
}

let postListHTML = "<ul>";
for (let i = 0; i < postsArray.length; i++) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";

//Generate the Recent Post List HTML, which can be shown on the home page (or wherever you want!)
let recentPostsCutoff = 3; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let recentPostListHTML =
  "<h2 class='specialtextS' style='font-size: 30px'>Recent Posts:</h2><ul>";
let numberOfRecentPosts = Math.min(recentPostsCutoff, postsArray.length);
for (let i = 0; i < numberOfRecentPosts; i++) {
  recentPostListHTML += formatPostLink(i);
}
/*If you've written more posts than can fit in the Recent Posts List,
  then we'll add a link to the archive so readers can find the rest of
  your wonderful posts and be filled with knowledge.*/
if (postsArray.length > recentPostsCutoff) {
  recentPostListHTML +=
    '<li class="moreposts"><a href=' +
    relativePath +
    "/archive.html>\u00BB more posts</a></li></ul>";
} else {
  recentPostListHTML += "</ul>";
}

//Generate the Next and Previous Post Links HTML
let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

/*If you're on the newest blog post, there's no point to
 a "Next Post" link, right? And vice versa with the oldest 
 post! That's what the following code handles.*/
if (postsArray.length < 2) {
  nextprevHTML = '<a href="' + relativePath + '/index.html">Home</a>';
} else if (currentIndex === 0) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    '/index.html">Home</a> | <a href="' +
    relativePath +
    "/" +
    prevlink +
    '">Previous Post \u00BB</a>';
} else if (currentIndex === postsArray.length - 1) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    "/" +
    nextlink +
    '">\u00AB Next Post</a> | <a href="' +
    relativePath +
    '/index.html">Home</a>';
} else if (0 < currentIndex && currentIndex < postsArray.length - 1) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML =
    '<a href="' +
    relativePath +
    "/" +
    nextlink +
    '">\u00AB Next Post</a> | <a href="' +
    relativePath +
    '/index.html">Home</a> | <a href="' +
    relativePath +
    "/" +
    prevlink +
    '">Previous Post \u00BB</a>';
}

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

//--------------------------------
//MUSIC PLAYER STUFF

//inject html

document.addEventListener("DOMContentLoaded", () => {
  mountPlayer(); // put the HTML into #player
  initPlayerUI(); // query elements & attach listeners
});

const playerHTML = `
          <button id="prev" aria-label="Previous">⏮</button>
          <button id="play" aria-label="Play/Pause">▶</button>
          <button id="next" aria-label="Next">⏭</button>
          <button id="shuffle" aria-label="Shuffle">🔀</button>
          <button id="repeat" aria-label="Repeat">🔁</button>
          
          <div class="track">
            <div class="title-wrap">
              <div class="title" id="title" style="font-family: 'VT323';">-</div>
            </div>
            
            <div class="progress" id="progress">
              <div class="progress-bar" id="progressBar"></div>
            </div>
            <div class="time" >
              <span id="currentTime" style="font-family: 'VT323';">0:00</span>
              <span id="duration" style="font-family: 'VT323';">0:00</span>
            </div>
          </div>

          <button id="btnPlaylist" aria-haspopup="listbox" aria-expanded="false" aria-controls="playlistPanel">🎵</button>
          <div id="playlistPanel" class="playlist" role="listbox" tabindex="-1" hidden style="font-family: 'VT323';"></div> 


          <input id="volume" type="range" min="0" max="1" step="0.01" value="0.5" aria-label="Volume">`;

function mountPlayer() {
  const root = document.getElementById("player");
  if (!root) return; // page without a player
  root.innerHTML = playerHTML;
}

function initPlayerUI(opts={}) {

  console.log('initPlayerUI called with:', opts);
   showConsoleCredit(opts);

  let path = window.location.pathname;

  let rootPath = "";
  if(
    path.includes("extra/mediarec/")
  ) {
    rootPath = "../../../"; 
  } else if (
    path.includes("blog/posts/") 
  ) {
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


  // elements
  const audio = document.getElementById("audio");
  const btnPlay = document.getElementById("play");
  const btnNext = document.getElementById("next");
  const btnPrev = document.getElementById("prev");
  const btnShuffle = document.getElementById("shuffle");
  const btnRepeat = document.getElementById("repeat");
  const titleEl = document.getElementById("title");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progressBar");
  const volume = document.getElementById("volume");

  let list = [];
  let index = 0;
  let repeat = "all";
  let shuffle = false;

  //0) QoL

  //base url so can mix local and cloud src
  const BASE_URL = ""; // later, you could set to "https://<user>.github.io/assets/"
  function resolveSrc(p) {
    return /^https?:\/\//.test(p) ? p : BASE_URL + p;
  }
  // 1) fetch playlist.json
  fetch(`${rootPath}music/playlist.json`, {cache: 'no-store'})
    .then((r) => r.json())
    .then((tracks) => {
      list = tracks;
      //load playlist
      list = tracks; 
      renderPlaylist();
      restoreStateThenLoad();

      load(index);

      audio.crossOrigin = "anonymous"; // helps metadata on some hosts
      audio.src = resolveSrc(t.src);
      audio.load();
    })
    .catch((err) => console.error("Playlist load failed:", err));


  //1.1) restore state
  function restoreStateThenLoad() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch {}
  // Defaults if nothing saved yet
  let i = 0, resumeTime = 0, resumePlay = false;

  if (saved) {
    // Prefer matching by src (safer if playlist order changed)
    const bySrc = saved.src ? list.findIndex(t => t.src === saved.src) : -1;
    i = bySrc >= 0 ? bySrc : (
      Number.isInteger(saved.index) && saved.index >= 0 && saved.index < list.length
        ? saved.index : 0
    );

    // restore modes + volume
    if (typeof saved.shuffle === 'boolean') shuffle = saved.shuffle;
    if (saved.repeat) repeat = saved.repeat;
    if (typeof saved.vol === 'number') {
      audio.volume = Math.min(1, Math.max(0, saved.vol));
      volume && (volume.value = audio.volume);
    }

    resumeTime = Number(saved.time) || 0;
    resumePlay = !!saved.playing;  
  }

  // Load the track now
  load(i);

  // Seek only after metadata is known (duration is available)
  const onMeta = () => {
    audio.removeEventListener('loadedmetadata', onMeta);
    // clamp in case file changed length
    if (isFinite(audio.duration)) {
      audio.currentTime = Math.min(resumeTime, audio.duration - 0.25);
    }
    // Try to resume playback after first user interaction (autoplay policies)
    if (resumePlay) {
      const resumeOnce = () => {
        play();                         // your existing play()
        document.removeEventListener('click', resumeOnce, true);
        document.removeEventListener('keydown', resumeOnce, true);
      };
      // any click or keypress will resume
      document.addEventListener('click', resumeOnce, true);
      document.addEventListener('keydown', resumeOnce, true);
      // Optional: show a tiny “tap to resume ▶” hint near the player
    }
  };
  audio.addEventListener('loadedmetadata', onMeta);
}

  //1.5) title scrolling

  const titleWrap = document.querySelector(".title-wrap");
  const titleMarquee = document.getElementById("title");

  function setTitle(text) {
    // reset
    titleMarquee.classList.remove("scroll");
    titleMarquee.style.removeProperty("--scroll-distance");
    titleMarquee.style.removeProperty("--duration");

    // set fresh text
    titleMarquee.textContent = text;

    // If it fits, don't animate
    requestAnimationFrame(() => {
      const needsScroll = titleMarquee.scrollWidth > titleWrap.clientWidth;
      if (!needsScroll) return;

      // Duplicate the text so it loops smoothly
      const gap = " \u00A0\u00A0\u00A0 ";
      titleMarquee.innerHTML = `${text}${gap}${text}`;

      // Distance to travel = width of one copy
      const distance = titleMarquee.scrollWidth / 2;

      // Speed: ~40px/sec (tweak to taste)
      const duration = Math.max(10, distance / 40);

      titleMarquee.style.setProperty("--scroll-distance", distance + "px");
      titleMarquee.style.setProperty("--duration", duration + "s");
      titleMarquee.classList.add("scroll");
    });
  }

  //1.6) time marker
  const curEl = document.getElementById("currentTime");
  const durEl = document.getElementById("duration");

  // mm:ss (or h:mm:ss if long)
  function fmtTime(s) {
    if (!isFinite(s)) return "0:00";
    s = Math.floor(s);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
  }

  //1.7) Playlist panel

  const btnPlaylist = document.getElementById("btnPlaylist");
  const panel = document.getElementById("playlistPanel");

  function renderPlaylist() {
    if (!panel) return;
    panel.innerHTML = list
      .map(
        (t, i) => `
    <div class="playlist_item" role="option"
         data-index="${i}"
         aria-selected="${i === index}">
      <div class="playlist_title">${t.artist}${t.title ? " — " + t.title : ""}</div>
    </div>
  `
      )
      .join("");
  }

  function prefetchDurations() {
    list.forEach((t, i) => {
      if (t._durFetched) return;
      t._durFetched = true;
      const a = new Audio();
      a.crossOrigin = "anonymous"; // helps metadata on some hosts
      a.preload = "metadata";
      a.src = resolveSrc(t.src);
      a.src = t.src;
      a.addEventListener(
        "loadedmetadata",
        () => {
          t._dur = fmtTime(a.duration);
          const row = panel.querySelector(`.playlist_item[data-index="${i}"]`);
          if (row && !row.querySelector(".playlist_dur")) {
            row.insertAdjacentHTML(
              "beforeend",
              `<div class="playlist_dur">${t._dur}</div>`
            );
          }
        },
        { once: true }
      );
    });
  }

  function openPlaylist() {
    panel.hidden = false;
    panel.setAttribute("aria-open", "true");
    btnPlaylist.setAttribute("aria-expanded", "true");
    panel.focus();
  }
  function closePlaylist() {
    panel.hidden = true;
    panel.setAttribute("aria-open", "false");
    btnPlaylist.setAttribute("aria-expanded", "false");
    setTimeout(() => (panel.hidden = true), 150);
  }

  // Button click toggles
  btnPlaylist.addEventListener("click", () => {
    panel.hidden ? openPlaylist() : closePlaylist();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (panel.hidden) return;
    const within = panel.contains(e.target) || btnPlaylist.contains(e.target);
    if (!within) closePlaylist();
  });

  // Close on Esc
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePlaylist();
      btnPlaylist.focus();
    }
  });

  panel.addEventListener("click", (e) => {
    const row = e.target.closest(".playlist_item");
    if (!row) return;
    const i = +row.dataset.index;
    load(i);
    play();
    renderPlaylist(); // refresh highlight
    closePlaylist();
  });

  function focusActiveRow() {
    const row = panel.querySelector(`.playlist_item[data-index="${index}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }


  //1.9) save state
  //9) remember play progress

function throttle (fn, ms) {
  let t = 0;
  return (...args) => {
    const now = Date.now();
    if (now - t >= ms) {
      t = now;
      fn(...args);
    }
  }
}

const STORAGE_KEY = 'localPlayer';

const saveState = throttle(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        index: index,
        src: list[index]?.src || null,
        time: audio.currentTime || 0,
        vol: audio.volume,
        shuffle,
        repeat,
        playing: !audio.paused,
        updatedAT: Date.now()
      })
    );
  } catch (e) {
    console.warn("Failed to save player state:", e);
  }
}, 500);



  // 2) load a track into the audio tag
  function load(i) {
    index = (i + list.length) % list.length;
    const t = list[index];
    audio.src = t.src; // direct MP3/OGG URL
    setTitle(`${t.artist} - ${t.title ?? ""}`.trim());
    curEl.textContent = "0:00";
    durEl.textContent = "0:00";
    saveState();// save current state
    // load playlist
    renderPlaylist();
    prefetchDurations();
    focusActiveRow();
  }

  // 2.5) update time markers when loaded

  audio.addEventListener("loadedmetadata", () => {
    durEl.textContent = fmtTime(audio.duration);
    curEl.textContent = fmtTime(audio.currentTime || 0);
  });

  audio.addEventListener("timeupdate", () => {
    curEl.textContent = fmtTime(audio.currentTime);
    //  existing progressBar width update stays here
  });

  // optionally refresh immediately after seek:
  progress?.addEventListener("click", () => {
    curEl.textContent = fmtTime(audio.currentTime);
  });

  // when a track ends (if don’t immediately start next), snap current to duration:
  audio.addEventListener("ended", () => {
    curEl.textContent = fmtTime(audio.duration);
  });


  // 2.7) when to save state

  // when to save? 

    audio.addEventListener('timeupdate', saveState);
    progress?.addEventListener('click', () => saveState());
    btnPlay.addEventListener('click', () => saveState());
    volume.addEventListener('input', () => saveState());
    btnShuffle.addEventListener('click', () => { shuffle = !shuffle; saveState(); });
    btnRepeat.addEventListener('click', () => { /* cycle repeat */ saveState(); });
    window.addEventListener('pagehide', saveState);



  // 3) play/pause logic
  function play() {
    audio
      .play()
      .then(() => {
        btnPlay.textContent = "⏸";
      })
      .catch((err) => {
        // Autoplay blocked until user interacts – normal on first click
        console.warn("Play failed (likely autoplay policy):", err);
      });
  }
  function pause() {
    audio.pause();
    btnPlay.textContent = "▶";
  }

  // 4) wire up buttons
  btnPlay.addEventListener("click", () => (audio.paused ? play() : pause()));
  btnNext.addEventListener("click", () => {
    next();
    play();
  });
  btnPrev.addEventListener("click", () => {
    prev();
    play();
  });

  function next() {
    if (shuffle) {
      let j;
      do {
        j = Math.floor(Math.random() * list.length);
      } while (j === index && list.length > 1);
      load(j);
    } else {
      load(index + 1);
    }
  }
  function prev() {
    load(index - 1);
  }

  // 5) time/progress UI

  audio.addEventListener("timeupdate", () => {
    if (!isFinite(audio.duration)) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${pct}%`;
  });

  // click to seek
  progress.addEventListener("click", (e) => {
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (isFinite(audio.duration)) audio.currentTime = pct * audio.duration;
  });

  // 6) when a song ends → next depending on repeat mode
  audio.addEventListener("ended", () => {
    if (repeat === "one") {
      audio.currentTime = 0;
      play();
      return;
    }
    if (repeat === "all") {
      next();
      play();
      return;
    }
    // 'off'
    btnPlay.textContent = "▶️";
  });

  // 7) volume (and remember it)
  const savedVol = +localStorage.getItem("vol");
  if (!Number.isNaN(savedVol)) {
    volume.value = savedVol;
    audio.volume = savedVol;
  }
  volume.addEventListener("input", () => {
    audio.volume = +volume.value;
    localStorage.setItem("vol", volume.value);
  });

  //8) shuffle and repeat

  btnShuffle.addEventListener("click", () => {
    shuffle = !shuffle;
    btnShuffle.style.opacity = shuffle ? "1" : ".5";
  });

  btnRepeat.addEventListener("click", () => {
    repeat = repeat === "all" ? "one" : repeat === "one" ? "off" : "all";
    btnRepeat.textContent = repeat === "one" ? "🔂" : "🔁";
    btnRepeat.style.opacity = repeat === "off" ? ".5" : "1";

    
     
  });
  

} //end of initPlayerUI

function showConsoleCredit(opts = {}) {
  // allow turning it off: init({ credit:false })
  if (opts.credit === false) return;

  // avoid duplicates (per page load)
  if (window.__lilacCreditShown) return;
  window.__lilacCreditShown = true;


  const NAME = "elsie's music player widget";
  const VERSION = '1.0.0';
  const URL = 'https://github.com/elsieeeyjd/music-player-bar';

  const credStart = "this lovely site uses: ";
  const tag   = `${NAME} v${VERSION} `;
  const style = 'background:#8b5cf6;color:#fff;padding:2px 8px;border-radius:8px;font-weight:600';
  const msg   = `by elsie — MIT — ${URL}`;

  console.info(`${credStart}%c${tag}%c ${msg}`, style, '');
}




//9) remember play progress

function throttle (fn, ms) {
  let t = 0;
  return (...args) => {
    const now = Date.now();
    if (now - t >= ms) {
      t = now;
      fn(...args);
    }
  }
}

const STORAGE_KEY = 'elsiePlayer';

const saveState = throttle(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        index: index,
        src: list[index]?.src || null,
        time: audio.currentTime || 0,
        vol: audio.volume,
        shuffle,
        repeat,
        playing: !audio.paused,
        updatedAT: Date.now()
      })
    );
  } catch (e) {
    console.warn("Failed to save player state:", e);
  }
}, 500);


//-----------------------------
//DOMCONTENTLOADED STARTS HERE
document.addEventListener("DOMContentLoaded", function () {
  let path = window.location.pathname;

  let rootPath = "";
  if(
    path.includes("extra/mediarec/")
  ) {
    rootPath = "../../../"; 
  } else if (
    path.includes("blog/posts/") 
  ) {
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

  const navbarHTML = `
        <ul>
            <li><a href="https://elswhere.neocities.org">Home</a></li>
            <li><a href="https://elswhere.neocities.org/about/">About</a></li>
            <li><a href="https://elswhere.neocities.org/blog/">Blog</a></li>
            <li><a href="https://elswhere.neocities.org/extra/">Extra</a></li>
        </ul>`;
  document.getElementById("navbar").innerHTML = navbarHTML;

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
          <h2 class='sidebartext nicetext'>More stuff</h2>
          <div class='smallsidebar'>
            <h3 class="sSidebartitle">Menu</h3>
            <a href='https://elswhere.neocities.org/extra/' class="sidebarsection" style="text-decoration: none; border-bottom: 2px dashed #cdcbed;">Extra pg.</a>
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
            </details>
          </div>
          <h3 class='nicetext sidebartext'>my button!</h3>
          <div class='sidebar-center'>
            <img src="${rootPath}buttons/elswhere-button.GIF" alt="elsiebutton" class='sidebarbutton'>
            <textarea class='buttoncode' readonly>
<a href="https://elswhere.neocities.org/" target="_blank"><img src="https://elswhere.neocities.org/buttons/elswhere-button.GIF"></a>
            </textarea>
            <p class='boxtext' style='font-size: 10px;'>button made in procreate by me :) link back appreciated</p>
            <p class='boxtext' style='font-size: 10px;'>------------------</p>
            <p class='boxtext' style='font-size: 10px; margin-bottom: 10px;'>this site is:</p>
            <a href="https://lovesick.cafe/grrrl" target="_blank" style="margin-bottom: 1rem;"><img src="https://loves1ck.neocities.org/img/sozai/grrrl/madebya-h2-2.png" class='sidebarbutton'></a>
          </div>
          <h3 class='sidebartext nicetext'>Stuff I used & Resources</h3>
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

  //BLOG STUFF HTML
  //==[ 4. INSERTING THE SECTIONS INTO OUR ACTUAL HTML PAGES ]==

  if (document.getElementById("nextprev")) {
    document.getElementById("nextprev").innerHTML = nextprevHTML;
  }
  if (document.getElementById("postlistdiv")) {
    document.getElementById("postlistdiv").innerHTML = postListHTML;
  }
  if (document.getElementById("recentpostlistdiv")) {
    document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
  }
  if (document.getElementById("header")) {
    document.getElementById("header").innerHTML = headerHTML;
  }
  if (document.getElementById("blogTitleH1")) {
    document.getElementById("blogTitleH1").innerHTML = blogTitle;
  }
  if (document.getElementById("postTitleH1")) {
    document.getElementById("postTitleH1").innerHTML = currentPostTitle;
  }
  if (document.getElementById("postDate")) {
    document.getElementById("postDate").innerHTML = niceDate;
  }
  if (document.getElementById("footer")) {
    document.getElementById("footer").innerHTML = footerHTML;
  }

  //Dynamically set the HTML <title> tag from the postTitle variable we created earlier
  //The <title> tag content is what shows up on browser tabs
  if (document.title === "Blog Post") {
    document.title = currentPostTitle;
  }
}); //END OF DOM CONTENT LOADED EVENT
