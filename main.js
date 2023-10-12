var MC="";
var T="F";
var RY= "";
var RX= "";
var LY= "";
var NX="";
var S="";
var LYN="";
var MP="2";
var V="";
var NV="";
function preload(){
    MC= loadSound("music.mp3");
    MC2= loadSound("music2.mp3");
    T="T"; 
}
function setup(){
    C=createCanvas(400, 300);
    C.center();
    VC= createCapture(VIDEO);
    VC.hide();
    M= ml5.poseNet(VC, ML);
    M.on("pose", GR);
}
function draw(){
    image(VC, 0, 0, 400, 300);
}
//function MP(){
//    if (T=="T") {
//        T="F";
//        MC.play();
    //    MP=1;
//        MC.setVolume(1);
//        MC.rate(1);
//        document.getElementById("P").innerHTML= "Stop";
//    }else{
//        MC.stop();
//      T="T";
//        document.getElementById("P").innerHTML= "Play";
//    }
//}
function GR(R){
if (R.length!==0) {
        console.log(R);
        if(R[0].pose.keypoints[10].score>0.2){
            RY=R[0].pose.rightWrist.y;
            RX=R[0].pose.rightWrist.x;
        }
        if(R[0].pose.keypoints[9].score>0.2){
            LY=R[0].pose.leftWrist.y;
            LYN= LY-100;
            if(LYN<100){
                MC.rate(0.5);
                MC2.rate(0.5);
                document.getElementById("S").innerHTML="Speed: 0.5x";
            }if(LYN>100 && LYN<200){
                MC.rate(1);
                MC2.rate(1);
                document.getElementById("S").innerHTML="Speed: 1x";
            }if(LYN>200 && LYN<300){
                MC.rate(1.5);
                MC2.rate(1.5);
                document.getElementById("S").innerHTML="Speed: 1.5x";
            }if(LYN>300 && LYN<400){
                MC.rate(2);
                MC2.rate(2);
                document.getElementById("S").innerHTML="Speed: 2x";
            }
        }
        V= Number(RY)-150;
        NV= V/350;
        MC.setVolume(NV);
        MC2.setVolume(NV);
        document.getElementById("V").innerHTML="Volume: "+floor(NV*100);

        if(R[0].pose.keypoints[0].score>0.2){
            NX=R[0].pose.nose.x;
            if(NX>350){
                if(MP==2){
                    MC2.stop();
                     MC.play();
                     MP=1;
                    }
                 }else{
                    if(MP==1){
                        MC.stop();
                         MC2.play();
                         MP=2;
                        }
                 }
                }
        }
        console.log(RY,LY, NX);
}
function ML(){
    console.log("d");
}