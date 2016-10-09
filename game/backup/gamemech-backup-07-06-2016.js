//
//	GAME STARTUP. LET'S DO THIS!
//
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.getElementById("gameContainer").appendChild(canvas);
var bulletCounter = 0;

var backgroundImage = "graphics/grasstry2.png";

// Background image
//var bgReady = false;
//var bgImage = new Image();
//bgImage.onload = function () {
//	bgReady = true;
//};
//bgImage.src = backgroundImage;

// Rest of background images
var backgroundArray = [];
var backgroundObjectArray = [];
var bulletArray = [];
var archivedBulletArray = [];
var archivedMonsterArray = [];
var archivedGranadeArray = [];
var numberOfLampsOnScreen = [];

function initiateBackground() {
	for(i=0;i<9;i++) {
		if(i==0){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -800;
			backgroundObjectArray[i].y = -600;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==1){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -0;
			backgroundObjectArray[i].y = -600;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==2){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 800;
			backgroundObjectArray[i].y = -600;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==3){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -800;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;
		}
		else if(i==4){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 800;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==5){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = -800;
			backgroundObjectArray[i].y = 600;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==6){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = 600;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==7){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 800;
			backgroundObjectArray[i].y = 600;
			backgroundArray[i].src = backgroundImage;	
		}
		else if(i==8){
			backgroundArray[i] = new Image();
			backgroundObjectArray[i] = new Object;
			backgroundObjectArray[i].x = 0;
			backgroundObjectArray[i].y = 0;
			backgroundArray[i].src = backgroundImage;	
		}
	}
}
	
initiateBackground();
bgReady = true;

var monsterHitImage = new Image();
monsterHitImage.src = "graphics/monsterhit.png";

 //Lamp image
var lampReady = false;
var lampImage = new Image();
lampImage.onload = function () {
	lampReady = true;
};
lampImage.src = "graphics/shadowness80.png";

// Explosion image
var explosionReady = false;
var explosionImage = new Image();
explosionImage.onload = function () {
	explosionReady = true;
};
explosionImage.src = "graphics/explosion3.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "graphics/starreplace.png";

// Treasure image
var treasureReady = false;
var treasureImage = new Image();
treasureImage.onload = function () {
	treasureReady = true;
};
treasureImage.src = "graphics/star-green.png";

// Monster images
var monster1Ready = false;
var monsterImage1 = new Image();
var monster2Ready = false;
var monsterImage2 = new Image();
var monster3Ready = false;
var monsterImage3 = new Image();

monsterImage1.onload = function () {
	monster1Ready = true;
};
monsterImage2.onload = function () {
	monster2Ready = true;
};
monsterImage3.onload = function () {
	monster3Ready = true;
};
monsterImage1.src = "graphics/monster1.png";
monsterImage2.src = "graphics/monster2.png";
monsterImage3.src = "graphics/monster3.png";

//monsterImage1.src = "graphics/monsterOutline.png";
//monsterImage2.src = "graphics/monsterOutline.png";
//monsterImage3.src = "graphics/monsterOutline.png";


// gameDisplay

var gameDisplay  = {
	x: 400,
	y:300,
	indexX:0,
	indexY:0,
};

var tileDisplay = {
	x:400,
	y:300
};

// Game objects
var hero = {
	health:100,
	speed: 5, // movement in pixels per second
	angle:0,
	walking: 0,
	machete:1,	
	pistol:1,
	machinegun:1,
	shotgun:1,
	flamethrower:1,
	gun: "flamethrower",
	gunshots:75,
	machinegunshots:250,
	shotgunshots:40,
	flameshells:500,
	clip:7,
	machinegunclip:30,
	shotgunclip:8,
	damage:50,
	scope: "no",
	armor:"no",
	infrared: "no",
	medkit:0,
	boots:"no",
	antidode:0,
	reloadDelay:0
};
var monsterArray = [];

var granadeArray = [];
var thrownGranadeArray = [];

var granadeX = {
	x:400,
	y:300,
	explosion:0,
	damage:200,
	radius:75,
	thrown:0,
	activated:0,
	activationTime:0,
	inbound:1,
	throwLength:0,
	blown:0,
	explosionTime:0,
	explosionExpansion:1.7,
	explosionExpansionTopped:0,
	explosionFade:0,
	explosionFadeTopped:0,
	hit:0,
	hitOpacity:0,
	hitPeaked:0
};
var granadeY = {
	x:400,
	y:300,
	explosion:0,
	damage:200,
	radius:75,
	thrown:0,
	activated:0,
	activationTime:0,
	inbound:1,
	throwLength:0,
	blown:0,
	explosionTime:0,
	explosionExpansion:1.7,
	explosionExpansionTopped:0,
	explosionFade:0,
	explosionFadeTopped:0,
	hit:0,
	hitOpacity:0,
	hitPeaked:0,
};
var granadeZ = {
	x:400,
	y:300,
	explosion:0,
	damage:200,
	radius:75,
	thrown:0,
	activated:0,
	activationTime:0,
	inbound:1,
	throwLength:0,
	blown:0,
	explosionTime:0,
	explosionExpansion:1.7,
	explosionExpansionTopped:0,
	explosionFade:0,
	explosionFadeTopped:0,
	hit:0,
	hitOpacity:0,
	hitPeaked:0
};
granadeArray.push(granadeX);
granadeArray.push(granadeY);
granadeArray.push(granadeZ);


var background = {};
var tileArray = {};

// Handle keyboard controls
var keysDown = {};
var keyPressed = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	if(hero.gun == 'pistol' || hero.gun == 'shotgun' || hero.gun == 'machete') {
	hasFired = 0;
	}
	else {
	}
}, false);

var randomStartNumber = 0;

//Throw in lamps.
addLampToScreenArrayVersion2(0,0,0,0);		//middle
addLampToScreenArrayVersion2(0,-1,0,-600);	//top
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(0, -600);
	}
addLampToScreenArrayVersion2(0,1,0,600); 	//bottom
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(0,600);
	}
addLampToScreenArrayVersion2(-1,0,-800,0);	//left
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-800,0);
	}
addLampToScreenArrayVersion2(1,0,800,0); 	//right
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(800,0);
	}
addLampToScreenArrayVersion2(1,-1,800,-600); 	//top right
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(800,-600);
	}
addLampToScreenArrayVersion2(-1,-1,-800,-600); 	//top left
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-800,-600);
	}
addLampToScreenArrayVersion2(1,1,800,600); 	//bottom right
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(800,600);
	}
addLampToScreenArrayVersion2(-1,1,-800,600); 	//bottom left
randomStartNumber = Math.round(Math.random() * 1 + 2);
	for(x=0;x<randomStartNumber;x++) {
			spawnMonster(-800,600);
	}

