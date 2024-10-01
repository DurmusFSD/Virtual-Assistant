let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) => {
  let speakInput = new SpeechSynthesisUtterance(input);
  //   speakInput.rate = 1;
  // speakInput.pitch = 1
  speakInput.volume = 1;
  speakInput.lang = "tr-TR";
  window.speechSynthesis.speak(speakInput);
};
window.onload = () => {
  //   speakFunc("Merhaba Durmuş");
  // greetingFunc();
};

const greetingFunc = () => {
  let date = new Date();
  let hour = date.getHours();
  if (hour >= 12 && hour < 16) {
    speakFunc("Günaydın efendim, size nasıl yardımcı olabilirim?");
  } else if (hour >= 0 && hour < 12) {
    speakFunc("İyi günler efendim, size nasıl yardımcı olabilirim?");
  } else {
    speakFunc("İyi akşamlar efendim, size nasıl yardımcı olabilirim?");
  }
};

const startVoiceInput = () => {
  if ("webkitSpeechRecognition" in window) {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.onresult = (e) => {
      let spokenText = e.results[0][0].transcript;
      handleCommands(spokenText.toLowerCase());
      box.classList.remove("btn-box");
      btn.innerHTML = `<i class="fa-solid fa-microphone-slash"></i>`;
    };
    recognition.start();
  } else {
    alert("Tarayıcınız ses girişini desteklemiyor!");
  }
};

btn.onclick = () => {
  box.classList.add("btn-box");
  btn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
  startVoiceInput();
};

const handleCommands = (command) => {
  console.log(command);
  if (
    command.includes("Merhaba") ||
    command.includes("Selam") ||
    command.includes("Selamun Aleyküm")
  ) {
    speakFunc("Merhaba efendim size nasıl yardımcı olabilirim");
  } else if (
    command.includes("Kimsin?") ||
    command.includes("Geliştirici") ||
    command.includes("Kim")
  ) {
    speakFunc("Ben Sanal Asistanım, Geliştiren İlahi Kodcu");
    window.open("https://www.linkedin.com/in/durmu%C5%9F-%C3%B6zg%C3%BCl/");
  } else if (command.includes("DurmusFSD") || command.includes("Github")) {
    speakFunc("Sayfaya yönlendiriliyor, Güle güle gidin");
    window.open("https://github.com/DurmusFSD?tab=repositories");
  } else if (
    command.includes("calculator") ||
    command.includes("hesap makinası") ||
    command.includes("hesap ")
  ) {
    speakFunc("Sayfaya yönlendiriliyor, Hesap Makinası");
    window.open("calculator://");
  } else if (
    command.includes("Visual Studio Code") ||
    command.includes("VSCode") ||
    command.includes("Kaynak kodu ")
  ) {
    speakFunc("Sayfaya yönlendiriliyor, Visual Studio Code");
    window.open("Visual Studio Code://");
  } else if (command.includes("ChatGPT") || command.includes("Yapay Zeka")) {
    speakFunc("Sayfaya yönlendiriliyor, Güle güle gidin");
    window.open("https://chatgpt.com/");
  } else if (command.includes("Google") || command.includes("Tarayıcı")) {
    speakFunc("Sayfaya yönlendiriliyor, Güle güle gidin");
    window.open("https://www.google.com.tr");
  } else if (command.includes("Saat") || command.includes("Zaman")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speakFunc(time);
  } else {
    speakFunc(`Bu, internette bununla ilgili bulduğum şey ${command}`);
    window.open(`https://www.google.com/search?q=${command}`);
  }
};
