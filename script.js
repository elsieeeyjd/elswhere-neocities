document.addEventListener("DOMContentLoaded", function() {
    
    let path = window.location.pathname;

    let rootPath = "";
    if (path.includes("blog/posts/")) {
        rootPath = "../../";
    }else if (path.includes("blog/")|| path.includes("artworks/")|| path.includes("about/")) {
        rootPath = "../";
    } else {
        rootPath = ""; //main index.html
    }

    const leftSidebarHTML = `
        <h2 class='nicetext sidebartext'>Update</h2>
        <div class="scrollbox">
            <p class='sidebartext'>This site has been updated as of June 2025!</p>
            <ul style="padding-left:10px;" class='sidebartext boxtext'>
                <li>05-06-2025 -- I've officially moved from using the neocities built in editor to VSCode!! Imo it's so much nicer to code like this and much more user friednly too.</li>
                <li>I also finished most of the graphics needed. More will be added as I add more pages.</li>
                <li>There's now a blog!</li>
                <li>23-05-2025 --This website is still relatively early in terms of development, I'll probably make it 'less boring' later on when i acc learn how to code lol</li>
            </ul>
        </div>
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
        </div>`
    ;
    document.getElementById("leftSidebar").innerHTML = leftSidebarHTML;

    const rightSidebarHTML = `
          <h2 class='sidebartext nicetext'>My Links</h2>
          <div class='box' id='sociallinks'>
            <ul class='sidebarlinks'>
              <li><i class="bi bi-heart-arrow"></i><a href='https://www.instagram.com/elsie.mov' target='_blank'>Instagram</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href='https://x.com/elsi3_ok' target='_blank'>Twitter/X</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href='https://elsieeeee.substack.com/' target='_blank'>Substack</a></li>
            </ul>
          </div>
          <h3 class='sidebartext nicetext'>Stuff I used & Resources</h3>
          <ul class='sidebarlinks'>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/projects/layout-builder/" target="_blank">Layout base by sadgrl</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://picocss.com/" target="_blank">Pico.css</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/" target="_blank">More resources by sadgrl</a></li>
          </ul>
        <h3 class='nicetext sidebartext'>my button!</h3>
        <img src="${rootPath}buttons/elswhere-button.GIF" alt="elsiebutton" class='sidebarbutton'>
        <p class='boxtext'>This button is made by me in procreate. Feel free to steal! (but remember to link it back to my site ofc :D)</p>
        <h3 class='nicetext sidebartext'>Professional inquiries</h3>
          <ul class="sidebarlinks">
                <li><i class="bi bi-heart-arrow"></i><a href='https://www.linkedin.com/in/elsie-duann-434a7a307/' target='_blank'>LinkedIn</a></li>
                <li><i class="bi bi-heart-arrow"></i><a href='mailto:elsieyjd@gmail.com' target='_blank'>Email</a></li>
          </ul>`
    ;

    document.getElementById("rightSidebar").innerHTML = rightSidebarHTML;
    });



