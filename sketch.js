let boulettesI = [3];
let bitsI = [13];
let eBitsI = [6];
let eBitsI2 = [8];
let boulettes = [];
let bits = [];
let playerX;
let playerY=270;
let playerSpeed;
let spaceTime;
let stGoal;
let gc; //game counter
let power;
let bossX;
let bxGoal;
let ciel;
let scroll;
let bossHealth;
let bossShoot;
let bossHurt;
let dedFlag;
let bossFaceI=[6];
let bossFrameI=[2];
let titreI;
let pageTitreI=[7];
let ac; //animation counter
let border;
let tc; //transition counter
let transY=[40];
let transFlag;
let tex; //text counter
let bossAccel;
let battleMusic;
let battleMusicPlus;
let endMusic;
let introMusic
let shootS;
let boumS;
let bigBoumS;
let textS;
let rechargeS;
let staticShipI = [6];
let energyShipI = [6];
let zedsDeadBaby;
let ec; //end counter

let score;
let newGamePlus;

function preload(){
  for(let i=0;i<3;i++){
    boulettesI[i] = loadImage('boulettes/boulette'+i+'.png');} 
  for(let i=0;i<13;i++){
    bitsI[i] = loadImage('debris/debris'+i+'.png');
  }
  for(let i=0;i<3;i++){
    eBitsI[i]=loadImage('eBits/debris0e'+i+'.png');
  }
  for(let i=0;i<3;i++){
    eBitsI[i+3]=loadImage('eBits/debris1e'+i+'.png');
  }
  for(let i=0;i<8;i++){
    eBitsI2[i]=loadImage('enerBits/00'+i+'.png');
  }
  for(let i=0;i<6;i++){
    bossFaceI[i]=loadImage('boss/face'+i+'.png');
  }
  for(let i=0;i<2;i++){
    bossFrameI[i]=loadImage('boss/bord'+i+'.png');
  }
  for(let i=0;i<7;i++){
    pageTitreI[i]=loadImage('title/000'+(i+1)+'.png');
  }
  for(let i=0;i<6;i++){
    staticShipI[i]=loadImage('ship/static/00'+i+'.png');
  }
  for(let i=0;i<6;i++){
    energyShipI[i]=loadImage('ship/energy/00'+i+'.png');
  }
  titreI = loadImage('title/titre.png');
  ciel=loadImage('cielLoop.jpg');
  border=loadImage('border.png');
  
  soundFormats('wav','mp3');
  battleMusic = loadSound('music/finalBase.mp3');
  battleMusicPlus = loadSound('music/finalAdd.mp3');
  introMusic = loadSound('music/intro.mp3');
  endMusic = loadSound('music/end.mp3');
  shootS = loadSound('fx/shoot.wav');
  boumS = loadSound('fx/boum.wav');
  bigBoumS = loadSound('fx/bigBoum.wav');
  textS = loadSound('fx/text.wav');
  rechargeS = loadSound('fx/recharge.wav');
}

function setup() {
  createCanvas(1200, 600);
  frameRate(60);
  soundSetup();
  gameState = 0;
  noStroke();
  imageMode(CENTER);
  rectMode(CENTER);
  ac = 0;
  tc = 0;
  transFlag = 0;
  tex = 0;
  newGamePlus = false;
  for (let i=0;i<40;i++){
    transY[i]=int(random(-600,-300));
  }
}

function soundSetup(){
  battleMusic.setVolume(0.6);
  battleMusic.playMode('restart');
  battleMusicPlus.setVolume(0);
  battleMusicPlus.playMode('restart');
  introMusic.setVolume(0.6);
  introMusic.playMode('restart');
  endMusic.setVolume(0.6);
  endMusic.playMode('restart');
  boumS.setVolume(0.6);
  boumS.playMode('restart');
  bigBoumS.setVolume(0.6);
  bigBoumS.playMode('restart');
  shootS.setVolume(0.6);
  shootS.playMode('restart');
  textS.setVolume(0.6);
  textS.playMode('restart');
  rechargeS.setVolume(0.6);
  rechargeS.playMode('restart');
}

function gameSetup(){
  playerX = 0;
  playerSpeed = 0;
  spaceTime = 1;
  stGoal = 1;
  gc = 0;
  power = 3;
  bossX = 0;
  bxGoal = 0;
  scroll = 0;
  bossHealth = 4;
  bossAccel = 0;
  dedFlag = false;
  zedsDeadBaby = false;
  ec=0;
  score=0;
  for(let bit of bits){
    bits.shift();
  }
}

