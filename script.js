const cards =
document.querySelectorAll(".card");

const continueBtn =
document.getElementById("continueBtn");

const submitBtn =
document.getElementById("submitBtn");

const voiceBtn =
document.getElementById("voiceBtn");

const backBtn =
document.getElementById("backBtn");

const resetBtn =
document.getElementById("resetBtn");

const screen1 =
document.getElementById("screen1");

const screen2 =
document.getElementById("screen2");

const screen3 =
document.getElementById("screen3");

const progressBar =
document.getElementById("progressBar");

const issueText =
document.getElementById("issueText");

const refId =
document.getElementById("refId");

const submissionTime =
document.getElementById("submissionTime");

const issueCategory =
document.getElementById("issueCategory");

const langSelect =
document.getElementById("langSelect");

const imageUpload =
document.getElementById("imageUpload");

const previewContainer =
document.getElementById("previewContainer");

let selectedCategory = "";

let submittedCategory = "";





// CATEGORY SELECT
cards.forEach(card => {

  card.addEventListener("click", () => {

    cards.forEach(c =>
      c.classList.remove("selected")
    );

    card.classList.add("selected");

    selectedCategory =
    card.querySelectorAll("span")[1]
    .innerText;

  });

});





// CONTINUE BUTTON
continueBtn.addEventListener("click", () => {

  if(selectedCategory === ""){

    alert("Please select category");

    return;
  }

  screen1.classList.remove("active");

  screen2.classList.add("active");

  progressBar.style.width = "66%";

  // GO BACK BUTTON
backBtn.addEventListener(
  "click",
  () => {

    screen2.classList.remove(
      "active"
    );

    screen1.classList.add(
      "active"
    );

    progressBar.style.width =
    "33%";
  }
);

// RESET BUTTON
resetBtn.addEventListener(
  "click",
  () => {

    issueText.value = "";

    previewContainer.innerHTML =
    "";

    const uploadText =
    document.getElementById(
      "uploadText"
    );

    uploadText.innerText =
    translations[
      langSelect.value
    ].upload;

    uploadText.style.color =
    "#333";
  }
);
});



// MULTIPLE IMAGE PREVIEW
imageUpload.addEventListener(
  "change",
  (e) => {

    const files = e.target.files;

    for(let i=0; i<files.length; i++){

      const file = files[i];

      // WRAPPER
      const wrapper =
      document.createElement("div");

      wrapper.className =
      "image-wrapper";

      // IMAGE
      const img =
      document.createElement("img");

      img.src =
      URL.createObjectURL(file);

      // DELETE BUTTON
      const deleteBtn =
      document.createElement("button");

      deleteBtn.innerHTML =
      "🗑";

      deleteBtn.className =
      "delete-image-btn";

      // DELETE SINGLE IMAGE
      deleteBtn.onclick = () => {

  wrapper.remove();

  if(
    previewContainer.children.length === 0
  ){

    const uploadText =
    document.getElementById(
      "uploadText"
    );

    uploadText.innerText =
    translations[
      langSelect.value
    ].upload;

    uploadText.style.color =
    "#333";
  }

};

      wrapper.appendChild(img);

      wrapper.appendChild(deleteBtn);

      previewContainer.appendChild(
        wrapper
      );
    }

    const uploadText =
    document.getElementById(
      "uploadText"
    );

    const currentLang =
langSelect.value;

if(currentLang === "hi"){

  uploadText.innerText =
  "चित्र अपलोड हुआ! और जोड़ने के लिए क्लिक करें";
}

else if(currentLang === "mr"){

  uploadText.innerText =
  "प्रतिमा अपलोड झाली! आणखी जोडण्यासाठी क्लिक करा";
}

else{

  uploadText.innerText =
  "Image uploaded! Click to add more";
}

// TEMPORARY GREEN SUCCESS
const uploadBox =
document.querySelector(
  ".upload-box"
);

uploadBox.style.background =
"rgba(19,136,8,0.12)";

setTimeout(() => {

  uploadBox.style.background =
  "rgba(255,255,255,0.82)";

}, 1500);


  }
);





// VOICE INPUT
voiceBtn.addEventListener("click", () => {

  const recognition =
  new(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
  )();

  const currentLang =
  langSelect.value;

  if(currentLang === "hi"){

    recognition.lang = "hi-IN";
  }

  else if(currentLang === "mr"){

    recognition.lang = "mr-IN";
  }

  else{

    recognition.lang = "en-IN";
  }

  recognition.start();

  recognition.onresult = (event) => {

    issueText.value =
    event.results[0][0].transcript;

  };

});



