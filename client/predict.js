let video;
let yolo;
let status;
let objects = [];

let x = 0;
let y = 0;
let w = 0;
let h = 0;

function setup() {
    var canvas = createCanvas(320, 240);
    canvas.parent('canvas');
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
        text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
        noFill();
        strokeWeight(4);
        stroke(0, 255, 0);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
        x = objects[i].x * 1920;
        y = objects[i].y * 1080;
        w = objects[i].w * 1920;
        h = objects[i].h * 1080;

        // console.log("x", x);
        // console.log("y", y);
        // console.log("w", w);
        // console.log("h", h);
    }
}

function startDetecting() {
    status.html('Model loaded!');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        //console.log(err);
        //console.log(results);
        objects = results;
        detect();
    });
}

$(document).ready(function() {
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    })

    help();

    function help() {
        console.log('vamos', x);
        console.log('objects', objects.length);
        setTimeout(function() {
            if (x && y && w && h) {
                console.log('entro');
                $(".circle").remove();
                objects.forEach(function(object, key) {
                    console.log('valor', object);
                    console.log('valor2', key);
                    $("#items").append('<div class="circle" data-item="' + key + '"></div>');
                    $('.circle[data-item=' + key + ']').append("<h2>" + object.label + "</h2>");
                    $('.circle[data-item=' + key + ']').css("padding-left", object.x * 1920);
                    $('.circle[data-item=' + key + ']').css("padding-top", object.y * 1080);
                    $('.circle[data-item=' + key + ']').css("width", (object.w - object.x) * 1920);
                    $('.circle[data-item=' + key + ']').css("height", (object.h - object.y) * 1080);
                })
            }
            help();
        }, 500);

    }
})