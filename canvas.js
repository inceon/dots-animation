let canvas = document.createElement('canvas');
canvas.classList.add('tempcanvas');
document.body.appendChild(canvas);


let size = 128;
canvas.width = size;
canvas.height = size;
let ctx = canvas.getContext('2d');

let fs = 100;
ctx.font = fs + "px \"Trebuchet MS\", Helvetica, sans-serif";
ctx.textAlign = "center";
ctx.fillText("...",size/2,size/2 + fs/3);

function fillUp(array,max){
  var length = array.length;
  for(i=0;i<max-length;i++){
    array.push(array[Math.floor(Math.random()*length)])
  }
  return array;
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function parseData(imgData) {
  let imageCoords = [];
  for(let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      let red = imgData.data[((size * y) + x) * 4];
      let green = imgData.data[((size * y) + x) * 4 + 1];
      let blue = imgData.data[((size * y) + x) * 4 + 2];
      let alpha = imgData.data[((size * y) + x) * 4 + 3];
      if(alpha>0){
        imageCoords.push({
          x : 10*(x - size/2),
          y : 10*(size/2 - y)
        });
      }
    }
  }
  return imageCoords;
}

let imgData = ctx.getImageData(0, 0, size, size);
let imgCoords = fillUp(parseData(imgData, size), 2500);


let string = "Google";
let cnt = 0;


let intervalTime = 1800;
setInterval(() => {
  ctx.clearRect(0, 0, size, size);
  
  ctx.fillText(string[cnt],size/2,size/2 + fs/3);
  imgData = ctx.getImageData(0, 0, size, size);
  imgCoords = shuffle(fillUp(parseData(imgData, size), 2500));
  updatePoints(imgCoords);

  cnt = (cnt + 1) % string.length;
}, intervalTime);

