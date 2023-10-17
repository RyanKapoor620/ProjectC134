song="";
status="";
object=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelloaded(){
    console.log("Model is loaded");
    status=true;
    
}
function gotresults(error,results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function preload(){
    song=loadSound("alarm_r.mp3");
}
function draw(){
    image(video,0,0,380,380);
    
    if(status=="true"){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video,gotresults);
        for(i=0;i<object.length;i++){
           
            document.getElementById("status").innerHTML="Status:Object Detected";
            
            fill(r,g,b);
            percent=floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label == "person"){
                document.getElementById("DetectBaby").innerHTML="Baby is detected";
                song.stop();
            }
            else{
                document.getElementById("DetectBaby").innerHTML="Baby Is Not Found";
                song.play();
            }
        }
    }
}