// sketch-nubes.js - Nubes que se separan (Khan Academy → p5.js nativo)
var leftX = 136;
var rightX = 266;
var sunRadius = 100;

function setup() {
    var c = createCanvas(400, 400);
    c.parent('canvas-holder');
    noStroke();
}

function draw() {
    background(184, 236, 255);

    fill(255, 170, 0);
    ellipse(200, 100, sunRadius, sunRadius);

    // nubes
    fill(255, 255, 255);
    // nube izquierda
    ellipse(leftX, 150, 126, 97);
    ellipse(leftX + 62, 150, 70, 60);
    ellipse(leftX - 62, 150, 70, 60);

    // nube derecha
    ellipse(rightX, 100, 126, 97);
    ellipse(rightX + 62, 100, 70, 60);
    ellipse(rightX - 62, 100, 70, 60);

    leftX--;
    rightX++;
    sunRadius += 2;
}

function reiniciar() {
    leftX = 136;
    rightX = 266;
    sunRadius = 100;
    loop();
}