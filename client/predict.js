let video;
let yolo;
let status;
let objects = [];

function setup() {
    createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(320, 240);

    // Create a YOLO method
    yolo = ml5.YOLO(video, startDetecting);

    // Hide the original video
    video.hide();
    status = select('#status');
}

function draw() {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
        noStroke();
        fill(0, 255, 0);
        text(objects[i].label, objects[i].x * width, objects[i].y * height + 5);
        noFill();
        strokeWeight(20);
        stroke(4, 166, 20);

        var positionX = (objects[i].x * width + (objects[i].w * width) / 2 );
        var positionY = (objects[i].y * height + (objects[i].h * height) / 2 );

        var donutWidth = (objects[i].w * width);
        var donutHeight = (objects[i].w * height);

        //rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
        ellipse(positionX, positionY, donutWidth, donutHeight);
    }
}

function startDetecting() {
    status.html('Model loaded!');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        console.log(err);
        console.log(results);
        objects = results;
        detect();
    });
}