function draw() {
translate(width/2,height/2);
  if (gameState==0){
    pageTitre();
  }else if (gameState==1){
    cinematicIntro();
  }else if (gameState==2){
    jeu();
  }
translate(-width/2,-height/2);
}

function pageTitre(){
  ac+=0.1;
  if(introMusic.isPlaying() === false){
    introMusic.loop();
  }
  background(0)
  image(pageTitreI[int(ac%7)], 0,0,900,450);
  image(titreI,0,-150,900,150);
  if (mouseIsPressed || keyIsPressed){
    transFlag=1;
  }
  if (transFlag==1){
    transitionIntro();
  }
}

function cinematicIntro(){
  noCursor();
  ac++;
  background(0);
  if(ac==1){
    textS.play();
  }
  if(ac>30){
    fill(0,255,0);
    textSize(20);
    textStyle(BOLD);
    textFont('Courier');
    textAlign(CENTER);
    let words;
    switch(tex){
      case 0 : words = 'The quasiluminic gate is closed for safety reasons :';
      break;
      case 1 : words = 'Going through the gate would require navigating';
      break;
      case 2 : words = 'Standard plasma weaponery, which can be';
      break;
      case 3 : words = 'It goes without saying that the gate\'s space-time system';
      break;
      case 4 : words = 'I repeat :';
      break;
      case 5 : words = 'Congratulation !';
      break;
      case 6 : words = ' ';
      break;
      case 7 : words = ' ';
      break;
      case 8 : words = 'Shot on aglomerate : 100';
      break;
      case 9 : words = ' ';
      break;
    }
    text(words,0,-200);
  }
  if(ac>60){
    let words;
    switch(tex){
      case 0 : words = 'a electromecanical sentient aglomerate has';
      break;
      case 1 : words = 'with the arrow keys or J and L';
      break;
      case 2 : words = 'triggered with the ctrl or S key, would be useless';
      break;
      case 3 : words = 'being controlled by the runaway aglomerate makes';
      break;
      case 4 : words = 'This route is extremely unsafe, turn around.';
      break;
      case 5 : words = '...';
      break;
      case 6 : words = 'Thank you for playing.';
      break;
      case 7 : words = 'Still wanna play ?';
      break;
      case 8 : words = 'Shot on ship fragment : 100';
      break;
      case 9 : words = 'Score : '+score;
      break;
    }
    text(words, 0,-150);
  }
  if(ac>90){
    let words;
    switch(tex){
      case 0 : words = 'hacked its way into the control system of the gate.';
      break;
      case 1 : words = 'in a cloud of ship fragments.';
      break;
      case 2 : words = 'since the ship\'s energy would be depleted in a few shots';
      break;
      case 3 : words = 'the interior of the gate very confusing for humans.';
      break
      case 4 : words = 'DO NOT try to cross the gate.';
      break;
      case 5 : words = 'You broke at least 17 space travel regulations';
      break;
      case 6 : words = ' ';
      break;
      case 7 : words = ' ';
      break;
      case 8 : words = 'Shot on energized fragment : 1000';
      break;
      case 9 : words = ' ';
      break;
    }
    text(words, 0,-100);
  }    
  if(ac>120){
    let words;
    switch(tex){
      case 0 : words = 'Any trip through it is impossible.';
      break;
      case 1 : words = ' '
      break;
      case 2 : words = 'and the probability of finding energy-dense fragments is very low.';
      break;
      case 3 : words = ' ';
      break;
      case 4 : words = 'DO NOT try to destroy the aglomerate.';
      break;
      case 5 : words = 'and you destroyed a rare study subject.';
      break;
      case 6: words = ' ';
      break;
      case 7 : words = ' ';
      break;
      case 8 : words = 'Missed shot : -150';
      break;
      case 9 : words = ' ';
      break;
    }
    text(words, 0,-50);
  }
  if(ac>150){
    textSize(16);
    text('press a key...',0,50);
    if (keyIsPressed){
      textS.play();
      if(tex==4){
        tc=0;
        transFlag=2;
        gameSetup();
      }
      if(tex==8){
        tc=0;
        transFlag=2;
        newGamePlus=true;
        gameSetup();
      }
      if(tex==9){
        tc=0;
        transFlag=2;
        newGamePlus=true;
        gameSetup();
        tex=8;
      }
      tex++;
      ac=0
    }
    ac--;
  }
  transitionIntro();
  if(transFlag==2){
    transitionBattle();
  }
}

