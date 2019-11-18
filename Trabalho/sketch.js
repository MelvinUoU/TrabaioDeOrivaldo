//X e Y do canvas e objetos
var x = 720;
var y = 576;
var xe = 30;
var ye = y/2;
var xs = x-300;
var ys = y/2-50/2;
var xd;
var yd;
var momentd;
var momentpontos = false;
//
//Informações do jogo
var tela = 0;
var nivel = 1;
var pontos= 0;
var vidas = 3;
var barreiradepontos = 1200;
//
//Vetores de objeto
var vxs= [];
var vys= [];
var vtam= [];
var qtdObj= 2;
//
function setup() {
  createCanvas(x, y);
  for(var i =0; i<qtdObj; i++){
    vxs[i]= random(x/2, x); 
    vys[i]= random(0,y);
    vtam[i]= random(60, 120);
  }
}
function preload(){
 var nave = loadImage("nave.png");
}
function draw() {
  //Características da tela de Inicio
  if(tela === 0){
    vidas = 3;
    background(220)
    textSize(32);
    fill(0, 102, 153);
    text('Space Warrior',(x*0.30),(y*0.2));
    noFill();
    fill('rgb(20%,0%,70%)');
    text('Pressione Enter para jogar',(x*0.20),(y*0.2)+200);
    if(keyIsDown(ENTER)){
      tela = 1;
    }
  }
  //
  //Características da tela de Jogo
  if(tela ===1){
  background(220);
  textSize(24);
  fill('rgb(20%,0%,70%)');
  text("Nível: "+nivel,0,30);
  text("Pontos: "+pontos,x/2-100,30);
  text("Vidas: "+vidas,(x*0.7), 30)
  noFill();
  fill('rgb(100%,0%,30%)');
  ellipse(xe,ye,60,60);
  noFill();
  fill('#222222');
  square(xs,ys,50);
  for(var i =0; i<qtdObj; i++){
    ellipse(vxs[i],vys[i],vtam[i]); 
  }
  }
  //
  //Características da tela de Game Over
  if(vidas<=0){
    tela =2;
  }
  if(tela === 2){
  background(0);
  textSize(32);
  fill('rgb(100%,0%,0%)');
  text("Morreu, aperte Enter para tentar de novo!",(x/2)-(0.45*x),50);
  if(keyIsDown(ENTER)){
    tela = 0;
  }
  }
  //
  //Características da tela de Vitória
  if(nivel ===5){
    background('rgb(100%,100%,100%');
    text("Parabéns, voce ganhou!",(x/2)-(0.45*x),50);
  }
  //
  //Comandos
  if (keyIsDown(LEFT_ARROW)){
    xe -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)){
    xe += 5;
  }
  if (keyIsDown(UP_ARROW)){
    ye -= 5;
  }
  if (keyIsDown(DOWN_ARROW)){
    ye += 5
  }
  if (xe+30 > x || xe < 30){
    xe = random(x,y);
    vidas--
  }
  if (keyIsDown(CONTROL) && !momentd){
    xd = xe;
    yd= ye;
    momentd = true;
  }
  if(momentd){
    ellipse(xd,yd,4);
    xd = xd+15;
  }
    if (xd > xs && yd>ys && (ys+50)>yd && (xs+50)>xd && !momentpontos && momentd)  {
    momentd = false;
    momentpontos = true
  }
  
  if (xd>x){
    momentd = false;
  }
  //
  if(pontos>barreiradepontos){
    nivel++;
    barreiradepontos= barreiradepontos*2;
  }
  if (ye+30 > y || ye < 30){
    ye = random(x,(y-ye));
    vidas--
  }
  if(dist(xe,ye,xs+25,ys+25)< 30+25){
    vidas--
    xe=30;
    ye= y/2;
  }
  if(momentpontos && !momentd){
    pontos = pontos+100;
  momentpontos = false;
  }
}
