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
            <h3 class='sidebartext nicetext' style='font-size: 18px'>5. 6. 2025</h3>
            <p class='sidebartext boxtext'>Universalise sidebar contents, added new blinkies & bumper stickers</p>
            <h3 class='sidebartext nicetext' style='font-size: 18px'>3. 6. 2025</h3>
            <p class='sidebartext boxtext'>Created blog page + archive</p>
            <h3 class='sidebartext nicetext' style='font-size: 18px'>apr - may 2025</h3>
            <p class='sidebartext boxtext'>Website launch and other design stuff (i just moved everything to vscode lol so i dont have the timeline for what came before)</p>
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
              <li><i class="bi bi-heart-arrow"></i><a href='https://elsieeeee.substack.com/' target='_blank'>Substack</a></li>
            </ul>
          </div>
          <h3 class='nicetext sidebartext'>my button!</h3>
            <img src="${rootPath}buttons/elswhere-button.GIF" alt="elsiebutton" class='sidebarbutton'>
            <textarea class='buttoncode' readonly>
               <a href="https://elswhere.org/" target="_blank"><img src="https://elswhere.neocities.org/buttons/elswhere-button.GIF"></a>
            </textarea>
            <p class='boxtext' style='font-size: 10px;'>button made in procreate by me :) link back appreciated</p>
          <h3 class='sidebartext nicetext'>Stuff I used & Resources</h3>
          <ul class='sidebarlinks'>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/projects/layout-builder/" target="_blank">Layout base by sadgrl</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://blinkies.cafe/" target="_blank">Blinkies cafe</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://goblin-heart.net/sadgrl/" target="_blank">More resources by sadgrl</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://www.freepik.com/collection?id=14688295" target="_blank">Freepik assets</a></li>
              <li><i class="bi bi-heart-arrow"></i><a href="https://petrapixel.neocities.org/coding/bookmarks" target="_blank">PetraPixel's coding bookmarks</a></li>
          </ul>
        <h3 class='nicetext sidebartext'>Professional inquiries</h3>
          <ul class="sidebarlinks">
                <li><i class="bi bi-heart-arrow"></i><a href='https://www.linkedin.com/in/elsie-duann-434a7a307/' target='_blank'>LinkedIn</a></li>
                <li><i class="bi bi-heart-arrow"></i><a href='mailto:elsieyjd@gmail.com' target='_blank'>Email</a></li>
          </ul>`
    ;

    document.getElementById("rightSidebar").innerHTML = rightSidebarHTML;
    });

    const navbarHTML = `
        <ul>
            <li><a href="https://elswhere.neocities.org">Home</a></li>
            <li><a href="https://elswhere.neocities.org/about/">About</a></li>
            <li><a href="https://elswhere.neocities.org/blog/">Blog</a></li>
            <li><a href="https://elswhere.neocities.org/extra/">Extra</a></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
        </ul>`
    ;

    document.getElementById("navbar").innerHTML = navbarHTML;

    const footerHTML = `
        <div class='buttonrow footerbuttons'>
            <p class='boxtext rowbutton footertext'>created by elsie 2025 | </p>
            <a href="https://neocities.org/site/elswhere" target="_blank" class='rowbutton footertext footerlink'>my neocities profile</a>
            <p class='boxtext rowbutton footertext'> | </p>
            <a href="https://github.com/elsieeeyjd/elswhere-neocities" target="_blank" class='rowbutton footertext footerlink'>github</a>
        </div>
        `
        ;

    document.getElementById("footer").innerHTML = footerHTML;



    const facts = [
        "Idk how to wink without scrunching my whole cheek up",
        "I have two cats, both were strays and adopted and now one of them is obese the other bullies her",
        "90% of my playlist on spotify has cover images from shuan the sheep",
        "I haven't touched coding since 6th grade (until now ofc)",
        "I have Convention on the Prevention and Punishment of the Crime of Genocide bookmarked in my browser (yea i was a mun kid)",
        "IMO victoria secret's love spell is a good scent sue me",
        "I'm learning german because once my insta reccs got flooded with german reels and i thought its a funny af language",
        "right before i graduated hs i gifted my history/government teacher a US flag with his face on it",
        "my biggest ego boost moment was when i went to the NSDA nationals 2024 and someone from taiwan asked us 'oh are y'all the only non-TAS team in taiwan who qualified PF?'",
    ];

    function showRandomFact() {
        const output = document.getElementById("fact-output");
        const randomIndex = Math.floor(Math.random() * facts.length);
        output.textContent = facts[randomIndex]
    }