function jeu(){ 
  if(battleMusic.isPlaying === false){
    battleMusic.play();
  }
  gc += 1;
  defineSpaceTime();
  drawBackground();
  animateBits(); 
  animateBoss();
  animatePlayer();
  
  if(gc>600){
    if(random(60)<1){newBit("fond");}
  }else if(gc>300){
    if(random(120)<1){newBit("fond");}
  }
  
  animerBoulette();
  bouletteBitCollision();
  playerBitCollision();
  bouletteBossCollision();
  bossPlayerCollision();
  
  if(newGamePlus===true){
  fill(255);
  textAlign(RIGHT);
  text(score,XtoX(280),YtoY(-280));
  }
  
  cleanBorders();
  if (transFlag==1){
    transitionIntro();
  }
  if (transFlag==2){
    transitionBattle();
  }
  if(zedsDeadBaby){
    ec++;
    if(ec>155){
      battleMusic.stop();
      battleMusicPlus.stop();
      textS.play();
      endMusic.play();
      zedsDeadBaby=false;
      transFlag = 1;
    }
  }
}

//================================================
    
function playerBitCollision(){
  for (let bit of bits){
    if(distance(playerX,playerY,bit.x,bit.y)<35){
      bits.splice(bits.indexOf(bit),1);
      if (bit.e){
        power = 3;
        rechargeS.play();
      }else{
        boumS.play();
        dedFlag = true;
        bossFace=4;
      }
    }
  }
}

function bouletteBitCollision(){
  for (let bit of bits){
    for (let boulette of boulettes){
      if (distance(boulette.x,boulette.y,bit.x,bit.y)<20){
        if(bit.e == 0){
          score += 100;
        }else if(bit.e == 1){
          score += 1000;
        }
        bits.splice(bits.indexOf(bit),1);
        boulettes.splice(boulettes.indexOf(boulette),1);
        boumS.play();
      }
    }
  }
}

function bouletteBossCollision(){
if(gc>500){
  for (let boulette of boulettes){
    if (distance(boulette.x,boulette.y,bossX,30-300)<52){
      bossHealth--;
      boulettes.splice(boulettes.indexOf(boulette),1);
      score += 100;
      if(bossHealth>0){
        boumS.play();
        bossHurt = 20;
      }else{
        boumS.play();
        bigBoumS.play();
        zedsDeadBaby=true;
      }
    
    }
  }
}
}
  
function bossPlayerCollision(){
  if(distance(playerX,playerY,bossX,40-300+ec*7*spaceTime)<55){
    boumS.play();
    dedFlag = true;
    bossFace=4;
  }
} 

//==========================================
  
function newBit(origin){ //créer boulette
  let bit;
  if(origin==="boss"){
    bit = {
      x: bossX,
      y: 40-300,
      e: 0,
      t: [int(random(0,13)),int(random(0,13)),int(random(0,13))]
    }
  }else{
    bit = {
      x: random(-300,300),
      y: -300,
      e: int(random(5)<1),
      t: [int(random(0,13)),int(random(0,13)),int(random(0,13))]
    }
  }
  bits.push(bit);
}

function keyPressed(){ //créer boulette
if(gameState==2){  
  if ((keyCode===CONTROL || key==='s') && power>0){
  let boulette = {
    x: playerX,
    y: playerY,
    s: 0
  }
  boulettes.push(boulette);
  power--;
  shootS.play();
  }
}
}
  
  //==========================================
  
function animateBits(){
  let dropOneFlag = false;
  for (let bit of bits){
    bit.y += 7 * spaceTime; //bit speed
    if (bit.y <= 300){
      if(bit.e ==0){
        image(bitsI[bit.t[int((gc/5)%3)]],XtoX(bit.x),YtoY(bit.y),XtoX(20),YtoY(20));
      }else{
        //image(eBitsI[((bit.t%2)*3)+(gc%3)],XtoX(bit.x),YtoY(bit.y),XtoX(22),YtoY(22));
        image(eBitsI2[gc%8],XtoX(bit.x),YtoY(bit.y),XtoX(22),YtoY(22));
      }
    } else {
      dropOneFlag = true;
    }
  }
  if (dropOneFlag){
    bits.shift();
  }
}

