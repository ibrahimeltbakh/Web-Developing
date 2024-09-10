/**************************************Global variables******************************************/
//background option
let backgroundOption = true;
//background Interval
let backgroundInterval;
//select Landing page div
let landing = document.querySelector(".landing-page");
//images array
let imgsArray = [];
for (let i = 0; i < 5; i++) {
  imgsArray[i] = `0${i + 1}.jpg`;
}
/**************************************Manage local Storage******************************************/
/*##################local Storage for colors#################*/
//check if there is color in local storage or not
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  //get color from local storage and set in root
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".colors-list li").forEach((li) => {
    //find li which have active class and remove it
    li.classList.remove("active");
    //set active class to li which in local storage
    if (li.dataset.color === mainColor) li.classList.add("active");
  });
}
/*##################local Storage for backgorund#################*/
//check if there is backgorund in local storage or not
let backgorundOption = localStorage.getItem("background-option");

if (backgorundOption !== null) {
  if (backgorundOption === "yes") {
    //set background option = true
    backgroundOption = true;
  } else {
    //set background option = false
    backgroundOption = false;
    //apper backgrounds to choose one
    document
      .querySelector(".options-box .background-container")
      .classList.add("apper");
  }
  document.querySelectorAll(".options-box span").forEach((span) => {
    //find span which have active class and remove it
    span.classList.remove("active");
    //set active class to span which in local storage
    if (span.dataset.background === backgorundOption)
      span.classList.add("active");
  });
}
/*##################local Storage for choosen backgorund#################*/
//check if there is backgorund in local storage or not
let choosenbackground = localStorage.getItem("choosen-background");
if (choosenbackground !== null) {
  //get choosen background from local storage and add it to landing page
  landing.style.backgroundImage = `url("imgs/${choosenbackground}")`;
  //manage active background
  document
    .querySelectorAll(".background-container .background li")
    .forEach((element) => {
      //find element which have active class and remove it
      element.classList.remove("active");
      //set active class to element which in local storage
      if (element.dataset.imgs === choosenbackground)
        element.classList.add("active");
    });
}
/*##################local Storage for bullets options #################*/
//check if there is bullets in local storage or not
let bulletsOption = localStorage.getItem("bullets-options");

