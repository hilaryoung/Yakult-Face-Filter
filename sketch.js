//UAL BSc Creative Computing
//Course: Creative Making
//Project: A program controlling video playback and basic video filters
//Hilary Young

//Project Description:
//Inspired by the aesthetic of insagram's prediction filters.
//"Predicts" the user's emotion when the user click the "click me" button it will display their predicted emotion. 
//The blue line in on the top of the page is the playback line, so the user can rewind and can choose their own visualization of emotion. 
//To save the image press the "click to save" button on the left corner. 
//when the video stop, click the "click me" button twice to rewind the video from the start. 

//video set up
let playing = true;
let food_vid;
let x;

//camera set up 
var capture;
var tracker;

//buttons
var click_me;


//images
var clouds;
var question;
var play_line;
var star1;
var star2;
var playb;
var saveb;
var happyj;

function preload() {
  
  click_me = loadImage("Smiley 2.png");
  clouds = loadImage("clouds.png");
  question = loadImage("question_takult.png");
  play_line = loadImage("play_line.png");
  star1 = loadImage("Untitled_Artwork 10.png");
  star2 = loadImage("stars1.png");
  playb= loadImage("playback.png");
  saveb= loadImage("buttons.png");
  happyj= loadImage("Untitled_Artwork 13.png");
   
}

function setup() {
  createCanvas(550, 750);
  
  //video
  food_vid = createVideo(['data/emotion_juicee.mp4']);
  food_vid.play();
  
  
  
  //tracker
  capture = createCapture({
        audio: false,
        video: {
            width: 550,
            height: 410
        }
    }, function() {
        console.log('Filter On')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(550, 410);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
  
  
}

function draw() {
  background('rgb(164,196,245)');
  
  //tracker
  image(capture, 0, 340, 550, 410);
    var positions = tracker.getCurrentPosition(0, 1000);

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        image(star1, positions[30][0]+5, positions[0][1]+350, 60, 40);
        image(star1, positions[23][0]-15, positions[0][1]+350, 60, 40);
    }

  
  //video
  food_vid.position(0,21)
  food_vid.size(550,320);
  food_vid.speed(2);

  
  //image
  fill('rgb(164,196,245)');
  rect(0,200,550,150);
  image(clouds,0,0,550,540);
  image(question,0,340,555,150);

  image(happyj,120,25,300,300);
  
  
  //video buttons
      //a) timeline
  fill(0);
    strokeWeight(5);
    line(0, 56, width, 35);
  
      //b) Play/pause button
    push();
    translate(width/2, 0);
    noStroke()
    image(click_me, -40 ,655 ,80,80);
    //triangle(0, 0, 0, 20, 20, 10);
    pop();

    // Get the ratio of play 
    // Multiply ratio of width
    x = (food_vid.time() / food_vid.duration()) * width;
  
  //timeline line
  image(play_line,0,5,width,15);
  image(playb,5,2,90,30);
  //fill(0);
  //rect(0,5,width,20);
  
   push();
    fill('rgb(226,166,200)');
    noStroke()
    ellipse(x, 13, 16, 16);
    pop();

  
  image(saveb,15,500,55,55);
  
}

function mousePressed() {
    let d1 = dist(mouseX, mouseY, width/2-40, 655); 
    if (d1 < 80) {
        if (playing == true) {
            food_vid.pause();
            playing = false;
        } else {
            food_vid.play();
            playing = true;
        }
    }
    let d2 = dist(0, mouseY, 0, 13);
    if (d2 < 10) {
        food_vid.time((mouseX / width) * food_vid.duration());
    }
  
    let d3 = dist(mouseX, mouseY, 15, 500); 
    if (d3 < 55) {
      save("emotionjuice.jpg");
    }
}