function animateBoss(){
if(zedsDeadBaby===false && endMusic.isPlaying()===false){
  if(gc<500){
  }else if(gc<700){
    let descent = min(gc-600,0);
    let size = 80;
    if(random(0,100)<1){
        newBit("boss");
        bossShoot=10;
    }
    if(random(0,100)<1){
        bxGoal=random(-300+size*0.5,300-size*0.5);
    }
    bossShoot--;
    bossHurt--;
    bossX = (29*bossX + bxGoal)/30;
    image(bossFrameI[int((gc/20)%2)],XtoX(bossX),YtoY(size/2-300+descent),XtoX(size),YtoY(size));
    if(bossShoot>0){
      image(bossFaceI[5],XtoX(bossX),YtoY(size/2-300+descent),XtoX(60),YtoY(60));
    }else if(bossHurt>0){
      image(bossFaceI[1],XtoX(bossX),YtoY(size/2-300+descent),XtoX(60),YtoY(60));
    }else{
      image(bossFaceI[0],XtoX(bossX),YtoY(size/2-300+descent),XtoX(60),YtoY(60));
    }
  }else{
    let size = 80;
    if(random(0,5)>1.1){
      if(random(0,100)<1){
        newBit("boss");
        bossShoot=10;
      }
      if(random(0,100)<1){
        bxGoal=random(-300+size*0.5,300-size*0.5);
      }
    }else{
      if(random(0,100)<1){
        bossAccel = 30;
      }
    }
    bossShoot--;
    bossAccel--;
    bossHurt--;
    bossX = (29*bossX + bxGoal)/30;
    image(bossFrameI[int((gc/20)%2)],XtoX(bossX),YtoY(size/2-300),XtoX(size),YtoY(size));
    if(bossHurt>0){
      image(bossFaceI[1],XtoX(bossX),YtoY(size/2-300),XtoX(60),YtoY(60));
    }else if(bossShoot>0){
      image(bossFaceI[5],XtoX(bossX),YtoY(size/2-300),XtoX(60),YtoY(60));
    }else if(bossAccel>0){
      image(bossFaceI[2],XtoX(bossX),YtoY(size/2-300),XtoX(60),YtoY(60));
    }else{
      image(bossFaceI[0],XtoX(bossX),YtoY(size/2-300),XtoX(60),YtoY(60));
    }
  }
}else{
  let size = 80;
  bossShoot--;
  bossAccel--;
  bossHurt--;
  bossX = (29*bossX + bxGoal)/30;
  image(bossFrameI[int((gc/20)%2)],XtoX(bossX),YtoY(size/2-300+ec*7*spaceTime),XtoX(size),YtoY(size));
  image(bossFaceI[3],XtoX(bossX),YtoY(size/2-300+ec*7*spaceTime),XtoX(60),YtoY(60));
  stGoal=1;
}
}

function animerBoulette(){
  
  let dropOneFlag = false;
  for (let boulette of boulettes){
    if (gc%3==0){
      boulette.s = int(random(0,3));
    }
    boulette.y -= 20*spaceTime; //boulette speed
    if (boulette.y >= -300){
image(boulettesI[boulette.s],XtoX(boulette.x),YtoY(boulette.y),XtoX(24),YtoY(50));
    } else {
      dropOneFlag = true;
    }
  }
  if (dropOneFlag){
    boulettes.shift();
    score -= 150;
  }
}

function animatePlayer(){
   let wi = 30;
   let hei = 60;
   
  if (keyIsDown(RIGHT_ARROW)||keyIsDown(76)){
    playerSpeed += 1;
    if (playerSpeed>20){playerSpeed = 20;}
  }
  if (keyIsDown(LEFT_ARROW)||keyIsDown(74)){
    playerSpeed -= 1;
    if (playerSpeed<-20){playerSpeed = -20;}
  }
  if(dedFlag==0){
    playerX += playerSpeed;
  }
  playerSpeed *= 0.95;
  if (playerX<(wi*0.5)-290) {
    playerSpeed = -playerSpeed;
    playerX = (wi*0.5)-290;} 
  if (playerX > 290-(wi*0.5)){
    playerSpeed = -playerSpeed;
    playerX = 290-(wi*0.5);}
  if(power>0){fill(70+power*60,0,0);}
  else{fill(200,200,200);}
  if(dedFlag){
    playerExplosion(XtoX(playerX),YtoY(playerY),ac);
    ac++;
    transFlag=2;
  }else if(power>0){
    image(energyShipI[int((gc/4)%6)],XtoX(playerX),YtoY(playerY),XtoX(wi),YtoY(hei));
  }else{
    image(staticShipI[int((gc/4)%6)],XtoX(playerX),YtoY(playerY),XtoX(wi),YtoY(hei));
  }
}
  
  //==========================================

