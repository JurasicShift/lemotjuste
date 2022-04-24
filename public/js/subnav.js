window.addEventListener("load", initialize);

const navProfile = document.getElementById("navProfile");
const navProfile2 = document.getElementById("navProfile2");
const profileContainer = document.getElementById("profileContainer");
const textFader = document.getElementById("textFader");

let toggle = 0;

(document.body || document.documentElement).addEventListener("click", (ev) => {
  const et = ev.target;
  if (
    et.localName === "input" ||
    et.localName === "button" ||
    et.localName === "span" ||
    toggle === 0
  ) {
    return;
  } else {
    profileToggler();
  }
  if (et.id === "navProfile" && toggle === 1) {
    profileToggler();
  }
});

navProfile.addEventListener("click", () => {
  profileToggler();
});

function initialize() {
  dynamicProfile();
  profileContainer.style.display = "none";
}

function profileToggler() {
  if (toggle === 0) {
    profileContainer.classList.add("profileShow");
    profileContainer.style.display = "block";
    textToggler();
  }
  if (toggle === 1) {
    textToggler();
    setTimeout(() => {
      profileContainer.classList.remove("profileShow");
      profileContainer.classList.add("profileHide");
      setTimeout(() => {
        profileContainer.style.display = "none";
      }, 600);
    }, 250);
  }
}

function textToggler() {
  if (toggle === 0) {
    setTimeout(() => {
      textFader.classList.remove("textFadeOut");
      textFader.classList.add("textFadeIn");
      toggle++;
      return;
    }, 250);
  }
  if (toggle === 1) {
    textFader.classList.remove("textFadeIn");
    textFader.classList.add("textFadeOut");
    toggle = 0;
    return;
  }
}
// ===============================================
// PROFILE PICTURE
// ===============================================

function dynamicProfile() {
  if (navProfile.childElementCount === 0) {
    const profiles = [navProfile, navProfile2];
    profileBuilder(profiles);
  } else {
    return;
  }
}

function profileBuilder(args) {
  const icon = `<i class="fas fa-user-circle"></i>`;
  for (const arg of args) {
    arg.innerHTML = icon;
  }
}

// ==============================================
// DISABLE/ENABLE UPLOAD PROFILE PICTURE BTN
// ==============================================

const fileInput = document.getElementById("myFile");
const imgUploadBtn = document.getElementById("imgUploadBtn");
imgUploadBtn.disabled = true;

fileInput.addEventListener("change", (ev) => {
  if (ev.target.value) {
    imgUploadBtn.disabled = false;
    copyThumb();
    return;
  } else {
    return;
  }
});

function copyThumb() {
  const icon = document.getElementById("uploadThumb");
  icon.style.fontSize = "22px";
  setTimeout(() => {
    icon.style.fontSize = "0px";
  }, 1000);
}

// ========================================
// SUBMIT ACADEMIC MODE FORM IN PROFILE ZONE
// =========================================
const form = document.getElementById("modalForm");
if(form) {
  form.addEventListener("change", () => {
    form.submit();
  })
}

// ========================================
// DELETE AC MESSAGE
// ========================================
let eventCall = false;
const deleteBtn = document.getElementById("deleteAcBtn");
deleteBtn.addEventListener("click", (ev) => {
  if (eventCall) {
    eventCheck = false;
    return;
  }
  ev.preventDefault();
  eventCall = ev.target;
  deleteStyles();
});

function deleteStyles() {
  const container = document.getElementById("deleteContainer");
  const message = document.getElementById("deleteMessage");
  if (eventCall) {
    container.classList.remove("deleteContainerHide");
    container.classList.add("deleteContainerShow");
    setTimeout(() => {
      message.classList.remove("messageRemove");
      message.classList.add("messageDisplay");
      continueDelete();
    }, 200);
  } else {
    message.classList.remove("messageDisplay");
    message.classList.add("messageRemove");
    setTimeout(() => {
      container.classList.remove("deleteContainerShow");
      container.classList.add("deleteContainerHide");
      return;
    }, 700);
  }
}

function continueDelete() {
  const btnContinue = document.getElementById("btnContinue");
  btnContinue.addEventListener("click", () => {
    eventCall.click();
    deleteStyles();
  });

  const btnDismiss = document.getElementById("btnDismiss");
  btnDismiss.addEventListener("click", () => {
    eventCall = false;
    deleteStyles();
  });
}