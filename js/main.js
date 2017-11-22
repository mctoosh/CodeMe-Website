let i = 0; //start pointer
let images = [];
let time = 2000;

//image List
images[0] = 'images/desktop-1.png';
images[1] = 'images/desktop-2.png';
images[2] = 'images/desktop-3.png';

//change image
function changeImg(){
  document.slide.src = images[i];

  if(i < images.length - 1){
    i++;
  } else {
    i = 0;
  }
  setTimeout("changeImg()", time);
}

window.onload = changeImg;
