// ===========================================
// COPY TO CLIPBOARD
// ===========================================

window.addEventListener("load", () => {
  if (btnArr.length > 1) {
    copyBtnTriage();
  } else {
    soloCopyBtn();
  }
});

const btnNodes = document.getElementsByClassName("copyBtn");
const btnArr = Array.from(btnNodes);

function copyBtnTriage() {
  const btn = document.getElementById("copyBtn");
  const btn2 = document.getElementById("copyInText");
  const btn3 = document.getElementById("copyFullRef");
  btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    copyFn();
  });
  btn2.addEventListener("click", (ev) => {
    ev.preventDefault();
    inTextFn();
  });
  btn3.addEventListener("click", (ev) => {
    ev.preventDefault();
    refFn();
  });
}

function soloCopyBtn() {
  const btn = document.getElementById("copyBtn");
  btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    copyFn();
  });
}

function copyFn() {
  const tx = document.getElementById("newQuote");
  tx.select();
  navigator.clipboard.writeText(tx.value);
  eleId = "thumb";
  copyThumb(eleId);
}

function inTextFn() {
  const surname = document.getElementById("surName").value;
  const surName = surname.charAt(0).toUpperCase() + surname.slice(1);
  const year = document.getElementById("year");
  const yearValue = year.value;
  const page = document.getElementById("page");
  const pageValue = page.value;
  const string = "(" + surName + " " + yearValue + ", p." + pageValue + ")";
  if (yearValue === "") {
    borderAlert(year);
  } else if (pageValue === "") {
    borderAlert(page);
  } else {
    eleId = "thumb2";
    clipBoard(string);
    copyThumb(eleId);
  }
}

function borderAlert(ele) {
  let input = ele;
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
  
function refFn() {
  const form = document.getElementById("qtEditForm");
  const inputs = form.getElementsByTagName("input");
  let count = 0;
  for(let i = 0; i < inputs.length; i++) {
    if(inputs[i].value === "") {
      let element = document.getElementById(inputs[i].id);
      borderAlert(element);
      count++;
     } 
     if(count === 0) {
       inputCapitalizer(inputs);
     }
}
}

function inputCapitalizer(arr) {
  let inputs = arr;
  const valArr = [];
  const regEx = /^\d/;
  for (let i = 0; i < inputs.length; i++) {
    if (!regEx.test(inputs[i].value)) {
      let str = inputs[i].value;
      let strSplit = str.split(" ");
      if (strSplit.length > 1) {
        for (let i = 0; i < strSplit.length; i++) {
          strSplit[i] =
            strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1);
        }
        valArr.push(strSplit.join(" "));
      } else {
        let newStr = str.charAt(0).toUpperCase() + str.slice(1);
        valArr.push(newStr);
      }
     } else {
      valArr.push(inputs[i].value);
    }
  }
  refConstruct(valArr);
}


function refConstruct(arr) {
  const inputs = arr;
  const str = `${inputs[0]}, ${inputs[1].charAt(0)}. (${inputs[3]}) ${
    inputs[4]
  }. ${inputs[5]}. ${inputs[6]}.`;
  eleId = "thumb3";
  clipBoard(str);
  copyThumb(eleId);
}

function clipBoard(str) {
  const newInp = document.createElement("input");
  newInp.value = str;
  newInp.select();
  navigator.clipboard.writeText(newInp.value);
}

function copyThumb(ele) {
  const icon = document.getElementById(`${ele}`);
  icon.style.fontSize = "22px";
  setTimeout(() => {
    icon.style.fontSize = "0px";
  }, 1000);
}
