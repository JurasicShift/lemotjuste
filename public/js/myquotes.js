window.addEventListener("load", () => {
  onLoad();
});

function onLoad() {
  if (strCheck && !tableArr.length) {
    fader();
  }
  if (tableDiv) {
    eventTriage();
  }
  if (scrollBtn) {
    scrollBtnLoader();
  }
  if (strCheck2) {
    cookieLoader();
  }
  if(successDiv) {
    alertStyler(successDiv);
  }
}
let urlStr2 = window.location.href;
let strCheck = urlStr2.includes("member/myQuote");
let strCheck2 = urlStr2.includes("lmj/login");

const tableDiv = document.getElementById("tableDiv");

function eventTriage() {
  tableDiv.addEventListener("click", (ev) => {
    const event = ev;
    if (event.target.parentElement.id === "noQuoteBtn") {
      noQuoteStyles();
    }
    if (event.target.className === "tdBtnDel") {
      addBtnListen(event);
    }
  });
}

// =================================================
// SCROLL BTN
// =================================================

const scrollBtn = document.getElementById("scrollBtn");

function scrollBtnLoader() {
  scrollBtn.addEventListener("click", () => {
    scrollTop();
  });
}

window.onscroll = () => {
  scrollFn();
};

function scrollFn() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

function scrollTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ================================================
// DELETE BTN EFFECTS
// ================================================

const tables = document.getElementsByClassName("quoteTable");
const tableArr = Array.from(tables);

let eventCheck = false;

function addBtnListen(ev) {
  if (eventCheck) {
    eventCheck = false;
    return;
  }
  ev.preventDefault();
  let formTarget = ev.target;
  const formAction = ev.target.parentElement.action;
  const tableAr = tableGrabber(formAction);
  const table = tableAr[0];
  const tableIndex = tableAr[1];
  tableShift(table, tableIndex, formTarget);
}

function tableGrabber(ref) {
  for (let i = 0; i < tableArr.length; i++) {
    if (ref.includes(tableArr[i].id)) {
      const table = document.getElementById(tableArr[i].id);
      const tableIndex = i;
      const tableInfo = [table, tableIndex];
      return tableInfo;
    }
  }
}

function tableShift(ele, num, ev) {
  const qBtn = ev;
  const table = ele;
  const width = window.innerWidth;
  const tableWidth = table.offsetWidth;
  const shiftWidth = width + tableWidth + 50;
  table.style.left = "-60px";
  setTimeout(() => {
    table.style.left = `${shiftWidth}px`;
    setTimeout(() => {
      table.style.display = "none";
      tableArr.splice(num, 1);
      eventCheck = true;
      tableParentMove(table, qBtn);
    }, 500);
  }, 500);
}

function tableParentMove(el, ev) {
  const element = el.parentElement;
  element.classList.add("newClass");
  element.style.height = "0px";
  setTimeout(() => {
    element.style.display = "none";
    setTimeout(() => {
      ev.click();
      if (!tableArr.length) {
        noQuoteOnFly();
      }
    }, 500);
  }, 500)
 
}

function noQuoteOnFly() {
  const parent = document.querySelector(".tableDiv");
  const firstDiv = document.createElement("div");
  firstDiv.classList.add("noQuoteTable");
  firstDiv.setAttribute("id", "noQuoteTable");
  const btnCompilation = dynamicBtn();
  const textCompilation = dynamicText();
  firstDiv.append(btnCompilation, textCompilation);
  parent.append(firstDiv);
  fader();
}

function dynamicBtn() {
  const secondDiv = document.createElement("div");
  secondDiv.classList.add("noQuoteBtnDiv");
  const newBtn = document.createElement("button");
  newBtn.classList.add("noQuoteBtn");
  newBtn.setAttribute("id", "noQuoteBtn");
  newBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
  secondDiv.append(newBtn);
  return secondDiv;
}

function dynamicText() {
  const thirdDiv = document.createElement("div");
  thirdDiv.classList.add("noQuoteBtnText");
  const head1 = document.createElement("h1");
  head1.classList.add("noQuoteHead", "noQuote");
  const text1 = document.createTextNode("NO QUOTES AVAILABLE");
  const head2 = document.createElement("h2");
  head2.classList.add("noQuoteSub", "noQuote");
  head2.innerHTML = "Please <span>Add Quote</span>";
  head1.append(text1);
  thirdDiv.append(head1, head2);
  return thirdDiv;
}
//  ===========================================
//  NO QUOTE BTN EFFECT
//  ===========================================