// SUBMIT REPORT
submitBtn.addEventListener("click", () => {

  const randomId =
  Math.floor(Math.random()*90000);


  submittedCategory = selectedCategory;


  // SAVE OFFLINE
  const reportData = {

    category:selectedCategory,

    issue:issueText.value,

    id:randomId
  };

  let reports =
  JSON.parse(
    localStorage.getItem(
      "queuedReports"
    )
  ) || [];

  reports.push(reportData);

  localStorage.setItem(
    "queuedReports",
    JSON.stringify(reports)
  );


  progressBar.style.width =
  "100%";

  screen2.classList.remove(
    "active"
  );

  screen3.classList.add(
    "active"
  );


  refId.innerText =
  `Reference ID: NV-${randomId}`;


  updateSubmissionLanguage();

});





// TRANSLATIONS
const translations = {

  en: {

    heading:"Civic Issue Reporting",

    subtitle:"Your city, heard better.",

    other:"Other Issue",

    continue:"Continue",

    details:"Describe the Issue",

    upload:"Upload Image",

    voice:"Voice Input",

    back:"Go Back",

    reset:"Reset",

    submit:"Submit Report",

    success:"Report Submitted Successfully!",

    drafted:"Drafted",

    draftedDesc:"Issue details captured",

    queued:"Queued",

    queuedDesc:"Stored safely on device",

    synced:"Synced",

    syncedDesc:"Sent to civic system",

    resolved:"Resolved",

    resolvedDesc:"Awaiting authority action",

    finalMsg:
    "Your report has been securely submitted to the civic support system.",

    submitAnother:
    "Submit Another",

    card1:"Pothole",

    card2:"Garbage",

    card3:"Water Leakage",

    card4:"Streetlight"
  },





  hi: {

    heading:"नागरिक समस्याओं की शिकायत",

    subtitle:"आपके शहर की आवाज़ बेहतर तरीके से।",

    other:"अन्य समस्या",

    continue:"आगे बढ़ें",

    details:"समस्या का वर्णन करें",

    upload:"चित्र अपलोड करें",

    voice:"आवाज़ से लिखें",

    back:"वापस जाएं",

    reset:"फिर से शुरू करें",

    submit:"शिकायत दर्ज करें",

    success:"शिकायत सफलतापूर्वक दर्ज हुई!",

    drafted:"तैयार",

    draftedDesc:"समस्या विवरण दर्ज किया गया",

    queued:"कतार में",

    queuedDesc:"डिवाइस में सुरक्षित रूप से सहेजा गया",

    synced:"सिस्टम से जुड़ा",

    syncedDesc:"शिकायत प्रणाली को भेजा गया",

    resolved:"समाधान लंबित",

    resolvedDesc:"प्राधिकरण की प्रतीक्षा",

    finalMsg:
    "आपकी शिकायत सुरक्षित रूप से दर्ज कर ली गई है।",

    submitAnother:
    "एक और शिकायत दर्ज करें",

    card1:"गड्ढा",

    card2:"कचरा",

    card3:"पानी रिसाव",

    card4:"स्ट्रीटलाइट"
  },





  mr: {

    heading:"नागरिक समस्या नोंदणी",

    subtitle:"तुमच्या शहराचा आवाज अधिक चांगल्या प्रकारे.",

    other:"इतर समस्या",

    continue:"पुढे जा",

    back:"मागे जा",

    reset:"पुन्हा सुरू करा",

    details:"समस्येचे वर्णन करा",

    upload:"प्रतिमा अपलोड करा",

    voice:"आवाजाद्वारे लिहा",

    submit:"तक्रार नोंदवा",

    success:"तक्रार यशस्वीरित्या नोंदवली!",

    drafted:"तयार",

    draftedDesc:"समस्या तपशील नोंदवला",

    queued:"रांगेत",

    queuedDesc:"डिव्हाइसवर सुरक्षित जतन",

    synced:"प्रणालीशी जोडले",

    syncedDesc:"तक्रार प्रणालीकडे पाठवले",

    resolved:"निराकरण प्रलंबित",

    resolvedDesc:"प्राधिकरणाच्या प्रतीक्षेत",

    finalMsg:
    "तुमची तक्रार सुरक्षितपणे नोंदवली गेली आहे.",

    submitAnother:
    "पुन्हा तक्रार नोंदवा",

    card1:"खड्डा",

    card2:"कचरा",

    card3:"पाण्याची गळती",

    card4:"रस्त्यावरील दिवा"
  }

};