function drawBackground(){
  scroll += pow((spaceTime-0.5),2)*0.002;
  if (scroll>1){scroll--;}
  image(ciel,0,0,XtoX(600),YtoY(600),0,(4560-600)*(1-scroll),600,600);
  for (let i=-6;i<6;i++){
    fill(255,220,0,45);
    noStroke();
    let begin = min(gc*4,800)-800;
    if(begin<0){
      scroll = 0;
    }
    rect(0,YtoY((i+(scroll*100)%1)*60+begin),XtoX(570),YtoY(10));    //light ray
    image(border,XtoX(border.width*0.5-300),YtoY(border.height*0.5+(i+(scroll*100)%1)*border.height+begin),XtoX(border.width),YtoY(border.height));    //left border
    push();
      rotate(PI);
      image(border,XtoX(border.width*0.5-300),YtoY(-border.height*0.5-(i+(scroll*100)%1)*border.height-begin),XtoX(border.width),YtoY(border.height));    //right border
    pop();
  }
}

function cleanBorders(){
  fill(0);
  rect(XtoX(0),YtoY(450),XtoX(900),YtoY(300));
  rect(XtoX(0),YtoY(-450),XtoX(900),YtoY(300));
  rect(XtoX(450),YtoY(0),XtoX(300),YtoY(900));
  rect(XtoX(-450),YtoY(0),XtoX(300),YtoY(900));
}

function playerExplosion (x,y,c){
  if(c<32){
    fill(255,0,0);
    for(var i=0;i<1000;i++){
      push();
        stroke(random(255),0,0);
        let rd = random(sqrt(c)*20);
        let ra = random(2*PI);
        square(x+rd*cos(ra),y+rd*sin(ra),max((30-c),0)/10);
      pop();
    }
  }
}

  //==============================================
  
function distance(xa,ya,xb,yb){
  return sqrt((xa-xb)*(xa-xb)+(ya-yb)*(ya-yb));
}
  
function XtoX(realX){
  let perceivedX = realX * spaceTime;
  return perceivedX;
}

function YtoY(realY){
  let perceivedY = realY / spaceTime;
  return perceivedY;
}

function defineSpaceTime(){
  if(gc<500){
    if(gc>200){
      stGoal = 1 + (gc-200)/1000;
    }
  }
  
  if(bossAccel>0){
    stGoal += 0.02;
  }
  if(stGoal>1.3){
    if(zedsDeadBaby===false){
      stGoal -= 0.002;
    }
  }
      
  spaceTime = (9*spaceTime + stGoal)/10;
  if(spaceTime>2){spaceTime=2;}
  battleMusicPlus.setVolume(0.5*(max(0,spaceTime-1.2)/0.8));
}
  
  //=====================================
  
function transitionIntro(){
  if (tc<1200){
    fill(0);
    for(let i=0;i<40;i++){
      rect(i*width/40+15-width/2,transY[i]+tc-600,30,1200);
      circle(i*width/40+15-width/2,transY[i]+tc,30);
    }
    //introMusic.setVolume(0.6*(1-(tc/1200)));
  }else{
    if(tex==6){
      if(endMusic.isPlaying()===false){
        endMusic.play();
      }
    }
    /*
    introMusic.stop();
    if(battleMusic.isPlaying()===false){
      battleMusic.loop();
    }
    */
    if(tc==1200){ac=0;}
    gameState=1;
    if (tc<2400){
      fill(0);
      for(let i=0;i<40;i++){
        rect(i*width/40+15-width/2,transY[i]+tc-600,30,1200);
        circle(i*width/40+15-width/2,transY[i]+tc-1200,30);
      }
    }else{
      transFlag=0;
    }
  }
  tc+=30;
}

function transitionBattle(){
  if (tc<1200){
    fill(0);
    for(let i=0;i<40;i++){
      rect(i*width/40+15-width/2,transY[i]+tc-600,30,1200);
      circle(i*width/40+15-width/2,transY[i]+tc,30);
    }
    introMusic.setVolume(0.6*(1-(tc/1200)));
  }else{
    introMusic.stop();
    endMusic.stop();
    if(battleMusic.isPlaying()===false){
      battleMusic.loop();
      battleMusicPlus.loop();
    }
    if(tc==1200){ac=0;}
      gameSetup();
      gameState=2;
    if (tc<2400){
      fill(0);
      for(let i=0;i<40;i++){
        rect(i*width/40+15-width/2,transY[i]+tc-600,30,1200);
        circle(i*width/40+15-width/2,transY[i]+tc-1200,30);
      }
    }else{
      tc=0;
      transFlag=0;
    }
  }
  tc+=30;
}