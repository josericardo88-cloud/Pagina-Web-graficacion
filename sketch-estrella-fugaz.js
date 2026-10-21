// sketch-estrella-fugaz.js - Estrella fugaz (Khan Academy → p5.js nativo)
var xPos = -40;
var yPos = 40;

var xPos2 = -40;
var yPos2 = 40;

function setup() {
    var c = createCanvas(400, 400);
    c.parent('canvas-holder');
    noStroke();
}

function draw() {
    background(10, 15, 45);
    fill(255, 255, 255);
    ellipse(70, 90, 3, 3);
    ellipse(150, 40, 2, 2);
    ellipse(280, 80, 4, 4);
    ellipse(350, 150, 3, 3);
    ellipse(90, 250, 4, 4);

    // Estrella fugaz
    fill(255, 100, 0, 100);
    ellipse(xPos - 30, yPos - 15, 12, 12);
    fill(255, 100, 0);
    ellipse(xPos - 18, yPos - 9, 14, 14);
    fill(255, 220, 50);
    ellipse(xPos - 8, yPos - 4, 16, 16);

    fill(255, 255, 255);
    ellipse(xPos, yPos, 16, 16);

    // Movimiento
    xPos += 3;
    yPos += 2;

    if (xPos > 420) {
        xPos = -20;
        yPos = 50;
    }

    // Segunda estrella (azul)
    fill(100, 200, 255);
    ellipse(xPos2, yPos2, 10, 10);

    xPos2 -= 3;
    yPos2 += 3;

    if (xPos2 < -20) {
        xPos2 = 440;
        yPos2 = 20;
    }
}

function reiniciar() {
    xPos = -40; yPos = 40;
    xPos2 = -40; yPos2 = 40;
    loop();
}