// VARIABLES
var totalPixelesAncho, totalPixelesAlto, tamañoPixel = 5;
var posSemaforo = [100,40];
var bordearDibujos = false, verRejilla = false;

const canvas = document.getElementById("lienzo");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "source-over";

// Preguntar por el tamaño del canvas
var canvasAncho = 1080, canvasAlto = 600;

// Preguntar tamaño canvas
while(false){
    canvasAncho = parseInt(prompt("Ingresa el ancho del Canvas:\n(Anchura máxima: "+window.innerWidth+")"));
    canvasAlto = parseInt(prompt("Ingresa el alto del Canvas:\n(Altura máxima: )"+window.innerHeight+")"));
    tamañoPixel = parseInt(prompt("Ingresa el tamaño del Pixel:"));
    if(canvasAncho > window.innerWidth || canvasAncho <= 0){
        alert("El Ancho sobrepasa los límites, intente de nuevo.");
    } else if(canvasAlto > window.innerHeight || canvasAlto <= 0){
        alert("El Alto sobrepasa los límites, intente de nuevo.");
    } else {
        break;
    }
}

ctx.canvas.width  = canvasAncho;
ctx.canvas.height = canvasAlto;
//canvas.style.backgroundColor = "#9DE289";
canvas.style.backgroundColor = "#1A1A1A";

totalPixelesAlto = canvasAlto/tamañoPixel;
totalPixelesAncho = canvasAncho/tamañoPixel;

const botonRojo = document.getElementById('rojo');
botonRojo.addEventListener('mousedown',function (){iluminarFoco(posSemaforo, "R");});
botonRojo.addEventListener('mouseup',function (){limpiarCanvas(); semaforoApagado(posSemaforo);});
const botonAmarillo = document.getElementById('amarillo');
botonAmarillo.addEventListener('mousedown',function (){iluminarFoco(posSemaforo, "A");});
botonAmarillo.addEventListener('mouseup',function (){limpiarCanvas(); semaforoApagado(posSemaforo);});
const botonVerde = document.getElementById('verde');
botonVerde.addEventListener('mousedown',function (){iluminarFoco(posSemaforo, "V");});
botonVerde.addEventListener('mouseup',function (){limpiarCanvas(); semaforoApagado(posSemaforo);});

function grid(){
    for(let i=0; i<totalPixelesAncho; i++){
        for(let j=0; j<totalPixelesAlto; j++){
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = "black";
            ctx.strokeRect(i*tamañoPixel, j*tamañoPixel, tamañoPixel, tamañoPixel);
        }
    }
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvasAncho,canvasAlto);
}

function pixelear(posInicial, cantidadPixeles, orientacion, color){
    ctx.fillStyle = color;
    for(let i=0; i<cantidadPixeles; i++){
        switch (orientacion) {
            case "V":
                ctx.fillRect(posInicial[0]*tamañoPixel, (posInicial[1]+i)*tamañoPixel, tamañoPixel, tamañoPixel);
                break;
            default:
                ctx.fillRect((posInicial[0]+i)*tamañoPixel, posInicial[1]*tamañoPixel, tamañoPixel, tamañoPixel);
                break;
        }
    }
}

function bordear(posDibujo, limX, limY){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.moveTo((posDibujo[0])*tamañoPixel,(posDibujo[1])*tamañoPixel);
    ctx.lineTo((posDibujo[0]+limX)*tamañoPixel+tamañoPixel,(posDibujo[1])*tamañoPixel);
    ctx.lineTo((posDibujo[0]+limX)*tamañoPixel+tamañoPixel,(posDibujo[1]+limY)*tamañoPixel+tamañoPixel);
    ctx.lineTo((posDibujo[0])*tamañoPixel,(posDibujo[1]+limY)*tamañoPixel+tamañoPixel);
    ctx.lineTo((posDibujo[0])*tamañoPixel,(posDibujo[1])*tamañoPixel);
    ctx.closePath();
    ctx.stroke();
}

