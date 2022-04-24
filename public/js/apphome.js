// ==============================================
// HOME JS
// ==============================================

window.addEventListener("load", initialize);

const slideShow = document.getElementById("slideShow");
const slideFader = document.getElementById("slideFader");
const imageLibrary = new Array();
const quoteBtn = document.getElementById("quoteBtn");
const quote = document.getElementById("spanInput");
const imgInput = document.getElementById("imgInput");
const author = document.getElementById("quoteAuthor");
const slideBorder = document.getElementById("slideBorder");

let quoteObj = {
  _id: "",
  quote: "Le mot juste",
  author: "Gustave Flaubert",
};

function initialize() {
  if (document.addEventListener) {
    timer(imgSelector, 10000);
  }
  if(successDiv) {
    alertStyler(successDiv);
  }
}
quoteScroll(quoteObj.quote, quote);

//   ===============================================
//   IMAGE CAROUSEL JS
//   ===============================================

function timer(fn, t) {
  fn();
  setInterval(fn, t);
}

function imgSelector() {
  const mathRoll = Math.floor(Math.random() * 41 + 1);
  imgIndex = mathRoll;
  imgNum = imgIndex.toString();
  const imgSelect = imageLibrary[`writers${imgNum}`].src;
  imgAttach(imgSelect);
}

let imgCount = 0;
let image;
function imgAttach(imgNum) {
  if (imgCount === 0) {
    image = document.createElement("img");
    imgCount++;
  }
  image.src = imgNum;
  imgFadeIn();
  slideShow.append(image);
}

function imgFadeIn() {
  slideShow.classList.add("fadeIn");
  slideBorder.classList.add("borderShadow");
  setTimeout(() => {
    slideShow.classList.remove("fadeIn");
    slideBorder.classList.remove("borderShadow");
  }, 7000);
}

//   ==================================================
//   GET QUOTE JSON
//   ==================================================

const randomQuote = async () => {
  const options = {
    headers: new Headers({ "call-type": "fetch"}),
  };
  try {
    const response = await fetch("/lmj/home", options);
    const data = await response.json();
    quoteObj = data;
    quoteScroll(quoteObj.quote, quote);
  } catch (err) {
    console.log("oh no error!", err);
  }
};

function quoteScroll(val, el) {
  let qSplit = val.split("");

  if (el === quote) {
    quote.textContent = "";
    author.textContent = "";

    imgInput.innerHTML = ` <img class="quoteImg" src="/img/quill1.svg" alt="icon"/>`;
    el.innerHTML += '"';
    for (let i = 0; i < qSplit.length; i++) {
      el.innerHTML += "<span>" + qSplit[i] + "</span>";
      if (i === qSplit.length - 1) {
        el.innerHTML += '"';
      }
    }
  } else {
    for (let i = 0; i < qSplit.length; i++) {
      el.innerHTML += "<span>" + qSplit[i] + "</span>";
    }
  }

  let char = 0;
  let timer = setInterval(onTick, 100);

  function onTick() {
    const span = el.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    if (char === qSplit.length) {
      complete();
      if (el === quote) {
        quoteScroll(quoteObj.author, author);
        return;
      } else {
        return;
      }
    }
  }
  function complete() {
    clearInterval(timer);
    char = 0;
    return;
  }
}

quoteBtn.addEventListener("click", randomQuote);
// ==================================================
// ALERT STYLES
// ==================================================

const successDiv = document.getElementById("successDiv");

function alertStyler() {
  setTimeout(() => {
    successDiv.classList.add("messageDisplay");
    setTimeout(() => {
      successDiv.classList.add("messageRemove");
     }, 2000);
  }, 500);
}

// ===============================================
// IMAGE STORE
// ===============================================