// SUCCESS PAGE LANGUAGE
function updateSubmissionLanguage(){

  const currentLang =
  langSelect.value;



  // CATEGORY TRANSLATION
  let translatedCategory =
  submittedCategory;

  if(submittedCategory === "Pothole"){

    translatedCategory =
    translations[currentLang].card1;
  }

  else if(submittedCategory === "Garbage"){

    translatedCategory =
    translations[currentLang].card2;
  }

  else if(
    submittedCategory ===
    "Water Leakage"
  ){

    translatedCategory =
    translations[currentLang].card3;
  }

  else if(
    submittedCategory ===
    "Streetlight"
  ){

    translatedCategory =
    translations[currentLang].card4;
  }
  else if(
    submittedCategory ===
    "Other Issue"
  ){

    translatedCategory =
    translations[currentLang].other;
  }



  // DATE + TIME
  let formattedTime = "";

  if(currentLang === "hi"){

    formattedTime =
    new Date().toLocaleString(
      "hi-IN",
      {
        dateStyle:"full",
        timeStyle:"short"
      }
    );

    submissionTime.innerText =
    `जमा किया गया: ${formattedTime}`;

    issueCategory.innerText =
    `श्रेणी: ${translatedCategory}`;
  }

  else if(currentLang === "mr"){

    formattedTime =
    new Date().toLocaleString(
      "mr-IN",
      {
        dateStyle:"full",
        timeStyle:"short"
      }
    );

    submissionTime.innerText =
    `सबमिट केले: ${formattedTime}`;

    issueCategory.innerText =
    `वर्ग: ${translatedCategory}`;
  }

  else{

    formattedTime =
    new Date().toLocaleString(
      "en-US",
      {
        dateStyle:"full",
        timeStyle:"short"
      }
    );

    submissionTime.innerText =
    `Submitted on: ${formattedTime}`;

    issueCategory.innerText =
    `Category: ${translatedCategory}`;
  }

}


// LANGUAGE SWITCH
langSelect.addEventListener("change", () => {

  const lang =
  langSelect.value;


  // SCREEN 1
  document.getElementById(
    "mainHeading"
  ).innerText =
  translations[lang].heading;

  document.getElementById(
    "subtitle"
  ).innerText =
  translations[lang].subtitle;

  continueBtn.innerText =
  translations[lang].continue;





  // CATEGORY TEXT
  document.getElementById(
    "card1Text"
  ).innerText =
  translations[lang].card1;

  document.getElementById(
    "card2Text"
  ).innerText =
  translations[lang].card2;

  document.getElementById(
    "card3Text"
  ).innerText =
  translations[lang].card3;

  document.getElementById(
    "card4Text"
  ).innerText =
  translations[lang].card4;

  document.getElementById(
  "otherText"
  ).innerText =
  translations[lang].other;

  document.getElementById(
  "backText"
  ).innerText =
  translations[lang].back;

  document.getElementById(
  "resetText"
  ).innerText =
  translations[lang].reset;



  // SCREEN 2
  document.getElementById(
    "detailsTitle"
  ).innerText =
  translations[lang].details;

  document.getElementById(
    "uploadText"
  ).innerText =
  translations[lang].upload;

  document.getElementById(
  "voiceText"
).innerHTML =

`<i class="fa-solid fa-microphone"></i>
 ${translations[lang].voice}`;

  submitBtn.innerText =
  translations[lang].submit;

  issueText.placeholder =
  translations[lang].details;





  // SCREEN 3
  document.getElementById(
    "successTitle"
  ).innerText =
  translations[lang].success;

  document.getElementById(
    "draftedTitle"
  ).innerText =
  translations[lang].drafted;

  document.getElementById(
    "draftedDesc"
  ).innerText =
  translations[lang].draftedDesc;

  document.getElementById(
    "queuedTitle"
  ).innerText =
  translations[lang].queued;

  document.getElementById(
    "queuedDesc"
  ).innerText =
  translations[lang].queuedDesc;

  document.getElementById(
    "syncedTitle"
  ).innerText =
  translations[lang].synced;

  document.getElementById(
    "syncedDesc"
  ).innerText =
  translations[lang].syncedDesc;

  document.getElementById(
    "resolvedTitle"
  ).innerText =
  translations[lang].resolved;

  document.getElementById(
    "resolvedDesc"
  ).innerText =
  translations[lang].resolvedDesc;

  document.getElementById(
    "successMessage"
  ).innerText =
  translations[lang].finalMsg;

  document.getElementById(
    "submitAnotherBtn"
  ).innerText =
  translations[lang].submitAnother;





  // UPDATE SUCCESS PAGE
  updateSubmissionLanguage();

});





// SERVICE WORKER
if("serviceWorker" in navigator){

  navigator.serviceWorker
  .register("service-worker.js");

}



if("serviceWorker" in navigator){

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker.register(
        "service-worker.js"
      );

    }
  );
}