function semaforoApagado(pos){
    console.log(posSemaforo);
    // Referencia: https://img.freepik.com/premium-vector/traffic-light-sign-pixel-art-style_475147-1256.jpg
    // Relleno
    pixelear([pos[0]+2, pos[1]+3], 23, "V", "#5E5E5E");
    pixelear([pos[0]+3, pos[1]+2], 25, "V", "#5E5E5E");
    pixelear([pos[0]+4, pos[1]+1], 27, "V", "#5E5E5E");
    pixelear([pos[0]+5, pos[1]+1], 27, "V", "#5E5E5E");
    pixelear([pos[0]+6, pos[1]+1], 27, "V", "#5E5E5E");
    pixelear([pos[0]+7, pos[1]+1], 27, "V", "#5E5E5E");
    pixelear([pos[0]+8, pos[1]+1], 27, "V", "#5E5E5E");
    pixelear([pos[0]+9, pos[1]+2], 25, "V", "#5E5E5E");
    pixelear([pos[0]+10, pos[1]+3], 23, "V", "#5E5E5E");

    // Bordes oscuros
    pixelear([pos[0]+4, pos[1]], 5, "H", "#222222");
    pixelear([pos[0]+2, pos[1]+1], 2, "H", "#222222");
    pixelear([pos[0]+1, pos[1]+2], 1, "H", "#222222");
    pixelear([pos[0], pos[1]+3], 23, "V", "#222222");
    pixelear([pos[0]+1, pos[1]+26], 1, "H", "#222222");
    pixelear([pos[0]+2, pos[1]+27], 2, "H", "#222222");
    pixelear([pos[0]+4, pos[1]+28], 5, "H", "#222222");
    pixelear([pos[0]+9, pos[1]+27], 2, "H", "#222222");
    pixelear([pos[0]+11, pos[1]+26], 1, "H", "#222222");
    pixelear([pos[0]+12, pos[1]+3], 23, "V", "#222222");
    pixelear([pos[0]+11, pos[1]+2], 1, "H", "#222222");
    pixelear([pos[0]+9, pos[1]+1], 2, "H", "#222222");
    // Bordes y sombras de los colores
    for(let i=0;i<17;i=i+8){
        pixelear([pos[0]+5, pos[1]+3+i], 3, "H", "#222222");
        pixelear([pos[0]+4, pos[1]+4+i], 1, "H", "#222222");
        pixelear([pos[0]+3, pos[1]+5+i], 3, "V", "#222222");
        pixelear([pos[0]+4, pos[1]+8+i], 1, "H", "#222222");
        pixelear([pos[0]+5, pos[1]+9+i], 3, "H", "#222222");
        pixelear([pos[0]+8, pos[1]+8+i], 1, "H", "#222222");
        pixelear([pos[0]+9, pos[1]+5+i], 3, "V", "#222222");
        pixelear([pos[0]+8, pos[1]+4+i], 1, "H", "#222222");

        pixelear([pos[0]+3, pos[1]+8+i], 1, "H", "#4D4D4D");
        pixelear([pos[0]+4, pos[1]+9+i], 1, "H", "#4D4D4D");
        pixelear([pos[0]+5, pos[1]+10+i], 3, "H", "#4D4D4D");
        pixelear([pos[0]+8, pos[1]+9+i], 1, "H", "#4D4D4D");
        pixelear([pos[0]+9, pos[1]+8+i], 1, "H", "#4D4D4D");
    }
    // Sombra
    pixelear([pos[0]+1, pos[1]+3], 23, "V", "#4D4D4D");
    pixelear([pos[0]+2, pos[1]+2], 1, "H", "#4D4D4D");
    pixelear([pos[0]+2, pos[1]+25], 2, "V", "#4D4D4D");
    pixelear([pos[0]+3, pos[1]+26], 1, "H", "#4D4D4D");
    pixelear([pos[0]+4, pos[1]+27], 1, "H", "#4D4D4D");

    // Brillo
    pixelear([pos[0]+3, pos[1]+2], 1, "H", "#9C9C9C");
    pixelear([pos[0]+4, pos[1]+1], 5, "H", "#9C9C9C");
    pixelear([pos[0]+9, pos[1]+2], 2, "H", "#9C9C9C");
    pixelear([pos[0]+11, pos[1]+3], 23, "V", "#9C9C9C");
    pixelear([pos[0]+10, pos[1]+26], 1, "H", "#9C9C9C");

    // Semáforos
    for(let i=0;i<17;i=i+8){
        let colorAux1, colorAux2;
        switch (i) {
            case 0:
                colorAux1 = "#8D3535";
                colorAux2 = "#AC5351";
                break;
            case 8:
                colorAux1 = "#B3AF1E";
                colorAux2 = "#C9BB34";
                break;
            case 16:
                colorAux1 = "#4D674C";
                colorAux2 = "#5B7C5A";
                break;
        }
        pixelear([pos[0]+4, pos[1]+5+i], 3, "V", colorAux1);
        pixelear([pos[0]+5, pos[1]+4+i], 5, "V", colorAux1);
        pixelear([pos[0]+6, pos[1]+5+i], 4, "V", colorAux1);
        pixelear([pos[0]+7, pos[1]+6+i], 2, "V", colorAux1);
        pixelear([pos[0]+6, pos[1]+4+i], 1, "V", colorAux2);
        pixelear([pos[0]+7, pos[1]+4+i], 2, "V", colorAux2);
        pixelear([pos[0]+8, pos[1]+5+i], 3, "V", colorAux2);
        pixelear([pos[0]+7, pos[1]+8+i], 1, "V", colorAux2);
    }

    // Bordear dibujo completo
    if(bordearDibujos){
        bordear(pos,12,28);
    }
}

