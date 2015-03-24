'use strict';

document.addEventListener('DOMContentLoaded', function() {
  console.log("Deutschify is active!");
  var form = document.getElementById("translate");
  form.addEventListener('submit', translate, false);

  function translate(evt) {
    evt.preventDefault();
    var input = document.getElementById("word").value;
    console.log(input);

    var searchUrl = 'https://glosbe.com/gapi/translate?from=eng&dest=deu&format=json&phrase=' + encodeURIComponent(input.toLowerCase());
    var ajax = new XMLHttpRequest();
    ajax.open('GET', searchUrl);
    // The Google image search API responds with JSON, so let Chrome parse it.
    ajax.responseType = 'json';
    ajax.onload = function() {
      // Parse and process the response from Google Image Search.
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
});