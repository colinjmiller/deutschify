'use strict';

document.addEventListener('DOMContentLoaded', function() {
  console.log("Deutschify is active!");
  var form = document.getElementById("translate");
  var switchButton = document.getElementById("switch");

  form.addEventListener('submit', translate, false);
  switchButton.addEventListener('click', switchLanguages, false);

  var specialCharButtons = document.getElementsByClassName("special-char");
  for (var i = 0; i < specialCharButtons.length; i++) {
    specialCharButtons[i].addEventListener('click', appendChar, false);
  }

  document.getElementById("word").focus();

  function translate(evt) {
    evt.preventDefault();
    setOverlays("block");
    var input = document.getElementById("word").value;
    console.log(input);
    var from = document.getElementById("from").dataset.lang;
    var to = document.getElementById("to").dataset.lang;
    var searchUrl = 'https://glosbe.com/gapi/translate?from=' + from + '&dest=' + to + '&format=json&phrase=' + encodeURIComponent(input.toLowerCase());
    var ajax = new XMLHttpRequest();
    ajax.open('GET', searchUrl);
    ajax.responseType = 'json';
    ajax.onload = function() {
      var response = ajax.response;
      if (!response || !response.tuc || response.tuc.length === 0 || !response.tuc[0].phrase) {
        finishTranslation(encodeURIComponent(input), "N/A", "block");
        return;
      }
      var firstResult = response.tuc[0].phrase.text;
      finishTranslation(encodeURIComponent(input), firstResult, "block");
    };
    ajax.onerror = function() {
      finishTranslation(encodeURIComponent(input), "Translation Service Unavailable", "block");
    };
    ajax.send();
  }

  function finishTranslation(searchTerm, translation, displayType) {
    document.getElementById("result").innerHTML = translation;
    document.getElementById("results").style.display = displayType;
    document.getElementById("others").style.display = displayType;
    document.getElementById("dict").href = 'http://www.dict.cc/?s=' + searchTerm;
    document.getElementById("beolingus").href = 'http://dict.tu-chemnitz.de/dings.cgi?lang=en&service=deen&query=' + searchTerm + '&iservice=en-de';
    setOverlays("none");
  }

  function switchLanguages() {
    var fromEle = document.getElementById("from");
    var toEle = document.getElementById("to");
    var inputEle = document.getElementById("word");

    if (fromEle.dataset.lang === "eng") {
      swap("german", inputEle, "German word to translate", "block", fromEle, toEle);
    } else {
      swap("english", inputEle, "English word to translate", "none", toEle, fromEle);
    }
  }

  function setOverlays(display) {
    var overlays = document.getElementsByClassName("overlay");
    for (var i = 0; i < overlays.length; i++) {
      overlays[i].style.display = display;
    }
  }

  function swap(bodyClass, inputEle, placeholderText, germanCharDisplay, germanEle, englishEle) {
    inputEle.placeholder = placeholderText;
    document.body.className = bodyClass;
    document.getElementById("german-characters").style.display = germanCharDisplay;
    germanEle.dataset.lang = "deu";
    germanEle.innerHTML = "German";
    englishEle.dataset.lang = "eng"
    englishEle.innerHTML = "English";
  }

  function appendChar(evt) {
    evt.preventDefault();
    var input = document.getElementById("word");
    input.value = input.value + this.dataset.char;
    input.focus();
  }
});