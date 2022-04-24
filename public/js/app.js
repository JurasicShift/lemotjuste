// ==================================================
// BOILERPLATE JS
// ==================================================

window.addEventListener("load", initialize);

const menuToggler = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const title = document.getElementsByClassName("title");
const dictionaryBtn = document.getElementById("dictionaryBtn");
const searchTerm = document.getElementById("searchTerm");
const defintion = document.getElementById("definition");
const dictionaryRes = document.getElementById("dictionaryRes");
const push = document.getElementById("push");
const wrapper = document.getElementById("wrapper");

function initialize() {
  if (document.addEventListener) {
    navEvent();
    navReturn();
  }
  if (createBtn) {
    listenerFn(createBtn, labelList);
  }
  if (loginBtn) {
    listenerFn(loginBtn, labelList);
  }
  if (memberBtn) {
    listenerFn(memberBtn, labelList2);
  }
  if (contactBtn) {
    listenerFn(contactBtn, labelList);
  }
}

function listenerFn(btn, lab) {
  btn.addEventListener("click", (ev) => {
    inputValidate(ev, lab);
  });
}
// ================================================
// NAV JS
// ================================================

function navEvent() {
  menuToggler.addEventListener("click", () => {
    if (navigation.classList.contains("navDisplay")) {
      navClose();
      titleRevert();
    } else {
      navOpen();
      titleOpacity();
    }
  });
}

function navOpen() {
  navigation.classList.remove("navHide");
  navigation.classList.add("navDisplay");
}

function navClose() {
  navigation.classList.remove("navDisplay");
  navigation.classList.add("navHide");
}

const titleArr = Array.from(title);

function titleOpacity() {
  titleArr.forEach((el) => {
    el.style.opacity = "1";
  });
}

function titleRevert() {
  titleArr.forEach((el) => {
    el.style.opacity = "0";
  });
}

function navReturn() {
  navigation.addEventListener("mouseleave", () => {
    navClose();
    titleRevert();
  });
}

// =====================================================
// DICTIONARY JS
// =====================================================

//  Marriam-Webster ap i key - bb342bfa-3fad-48de-ba73-320d0ebae96c

const fetchDefinition = async (eve) => {
  eve.preventDefault();
  let termString = searchTerm.value;
  let term = termString.toLowerCase().trim();

  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=bb342bfa-3fad-48de-ba73-320d0ebae96c`
    );
    const data = await response.json();
    const dataString = data[0].shortdef[0];
    capitalizer(dataString);
  } catch (err) {
    console.log("oh no error!", err);
  }
};

function capitalizer(string) {
  let capitalData = string.charAt(0).toUpperCase() + string.slice(1);
  capitalData = '"' + capitalData + '"';
  dictionaryAdder(capitalData);
}

function dictionaryAdder(data) {
  dictionaryRes.classList.remove("dictionaryHide");
  dictionaryRes.classList.add("dictionaryDisplay");
  defintion.innerText = data;
  thanksAdder();
}

function thanksAdder() {
  const el = document.createElement("p");
  const quote = "Dictionary api courtesy of Merriam-Webster";
  el.innerText = quote;
  el.setAttribute("class", "dicThanks");
  defintion.append(el);
  setTimeout(() => {
    searchTerm.value = "";
    dictionaryRes.classList.remove("dictionaryDisplay");
    dictionaryRes.classList.add("dictionaryHide");
  }, 10000);
}

dictionaryBtn.addEventListener("click", fetchDefinition);

// ================================================
// PUBLIC FORM VALIDATION
// ================================================

const labels = document.getElementsByClassName("formLabel");
const labelList = Array.from(labels);
const labels2 = document.getElementsByClassName("newLabel");
const labelList2 = Array.from(labels2);
const createBtn = document.getElementById("createSubmitBtn");
const loginBtn = document.getElementById("loginSubmitBtn");
const memberBtn = document.getElementById("memberBtn");
const contactBtn = document.getElementById("contactSubmitBtn");

function inputValidate(ev, labs) {
  ev.preventDefault();
  const eventTarget = ev.target.form;
  const inputArr = [];
  for (let i = 0; i < labs.length; i++) {
    if (
      labs[i].textContent.includes("*") &&
      labs[i].nextElementSibling.className !== "newAuthor"
    ) {
      inputArr.push(labs[i].nextElementSibling);
    }
    if (labs[i].nextElementSibling.className === "newAuthor") {
      let inputDiv = labs[i].nextElementSibling;
      inputArr.push(inputDiv.children[0], inputDiv.children[1]);
    }
  }
  evTriage(eventTarget, inputArr);
}

function evTriage(ev, arr) {
  const inputArr = arr;
  let textCount = 0;

  if (inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i].value === "") {
        borderAlert(inputArr[i]);
      } else if (inputArr[i].value) {
        textCount++;
      }
    }
  }

  if (textCount === inputArr.length) {
    ev.submit();
    textCount = 0;
    return;
  } else {
    textCount = 0;
    return;
  }
}

function borderAlert(ele) {
  let eleId = ele.id;
  let input = document.getElementById(eleId);
  input.style.border = "solid 0px #1184C2";
  input.style.borderWidth = "3px";
  setTimeout(() => {
    input.style.borderWidth = "0px";
    setTimeout(() => {
      input.style.borderWidth = "3px";
      setTimeout(() => {
        input.style.borderWidth = "0px";
        setTimeout(() => {
          input.style.borderWidth = "1px";
        }, 700);
      }, 700);
    }, 700);
  }, 700);
}