function fader() {
  const quoteTab = document.getElementById("noQuoteTable");
  setTimeout(() => {
    quoteTab.classList.add("noQuoteFader");
  }, 500);
  setTimeout(() => {
    setTimer();
  }, 500);
}

function setTimer() {
  btnMover();
  let i = setInterval(btnMover, 6000);
  return i;
}

function noQuoteStyles() {
  const noQuotebtn = document.getElementById("noQuoteBtn");
  const quotes = document.getElementsByClassName("noQuote");
  const quoteTab = document.getElementById("noQuoteTable");

  noQuotebtn.style.color = "#880000";
  noQuotebtn.style.fontSize = "0px";
  setTimeout(() => {
    for (quote of quotes) {
      quote.style.fontSize = "0px";
    }
    setTimeout(() => {
      quoteTab.style.width = "0px";
      quoteTab.style.height = "0px";
      quoteTab.style.padding = "0px";
    }, 300);
  }, 300);
}
let count = 0;
function btnMover() {
  const btn = document.getElementById("btnMover");
  btn.style.transform = "rotate(5deg)";
  setTimeout(() => {
    btn.style.transform = "rotate(-5deg)";
    setTimeout(() => {
      btn.style.transform = "rotate(5deg)";
      setTimeout(() => {
        btn.style.transform = "rotate(-5deg)";
        setTimeout(() => {
          btn.style.transform = "rotate(0deg)";
          setTimeout(() => {
            if (count === 0) {
              btnMover();
              count++;
            } else {
              count = 0;
              return;
            }
          }, 200);
        }, 100);
      }, 100);
    }, 100);
  }, 100);
}

// ========================================
// TEXTAREA HEIGHT MODIFIER
// ========================================

const txHeight = 22;
const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  const text = tx[i].value;
  if ((tx[i].value = "")) {
    tx[i].setAttribute(
      "style",
      "height:" + txHeight + "px; overflow-y:hidden; word-break: break-all;"
    );
  } else {
    tx[i].value = text;
    tx[i].setAttribute(
      "style",
      "height:" +
        tx[i].scrollHeight +
        "px; overflow-y:hidden; word-break: break-all;"
    );
  }
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

// =============================================
// TABLEPARENT HEIGHT SETTING
// =============================================

const tableDivs = document.getElementsByClassName("tableParent");
const tableDivsArr = Array.from(tableDivs);
const childrenArr = [];
const childHeight = [];
const childMargin = [];
const totalHeight = [];

function firstChild() {
  for (let i = 0; i < tableDivsArr.length; i++) {
    childrenArr.push(tableDivsArr[i].firstElementChild);
    childHeight.push(tableDivsArr[i].firstElementChild.offsetHeight);
  }
  childStyle();
}

function childStyle() {
  for (let i = 0; i < childrenArr.length; i++) {
    let style = getComputedStyle(childrenArr[i]);
    let marginTop = parseInt(style.marginTop);
    let marginBottom = parseInt(style.marginBottom);
    let margin = marginTop + marginBottom;
    childMargin.push(margin);
  }
  childAdder();
}

function childAdder() {
  for (let i = 0; i < childHeight.length; i++) {
    let total = childHeight[i] + childMargin[i];
    totalHeight.push(total);
  }
  addHeight();
}

function addHeight() {
  for (let i = 0; i < tableDivsArr.length; i++) {
    tableDivsArr[i].setAttribute("style", `height: ${totalHeight[i]}px`);
  }
  return;
}

if (tableDivsArr.length) {
  firstChild();
}
// ==============================================
// COOKIE FIND AND ADD TO MEMBER LOGIN
// ==============================================

function cookieLoader() {
  const input = document.getElementById("LoginUser");
  const cookieMagic = document.cookie;
  if (cookieMagic) {
    const cookieArr = cookieMagic.split("=");
    input.value = cookieArr[1];
    return;
  }
}
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