if (bulletsOption !== null) {
  if (bulletsOption === "yes") {
    document.querySelector(".nav-bullets").classList.add("apper");
    document
      .querySelector(".options-box .bullets-options .yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".options-box .bullets-options .no")
      .classList.add("active");
  }
}
/**************************************Manage Setting Box******************************************/
/*##################change colors#################*/
//select Setting Box Settings
let settings = document.querySelector(".setting-box");
//select toggle Settings
let toggleSettings = document.querySelector(".toggle-settings");
//select toggle Settings icon
let settingsIcon = document.querySelector(".setting-box i");
settingsIcon.addEventListener("click", () => {
  //toggle Class fa-spin
  settingsIcon.classList.toggle("fa-spin");
  //add open class to settings box
  settings.classList.toggle("open");
});
//select li color List
let colorsListLi = document.querySelectorAll(".colors-list li");
//Loop in list
colorsListLi.forEach((li) => {
  //if li clicked
  li.addEventListener("click", (e) => {
    //change main color in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //add color to local storage
    localStorage.setItem("color-option", e.target.dataset.color);
    //find li which have active class
    removeActiveClass(colorsListLi);
    //set active class to cliked li
    addActiveClassToClikedElement(li);
  });
});
/*##################change random background options#################*/
//select Random Background spans (buttons > yes and no)
let yesOrNoSpan = document.querySelectorAll(
  ".options-box .background-options span"
);
//loop in spans
yesOrNoSpan.forEach((span) => {
  //if span cliked
  span.addEventListener("click", () => {
    //find active span and remove it
    removeActiveClass(yesOrNoSpan);
    //set active class to cliked span
    addActiveClassToClikedElement(span);
    //add cliked span to local storage
    localStorage.setItem("background-option", span.dataset.background);
    //check if span dataset = yes or no
    if (span.dataset.background === "yes") {
      //let backgrounds list disapper
      document
        .querySelector(".options-box .background-container")
        .classList.remove("apper");
      //set background option = true
      backgroundOption = true;
      //turn on interval
      randomizeimgs();
    } else {
      //let backgrounds list apper
      document
        .querySelector(".options-box .background-container")
        .classList.add("apper");
      //set background option = false
      backgroundOption = false;
      //clear backgroundinterval
      clearInterval(backgroundInterval);
    }
  });
});
/*################## Manage choosen background if user choose option no from random background #################*/
let choosenBackground = document.querySelectorAll(
  ".background-container .background li"
);
choosenBackground.forEach((li, index) => {
  li.addEventListener("click", () => {
    //remove active class from all backgrounds
    removeActiveClass(choosenBackground);
    //add active class to cliked background
    addActiveClassToClikedElement(li);
    //change background
    landing.style.backgroundImage = `url("imgs/${imgsArray[index]}")`;
    //add choosen background to local storage
    localStorage.setItem("choosen-background", `${imgsArray[index]}`);
  });
});
/*################## change bullets options #################*/
//select bullets spans (buttons > yes and no)
let yesOrNoBullets = document.querySelectorAll(
  ".options-box .bullets-options span"
);
//loop in spans
yesOrNoBullets.forEach((span) => {
  //if span cliked
  span.addEventListener("click", () => {
    //find active span and remove it
    removeActiveClass(yesOrNoBullets);
    //set active class to cliked span
    addActiveClassToClikedElement(span);
    //add cliked span to local storage
    localStorage.setItem("bullets-options", span.dataset.bullet);
    //check if span dataset = yes or no
    if (span.dataset.bullet === "yes") {
      //let bullets disapper
      document.querySelector(".nav-bullets").classList.add("apper");
    } else {
      //let backgrounds list apper
      document.querySelector(".nav-bullets").classList.remove("apper");
    }
  });
});
/*################## Manage ResetButton #################*/
document.querySelector(".setting-box .reset-button").onclick = function () {
  //clear local storage
  /* localStorage.clear(); */
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-options");
  //reload window
  window.location.reload();
};
/**************************************Manage Bullets Nav and links ******************************************/
//select all Links
let allLinks = document.querySelectorAll(".links a");
//slect all Bullets
let navBullets = document.querySelectorAll(".nav-bullets .bullet");

linksAndBullets(allLinks);
linksAndBullets(navBullets);
/**************************************Manage Landing page******************************************/
//select pars icon
let parsIcon = document.querySelector(".header-area .toggle-menu");
//select links
let linksMenu = document.querySelector(".header-area .links");

//if icon cliked
parsIcon.addEventListener("click", (e) => {
  linksMenu.classList.add("open");
  linksMenu.classList.toggle("display");
});

//close menu if i cliked anywhere on screen
document.addEventListener("click", (e) => {
  if (e.target !== parsIcon && e.target !== linksMenu) {
    //check if menu opend
    if (linksMenu.classList.contains("open")) {
      //toggle open class
      linksMenu.classList.toggle("display");
    }
  }
});
linksMenu.onclick = function (e) {
  e.stopPropagation();
};

randomizeimgs();

/**************************************Manage OUR SKILLS******************************************/
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  //skills offset top (height up our skills)
  let skillsOffsetTop = ourSkills.offsetTop;
  //skills Outer Height (our skills height )
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window Height (height of screen view)
  let windoHeight = this.innerHeight;
  //window scroll top (This is a legacy alias of scrollY.)
  let windowScrollTop = this.scrollY;
  //select all skills
  let allskills = document.querySelectorAll(".skill-box .skill-progress span");

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windoHeight) {
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allskills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};
/**************************************Manage OUR GALLARY******************************************/
//select all images and loop in it
let ourgallarys = document.querySelectorAll(".our-gallary .gallary img");
ourgallarys.forEach((img, index) => {
  //if image cliked
  img.addEventListener("click", () => {
    //creat overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    //append overlay to body
    document.body.appendChild(overlay);
    //creat popup
    let popup = document.createElement("div");
    popup.className = "popup";
    //creat img name
    let h3Element = document.createElement("h3");
    let imgName;
    //if image have alt
    if (img.alt !== "") {
      imgName = document.createTextNode(img.alt);
    }
    //if image do not have alt
    else {
      img.alt = `Image No.${index}`;
      imgName = document.createTextNode(`Image No.${index + 1}`);
    }
    //append name to h3
    h3Element.appendChild(imgName);
    //append h3 to popup
    popup.appendChild(h3Element);
    //creat img
    let gallary = document.createElement("img");
    gallary.src = img.src;
    //append gallary to popup
    popup.appendChild(gallary);

    //creat close button
    let closeBotton = document.createElement("span");
    closeBotton.className = "close-button";
    //creat X text node
    let x = document.createTextNode("X");
    //append x to close botton
    closeBotton.appendChild(x);
    //append close button to popup
    popup.appendChild(closeBotton);

    //append popup to body
    document.body.appendChild(popup);
  });
});
//when x button cliked
document.addEventListener("click", (e) => {
  //remove popup
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

/**************************************Functions******************************************/
//function to manage links and bullets
function linksAndBullets(element) {
  //loop on bullets
  element.forEach((ele) => {
    //if bullet cliked
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
//functions to manage active class
function removeActiveClass(element) {
  //remove active class from all elements
  element.forEach((e) => {
    if (e.classList.contains("active")) e.classList.remove("active");
  });
}
function addActiveClassToClikedElement(cliked) {
  //add active class to cliked element
  cliked.classList.add("active");
}
//function to randomize landing imgs
function randomizeimgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      //get random Img from array
      let randomIndex = Math.floor(Math.random() * imgsArray.length);
      let randomImage = imgsArray[randomIndex];
      landing.style.backgroundImage = `url("imgs/${randomImage}")`;
    }, 10000);
  }
}
