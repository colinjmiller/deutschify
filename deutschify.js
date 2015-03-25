'use strict';

document.addEventListener('DOMContentLoaded', function() {
  console.log("Deutschify is active!");
  var form = document.getElementById("translate");
  var switchButton = document.getElementById("switch");

  form.addEventListener('submit', translate, false);
  switchButton.addEventListener('click', switchLanguages, false);

  function translate(evt) {
    evt.preventDefault();
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
      if (!response || !response.tuc || response.tuc.length === 0) {
        console.log('No response from search!');
        return;
      }
      var firstResult = response.tuc[0].phrase.text;
      document.getElementById("result").innerHTML = firstResult;
      document.getElementById("results").style.display = "block";
    };
    ajax.onerror = function() {
      console.log('Network error.');
    };
    ajax.send();
  }

  function switchLanguages() {
    var fromEle = document.getElementById("from");
    var toEle = document.getElementById("to");

    if (fromEle.dataset.lang === "eng") {
      fromEle.dataset.lang = "deu";
      fromEle.innerHTML = "German";
      toEle.dataset.lang = "eng"
      toEle.innerHTML = "English";
    } else {
      toEle.dataset.lang = "deu";
      toEle.innerHTML = "German";
      fromEle.dataset.lang = "eng"
      fromEle.innerHTML = "English";
    }
  }
});