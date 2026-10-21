// Sol que explota - adaptado de Khan Academy a p5.js nativo
var sunSize = 30;

function setup() {
    var c = createCanvas(400, 400);
    c.parent('canvas-holder');
    noStroke();
}

function draw() {
    background(82, 222, 240);

    // El sol, un pequeño círculo en el horizonte
    fill(255, 204, 0);
    ellipse(200, 298, sunSize, sunSize);

    // La tierra, tapando la mitad del sol
    fill(76, 168, 67);
    rect(0, 300, 400, 100);

    sunSize = sunSize + 1;
}

function reiniciar() {
    sunSize = 30;
    loop();
}