function iluminarFoco(pos, color){
    let colorInterno1, colorInterno2, colorExterno1, colorExterno2, i;
    switch (color) {
        case "R":
            i = 0;
            colorInterno1 = "#FF4B4B"; colorInterno2 = "#FF768C";
            colorExterno1 = "#A51F1F"; colorExterno2 = "#F36364";
            break;
        case "A":
            i = 8;
            colorInterno1 = "#F2FA1D"; colorInterno2 = "#FDFF8E";
            colorExterno1 = "#E8B720"; colorExterno2 = "#91934E";
            break;
        case "V":
            i = 16;
            colorInterno1 = "#3ED43F"; colorInterno2 = "#82EC84";
            colorExterno1 = "#1F8F1E"; colorExterno2 = "#629166";
            break;
    }
    pixelear([pos[0]+4, pos[1]+5+i], 3, "V", colorInterno1);
    pixelear([pos[0]+5, pos[1]+4+i], 5, "V", colorInterno1);
    pixelear([pos[0]+6, pos[1]+5+i], 4, "V", colorInterno1);
    pixelear([pos[0]+7, pos[1]+6+i], 2, "V", colorInterno1);
    pixelear([pos[0]+6, pos[1]+4+i], 1, "V", colorInterno2);
    pixelear([pos[0]+7, pos[1]+4+i], 2, "V", colorInterno2);
    pixelear([pos[0]+8, pos[1]+5+i], 3, "V", colorInterno2);
    pixelear([pos[0]+7, pos[1]+8+i], 1, "V", colorInterno2);

    pixelear([pos[0]+5, pos[1]+3+i], 3, "H", colorExterno1);
    pixelear([pos[0]+4, pos[1]+4+i], 1, "H", colorExterno1);
    pixelear([pos[0]+3, pos[1]+5+i], 3, "V", colorExterno1);
    pixelear([pos[0]+4, pos[1]+8+i], 1, "H", colorExterno1);
    pixelear([pos[0]+5, pos[1]+9+i], 3, "H", colorExterno1);
    pixelear([pos[0]+8, pos[1]+8+i], 1, "H", colorExterno1);
    pixelear([pos[0]+9, pos[1]+5+i], 3, "V", colorExterno1);
    pixelear([pos[0]+8, pos[1]+4+i], 1, "H", colorExterno1);
    pixelear([pos[0]+3, pos[1]+8+i], 1, "H", colorExterno2);
    pixelear([pos[0]+4, pos[1]+9+i], 1, "H", colorExterno2);
    pixelear([pos[0]+5, pos[1]+10+i], 3, "H", colorExterno2);
    pixelear([pos[0]+8, pos[1]+9+i], 1, "H", colorExterno2);
    pixelear([pos[0]+9, pos[1]+8+i], 1, "H", colorExterno2);
    pixelear([pos[0]+10, pos[1]+5+i], 3, "V", colorExterno2);
    pixelear([pos[0]+9, pos[1]+4+i], 1, "H", colorExterno2);
    pixelear([pos[0]+8, pos[1]+3+i], 1, "H", colorExterno2);
    pixelear([pos[0]+5, pos[1]+2+i], 3, "H", colorExterno2);
    pixelear([pos[0]+4, pos[1]+3+i], 1, "H", colorExterno2);
    pixelear([pos[0]+3, pos[1]+4+i], 1, "H", colorExterno2);
    pixelear([pos[0]+2, pos[1]+5+i], 3, "V", colorExterno2);
}

semaforoApagado(posSemaforo);


if(verRejilla){
    grid();
}
