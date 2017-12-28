//This code is for the Image slider
"use strict";
let myIndex = 0;
carousel();
function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    if (x[myIndex-1]){
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
    }
}

//This code is for the Google Maps API

function initMap() {
  let leicester = {lat: 52.659259, lng: -1.068952};
  let codeMe = {lat: 52.659259, lng: -1.068952};
  let address = document.getElementById("map");

  //this will show the city location of the company
  let map = new google.maps.Map(address, {
    zoom: 13,
    center: leicester
  });
  //this will show the exact location of the company
  let markerCodeMe = new google.maps.Marker({
    position: codeMe,
    map: map,
    title: 'The Company'
  });
}

//This is the Wikipedia section


(function(){
  // creates a new object called xhr
  // which will handle the API call
  let xhr = new XMLHttpRequest();
  // console.log(`Current readyState: ${xhr.readyState}`);

  let queryBox = document.getElementById("wikiQuery");
  let searchForm = document.getElementById("searchForm");
  let demoJSON = document.getElementById("demo");

  // constructs the base for the request url
  let baseURL = "https://en.wikipedia.org/w/api.php? \
                format=json& \
                action=query& \
                generator=search& \
                gsrnamespace=0& \
                gsrlimit=10& \
                prop=info|extracts|langlinks|pageimages& \
                inprop=url& \
                exintro& \
                explaintext& \
                exsentences=1& \
                exlimit=max& \
                llprop=url& \
                lllimit=max& \
                piprop=thumbnail|name& \
                origin=*& \
                gsrsearch=";

/*
API Sandbox url
https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
Request url
https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts%7Clanglinks%7Cpageimages&gsrlimit=10&gsrnamespace=0&exintro&explaintext&exsentences=1&exlimit=max&llprop=url&lllimit=max&piprop=thumbnail|name&origin=*&gsrsearch=kittens
*/

  function gatherData(data) {
    // console.log(data);
    // initialise some variables
    let theData = "";
    let langLinks = "";
    let img = "<img>";
    const languages = ["en", "de", "zh", "fr", "es", "ja", "ar", "ko", "el"];
    let k;
    let key;
    // loop through the result pages by pageid
    for(key in data.query.pages) {
      let tmp = data.query.pages[key];
      if (tmp.thumbnail) {
        img = `<img src="${tmp.thumbnail.source}" alt="${tmp.title}"> `;
      }
      let title = `<strong><a href="${tmp.fullurl}">${tmp.title}</a></strong>`;
      let extract = `<span class="txt">${tmp.extract}</span>`;
      let langLinks = "";
      for (k in tmp.langlinks) {
        if (languages.includes(tmp.langlinks[k].lang)) {
          langLinks += `<a href=${tmp.langlinks[k].url}>${tmp.langlinks[k].lang}</a> `;
        }
      }
      theData += `<li>${img} ${title} ${extract} <span class="langs">${langLinks}</span></li>`;
    }
    demoJSON.innerHTML = theData;
  }

  // the API call is triggered once the user submits a query
  if (searchForm){
    searchForm.addEventListener("submit", function(ev){
      // complete the request url
      let wiki = baseURL + queryBox.value;
      // open a connection to the requested API url
      xhr.open("GET", wiki, true);
      // be polite to Wikipedia
      xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
      // send off that request
      xhr.send();
      // if the response was ok, handle the response data using the gatherData function
      xhr.onreadystatechange = function() {
        // console.log(`Current readyState: ${xhr.readyState}`);
        if (xhr.readyState === 4 && xhr.status === 200) {
          // parse the response JSON
          let response = JSON.parse(xhr.responseText);
          // deal with the parsed JSON data
          gatherData(response);
        }
      };
      // clear the search box
      queryBox.value = "";
      ev.preventDefault();
    }, false);
  }


}());

//The color picker javascript code
let colorWell;
let defaultColor = "#0000ff";

window.addEventListener("load", startup, false);
function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}
function updateFirst(event) {
  let p = document.querySelector("p");

  if (p) {
    p.style.color = event.target.value;
  }
}function updateAll(event) {
  document.querySelectorAll("p").forEach(function(p) {
    p.style.color = event.target.value;
  });
}