// Reset the game when the player dies.
var reset = function () {
	//Initiate ground-values
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	background.x = 0;
	background.y = 0;
	background.width = 800;
	background.height = 600;
	hero.health = 100;
	//Set time-values
	timeControler = new Date();
	timeStart = new Date();
	setTimeState = timeControler.getSeconds() + 3;
	//Hide buttons
	document.getElementById("restartGame").style.display = "none";
	document.getElementById("gameStats").style.display = "none";
	initiateBackground();
	//Initiate gameworld workings
	gameDisplay.x = 400;
	gameDisplay.y = 300;
	gameDisplay.indexX = 0;
	gameDisplay.indexY = 0;
	tileDisplay.x = 400;
	tileDisplay.y = 300;
};

var hasFired = 0;
var shotCounter = 0;
var shoot = "";
var timeStamp = new Date();
var timeStart = new Date();
var timeEnd = "";
var timeControler = new Date();
var setTimeState = timeControler.getSeconds() + 3;

// Update game objects
var update = function (modifier) {
	timeControler = new Date();
	if (38 in keysDown) { // Player holding up
		runningAnimation();
		if(hero.walking == '1') {
			hero.speed = 3;
		}
		else {
			hero.speed = 7;
		}
		newPositionBackward(gameDisplay);
		newPositionBackward(tileDisplay);
		for(u=0;u<monsterArray.length;u++) {
			newPositionForwardMonster(monsterArray[u]);
		}
		for(n=0;n<thrownGranadeArray.length;n++) {
			newPositionForward(thrownGranadeArray[n]);
		}
		newPositionForward(background);
		for(h=0;h<numberOfLampsOnScreen.length;h++) {
			newPositionForward(numberOfLampsOnScreen[h]);
			newPositionForwardShadow(numberOfLampsOnScreen[h]);
		}
		for(h=0;h<backgroundArray.length;h++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
			newPositionForward(backgroundObjectArray[h]);
		}
		for(f=0;f<bulletArray.length;f++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
			bulletTraceMovingForward(bulletArray[f]);
		}
	}
	
	if ( 16 in keysDown) {
		hero.walking = 1;
	}
	else {
		hero.walking = 0;
	}
	if (40 in keysDown) { // Player holding down
		runningAnimation();
		if(hero.walking == '1') {
			hero.speed = 1;
		}
		else {
			hero.speed = 3;
		}
		newPositionForward(gameDisplay);
		newPositionForward(tileDisplay);
		for(u=0;u<monsterArray.length;u++) {
			newPositionBackwardMonster(monsterArray[u]);
		}
		for(n=0;n<thrownGranadeArray.length;n++) {
			newPositionBackward(thrownGranadeArray[n]);
		}
		newPositionBackward(background);
		for(h=0;h<numberOfLampsOnScreen.length;h++) {
			newPositionBackward(numberOfLampsOnScreen[h]);
			newPositionBackwardShadow(numberOfLampsOnScreen[h]);
		}
		for(h=0;h<backgroundArray.length;h++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
			newPositionBackward(backgroundObjectArray[h]);
		}
		for(f=0;f<bulletArray.length;f++) {
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
			bulletTraceMovingBackward(bulletArray[f]);
		}
		//monster.y -= hero.speed * modifier;
		
	}
	if (37 in keysDown) { // Player holding left
		if(hero.walking == '1') {
		hero.angle -= 1;
		}
		else {
		hero.angle -= 2.5;
		}
		
	}
	if (39 in keysDown) { // Player holding right
		if(hero.walking == '1') {
		hero.angle += 1;
		}
		else {
		hero.angle += 2.5;
		}
	}
	
	if (82 in keysDown) { //Reload
		//console.log(timeControler.getTime() + " > " + hero.reloadDelay);
		if(hero.gun == 'pistol' && timeControler.getTime() > hero.reloadDelay + 550) {
			if(hero.gunshots >= 7) {
				hero.gunshots = hero.gunshots - (7-hero.clip);
				hero.clip = 7;
			}
			else if(hero.gunshots < 7 && hero.gunshots > 0) {
				for(y=0;y<7;y++) {
					if(hero.gunshots > 0 && hero.clip < 7) {
						hero.clip = hero.clip + 1;
						hero.gunshots = hero.gunshots -1;
					}
				}
			}
			else if(hero.gunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
			
		}
		else if(hero.gun == 'machinegun' && timeControler.getTime() > hero.reloadDelay + 1050) {
			if(hero.machinegunshots >= 30) {
				hero.machinegunshots = hero.machinegunshots - (30-hero.machinegunclip);
				hero.machinegunclip = 30;
			}
			else if(hero.machinegunshots < 30 && hero.machinegunshots > 0) {
				for(y=0;y<30;y++) {
					if(hero.machinegunshots > 0 && hero.machinegunclip < 30) {
						hero.machinegunclip = hero.machinegunclip + 1;
						hero.machinegunshots = hero.machinegunshots -1;
					}
				}
			}
			else if(hero.machinegunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
		}
		else if(hero.gun == 'shotgun' && timeControler.getTime() > hero.reloadDelay + 2050) {
			if(hero.shotgunshots >= 8) {
				hero.shotgunshots = hero.shotgunshots - (8-hero.shotgunclip);
				hero.shotgunclip = 8;
			}
			else if(hero.shotgunshots < 8 && hero.shotgunshots > 0) {
				for(y=0;y<80;y++) {
					if(hero.shotgunshots > 0 && hero.shotgunclip < 8) {
						hero.shotgunclip = hero.shotgunclip + 1;
						hero.shotgunshots = hero.shotgunshots -1;
					}
				}
			}
			else if(hero.machinegunshots <= 0) {
			}
			hero.reloadDelay = timeControler.getTime();
		}
	}
	if(17 in keysDown) { //Granade throw
		//document.getElementById("testdiv").innerHTML = "CTRL DOWN!";
		if(granadeArray.length > 0) {
			granadeArray[granadeArray.length-1].activated = 1;
			//document.getElementById("testdiv").innerHTML = granadeArray[granadeArray.length-1].activated;
		}
	}
	else {
		if(granadeArray.length > 0) {
			//document.getElementById("testdiv").innerHTML = "CTRL NOT DOWN!" + granadeArray[granadeArray.length-1].activated + granadeArray[granadeArray.length-1].inbound;
			if(granadeArray[granadeArray.length-1].activated == 1 && granadeArray[granadeArray.length-1].inbound == 1) {
				//document.getElementById("testdiv").innerHTML = "YES!WORKED!";
				granadeArray[granadeArray.length-1].thrown == 1;
				granadeArray[granadeArray.length-1].activationTime = new Date();
				granadeArray[granadeArray.length-1].activationTime.setTime(timeControler.getTime() + 500);
				thrownGranadeArray.push(granadeArray[granadeArray.length-1]);
				granadeArray.splice(granadeArray.length-1,1);
				
			}
			else  if(granadeArray[granadeArray.length-1].activated == 1 && granadeArray[granadeArray.length-1].inbound == 0) {
				//Reset the granade
				granadeArray[granadeArray.length-1].activated = 0;
				granadeArray[granadeArray.length-1].inbound = 1;
				granadeArray[granadeArray.length-1].x = 400;
				granadeArray[granadeArray.length-1].y = 300;
			}	
		}
	}
	
	if(49 in keysDown && hero.machete == '1') {
		hero.gun = 'machete';
	}
	if(50 in keysDown && hero.pistol == '1') {
		hero.gun = 'pistol';
	}
	if(51 in keysDown && hero.shotgun == '1') {
		hero.gun = 'shotgun';
	}
	if(52 in keysDown && hero.machinegun == '1') {
		hero.gun = 'machinegun';
	}
	if(53 in keysDown && hero.flamethrower == '1') {
		hero.gun = 'flamethrower';
	}
	
	
	if(32 in keysDown && hasFired == '0'){ //Shoot
			if(hero.gun == 'pistol' && hero.clip > 0) {
				delete keysDown[32];
				shotCounter = shotCounter + 1;
				hasFired = 1;
				hero.clip = hero.clip - 1;
				bulletFire(35);
				}
			else if(hero.gun == 'machinegun' && hero.machinegunclip > 0) {
				shotCounter = shotCounter + 1;
				hero.machinegunclip = hero.machinegunclip - 1;
				hasFired = 0;
				bulletFire(20);
			}
			else if(hero.gun == 'shotgun' && hero.shotgunclip > 0) {
				delete keysDown[32];
				shotCounter = shotCounter + 1;
				hasFired = 1;
				hero.shotgunclip = hero.shotgunclip - 1;
				for(p=0;p<8;p++) {
				bulletFire(50);
				}
			}
			else if(hero.gun == 'flamethrower' && hero.flameshells > 0) {
				shotCounter = shotCounter + 1;
				hero.flameshells = hero.flameshells - 1;
				hasFired = 0;
				bulletFire(75);
			}
			else if(hero.gun == 'machete') {
				delete keysDown[32];
				shotCounter = shotCounter + 1;
				hasFired = 1;
				bulletFire(35);
			}
			else {
			//hasFired = 1;
			}
		}
		else {
		shoot = "";
	}
	for(i=0;i<bulletArray.length;i++) {
		for(l=0;l<monsterArray.length;l++) {
			try {
		//((monster.x - granade.x)*(monster.x - granade.x) + (monster.y - granade.y)*(monster.y - granade.y)) < granade.radius*granade.radius
		//console.log((bulletArray[i].bulletX - monsterArray[l].x) * (bulletArray[i].bulletX - monsterArray[l].x) + (bulletArray[i].bulletY - monsterArray[l].y)*(bulletArray[i].bulletY - monsterArray[l].y) + " < " + 15*15);
		if((bulletArray[i].bulletX - monsterArray[l].x) * (bulletArray[i].bulletX - monsterArray[l].x) + (bulletArray[i].bulletY - monsterArray[l].y)*(bulletArray[i].bulletY - monsterArray[l].y) < 15*15) {
		//if(bulletArray[i].bulletX <= (monsterArray[l].x + 30) && monsterArray[l].x <= (bulletArray[i].bulletX) && bulletArray[i].bulletY <= (monsterArray[l].y + 30) && monsterArray[l].y <= (bulletArray[i].bulletY)) {
				if(monsterArray[l].health-bulletArray[i].bulletDamage > 1) {
					monsterArray[l].health = monsterArray[l].health-bulletArray[i].bulletDamage;
					if(monsterArray[l].state != "attacking" || monsterArray[l].state != "startled") {
						monsterArray[l].startledTime = timeControler.getTime();
						monsterArray[l].state = "startled";
					}
					else {
					}
					//document.getElementById("testdiv").innerHTML = "Monster health: " + monsterArray[l].health;
				}
				else if(monsterArray[l].health-bulletArray[i].bulletDamage <= 0) {
					//document.getElementById("testdiv").innerHTML = "Monster dead!";
					archivedMonsterArray.push(monsterArray[l]);
					monsterArray.splice(l,1);
				}
				archivedBulletArray.push(bulletArray[i]);
				bulletArray.splice(i,1);
			}
		else {
		}
		}
		catch(err) {
			//Monster dead or bullet hit something and removed.
			}
		}
	}
	
	for(g=0;g<monsterArray.length;g++) {
		monsterState(monsterArray[g]);
		monsterStateRevision(monsterArray[g]);
	}

	// Are they touching?
	for(b=0;b<monsterArray.length;b++) {
		if (hero.x <= (monsterArray[b].x + 18) && monsterArray[b].x <= (hero.x + 18) && hero.y <= (monsterArray[b].y + 18) && monsterArray[b].y <= (hero.y + 18)) {
			console.log("Monster tounching!");
			if(monsterArray[b].attackIni == 0) {
				monsterArray[b].attackIni = 1;
				//console.log("First touch!");
				monsterArray[b].attackTime = new Date();
				monsterArray[b].attackTime.setMilliseconds(timeControler.getMilliseconds() + monsterArray[b].damageInterval);
				//console.log("Starting " + timeControler.getTime() + " " + monsterArray[b].attackTime.getTime());
			}
			else if(monsterArray[b].attackIni == 1 && timeControler.getTime() >= monsterArray[b].attackTime.getTime()) {
				monsterArray[b].hit = timeControler.getTime();
				hero.health = hero.health - monsterArray[b].damage;
				monsterArray[b].attackIni = 0;
			}
			else if(monsterArray[b].attackIni == 1 && timeControler.getTime() < monsterArray[b].attackTime.getTime()) {
				//console.log("Already touching tounching, waiting! " + timeControler.getTime() + " " + monsterArray[b].attackTime.getTime());
			}
		}
		else {
			//console.log("Not touching anymore!");
			monsterArray[b].attackIni = 0;
		}
	}
	mapControl();
};

// Draw everything
var bgCounter = 0;
var isMade = 0;
var currentBackground = background;
var render = function () {
	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	//document.getElementById("testdiv").innerHTML = bulletArray;
	//document.getElementById("testdiv2").innerHTML = monsterArray;
	try {
	//document.getElementById("testdiv").innerHTML = archivedBulletArray + "<br />" + archivedMonsterArray + "<br />" + archivedGranadeArray;
	}
	catch(err) {
	//document.getElementById("testdiv").innerHTML = "monster dead or removed";
	}
	if (bgReady) {
		for(y=0;y<backgroundArray.length;y++) {
			//ctx.globalAlpha = 0.1; // - sp�ndende effekt, kan m�ske bruges ved poisoned?
			ctx.drawImage(backgroundArray[y], backgroundObjectArray[y].x, backgroundObjectArray[y].y,800,600);
			//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + backgroundArray[0].y + " " + bgCounter + " " + isMade;
		}
		
		//for(y=0;y<bulletArray.length;y++) {
		//	ctx.drawImage(bulletArray[y], bulletObjectArray[y].x, bulletObjectArray[y].y)
		//}
	}
	if (heroReady) {
		drawRotatedImage(heroImage, hero.x, hero.y, hero.angle);
	}	
	if (monster1Ready && monster2Ready & monster3Ready) {
		for(j=0;j<monsterArray.length;j++) {
			if(monsterArray[j].skin == 1) {
				drawRotatedMonster(monsterImage1, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else if(monsterArray[j].skin == 2) {
				drawRotatedMonster(monsterImage2, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else if(monsterArray[j].skin == 3) {
				drawRotatedMonster(monsterImage3, monsterArray[j].x, monsterArray[j].y, monsterArray[j].angle-180,30,30);
			}
			else {
			}
		}
	}
	if (lampReady) {
		for(y=0;y<numberOfLampsOnScreen.length;y++) {
			ctx.drawImage(lampImage, numberOfLampsOnScreen[y].x, numberOfLampsOnScreen[y].y,300,300);
			//ctx.fillText(y+1,numberOfLampsOnScreen[y].x+150,numberOfLampsOnScreen[y].y+150);
			//ctx.strokeText(y+1,numberOfLampsOnScreen[y].x+150,numberOfLampsOnScreen[y].y+150);
			drawTileShadow(numberOfLampsOnScreen[y].tileStartPointX,numberOfLampsOnScreen[y].tileStartPointY,numberOfLampsOnScreen[y].x,numberOfLampsOnScreen[y].y);
			//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "<br />" + y + ": Drawn at: " + numberOfLampsOnScreen[y].x + "|" +  numberOfLampsOnScreen[y].y;
		}
	}
	for(n=0;n<monsterArray.length;n++) {
		if(monsterArray[n].hit != 0) {
			damageHitOnHero(monsterArray[n]);
		}
	}
	for(c=0;c<thrownGranadeArray.length;c++) {
		if(thrownGranadeArray[c].hit != 0) {
			damageHitOnHero(thrownGranadeArray[c]);
		}
	}
	
	var bestMessage = gameDisplay.indexX + "|" + gameDisplay.indexY + "<br />";
	for(x=0;x<numberOfLampsOnScreen.length;x++) {
		bestMessage = bestMessage + numberOfLampsOnScreen[x].x + "|" + numberOfLampsOnScreen[x].y + "<br />";
	}
	//document.getElementById("testdiv").innerHTML = bestMessage;
	// Score
	ctx.fillStyle = 'rgba(255,255,255,1)';
	try {
	document.getElementById("testdivon").innerHTML = "HERO: x: " + hero.x.toFixed(2) + " | y: " + hero.y.toFixed(2) + " - " + "<br />" + "Shots fired: " + shotCounter + " " + shoot;
	}
	catch(err) {
	}
	//Lamp
	//document.getElementById("testdiv2").innerHTML = "x: " + gameDisplay.indexX + " |  y: " + gameDisplay.indexY + "<br />" + numberOfLampsOnScreen[0].x + "." + numberOfLampsOnScreen[0].y;
	//darknessControl(0.95,300);
	for(g=0;g<bulletArray.length;g++) {
		if(bulletArray[g].firedFrom == 'flamethrower') {
			if(Math.sqrt(Math.pow((bulletArray[g].bulletX-hero.x),2) + Math.pow((bulletArray[g].bulletY-hero.y),2)) > 150) {
				archivedBulletArray.push(bulletArray[g]);
				bulletArray.splice(g,1);
			}
			else {
				bulletTrace(bulletArray[g]);
				//if(bulletArray[g].firedFrom == 'pistol') {
				//	ctx.fillStyle = 'rgba(255,255,255,1)';
				//}
				//else if(bulletArray[g].firedFrom == 'shotgun') {
				//	ctx.fillStyle = 'rgba(255,255,255,1)';
				//}
				//else if(bulletArray[g].firedFrom == 'machinegun') {
				//	ctx.fillStyle = 'rgba(255,255,255,1)';
				//}
				//else if(bulletArray[g].firedFrom == 'flamethrower') {
					ctx.beginPath();
					ctx.lineWidth = 3;
					ctx.strokeStyle = 'rgba(255,230,87,0.7)';
					ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,5,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.lineWidth = 6;
					ctx.strokeStyle = 'rgba(255,100,100,0.6)';
					ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,3,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.strokeStyle = 'rgba(186,90,58,0.3)';
					ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,7,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.lineWidth = 12;
					ctx.strokeStyle = 'rgba(100,100,100,0.2)';
					ctx.arc(bulletArray[g].bulletX,bulletArray[g].bulletY,9,0,2*Math.PI);
					ctx.stroke();
					ctx.lineWidth = 1;
				//}
				//else {
				//}
				ctx.fillRect(bulletArray[g].bulletX,bulletArray[g].bulletY,1,1);
				bulletTraceFade(bulletArray[g]);
			}
			
		}
		else if(bulletArray[g].firedFrom == 'machete') {
			console.log("swing!");
		}
		else {
			if(Math.sqrt(Math.pow((bulletArray[g].bulletX-hero.x),2) + Math.pow((bulletArray[g].bulletY-hero.y),2)) > 800) {
				archivedBulletArray.push(bulletArray[g]);
				bulletArray.splice(g,1);
			}
			else {
				bulletTrace(bulletArray[g]);
				ctx.fillStyle = 'rgba(255,255,255,1)';
				ctx.fillRect(bulletArray[g].bulletX,bulletArray[g].bulletY,1,1);
				bulletTraceFade(bulletArray[g]);
			}
		}
	}
	lazerScope();
	//ctx.fillStyle = 'rgba(255,255,255,1)';
	//ctx.fillRect(5,5 , 50, 50);
	//Information to divs
	if(hero.gun == "pistol") {
		document.getElementById("gameClip").innerHTML = hero.clip + " / " + hero.gunshots;
	}
	else if(hero.gun == 'machete') {
		document.getElementById("gameClip").innerHTML = "&infin;";
	}
	else if(hero.gun == "machinegun") {
		document.getElementById("gameClip").innerHTML = hero.machinegunclip + " / " + hero.machinegunshots;
	}
	else if(hero.gun == "shotgun") {
		document.getElementById("gameClip").innerHTML = hero.shotgunclip + " / " + hero.shotgunshots;
	}
	else if(hero.gun == "flamethrower") {
		document.getElementById("gameClip").innerHTML = hero.flameshells;
	}
	else {
	}
	document.getElementById("gameHealth").innerHTML = hero.health;
	if(hero.health <= 0) {
		hero.health = 0;
		monsterArray = [];
		granadeArray = [];
		timeEnd = new Date();
		ctx.fillStyle = 'rgba(255,255,255,1)';
		ctx.fillRect(0, 0, 800, 600);
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.font = "50px Lato";
		ctx.fillText("Game over!",280,250);
		document.getElementById("restartGame").style.display = "block";
		document.getElementById("gameStats").style.display = "block";
	}
	for(y=0;y<granadeArray.length;y++) {
		throwGranade(granadeArray[y]);
	}
	for(j=0;j<thrownGranadeArray.length;j++) {
		thrownGranade(thrownGranadeArray[j]);                                                                                           
	}
	for(y=0;y<monsterArray.length;y++) {
		displayMonsterHealth(monsterArray[y]);
	}
	for(y=0;y<thrownGranadeArray.length;y++) {
		if(thrownGranadeArray[y].explosion == 1) {
			//console.log(timeControler.getTime() + ">" + thrownGranadeArray[y].explosionTime);
			ctx.globalAlpha = thrownGranadeArray[y].explosionFade;
			ctx.drawImage(explosionImage, thrownGranadeArray[y].x-(125/thrownGranadeArray[y].explosionExpansion),thrownGranadeArray[y].y-(125/thrownGranadeArray[y].explosionExpansion),(250/thrownGranadeArray[y].explosionExpansion),(250/thrownGranadeArray[y].explosionExpansion));
			ctx.globalAlpha = 1;
			granadeExplosion(thrownGranadeArray[y]);
			if(timeControler.getTime() > thrownGranadeArray[y].explosionTime) {;
			archivedGranadeArray.push(thrownGranadeArray[thrownGranadeArray.length-1]);
			thrownGranadeArray.splice(thrownGranadeArray[thrownGranadeArray.length-1],1);
			}
		}
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var TO_RADIANS = Math.PI/180; 

function newPositionForward(target) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardMonster(target) {
	//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "target: " + target + "| y: " + target.y;
	target.x -= (hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (hero.speed) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= hero.speed * Math.sin(hero.angle * TO_RADIANS);
	//target.y += hero.speed * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionForwardShadow(target) {
	target.tileStartPointX -= Math.round((hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round((hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

var bestTime = 0;
function runningAnimation() {
	var x = timeControler.getMilliseconds();
	//Running forward
	if(hero.walking == 0 && 38 in keysDown) {
		if(x > 0 && x < 100 || x > 200 && x < 300 || x > 400 && x < 500 || x > 600 && x < 700 || x > 800 && x < 900) {
			heroImage.src = "graphics/starreplace-green.png";
		}
		else {
			heroImage.src = "graphics/starreplace.png";
		}
	}
	//Walking forward or Running backward
	else if(hero.walking == 1 && 38 in keysDown || hero.walking == 0 && 40 in keysDown) {
		if(x > 0 && x < 250 || x > 500 && x < 750) {
			heroImage.src = "graphics/starreplace-green.png";
		}
		else {
			heroImage.src = "graphics/starreplace.png";
		}

	}
	//Walking backward
	else if(hero.walking == 1 && 40 in keysDown) {
		if(x > 0 && x < 500) {
			heroImage.src = "graphics/starreplace-green.png";
		}
		else {
			heroImage.src = "graphics/starreplace.png";
		}
	}
}

function lazerScope() {
	if(hero.scope == "yes") {
	var lazerScopeX = 400;
	var lazerScopeY = 300;
	for(x=0;x<40;x++) {
		if(x<20) {
		}
		else {
	lazerScopeX += (0+x) * Math.sin(hero.angle * TO_RADIANS);
	lazerScopeY -= (0+x) * Math.cos(hero.angle * TO_RADIANS);
	ctx.fillStyle = 'rgba(255,0,0,0.5)';
	ctx.fillRect(lazerScopeX,lazerScopeY,1,1);
	ctx.fillRect(lazerScopeX+1,lazerScopeY,1,1);
	ctx.fillRect(lazerScopeX,lazerScopeY+1,1,1);
		}
	}
	}
}

function swingSword(damage) {
	
}

function throwGranade(granade) {
	if(granade.activated == 1) {
		if(Math.sqrt( (400-granade.x)*(400-granade.x) + (300-granade.y)*(300-granade.y) ) < 500) {
			//document.getElementById("testdiv").innerHTML = "throwing!"; 
			granade.x = Math.round(Math.cos((hero.angle-90) * Math.PI / 180) * granade.throwLength + 400);
			granade.y = Math.round(Math.sin((hero.angle-90) * Math.PI / 180) * granade.throwLength + 300);
			//granade.x = 500;
			//granade.y = 400;
			ctx.beginPath();
			ctx.moveTo(400, 300);
			ctx.lineTo(granade.x, granade.y);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(255,255,255,0.5)';
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(granade.x,granade.y,granade.radius,0,2*Math.PI);
			ctx.stroke();
			granade.throwLength = granade.throwLength + 4;
		}
		else {
			//document.getElementById("testdiv").innerHTML = "Stopped throwing"; 
			granade.inbound = 0;
			granade.throwLength = 0;
			}
        	}
        else {
        }
}

function damageHitOnHero(afflictor) {
	console.log("Ayyy, 1");
	if(timeControler.getTime() < afflictor.hit + 150) {
		if(afflictor.hitOpacity < 0.9 && afflictor.hitPeaked == 0) {
		afflictor.hitOpacity = afflictor.hitOpacity + 0.2;
		ctx.globalAlpha = afflictor.hitOpacity;
		ctx.drawImage(monsterHitImage,0,0,800,600);
		ctx.globalAlpha = 1;
		}
		else {
		afflictor.hitPeaked = 1;
		afflictor.hitOpacity = afflictor.hitOpacity - 0.2;
		ctx.globalAlpha = afflictor.hitOpacity;
		ctx.drawImage(monsterHitImage,0,0,800,600);
		ctx.globalAlpha = 1;
		}
		//console.log("ayy");
	}
	else {
	ctx.globalAlpha = 1;
	afflictor.hit = 0;
	afflictor.hitPeaked = 0;
	afflictor.hitOpacity = 0;
	}
}

function thrownGranade(granade) {
	if(granade.thrown = 1 && timeControler.getTime() < granade.activationTime.getTime()) {
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255,255,255,'+ 1 + ')';
		ctx.arc(granade.x,granade.y,granade.radius,0,2*Math.PI);
		ctx.stroke();
		ctx.font = "10px Lato";
		ctx.fillText(((granade.activationTime.getTime() - timeControler.getTime()+10)/500).toFixed(1),granade.x-8,granade.y-(granade.radius+5));
		for(x=0;x<50;x++) {
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,255,255,0.'+ x + ')';
			ctx.arc(granade.x,granade.y,(granade.radius/50)*x,0,2*Math.PI);
			ctx.stroke();
		//document.getElementById("testdiv").innerHTML = ((granade.activationTime.getTime() - timeControler.getTime()+10)/500).toFixed(1);
		}
		if(timeControler.getTime()+25 >= granade.activationTime.getTime() && granade.blown == 0) {
			granade.explosionTime = timeControler.getTime() + 500;
			granade.explosion = 1;
			for(i=0;i<monsterArray.length;i++) {
				//(x1 - x2)^2 + (y1 - y2)^2 <= D^2 
				//console.log(((monsterArray[i].x - granade.x)*(monsterArray[i].x - granade.x) + (monsterArray[i].y - granade.y)*(monsterArray[i].y - granade.y)) + " < " + (granade.radius*granade.radius));
				if(((monsterArray[i].x - granade.x)*(monsterArray[i].x - granade.x) + (monsterArray[i].y - granade.y)*(monsterArray[i].y - granade.y)) < (granade.radius*granade.radius)) {
					//console.log("yes");
					//console.log("radius: " + granade.radius + " damage:" + granade.damage + " distance:" + Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))) + " %: " + (granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100 + "||damage dealt: " + Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100)));
					if((monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100))) > 1) {
						//console.log("monster lives");
						monsterArray[i].health = monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100));
						monsterArray[i].startledTime = timeControler.getTime();
						monsterArray[i].state = "startled";	
					}
					else if((monsterArray[i].health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((monsterArray[i].x-granade.x)*(monsterArray[i].x-granade.x) + (monsterArray[i].y-granade.y)*(monsterArray[i].y-granade.y))))/100))) <= 0) {
						//console.log("dead monster");
						monsterArray.splice(i,1);
					}
				}	
					
			}
			//console.log(((hero.x - granade.x)*(hero.x - granade.x) + (hero.y - granade.y)*(hero.y - granade.y)) + " < " + (granade.radius*granade.radius));
			if(((hero.x - granade.x)*(hero.x - granade.x) + (hero.y - granade.y)*(hero.y - granade.y)) < (granade.radius*granade.radius)) {
				thrownGranadeArray[thrownGranadeArray.length-1].hit = timeControler.getTime();
				hero.health = hero.health - Math.round(granade.damage * ((granade.radius-Math.round(Math.sqrt((hero.x-granade.x)*(hero.x-granade.x) + (hero.y-granade.y)*(hero.y-granade.y))))/200));
			}
			granade.blown = 1;
			}
			//document.getElementById("testdiv").innerHTML = "BOOM!";
		}
}

function granadeExplosion(granade) {
	if(granade.explosionExpansion > 1.30 && granade.explosionExpansionTopped == 0) {
		granade.explosionExpansion = granade.explosionExpansion - 0.03;
		//granade.explosionFade = granade.explosionFade + 0.15;
		//console.log("Expanding!");
	}
	else {
		granade.explosionExpansionTopped = 1;
		granade.explosionExpansion = granade.explosionExpansion + 0.02;
		//granade.explosionFade = granade.explosionFade - 0.15;
		//console.log("Diminishing!");
	}
	if(granade.explosionFade < 0.7 && granade.explosionFadeTopped == 0) {
		granade.explosionFade = granade.explosionFade + 0.05;
	}
	else {
		granade.explosionFadeTopped = 1;
		granade.explosionFade = granade.explosionFade - 0.02;
	}
	//console.log(granade.explosionExpansion + " " + granade.explosionFade);
}

function newPositionBackward(target) {
	target.x -= Math.round((0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS));
	target.y += Math.round((0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS));
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardMonster(target) {
	target.x -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS);
	target.y += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
	//target.x -= (0-hero.speed) * Math.sin(hero.angle * TO_RADIANS);
	//target.y += (0-hero.speed) * Math.cos(hero.angle * TO_RADIANS);
}

function newPositionBackwardShadow(target) {
	target.tileStartPointX -= Math.round(0-(hero.speed) * Math.sin(hero.angle * TO_RADIANS));
	target.tileStartPointY += Math.round(0-(hero.speed) * Math.cos(hero.angle * TO_RADIANS));
}

function bulletTrace(bullet) {
	bullet.bulletX -= (0-bullet.speed) * Math.sin(bullet.bulletAngle * TO_RADIANS); 
	bullet.bulletY += (0-bullet.speed) * Math.cos(bullet.bulletAngle * TO_RADIANS);
}

function bulletTraceMovingForward(bullet) {
	bullet.bulletX -= (3) * Math.sin(hero.angle * TO_RADIANS); 
	bullet.bulletY += (3) * Math.cos(hero.angle * TO_RADIANS);
}

function bulletTraceMovingBackward(bullet) {
	bullet.bulletX -= (0-(hero.speed)) * Math.sin(hero.angle * TO_RADIANS); 
	bullet.bulletY += (0-(hero.speed)) * Math.cos(hero.angle * TO_RADIANS);
}

function monsterState(monster) {
	if(monster.state == "idle") {
		//document.getElementById("testdiv2").innerHTML = timeControler.getSeconds() + " < " + setTimeState + " " + monster.angle + " --- " + hero.angle;
		if(timeControler.getSeconds() < setTimeState) {
			monster.angle = monster.angle + (Math.round((Math.random() * 2) - 1))*5;
			monster.x -= (monster.speed/12) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/12) * Math.cos(monster.angle * TO_RADIANS);
		}
		else {
			if(setTimeState >= 60) {
				setTimeState = Math.round(0 + ((Math.random() * 3) - 0));
			}
			else {
				setTimeState = Math.round(timeControler.getSeconds() + ((Math.random() * 3) - 0));
			}
			monster.angle = Math.round((Math.random() * 360) - 0);
		}
	}
	else if(monster.state == "attacking") {
		if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
		}
		else {
		//document.getElementById("testdiv").innerHTML =" ATTACKING!!!";
		monster.angle = (Math.atan2(290 - monster.y, 390 - monster.x) * 180 / Math.PI) - 90;
		monster.x -= (monster.speed/1.8) * Math.sin(monster.angle * TO_RADIANS);
		monster.y += (monster.speed/1.8) * Math.cos(monster.angle * TO_RADIANS);
		}
	}
	else if(monster.state == "hiding") {
		monster.x -= (monster.speed/0) * Math.sin(monster.angle * TO_RADIANS);
		monster.y += (monster.speed/0) * Math.cos(monster.angle * TO_RADIANS);
	}
	else if(monster.state == "startled") {
		if(timeControler.getTime() < monster.startledTime + 6050) {
			if (hero.x <= (monster.x + 18) && monster.x <= (hero.x + 18) && hero.y <= (monster.y + 18) && monster.y <= (hero.y + 18)) {
		}
		else {
			monster.angle = (Math.atan2(290 - monster.y, 390 - monster.x) * 180 / Math.PI) - 90;
			monster.x -= (monster.speed/1.5) * Math.sin(monster.angle * TO_RADIANS);
			monster.y += (monster.speed/1.5) * Math.cos(monster.angle * TO_RADIANS);
		}
		}
		else if(timeControler.getTime() > monster.startledTime + 6050) {
			monster.state = "idle";	
		}
		else {
		}
		
	}
	else if(monster.state == "insane") {
	}
	//document.getElementById("testdiv2").innerHTML = timeControler.getMilliseconds();
}

function monsterStateRevision(monster) {
	//document.getElementById("testdiv2").innerHTML = Math.sqrt((monster.x-400)*(monster.x-400) + (monster.y-300)*(monster.y-300)) + " " + monster.state + " " + monster.angle;
	if(monster.state == "startled") {
	}
	else {
	if(hero.walking == '1') {
		if(Math.sqrt((monster.x-400)*(monster.x-400) + (monster.y-300)*(monster.y-300)) < 200 + ((Math.random() * 5) -0) && monster.state != "startled") {
			monster.state = "attacking";
		}
		else {
			monster.state = "idle";
		}
	}
	else if(hero.walking == '0') {
		if(Math.sqrt((monster.x-400)*(monster.x-400) + (monster.y-300)*(monster.y-300)) < 250 + ((Math.random() * 5) -0) && monster.state != "startled") {
			monster.state = "attacking";
		}
		else {
			monster.state = "idle";
		}
	}
	}
}

function bulletTraceFade(bullet) {
	var bulletX;
	var bulletY;
	var opacityFiler;
	var tailLine = "";
	if(hero.gun == 'flamethrower') {
		tailLine = 7;
	}
	else {
		tailLine = 7;
	}
	for(x=0;x<tailLine;x++) {
		if(x==0) {
			bulletX = bullet.bulletX;
			bulletY = bullet.bulletY;
		}
		else {
		}
	bulletX -= (0+x) * Math.sin(bullet.bulletAngle * TO_RADIANS);
	bulletY += (0+x) * Math.cos(bullet.bulletAngle * TO_RADIANS);
	opacityFiler = 1/x;
	blueAdder = 12.8;
	blueFiler = 191+(x*2);
	if(hero.gun == "pistol") {
	ctx.fillStyle = 'rgba(0,' + blueFiler + ',255,' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	ctx.fillRect(bulletX-1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY-1,1,1);
	ctx.fillRect(bulletX+1,bulletY,1,1);
	ctx.fillRect(bulletX,bulletY+1,1,1);
	}
	else if(hero.gun == "flamethrower") {
	//ctx.fillStyle = 'rgba(0,' + blueFiler + ',255,' + opacityFiler + ')';
	//ctx.fillRect(bulletX+2,bulletY+2,2,2);
	//ctx.fillRect(bulletX-2,bulletY-2,2,2);
	//ctx.fillRect(bulletX,bulletY-2,2,2);
	//ctx.fillRect(bulletX,bulletY+2,2,2);
	//ctx.fillRect(bulletX,bulletY-2,2,2);
	//ctx.fillRect(bulletX-2,bulletY,2,2);
	//ctx.fillRect(bulletX+2,bulletY-2,2,2);
	//ctx.fillRect(bulletX-2,bulletY+2,2,2);
	}
	else if(hero.gun == "machinegun") {
	ctx.fillStyle = 'rgba(255,0,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);
	}
	else if(hero.gun == "shotgun") {
	ctx.fillStyle = 'rgba(255,255,0' + ',' + opacityFiler + ')';
	ctx.fillRect(bulletX,bulletY,1,1);	
	}
	else {
	}
}
}

function fixThisLampShit(coreX, coreY) {
	arrayOfNewAdditions = [];
	var realityStatus = true;
	//center coreX, coreY
	arrayOfNewAdditions.push({x:coreX, y:coreY,startPointX:0,startPointY:0});
	//top: coreX, coreY-1 - DONE
	//arrayOfNewAdditions.push({x:coreX, y:(coreY-1),startPointX:0+(400-tileDisplay.x),startPointY:-900+(600-tileDisplay.y)});
	arrayOfNewAdditions.push({x:coreX, y:(coreY-1),startPointX:0+(400-tileDisplay.x),startPointY:-900+(600-tileDisplay.y)});
	
	//bottom: coreX, coreY+1 - DONE
	//arrayOfNewAdditions.push({x:coreX, y:(coreY+1),startPointX:0+(400-tileDisplay.x),startPointY:900-tileDisplay.y});
	arrayOfNewAdditions.push({x:coreX, y:(coreY+1),startPointX:0+(400-tileDisplay.x),startPointY:900-tileDisplay.y});
	
	//left: coreX-1, coreY  - DONE
	//arrayOfNewAdditions.push({x:(coreX-1), y:coreY,startPointX:-1200+(800-tileDisplay.x),startPointY:0+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX-1), y:coreY,startPointX:-1200+(800-tileDisplay.x),startPointY:0+(300-tileDisplay.y)});
	
	//right: coreX+1, coreY - DONE
	//arrayOfNewAdditions.push({x:(coreX+1), y:coreY,startPointX:1200-tileDisplay.x,startPointY:0+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX+1), y:coreY,startPointX:1200-tileDisplay.x,startPointY:0+(300-tileDisplay.y)});
	
	//top right: coreX+1, coreY-1 - DONE
	//arrayOfNewAdditions.push({x:(coreX+1), y:(coreY-1),startPointX:800+(400-tileDisplay.x),startPointY:-600+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX+1), y:(coreY-1),startPointX:800+(400-tileDisplay.x),startPointY:-600+(300-tileDisplay.y)});
	
	//top left: coreX-1, coreY-1 - DONE
	//arrayOfNewAdditions.push({x:(coreX-1), y:(coreY-1),startPointX:-800+(400-tileDisplay.x),startPointY:-600+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX-1), y:(coreY-1),startPointX:-800+(400-tileDisplay.x),startPointY:-600+(300-tileDisplay.y)});
	
	//bottom right: coreX+1, coreY+1 - DONE
	//arrayOfNewAdditions.push({x:(coreX+1), y:(coreY+1),startPointX:800+(400-tileDisplay.x),startPointY:600+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX+1), y:(coreY+1),startPointX:800+(400-tileDisplay.x),startPointY:600+(300-tileDisplay.y)});
	
	//bottom left: coreX-1, coreY+1 - DONE
	//arrayOfNewAdditions.push({x:(coreX-1), y:(coreY+1),startPointX:-800+(400-tileDisplay.x),startPointY:600+(300-tileDisplay.y)});
	arrayOfNewAdditions.push({x:(coreX-1), y:(coreY+1),startPointX:-800+(400-tileDisplay.x),startPointY:600+(300-tileDisplay.y)});
	
	for(g=0;g<arrayOfNewAdditions.length;g++) {
		for(l=0;l<numberOfLampsOnScreen.length;l++) {
		if(arrayOfNewAdditions[g].x == numberOfLampsOnScreen[l].indexX && arrayOfNewAdditions[g].y == numberOfLampsOnScreen[l].indexY) {
			realityStatus = false;
			//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "POSITIVE! <br />";
		}
		}
	if(realityStatus == true) {
		//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + "lamp to be pushed! <br />";
		addLampToScreenArrayVersion2(arrayOfNewAdditions[g].x,arrayOfNewAdditions[g].y, arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY);
		//Tilf�j monstre indenfor det givne omr�de!
		var randomNumber = Math.round(Math.random() * 1 + 2);
		for(x=0;x<randomNumber;x++) {
			spawnMonster(arrayOfNewAdditions[g].startPointX, arrayOfNewAdditions[g].startPointY);
		}
	}
	else {
	}
	realityStatus = true;
}
}

function drawTileShadow(tileStartPointX, tileStartPointY, lightX,lightY) {
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgba(0,0,0,0.80)';
	var imageLength = 300;
	var canvasLength = 800;
	var canvasHeight = 600;	
	ctx.fillRect(tileStartPointX,tileStartPointY , lightX-tileStartPointX, lightY-tileStartPointY);
	ctx.fillRect(lightX,tileStartPointY ,imageLength, lightY-tileStartPointY);
	ctx.fillRect(lightX+imageLength,tileStartPointY, canvasLength-(lightX-tileStartPointX+300), lightY-tileStartPointY);
	ctx.fillRect(tileStartPointX,lightY, lightX-tileStartPointX, imageLength);
	ctx.fillRect(lightX+imageLength,lightY, canvasLength-(lightX-tileStartPointX+300), imageLength);
	ctx.fillRect(tileStartPointX,lightY+imageLength, lightX-tileStartPointX, canvasHeight-(lightY-tileStartPointY+300));
	ctx.fillRect(lightX,lightY+imageLength , imageLength, canvasHeight-(lightY-tileStartPointY+300));
	ctx.fillRect(lightX+imageLength,lightY+imageLength , canvasLength-(lightX-tileStartPointX+300), canvasHeight-(lightY-tileStartPointY+300));
}

function displayMonsterHealth(monster) {
	try {
		if(monster.state != 'idle' || monster.health < monster.fullHealth) {
			if(monster.health > monster.fullHealth/100*80) {
				ctx.fillStyle ='rgba(22,255,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*80 && monster.health > monster.fullHealth/100*60) {
				ctx.fillStyle = 'rgba(255,183,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*60 && monster.health > monster.fullHealth/100*40) {
				ctx.fillStyle = 'rgba(255,135,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*40 && monster.health > monster.fullHealth/100*20) {
				ctx.fillStyle = 'rgba(255,98,5,1)';
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
			else if(monster.health <= monster.fullHealth/100*20 && monster.health > monster.fullHealth/100*0) {
				ctx.fillStyle = 'rgba(255,41,5,1)'
				ctx.fillRect(monster.x-15,monster.y-25,25*(monster.health/monster.fullHealth),2);
			}
	}
	}
	catch(err) {
	}
}

function addLampToScreenArrayVersion2(indexXX,indexYY,startPointX,startPointY) {
	var randomXvalue = Math.round((Math.floor(Math.random() * 400) + (startPointX+100)));
	var randomYvalue = Math.round((Math.floor(Math.random() * 200) + (startPointY+100)));
	//randomXvalue = startPointX;
	//randomYvalue = startPointY;
	var lampPost = {
	tileStartPointX:startPointX,
	tileStartPointY:startPointY,
	indexX:indexXX,
	indexY:indexYY,
	radius: 300,
	on:1,
	x: randomXvalue,
	y: randomYvalue,
	color: '0,0,0',
	centerX:randomXvalue + 150,
	centerY:randomYvalue + 150
	};
	numberOfLampsOnScreen.push(lampPost);
	//document.getElementById("testdiv2").innerHTML = document.getElementById("testdiv2").innerHTML + numberOfLampsOnScreen.length + ": lamp pushed: " + indexXX + "," + indexYY + " | " + randomXvalue + "," + randomYvalue + " | " + startPointX + "," + startPointY + "<br />";
}

function spawnMonster(xStart, yStart) {
	var randomX;
	var randomY;
	if(xStart < 0) {
		randomX = Math.round((Math.random() * (xStart - (xStart+canvas.width))));
	}
	else if(xStart == 0) {
		randomX = Math.round((Math.random() * canvas.width + xStart));
	}
	else {
		randomX = Math.round((Math.random() * (canvas.width) + xStart));
	}
	
	if(yStart < 0) {
		randomY = Math.round((Math.random() * (yStart - (yStart+canvas.height))));
	}
	else if(yStart == 0) {
		randomY = Math.round((Math.random() * canvas.height + yStart));
	}
	else {
		randomY = Math.round((Math.random() * (canvas.height) + yStart));
	}	

	var monster = {
		x: randomX,
		y: randomY,
		speed: 6,
		angle:(Math.random() * 360 - 0),
		state:"idle",
		category: 2,
		fullHealth:100,
		health: 100,
		timeOfDeath:0,
		damage:20,
		damageInterval:500,
		drop:"none",
		startledTime:0,
		attackTime:0,
		attackIni:0,
		hit:0,
		hitOpacity:0,
		hitPeaked:0,
		skin: Math.round((Math.random() * 2 + 1))
	};
	monsterArray.push(monster);
	//console.log(monster.x + "," + monster.y + " | " + xStart + "," + yStart);
}

function bulletFire(damageDealt) {
	var bulletAngleFromHero;
	if(hero.gun == 'shotgun') {
		bulletAngleFromHero = hero.angle + (Math.random() * 31) - 15;
	}
	else if(hero.gun == 'machinegun') {
		bulletAngleFromHero = hero.angle + (Math.random() * 5) - 2;
	}
	else if(hero.gun == 'flamethrower') {
		bulletAngleFromHero = hero.angle + (Math.random() * 21) - 10;
	}
	else {
		bulletAngleFromHero = hero.angle;
	}
	var bullet = {
	firedFrom:hero.gun,
	bulletNumber: bulletCounter,
	timeOfShot:timeControler,
	bulletReleaseTime: new Date(),
	speed: 10, // movement in pixels per second
	bulletDamage: damageDealt,
	bulletStartX:hero.x,
	bulletStartY:hero.y,
	bulletX: hero.x,
	bulletY: hero.y,
	bulletAngle: bulletAngleFromHero
	};
	bulletCounter = bulletCounter + 1;
	bulletArray.push(bullet);
}	
	
function mapControl() {
	var newTile = 0;
	if(backgroundObjectArray[8].y > 300) {
		//new tile upwards!
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].y = backgroundObjectArray[j].y - 600;
			//document.getElementById("testdiv").innerHTML = "Ny tile op!";
		}
		tileDisplay.y = tileDisplay.y + 600;
		newTile = 1;
		gameDisplay.indexY = gameDisplay.indexY - 1;
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
		
	}
	if(backgroundObjectArray[8].y < -300) {
		//new tile downwards
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].y = backgroundObjectArray[j].y + 600;
			//document.getElementById("testdiv").innerHTML = "Ny tile ned!";
		}
		tileDisplay.y = tileDisplay.y - 600;
		newTile = 1;
		gameDisplay.indexY = gameDisplay.indexY + 1;
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
	}
	if(backgroundObjectArray[8].x > 400) {
		//new tile rightside
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].x = backgroundObjectArray[j].x - 800;
			//document.getElementById("testdiv").innerHTML = "Ny tile h�jre!";
		}
		tileDisplay.x = tileDisplay.x + 800;
		newTile = 1;
		gameDisplay.indexX = gameDisplay.indexX - 1;
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
	}
	if(backgroundObjectArray[8].x < -400) {
		//new tile leftside
		for(j=0;j<backgroundObjectArray.length;j++) {
			backgroundObjectArray[j].x = backgroundObjectArray[j].x + 800;
			//document.getElementById("testdiv").innerHTML = "Ny tile venstre!";
		}
		tileDisplay.x = tileDisplay.x - 800;
		newTile = 1;
		gameDisplay.indexX = gameDisplay.indexX + 1;
		fixThisLampShit(gameDisplay.indexX,gameDisplay.indexY);
	}	
}

function drawRotatedImage(image, x, y, angle) {
    ctx.save(); 
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    ctx.drawImage(image, -(image.width/2), -(image.height/2));
    ctx.restore(); 
}

function drawRotatedMonster(image, x, y, angle, sizeX, sizeY) {
    ctx.save(); 
    ctx.translate(x, y);
    ctx.rotate(angle * TO_RADIANS);
    //ctx.drawImage(image, -(image.width/2), -(image.height/2),sizeX,sizeY);
    ctx.drawImage(image, -(15), -(15), sizeX, sizeY);
    ctx.restore(); 
}

// Let's play this game!
var then = Date.now();
reset();
main();
