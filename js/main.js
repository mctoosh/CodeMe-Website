//This code is for the Image slider
let myIndex = 0;
carousel();
"use strict";
function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

//This code is for the Google Maps API
"use strict";
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