imageLibrary["writers1"] = new Image(250, 150);
imageLibrary["writers1"].src = "img/writers1.jpg";
imageLibrary["writers2"] = new Image(250, 150);
imageLibrary["writers2"].src = "img/writers2.jpg";
imageLibrary["writers3"] = new Image(250, 150);
imageLibrary["writers3"].src = "img/writers3.jpg";
imageLibrary["writers4"] = new Image(250, 150);
imageLibrary["writers4"].src = "img/writers4.jpg";
imageLibrary["writers5"] = new Image(250, 150);
imageLibrary["writers5"].src = "img/writers5.jpg";
imageLibrary["writers6"] = new Image(250, 150);
imageLibrary["writers6"].src = "img/writers6.jpg";
imageLibrary["writers7"] = new Image(250, 150);
imageLibrary["writers7"].src = "img/writers7.jpg";
imageLibrary["writers8"] = new Image(250, 150);
imageLibrary["writers8"].src = "img/writers8.jpg";
imageLibrary["writers9"] = new Image(250, 150);
imageLibrary["writers9"].src = "img/writers9.jpg";
imageLibrary["writers10"] = new Image(250, 150);
imageLibrary["writers10"].src = "img/writers10.jpg";
imageLibrary["writers11"] = new Image(250, 150);
imageLibrary["writers11"].src = "img/writers11.jpg";
imageLibrary["writers12"] = new Image(250, 150);
imageLibrary["writers12"].src = "img/writers12.jpg";
imageLibrary["writers13"] = new Image(250, 150);
imageLibrary["writers13"].src = "img/writers13.jpg";
imageLibrary["writers14"] = new Image(250, 150);
imageLibrary["writers14"].src = "img/writers14.jpg";
imageLibrary["writers15"] = new Image(250, 150);
imageLibrary["writers15"].src = "img/writers15.jpg";
imageLibrary["writers16"] = new Image(250, 150);
imageLibrary["writers16"].src = "img/writers16.jpg";
imageLibrary["writers17"] = new Image(250, 150);
imageLibrary["writers17"].src = "img/writers17.jpg";
imageLibrary["writers18"] = new Image(250, 150);
imageLibrary["writers18"].src = "img/writers18.jpg";
imageLibrary["writers19"] = new Image(250, 150);
imageLibrary["writers19"].src = "img/writers19.jpg";
imageLibrary["writers20"] = new Image(250, 150);
imageLibrary["writers20"].src = "img/writers20.jpg";
imageLibrary["writers21"] = new Image(250, 150);
imageLibrary["writers21"].src = "img/writers21.jpg";
imageLibrary["writers22"] = new Image(250, 150);
imageLibrary["writers22"].src = "img/writers22.jpg";
imageLibrary["writers23"] = new Image(250, 150);
imageLibrary["writers23"].src = "img/writers23.jpg";
imageLibrary["writers24"] = new Image(250, 150);
imageLibrary["writers24"].src = "img/writers24.jpg";
imageLibrary["writers25"] = new Image(250, 150);
imageLibrary["writers25"].src = "img/writers25.jpg";
imageLibrary["writers26"] = new Image(250, 150);
imageLibrary["writers26"].src = "img/writers26.jpg";
imageLibrary["writers27"] = new Image(250, 150);
imageLibrary["writers27"].src = "img/writers27.jpg";
imageLibrary["writers28"] = new Image(250, 150);
imageLibrary["writers28"].src = "img/writers28.jpg";
imageLibrary["writers29"] = new Image(250, 150);
imageLibrary["writers29"].src = "img/writers29.jpg";
imageLibrary["writers30"] = new Image(250, 150);
imageLibrary["writers30"].src = "img/writers30.jpg";
imageLibrary["writers31"] = new Image(250, 150);
imageLibrary["writers31"].src = "img/writers31.jpg";
imageLibrary["writers32"] = new Image(250, 150);
imageLibrary["writers32"].src = "img/writers32.jpg";
imageLibrary["writers33"] = new Image(250, 150);
imageLibrary["writers33"].src = "img/writers33.jpg";
imageLibrary["writers34"] = new Image(250, 150);
imageLibrary["writers34"].src = "img/writers34.jpg";
imageLibrary["writers35"] = new Image(250, 150);
imageLibrary["writers35"].src = "img/writers35.jpg";
imageLibrary["writers36"] = new Image(250, 150);
imageLibrary["writers36"].src = "img/writers36.jpg";
imageLibrary["writers37"] = new Image(250, 150);
imageLibrary["writers37"].src = "img/writers37.jpg";
imageLibrary["writers38"] = new Image(250, 150);
imageLibrary["writers38"].src = "img/writers38.jpg";
imageLibrary["writers39"] = new Image(250, 150);
imageLibrary["writers39"].src = "img/writers39.jpg";
imageLibrary["writers40"] = new Image(250, 150);
imageLibrary["writers40"].src = "img/writers40.jpg";
imageLibrary["writers41"] = new Image(250, 150);
imageLibrary["writers41"].src = "img/writers41.jpg";
