//
//	GAME STARTUP. LET'S DO THIS!
//
// Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//canvas.width = 1024;
//canvas.height = 768;
canvas.width = 800;
canvas.height = 600;
document.getElementById("gameContainer").appendChild(canvas);
var TO_RADIANS = Math.PI/180;

function playgame() {
	//set interface buttons
	document.getElementById('restartGameFromStats').onclick=function(){reset(drops,gameVariables,gameArrays,inventory,hero,keyPressed,backgroundImage,gameDisplay,tileDisplay,keysDown,tileArray,schematics,missionArray,environmentalPoints);};
	document.getElementById('weaponMachete').onclick=function(){selectWeapon('machete',hero);};
	document.getElementById('weaponPistol').onclick=function(){selectWeapon('pistol',hero);};
	document.getElementById('weaponShotgun').onclick=function(){selectWeapon('shotgun',hero);};
	document.getElementById('weaponMachinegun').onclick=function(){selectWeapon('machinegun',hero);};
	document.getElementById('weaponFlamethrower').onclick=function(){selectWeapon('flamethrower',hero);};
	//document.getElementById('utilitiesGranade').onclick=function(){throwingGranade(gameArrays);};
	document.getElementById('utilitiesAntidote').onclick=function(){useAntidote(hero);};
	document.getElementById('utilitiesMedkit').onclick=function(){useMedkit(hero);};
	document.getElementById('gameInventory').onclick=function(){showInventory('Inventory',inventory, gameVariables,this.id,schematics,hero);};
	document.getElementById('gameSchematics').onclick=function(){showInventory('Schematics',inventory, gameVariables,this.id,schematics,hero);};
	document.getElementById('testbutton').onclick=function(){};

	// Arrays and variables.
	var gameArrays = {
		backgroundArray:[],
		backgroundObjectArray:[],
		numberOfLampsOnScreen:[],
		monsterArray:[],
		bulletArray:[],
		granadeArray:[],
		thrownGranadeArray:[],
		archivedObjectArray:[],
		archivedBulletArray:[],
		archivedMonsterArray:[],
		archivedGranadeArray:[],
		objectArray:[],
	};

	var drops = [
		{name:"Handgun rounds",imgName:"handgunRounds",amount:"7",offset:"12",itemType:"ammo"},
		{name:"Shotgun shells",imgName:"shotgunShells",amount:"8",offset:"13",itemType:"ammo"},
		{name:"Machinegun magazine",imgName:"machinegunMagazine",amount:"30",offset:"22",itemType:"ammo"},
		{name:"Flamethrower shells",imgName:"flamethrowerShells",amount:"50",offset:"28",itemType:"ammo"},
		{name:"Schematic: Rocketbooster boots",imgName:"schematicBoots",amount:"1",offset:"34",itemType:"schematic",description:"A set of rocket boots that will increase your running speed.",materials:[{name:"Rocket fuel",constructor:"rocketFuel",amount:5},{name:"Leather straps",constructor:"leatherStraps",amount:8},{name:"Metal scrap",constructor:"metalScrap",amount:9},{name:"Electronic components",constructor:"electronicComponents",amount:6},{name:"Wires",constructor:"wires",amount:4}]},
		{name:"Schematic: Lazerscope",imgName:"schematicScope",amount:"1",offset:"30",itemType:"schematic",description:"A laser scope on your weapons which will make aiming easier.",materials:[{name:"Lenses",constructor:"lenses",amount:4},{name:"Broken scope",constructor:"brokenScope",amount:1},{name:"Screws",constructor:"screws",amount:10},{name:"Steel tube",constructor:"steelTube",amount:1},{name:"Glass shards",constructor:"glassShard",amount:4},{name:"Gaffe tape",constructor:"gaffaTape",amount:1}]},
		{name:"Schematic: Radio",imgName:"schematicRadio",amount:"1",offset:"15",itemType:"schematic",description:"A small radio which will let you talk to the base without having to run back.",materials:[{name:"Screws",constructor:"screws",amount:10},{name:"Broken antenna",constructor:"brokenAntenna",amount:1},{name:"Speaker unit",constructor:"speakerUnit",amount:1},{name:"Battery",constructor:"battery",amount:1},{name:"Steel case",constructor:"steelCase",amount:1},{name:"Wires",constructor:"wires",amount:10},{name:"Handful of transistors",constructor:"transistors",amount:10}]},
		{name:"Schematic: Thermo-goggles",imgName:"schematicGoogles",amount:"1",offset:"28",itemType:"schematic",description:"A pair of glasses which will let you see monster more easily.",materials:[{name:"Lenses",constructor:"lenses",amount:2},{name:"Screws",constructor:"screws",amount:10},{name:"Metal scrap",constructor:"metalScrap",amount:12},{name:"Electronic components",constructor:"electronicComponents",amount:6},{name:"Wires",constructor:"wires",amount:12},{name:"Battery",constructor:"battery",amount:2}]},
		{name:"Schematic: Pulse-Emitter",imgName:"schematicPulse",amount:"1",offset:"27",itemType:"schematic",description:"A device setting off a pulse, damaging all monsters in range.",materials:[{name:"Broken antenna",constructor:"brokenAntenna",amount:1},{name:"Small electronic screen",constructor:"smallElectronicScreen",amount:1},{name:"Wires",constructor:"wires",amount:8},{name:"Metal scrap",constructor:"metalScrap",amount:6},{name:"Electronic components",constructor:"electronicComponents",amount:6},{name:"Gaffa tape",constructor:"gaffaTape",amount:3},{name:"Steel case",constructor:"steelCase",amount:1},{name:"Battery",constructor:"battery",amount:1},{name:"Screws",constructor:"screws",amount:5}]},
		{name:"Schematic: Scavanger 101",imgName:"schematicTrash",amount:"1",offset:"27",itemType:"schematic",description:"A device that lets you identify monsters which will drop loot.",materials:[{name:"Handful of transistors",constructor:"transistors",amount:5},{name:"Broken antenna",constructor:"brokenAntenna",amount:1},{name:"Battery",constructor:"battery",amount:2},{name:"Small electronic screen",constructor:"smallElectronicScreen",amount:1},{name:"Wires",constructor:"wires",amount:5},{name:"Steel case",constructor:"steelCase",amount:1}]},
		{name:"Desert Eagle",imgName:"pistol",amount:"1",offset:"8",itemType:"gun"},
		{name:"MAC-7",imgName:"shotgun",amount:"1",offset:"1",itemType:"gun"},
		{name:"AK-47",imgName:"machinegun",amount:"1",offset:"1",itemType:"gun"},
		{name:"M1A1 Flamethrower",imgName:"flamethrower",amount:"1",offset:"14",itemType:"gun"},
		{name:"Medkit",imgName:"medkit",amount:"1",offset:"2",itemType:"utility"},
		{name:"Antidote",imgName:"antidote",amount:"1",offset:"5",itemType:"utility"},
		{name:"Granade",imgName:"granade",amount:"1",offset:"4",itemType:"utility"},
		{name:"Broken scope",imgName:"brokenScope",amount:"1",offset:"8",itemType:"mat"},
		{name:"Lenses",imgName:"lenses",amount:"2",offset:"2",itemType:"mat"},
		{name:"Screws",imgName:"screws",amount:"5",offset:"5",itemType:"mat"},
		{name:"Metal scrap",imgName:"metalScrap",amount:"2",offset:"15",itemType:"mat"},
		{name:"Battery",imgName:"battery",amount:"1",offset:"7",itemType:"mat"},
		{name:"Electronic components",imgName:"electronicComponents",amount:"3",offset:"26",itemType:"mat"},
		{name:"Wires",imgName:"wires",amount:"4",offset:"3",itemType:"mat"},
		{name:"Steel case",imgName:"steelCase",amount:"1",offset:"9",itemType:"mat"},
		{name:"Small electronic screen",imgName:"smallElectronicScreen",amount:"1",offset:"27",itemType:"mat"},
		{name:"Broken antenna",imgName:"brokenAntenna",amount:"1",offset:"15",itemType:"mat"},
		{name:"Steel tube",imgName:"steelTube",amount:"1",offset:"7",itemType:"mat"},
		{name:"Glass shards",imgName:"glassShard",amount:"2",offset:"8",itemType:"mat"},
		{name:"Rocket fuel",imgName:"rocketFuel",amount:"1",offset:"6",itemType:"mat"},
		{name:"Speaker unit",imgName:"speakerUnit",amount:"1",offset:"8",itemType:"mat"},
		{name:"Leather straps",imgName:"leatherStraps",amount:"2",offset:"15",itemType:"mat"},
		{name:"Gaffa tape",imgName:"gaffaTape",amount:"1",offset:"7",itemType:"mat"},
		{name:"Handful of transistors",imgName:"transistors",amount:"10",offset:"28",itemType:"mat"},
		//{name:"Zombie specimen",imgName:"zombieSpecimen",amount:"1",offset:"15",itemType:"questDrop"}
	];

	var hero = {
		death:0,
		health:100,
		initialSpeed:5, // movement in pixels per second
		speed: 5, // current in pixels per second
		angle:0,
		walking: 0,
		machete:1,
		lastFire:0,
		macheteDamage:13,
		pistol:1,
		pistolDamage:35,
		machinegun:0,
		machinegunDamage:20,
		shotgun:0,
		shotgunDamage:30,
		flamethrower:0,
		flamethrowerDamage:40,
		gun: "machete",
		gunshots:40,
		machinegunshots:0,
		shotgunshots:0,
		flameshells:0,
		clip:7,
		machinegunclip:30,
		shotgunclip:8,
		medkit:0,
		isPoisoned:1,
		antidote:0,
		flashlight:"on",
		armor:0,
		radioObtained:0, // 1
		radioOn:0,
		heatGogglesObtained:0, // 2
		heatGogglesOn:0,
		scopeObtained:0, // 3
		scopeOn:0,
		scavangerObtained:0, // 4
		scavangerOn:0,
		rocketBootsObtained:0, // 5
		rocketBootsOn:0,
		pulseTransmitterObtained:0, //6
		pulseTransmitterFired:0,
		pulseTransmitterFiredTime:0,
		pulseTransmitterCountdown:0,
		pulseTransmitterCounter:4,
		reloadDelay:0,
		missionProgress:0,
		currentMission:0,
		missionPresented:0
	};

	var missionArray = [
		//0: Get to basecamp.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Basecamp",indexX:0,indexY:0,completed:"no",statement:"Find the basecamp.",message:"Listen up soldier! You've been deployed to check out this zombie threat - Go find the basecamp and get your orders!",completion:"Welcome, soldier!"}
		],
		//1: Get Radio schematic & find the city.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"City of Valisburg",indexX:0,indexY:0,completed:"no",statement:"Find the city.",message:"Your first objective is to get to the city of Valisburg, and see if you can find any survivors who can tell us what the hell happend!",completion:"So, you found the city, soldier!"},
			objective = {completionTime:0,func:"secondary",type:"get",item:"Schematic: Radio",amount:1,gathered:0,completed:"no",statement:"Build a radio.",message:"Our engineers fixed together a schematic for a low-end radio - See if you can find the materials required, so you can communicate with the base on radio - otherwise you have to run back here to report back!",completion:"*Rrrrrrr* Come in, soldier. Well done, now we can communicate over radio. Now get back to work on your primary objectives. Over."}
		],
		//2: Kill 50 zombies & find survivor.
		mission = [
			objective = {completionTime:0,func:"primary",type:"kill",name:"Zombie",amount:50,gathered:0,completed:"no",statement:"Kill 50 zombies.",message:"Looks like the city has been infected allright. Get to sorting it out, soldier!",completion:"Well done, that should make it possible to start rebuilding here"},
			objective = {completionTime:0,func:"primary",type:"interact",interacted:0,name:"Survivor",indexX:0,indexY:0,x:0,y:0,completed:"no",statement:"Find and talk to the survivor.",message:"Also, look for any survivors who might know what the hell happend here, and report back what they have to tell. Move out!",completion:"You're not infected?! You must get out of there. That madman scientist Albert Nokovic released a toxin that turned everyone into zombies. It's horrible!"}
		],
		//3: Back go base to tell story.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Basecamp",indexX:0,indexY:0,completed:"no",statement:"Find the basecamp.",message:"You must go back to tell your commander what happened!",completion:"Well, soldier, what did you discover?"}
		],
		//4: Collect 10 specimens from monsters.
		mission = [
			objective = {completionTime:0,func:"primary",type:"get",name:"Specimens",amount:10,gathered:0,completed:"no",statement:"Get 10 specimens from zombies.",message:"This doesn't look good, soldier. We need to find out what caused this - by getting some examples. Gather 10 specimens from the zombies, and bring them back to our researchers for testing.",completion:"Good job, soldier! Hopefully our scientists will be able to find out what the hell is going on!"}
		],
		//5: Find ground zero.
		//IMPORTANT! Given a radio if they don't have one!
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Ground zero",indexX:0,indexY:0,completed:"no",statement:"Locate ground zero.",message:"In the meantime, i got a new job for you! We located ground zero of the disaster, and we need someone to go check it out! That's right - you, soldier! Get moving!",completion:"*Rrrrrrr* So, you found it. Any clues about what caused this? What's that sound in the back? Are you being attacked? Soldier? SOLDIER, REPORT ABACK!"}
		],
		//6: Ambushed - kill the attackers.
		mission = [
			objective = {completionTime:0,func:"primary",type:"kill",name:"Zombie",amount:25,gathered:0,completed:"no",statement:"Kill 25 zombies",message:"Survive the attacks!",completion:"Well done!"},
			objective = {completionTime:0,func:"primary",type:"kill",name:"Super zombie",amount:6,gathered:0,completed:"no",statement:"Kill 6 super zombies",message:"Survive the attacks!",completion:"nice!"},
			objective = {completionTime:0,func:"primary",type:"kill",name:"Master zombie",amount:3,gathered:0,completed:"no",statement:"Kill 3 master zombies",message:"Survive the attack",completion:"Excellent!"}
		],
		//7: Back to base, its under attack.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Basecamp",indexX:0,indexY:0,completed:"no",statement:"Get back to the basecamp.",message:"*Rrrrrrr* Soldier! Get back to the base immedieately - we're under attack!",completion:"Help us!"}
		],
		//8: Repel attack
		mission = [
			objective = {completionTime:0,func:"primary",type:"kill",amount:30,gathered:0,completed:"no",message:"Kill the intruders!",statement:"Repel the attack.",completion:"Good work soldier - they appeared shortly after you left!"},
		],
		//9: Antidote probably fixed - need stuff to test.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Forest",indexX:0,indexY:0,completed:"no",statement:"Find the forest.",message:"Our scientists believe they've worked out a cure - they need you to go to the forest and get the following items!",completion:"Good work, soldier!"},
			objective = {completionTime:0,func:"primary",type:"get",item:"Elderweed",amount:10,gathered:0,completed:"no",statement:"Gather 10 Elderweed.",message:"Find some elderweed",completion:"This should do."},
			objective = {completionTime:0,func:"primary",type:"get",item:"Zombie excrement",amount:5,gathered:0,completed:"no",statement:"Gather 5 zombie excrement",message:"Find some zombie excrement *Ewww*",completion:"This should do... fine..."},
			objective = {completionTime:0,func:"primary",type:"get",item:"Butterfly dust",amount:5,gathered:0,completed:"no",statement:"Gather 5 butterfly dust",message:"Fund some butterfly dust",completion:"Excellent, this is the stuff"}
		],
		//10: deliver to base.
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Basecamp",indexX:0,indexY:0,completed:"no",statement:"Get back to the basecamp with the stuff.",message:"*Rrrrrrr* Have you found the items? Then get back here, damnit!",completion:"That took you long enough - hand it over! We should be able to cure the zombies now."}
		],
		//11: Base discovered master moster hide out. Get there!
		mission = [
			objective = {completionTime:0,func:"primary",type:"find",name:"Zombie playground",indexX:0,indexY:0,completed:"no",statement:"Find the zombie playground.",message:"While you worked out the cure, we discovered the zombie base. Get there and end the threat once and for all, so no other people can be infected!",completion:"*Rrrrrr* You've found it, good job!"}
		],
		//12: Kill master monster!
		mission = [
			objective = {completionTime:0,func:"primary",type:"kill",name:"Zombie boss",amount:1,gathered:0,completed:"no",statement:"Kill the zombie boss.",message:"Kill their leader, fast! Before too many of his zombie-servants get to you!",completion:"You did it!"}
		],
		//13: Yay, you saved the world! Party the night away!
		mission = [
			objective = {completionTime:0,func:"primary",type:"win",name:"Win",completed:"yes",statement:"Party your socks off!",message:"You really did it! You saved the world! Well done, soldier!",completion:"Game completed"}
		]
	];

	//console.log(missionArray);

	var environmentalPoints = {
		basecampPosition:{indexX:0,indexY:0,name:"Basecamp"},
		cityPosition:{indexX:0, indexY:0,name:"City of Valisburg"},
		survivorPosition:{indexX:0,indexY:0,name:"Lone survivor"},
		forestPosition:{indexX:0,indexY:0,name:"Forest"},
		groundZeroPosition:{indexX:0,indexY:0,name:"Ground zero"},
		zombiePlayground:{indexX:0,indexY:0,name:"Zombie playground"}
	};
	var gameDisplay  = {x: canvas.width/2, y:canvas.height/2, indexX:0, indexY:0};
	var tileDisplay = {x:canvas.width/2,y:canvas.height/2};
	var inventory = {};
	var schematics = [];
	var background = {};
	var tileArray = {};
	var keysDown = {};
	var keyPressed = {};
	var gameVariables = {
		gameStopped:0,
		missionType:"Flashlight",
		numberOfDrops:0,
		bulletCounter:0,
		newPick:"no",
		hasFired:0,
		isPressed:0,
		timeStamp:new Date(),
		timeStart:new Date(),
		timeEnd:"",
		timeControler:new Date(),
		setTimeState:0,
		heroImageUsed:"graphics/hero-new/hero-standing-sword.png"
	};

	gameVariables.setTimeState = gameVariables.timeControler.getSeconds() + 3;

	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	//
	//Images
	//

	//Flash image
	var flashReady = false;
	var flashImage = new Image();
	flashImage.onload = function () {
		 flashReady = true;
	};
	flashImage.src = "graphics/flashlight80-edit2.png";

	//Background image
	var backgroundImage = "graphics/grasstry2.png";
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

	//Explosion image
	var explosionReady = false;
	var explosionImage = new Image();
	explosionImage.onload = function () {
		explosionReady = true;
	};
	explosionImage.src = "graphics/explosion3.png";

	//arrow image
	var arrowImageReady = false;
	var arrowImage = new Image();
	arrowImage.onload = function () {
		arrowImageReady = true;
	};
	arrowImage.src = "graphics/starreplace-blue.png";

	//Hero images
	var heroArray = ['graphics/hero-new/hero-standing-machete.png','graphics/hero-new/hero-standing-pistol.png','graphics/hero-new/hero-standing-shotgun.png','graphics/hero-new/hero-standing-machinegun.png','graphics/hero-new/hero-standing-flamethrower.png'];
	for(y=0;y<heroArray.length;y++) {
		var heroReady = false;
		var heroImage = new Image();
		heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = heroArray[y];
	}

	//drop images
	var objectImageArray = [];
	for(h=0;h<drops.length;h++) {
		objectImageArray[h] = new Image();
		objectImageArray[h].src = "graphics/" + "star.png";//drops[h].imgName + ".png";
	}

	//Treasure image
	var treasureReady = false;
	var treasureImage = new Image();
	treasureImage.onload = function () {
		treasureReady = true;
	};
	treasureImage.src = "graphics/star-green.png";

	//Monster images
	var monster1Ready = false;
	var monsterImage1 = new Image();
	var monster2Ready = false;
	var monsterImage2 = new Image();
	var monster3Ready = false;
	var monsterImage3 = new Image();
	var monster1IdleReady = false;
	var monsterImageIdle1 = new Image();
	var monster2IdleReady = false;
	var monsterImageIdle2 = new Image();
	var monster3IdleReady = false;
	var monsterImageIdle3 = new Image();

	var monster1HeatIdle = new Image();
	monster1HeatIdle.src = "graphics/monster1-temp-idle.png"
	var monster2HeatIdle = new Image();
	monster2HeatIdle.src = "graphics/monster2-temp-idle.png"
	var monster3HeatIdle = new Image();
	monster3HeatIdle.src = "graphics/monster3-temp-idle.png"

	var monster1HeatAttack = new Image();
	monster1HeatAttack.src = "graphics/monster1-temp.png"
	var monster2HeatAttack = new Image();
	monster2HeatAttack.src = "graphics/monster2-temp.png"
	var monster3HeatAttack = new Image();
	monster3HeatAttack.src = "graphics/monster3-temp.png"

	var tree1 = new Image();
	tree1.src = "graphics/firsttree.png";
	var tree2 = new Image();
	tree2.src = "graphics/secondtree.png";

	monsterImage1.onload = function () {
		monster1Ready = true;
	};
	monsterImage2.onload = function () {
		monster2Ready = true;
	};
	monsterImage3.onload = function () {
		monster3Ready = true;
	};
	monsterImageIdle1.onload = function () {
		monster1IdleReady = true;
	};
	monsterImageIdle2.onload = function () {
		monster2IdleReady = true;
	};
	monsterImageIdle3.onload = function () {
		monster3IdleReady = true;
	};
	monsterImage1.src = "graphics/monster1.png";
	monsterImage2.src = "graphics/monster2.png";
	monsterImage3.src = "graphics/monster3.png";
	monsterImageIdle1.src = "graphics/monster1-idle.png";
	monsterImageIdle2.src = "graphics/monster2-idle.png";
	monsterImageIdle3.src = "graphics/monster3-idle.png";

	// Game objects

	var objective1 = {
		mission: 1,
		kills:40,
		discover:"door"
	}

	var objective2 = {
		mission: 2,
		kills:50,
		obtain:"blood"
	}

	var objective3 = {
		mission: 3,
		kills:50,
		save:5
	}

	var objective4 = {
		mission: 4,
		last:5
	}

	//console.log(objective1.hasOwnProperty('kills'));

	granadeToPlayer(200,75, gameArrays.granadeArray);
	granadeToPlayer(200,75, gameArrays.granadeArray);
	granadeToPlayer(200,75, gameArrays.granadeArray);

	initiateBackground(gameArrays.backgroundArray, gameArrays.backgroundObjectArray, backgroundImage);
	initialNineTileGameboard(gameArrays.numberOfLampsOnScreen, gameArrays.monsterArray);
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode]; if(hero.gun === 'pistol' || hero.gun === 'shotgun' || hero.gun === 'machete') {gameVariables.hasFired = 0;} else {gameVariables.isPressed = 0;}}, false);

	// Update game objects
	var update = function () {
		if(hero.death === 0) {
		gameVariables.timeControler = new Date();
		if(hero.angle > 360) {
			hero.angle = 0;
		}
		else if(hero.angle <0) {
			hero.angle = 360;
		}
		if (38 in keysDown) { // Player holding up - moving forward
			//runningAnimation();
			if(hero.walking === 1) {
				hero.speed = (hero.initialSpeed/5)*3;
			}
			else {
				hero.speed = (hero.initialSpeed/5)*7;
			}
			newPositionBackward(gameDisplay,hero);
			newPositionBackward(tileDisplay,hero);
			for(u=0;u<gameArrays.monsterArray.length;u++) {
				newPositionForwardMonster(gameArrays.monsterArray[u],hero);
			}
			for(o=0;o<gameArrays.objectArray.length;o++) {
				newPositionForward(gameArrays.objectArray[o],hero);
			}
			for(n=0;n<gameArrays.thrownGranadeArray.length;n++) {
				newPositionForward(gameArrays.thrownGranadeArray[n],hero);
			}
			for(h=0;h<gameArrays.numberOfLampsOnScreen.length;h++) {
				newPositionForward(gameArrays.numberOfLampsOnScreen[h],hero);
				newPositionForwardShadow(gameArrays.numberOfLampsOnScreen[h],hero);
			}
			for(h=0;h<gameArrays.backgroundArray.length;h++) {
				//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
				newPositionForward(gameArrays.backgroundObjectArray[h],hero);
			}
			for(f=0;f<gameArrays.bulletArray.length;f++) {
				//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos UP";
				bulletTraceMovingForward(gameArrays.bulletArray[f],hero);
			}
		}
		else {
			gameVariables.heroImageUsed = "graphics/hero-new/hero-standing-" + hero.gun + ".png";
			heroImage.src = gameVariables.heroImageUsed;
		}

		if (16 in keysDown) {
			hero.walking = 1;
		}
		else {
			hero.walking = 0;
		}
		if (40 in keysDown) { // Player holding down -  moving backwards
			//runningAnimation();
			if(hero.walking === 1) {
				hero.speed = (hero.initialSpeed/5)*1;
			}
			else {
				hero.speed = (hero.initialSpeed/5)*3;
			}
			newPositionForward(gameDisplay,hero);
			newPositionForward(tileDisplay,hero);
			for(u=0;u<gameArrays.monsterArray.length;u++) {
				newPositionBackwardMonster(gameArrays.monsterArray[u],hero);
			}
			for(o=0;o<gameArrays.objectArray.length;o++) {
				newPositionBackward(gameArrays.objectArray[o],hero);
			}
			for(n=0;n<gameArrays.thrownGranadeArray.length;n++) {
				newPositionBackward(gameArrays.thrownGranadeArray[n],hero);
			}
			for(h=0;h<gameArrays.numberOfLampsOnScreen.length;h++) {
				newPositionBackward(gameArrays.numberOfLampsOnScreen[h],hero);
				newPositionBackwardShadow(gameArrays.numberOfLampsOnScreen[h],hero);
			}
			for(h=0;h<gameArrays.backgroundArray.length;h++) {
				//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
				newPositionBackward(gameArrays.backgroundObjectArray[h],hero);
			}
			for(f=0;f<gameArrays.bulletArray.length;f++) {
				//document.getElementById("testdiv").innerHTML = document.getElementById("testdiv").innerHTML + "<br />" + "updating pos DOWN";
				bulletTraceMovingBackward(gameArrays.bulletArray[f],hero);
			}
			//monster.y -= hero.speed * modifier;

		}
		if (37 in keysDown) { // Player holding left
			if(hero.walking === 1) {
			hero.angle -= 1;
			}
			else {
			hero.angle -= 2.5;
			}

		}
		if (39 in keysDown) { // Player holding right
			if(hero.walking === 1) {
			hero.angle += 1;
			}
			else {
			hero.angle += 2.5;
			}
		}

		if (82 in keysDown) { //Reload
			if(hero.gun === 'pistol' && gameVariables.timeControler.getTime() > hero.reloadDelay + 550) {
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
				hero.reloadDelay = gameVariables.timeControler.getTime();

			}
			else if(hero.gun === 'machinegun' && gameVariables.timeControler.getTime() > hero.reloadDelay + 1050) {
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
				hero.reloadDelay = gameVariables.timeControler.getTime();
			}
			else if(hero.gun === 'shotgun' && gameVariables.timeControler.getTime() > hero.reloadDelay + 2050) {
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
				hero.reloadDelay = gameVariables.timeControler.getTime();
			}
		}
		if(17 in keysDown) { //Granade throw
			throwingGranade(gameArrays);
		}
		else {
			granadeStatus(gameArrays,gameVariables);
		}

		if(49 in keysDown && hero.machete === 1) {
			selectWeapon('machete',hero);
		}
		if(50 in keysDown && hero.pistol === 1) {
			selectWeapon('pistol',hero);
		}
		if(51 in keysDown && hero.shotgun === 1) {
			selectWeapon('shotgun',hero);
		}
		if(52 in keysDown && hero.machinegun === 1) {
			selectWeapon('machinegun',hero);
		}
		if(53 in keysDown && hero.flamethrower === 1) {
			selectWeapon('flamethrower',hero);
		}

		//Shot
		if(32 in keysDown && gameVariables.hasFired === 0){
				if(hero.gun === 'pistol' && hero.clip > 0) {
					delete keysDown[32];
					gameVariables.hasFired = 1;
					hero.clip = hero.clip - 1;
					bulletFire(hero.pistolDamage,hero,gameArrays.bulletArray,gameVariables);
					}
				else if(hero.gun === 'machinegun' && hero.machinegunclip > 0) {
					hero.machinegunclip = hero.machinegunclip - 1;
					gameVariables.hasFired = 0;
					bulletFire(hero.machinegunDamage,hero,gameArrays.bulletArray,gameVariables);
				}
				else if(hero.gun === 'shotgun' && hero.shotgunclip > 0 && gameVariables.timeControler.getTime() > hero.lastFire + 350) {
					delete keysDown[32];
					hero.lastFire = gameVariables.timeControler.getTime();
					gameVariables.hasFired = 1;
					hero.shotgunclip = hero.shotgunclip - 1;
					for(p=0;p<8;p++) {
					bulletFire(hero.shotgunDamage,hero,gameArrays.bulletArray,gameVariables);
					}
				}
				else if(hero.gun === 'flamethrower' && hero.flameshells > 0) {
					hero.flameshells = hero.flameshells - 1;
					gameVariables.hasFired = 0;
					bulletFire(hero.flamethrowerDamage,hero,gameArrays.bulletArray,gameVariables);
				}
				else if(hero.gun === 'machete' && gameVariables.timeControler.getTime() > hero.lastFire + 200) {
					delete keysDown[32];
					hero.lastFire = gameVariables.timeControler.getTime();
					gameVariables.hasFired = 1;
					bulletFire(hero.macheteDamage,hero,gameArrays.bulletArray,gameVariables);
				}
				else {
				//gameVariables.hasFired = 1;
				}
			}
			else {
			}

		if(69 in keysDown) {
			if(hero.pulseTransmitterObtained === 1) {
			firePulseTransmitter(hero,gameVariables.timeControler);
			}
		}

		//Pressing F
		if(70 in keysDown) {
			if(hero.flashlight === "on") {
				delete keysDown[70];
				gameVariables.isPressed = 1;
				hero.flashlight = "off";
			}
			else if(hero.flashlight === "off") {
				delete keysDown[70];
				gameVariables.isPressed = 1;
				hero.flashlight = "on";
			}
		}

		//Pressing I
		if(73 in keysDown) {
			showInventory('Inventory',inventory,gameVariables,'gameInventory',schematics,hero);
			delete keysDown[73];
			gameVariables.isPressed = 1;
		}

		//Update all bullets still on screen or fired
		for(i=0;i<gameArrays.bulletArray.length;i++) {
			for(l=0;l<gameArrays.monsterArray.length;l++) {
				try {
			//console.log((gameArrays.bulletArray[i].bulletX - gameArrays.monsterArray[l].x) * (gameArrays.bulletArray[i].bulletX - gameArrays.monsterArray[l].x) + (gameArrays.bulletArray[i].bulletY - gameArrays.monsterArray[l].y)*(gameArrays.bulletArray[i].bulletY - gameArrays.monsterArray[l].y) + " < " + 15*15);
			if((gameArrays.bulletArray[i].bulletX - gameArrays.monsterArray[l].x) * (gameArrays.bulletArray[i].bulletX - gameArrays.monsterArray[l].x) + (gameArrays.bulletArray[i].bulletY - gameArrays.monsterArray[l].y)*(gameArrays.bulletArray[i].bulletY - gameArrays.monsterArray[l].y) < 15*15) {
				gameArrays.bulletArray[i].bulletHit = 1;
			//if(gameArrays.bulletArray[i].bulletX <= (gameArrays.monsterArray[l].x + 30) && gameArrays.monsterArray[l].x <= (gameArrays.bulletArray[i].bulletX) && gameArrays.bulletArray[i].bulletY <= (gameArrays.monsterArray[l].y + 30) && gameArrays.monsterArray[l].y <= (gameArrays.bulletArray[i].bulletY)) {
					if(gameArrays.monsterArray[l].health-gameArrays.bulletArray[i].bulletDamage > 0) {
						gameArrays.monsterArray[l].health = gameArrays.monsterArray[l].health-gameArrays.bulletArray[i].bulletDamage;
						if(gameArrays.monsterArray[l].state != "attacking" || gameArrays.monsterArray[l].state != "startled" || gameArrays.monsterArray[l].state != "insane") {
							if(gameArrays.monsterArray[l].category === 1) {
								gameArrays.monsterArray[l].startledTime = gameVariables.timeControler.getTime();
								gameArrays.monsterArray[l].state = "startled";
							}
							else {
								gameArrays.monsterArray[l].startledTime = gameVariables.timeControler.getTime();
								gameArrays.monsterArray[l].state = "insane";
							}
						}
						else {
						}
						//document.getElementById("testdiv").innerHTML = "Monster health: " + gameArrays.monsterArray[l].health;
					}
					else if(gameArrays.monsterArray[l].health-gameArrays.bulletArray[i].bulletDamage <= 0) {
						//document.getElementById("testdiv").innerHTML = "Monster dead!";
						gameArrays.monsterArray[l].timeOfDeath = gameVariables.timeControler.getTime();
						gameArrays.monsterArray[l].killedBy = gameArrays.bulletArray[i].firedFrom;
						monsterDrop(gameArrays.monsterArray[l],drops, gameArrays.objectArray,gameVariables);
						gameArrays.archivedMonsterArray.push(gameArrays.monsterArray[l]);
						//Check mission state && check zombie number - if mission is exact - add to the total killed
						monsterDeathCountForMission(gameArrays.monsterArray[l],hero,missionArray);
						//remove monster from active array.
						gameArrays.monsterArray.splice(l,1);
					}
					if(gameArrays.bulletArray[i].firedFrom === 'machete') {
						if(gameArrays.bulletArray[i].bulletDamage < 2) {
						}
						else {
						gameArrays.bulletArray[i].bulletDamage = gameArrays.bulletArray[i].bulletDamage - 1;
						}
					}
					else {
						gameArrays.archivedBulletArray.push(gameArrays.bulletArray[i]);
						gameArrays.bulletArray.splice(i,1);
					}
				}
			else {
			}
			}
			catch(err) {
				//Monster dead or bullet hit something and removed.
				}
			}
		}
		//Update all monster states
		for(g=0;g<gameArrays.monsterArray.length;g++) {
			monsterState(gameArrays.monsterArray[g],hero,gameVariables);
			monsterStateRevision(gameArrays.monsterArray[g],hero);
		}

		// Hero touching any objects or drops?
		for(v=0;v<gameArrays.objectArray.length;v++) {
			if(hero.x <= (gameArrays.objectArray[v].x + 15) && gameArrays.objectArray[v].x <= (hero.x + 15) && hero.y <= (gameArrays.objectArray[v].y + 15) && gameArrays.objectArray[v].y <= (hero.y + 15)) {
				gameVariables.numberOfDrops = gameVariables.numberOfDrops + 1;
				//console.log(gameArrays.objectArray[v].name + " " + gameArrays.objectArray[v].itemType + " " + gameArrays.objectArray[v].imageSource);
				//console.log(hero[gameArrays.objectArray[v].imageSource]);
				//console.log("---");
				if(gameArrays.objectArray[v].name === "Handgun rounds") {
					hero.gunshots = hero.gunshots + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
				}
				else if(gameArrays.objectArray[v].name === "Shotgun shells") {
					hero.shotgunshots = hero.shotgunshots + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
				}
				else if(gameArrays.objectArray[v].name === "Machinegun magazine") {
					hero.machinegunshots = hero.machinegunshots + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
				}
				else if(gameArrays.objectArray[v].name === "Flamethrower shells") {
					hero.flameshells = hero.flameshells + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
				}
				else if(gameArrays.objectArray[v].name === "Medkit") {
					hero.medkit = hero.medkit + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
					recountMedkit(hero);
				}
				else if(gameArrays.objectArray[v].name === "Granade") {
					granadeToPlayer(200,75,gameArrays.granadeArray);
					gameArrays.objectArray.splice(v,1);
					recountGranade(gameArrays);
				}
				else if(gameArrays.objectArray[v].name === "Antidote") {
					hero.antidote = hero.antidote + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
					recountAntidote(hero);
				}
				else if(gameArrays.objectArray[v].itemType === "schematic") {
					schematics[gameArrays.objectArray[v].imageSource].obtained = 1; //parseInt(schematics[gameArrays.objectArray[v].imageSource].amount) + parseInt(gameArrays.objectArray[v].amount);
					gameArrays.objectArray.splice(v,1);
				}
				else if(gameArrays.objectArray[v].itemType === "gun") {
					if(hero[gameArrays.objectArray[v].imageSource] === 0) {
						hero[gameArrays.objectArray[v].imageSource] = 1;
						if(gameArrays.objectArray[v].imageSource === "pistol") {
							hero.gunshots = hero.gunshots + 21;
						}
						else if(gameArrays.objectArray[v].imageSource === "shotgun") {
							hero.shotgunshots = hero.shotgunshots + 24;
						}
						else if(gameArrays.objectArray[v].imageSource === "machinegun") {
							hero.machinegunshots = hero.machinegunshots + 90;
						}
						else if(gameArrays.objectArray[v].imageSource === "flamethrower") {
							hero.flameshells = hero.flameshells + 200;
						}
						else {
						}
						weaponAvailability(hero);
						gameArrays.objectArray.splice(v,1);
					}
					else {
						if(gameArrays.objectArray[v].imageSource === "pistol") {
							hero.gunshots = hero.gunshots + parseInt(7);
						}
						else if(gameArrays.objectArray[v].imageSource === "shotgun") {
							hero.shotgunshots = hero.shotgunshots + parseInt(8);
						}
						else if(gameArrays.objectArray[v].imageSource === "machinegun") {
							hero.machinegunshots = hero.machinegunshots + parseInt(30);
						}
						else if(gameArrays.objectArray[v].imageSource === "flamethrower") {
							hero.flameshells = hero.flameshells + parseInt(50);
						}
						else {
						}
						gameArrays.objectArray.splice(v,1);
					}
				}
				else {
				//console.log(inventory[gameArrays.objectArray[v].imageSource].constructor + " | amount: " + inventory[gameArrays.objectArray[v].imageSource].amount);
				inventory[gameArrays.objectArray[v].imageSource].amount = parseInt(inventory[gameArrays.objectArray[v].imageSource].amount) + parseInt(gameArrays.objectArray[v].amount);
				gameArrays.objectArray[v].pickUpTime = gameVariables.timeControler.getTime();
				gameArrays.archivedObjectArray.push(gameArrays.objectArray[v]);
				gameArrays.objectArray.splice(v,1);
				gameVariables.pickUp = gameVariables.pickUp + 1;
				newPickUpsDisplayed(gameVariables);
				}
			}
		inventoryReload(inventory, schematics, hero, gameVariables);
		}

		// Are monster touching our dear hero?
		for(b=0;b<gameArrays.monsterArray.length;b++) {
			if(hero.x <= (gameArrays.monsterArray[b].x + 30) && gameArrays.monsterArray[b].x <= (hero.x + 30) && hero.y <= (gameArrays.monsterArray[b].y + 30) && gameArrays.monsterArray[b].y <= (hero.y + 30)) {
				if(gameArrays.monsterArray[b].attackIni === 0) {
					gameArrays.monsterArray[b].attackIni = 1;
					//console.log("First touch!");
					gameArrays.monsterArray[b].attackTime = new Date();
					gameArrays.monsterArray[b].attackTime.setMilliseconds(gameVariables.timeControler.getMilliseconds() + gameArrays.monsterArray[b].damageInterval);
					//console.log("Starting " + gameVariables.timeControler.getTime() + " " + gameArrays.monsterArray[b].attackTime.getTime());
				}
				else if(gameArrays.monsterArray[b].attackIni === 1 && gameVariables.timeControler.getTime() >= gameArrays.monsterArray[b].attackTime.getTime()) {
					gameArrays.monsterArray[b].hit = gameVariables.timeControler.getTime();
					if(gameArrays.monsterArray[b].damage > hero.health) {
						hero.health = 0;
					}
					else {
						//console.log("hit!");
						hero.health = hero.health - gameArrays.monsterArray[b].damage;
					}
					gameArrays.monsterArray[b].attackIni = 0;
				}
				else if(gameArrays.monsterArray[b].attackIni === 1 && gameVariables.timeControler.getTime() < gameArrays.monsterArray[b].attackTime.getTime()) {
					//console.log("Already touching tounching, waiting! " + gameVariables.timeControler.getTime() + " " + gameArrays.monsterArray[b].attackTime.getTime());
				}
			}
			else {
				//console.log("Not touching anymore!");
				gameArrays.monsterArray[b].attackIni = 0;
			}
		}
		mapControl(gameArrays.numberOfLampsOnScreen,gameArrays.backgroundObjectArray,tileDisplay,gameDisplay,gameArrays.monsterArray);
		}
		else {
		}
	};

	// Draw everything
	var render = function () {
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		//document.getElementById("testdiv2").innerHTML = gameArrays.monsterArray;
		if (bgReady) {
			for(y=0;y<gameArrays.backgroundArray.length;y++) {
				if(hero.isPoisoned === 1) {
				//ctx.globalAlpha = 0.1; // - spændende effekt, kan måske bruges ved poisoned?
				}
				ctx.drawImage(gameArrays.backgroundArray[y], gameArrays.backgroundObjectArray[y].x, gameArrays.backgroundObjectArray[y].y,canvas.width,canvas.height);
			}
		}
		if (heroReady) {
			drawRotatedImage(heroImage, hero.x, hero.y, hero.angle);
		}
		//Display all drops
		for(i=0;i<gameArrays.objectArray.length;i++) {
			if(gameArrays.objectArray[i].itemType === 'ammo') {
				ctx.fillStyle = 'rgba(255,255,255,0.7)';
			}
			else if(gameArrays.objectArray[i].itemType === 'mat') {
				ctx.fillStyle = 'rgba(255,102,102,1)';
			}
			else if(gameArrays.objectArray[i].itemType === 'gun') {
				ctx.fillStyle = 'rgba(255,102,0,1)';
			}
			else if(gameArrays.objectArray[i].itemType === 'utility') {
				ctx.fillStyle = 'rgba(230,230,0,0.7)';
			}
			else if(gameArrays.objectArray[i].itemType === 'schematic') {
				ctx.fillStyle = 'rgba(0,102,255,1)';
			}
			//ctx.fillRect(gameArrays.objectArray[i].x,gameArrays.objectArray[i].y,15,15);
			ctx.font = "bold 10px Lato";
			ctx.fillText(gameArrays.objectArray[i].name,gameArrays.objectArray[i].x-gameArrays.objectArray[i].offset,gameArrays.objectArray[i].y-3);
			ctx.drawImage(objectImageArray[i], gameArrays.objectArray[i].x, gameArrays.objectArray[i].y,15,15);
			//ctx.beginPath();
			//ctx.arc(gameArrays.objectArray[i].x+14,gameArrays.objectArray[j].y+15,15,0,2*Math.PI); //Show the affected area (touchwise).
			//ctx.fill();
		}
		//Display all monsters
		if (monster1Ready && monster2Ready & monster3Ready & monster1IdleReady & monster2IdleReady & monster3IdleReady) {
			for(j=0;j<gameArrays.monsterArray.length;j++) {
				//ctx.beginPath();
				//ctx.arc(gameArrays.monsterArray[j].x,gameArrays.monsterArray[j].y,15,0,2*Math.PI); //Show the affected area (touchwise).
				//ctx.fill();
				if(gameArrays.monsterArray[j].skin === 1) {
					if(gameArrays.monsterArray[j].state === "idle") {
						drawRotatedMonster(monsterImageIdle1, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
					else {
						drawRotatedMonster(monsterImage1, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
				}
				else if(gameArrays.monsterArray[j].skin === 2) {
					if(gameArrays.monsterArray[j].state === "idle") {
						drawRotatedMonster(monsterImageIdle2, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
					else {
						drawRotatedMonster(monsterImage2, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
				}
				else if(gameArrays.monsterArray[j].skin === 3) {
					if(gameArrays.monsterArray[j].state === "idle") {
						drawRotatedMonster(monsterImageIdle3, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
					else {
						drawRotatedMonster(monsterImage3, gameArrays.monsterArray[j].x, gameArrays.monsterArray[j].y, gameArrays.monsterArray[j].angle-180,30,30,gameArrays.monsterArray[j].state);
					}
				}
				else {
				}
			}
		}
		for(c=0;c<gameArrays.thrownGranadeArray.length;c++) {
			if(gameArrays.thrownGranadeArray[c].hit != 0) {
				damageHitOnHero(gameArrays.thrownGranadeArray[c],monsterHitImage,gameVariables.timeControler);
			}
		}
		ctx.fillStyle = 'rgba(255,255,255,1)';

		//Check up on all bullets fired.
		for(g=0;g<gameArrays.bulletArray.length;g++) {
			if(gameArrays.bulletArray[g].firedFrom === 'flamethrower') {
				if(Math.sqrt(Math.pow((gameArrays.bulletArray[g].bulletX-hero.x),2) + Math.pow((gameArrays.bulletArray[g].bulletY-hero.y),2)) > 150) {
					gameArrays.archivedBulletArray.push(gameArrays.bulletArray[g]);
					gameArrays.bulletArray.splice(g,1);
				}
				else {
					bulletTrace(gameArrays.bulletArray[g],hero);
					flamethrowerFire(gameArrays.bulletArray[g].bulletX,gameArrays.bulletArray[g].bulletY);
					bulletTraceFade(gameArrays.bulletArray[g]);
				}

			}
			else if(gameArrays.bulletArray[g].firedFrom === 'machete') {
				if(gameArrays.bulletArray[g].angleCount < 10) {
						bulletTrace(gameArrays.bulletArray[g],hero);
						swingSword(hero.x,hero.y,gameArrays.bulletArray[g].bulletX,gameArrays.bulletArray[g].bulletY);
				}
				else {
					gameArrays.archivedBulletArray.push(gameArrays.bulletArray[g]);
					gameArrays.bulletArray.splice(g,1);
				}
			}
			else {
				if(Math.sqrt(Math.pow((gameArrays.bulletArray[g].bulletX-hero.x),2) + Math.pow((gameArrays.bulletArray[g].bulletY-hero.y),2)) > 800) {
					gameArrays.archivedBulletArray.push(gameArrays.bulletArray[g]);
					gameArrays.bulletArray.splice(g,1);
				}
				else {
					bulletTrace(gameArrays.bulletArray[g],hero);
					ctx.fillStyle = 'rgba(255,255,255,1)';
					ctx.fillRect(gameArrays.bulletArray[g].bulletX,gameArrays.bulletArray[g].bulletY,1,1);
					bulletTraceFade(gameArrays.bulletArray[g]);
				}
			}
		}
		//Draw arrow
		/*if(1===1) {
			showArrowToMission(randomPoint.x,randomPoint.y,arrowImage);
		} */
		//Display game-mode / Lamps / flashlight
		if (lampReady && gameVariables.missionType === "Poles") {
			for(y=0;y<gameArrays.numberOfLampsOnScreen.length;y++) {
				if(gameArrays.numberOfLampsOnScreen[y].on === 1) {
				ctx.drawImage(lampImage, gameArrays.numberOfLampsOnScreen[y].x, gameArrays.numberOfLampsOnScreen[y].y,gameArrays.numberOfLampsOnScreen[y].radius,gameArrays.numberOfLampsOnScreen[y].radius);
				drawTileShadow(gameArrays.numberOfLampsOnScreen[y].tileStartPointX,gameArrays.numberOfLampsOnScreen[y].tileStartPointY,gameArrays.numberOfLampsOnScreen[y].x,gameArrays.numberOfLampsOnScreen[y].y,gameArrays.numberOfLampsOnScreen[y].radius);
				}
				else {
					ctx.fillStyle = 'rgba(0,0,0,0.6)';
					ctx.fillRect(gameArrays.numberOfLampsOnScreen[y].tileStartPointX,gameArrays.numberOfLampsOnScreen[y].tileStartPointY,canvas.width,canvas.height);
				}
			}
		}
		if(flashReady && gameVariables.missionType === "Flashlight" && hero.flashlight === "on") {
			drawRotatedFlashlight(flashImage, hero.x, hero.y, hero.angle);
		}
		else if(flashReady && gameVariables.missionType === "Flashlight" && hero.flashlight === "off") {
			flashlightOff(canvas.width,canvas.height);
		}

		else {
		}

		if(hero.heatGogglesObtained === 1 && hero.heatGogglesOn === 1) {
			for(h=0;h<gameArrays.monsterArray.length;h++) {
				if(gameArrays.monsterArray[h].state != 'idle') {
					if(gameArrays.monsterArray[h].skin === 1) {
						drawRotatedMonster(monster1HeatAttack, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
					else if(gameArrays.monsterArray[h].skin === 2) {
						drawRotatedMonster(monster2HeatAttack, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
					else if(gameArrays.monsterArray[h].skin === 3) {
						drawRotatedMonster(monster3HeatAttack, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
				}
				else {
					if(gameArrays.monsterArray[h].skin === 1) {
						drawRotatedMonster(monster1HeatIdle, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
					else if(gameArrays.monsterArray[h].skin === 2) {
						drawRotatedMonster(monster2HeatIdle, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
					else if(gameArrays.monsterArray[h].skin === 3) {
						drawRotatedMonster(monster3HeatIdle, gameArrays.monsterArray[h].x, gameArrays.monsterArray[h].y, gameArrays.monsterArray[h].angle-180,30,30,gameArrays.monsterArray[h].state);
					}
				}
			}
		}

		//Draw red hit around player screen if hit!
		for(n=0;n<gameArrays.monsterArray.length;n++) {
			if(gameArrays.monsterArray[n].hit != 0) {
				damageHitOnHero(gameArrays.monsterArray[n],monsterHitImage,gameVariables.timeControler);
			}
		}

		//check if user has lazer scope enabled.
		lazerScope(hero);
		//check if user has rocketBoots enabled.
		rocketBoots(hero);
		//check if pulseEmitter was fired.
		if(hero.pulseTransmitterFired === 1) {
			if(hero.pulseTransmitterFiredTime == 0) {
			hero.pulseTransmitterFiredTime = gameVariables.timeControler.getTime();
			}
			var  counter = hero.pulseTransmitterCounter = hero.pulseTransmitterCounter + 5;
			pulseEmitter(gameArrays.monsterArray,hero,gameVariables.timeControler,counter,gameArrays.archivedMonsterArray,missionArray);
		}
		//Display user ammo/gun
		if(hero.gun === "pistol") {
			document.getElementById("gameClip").innerHTML = "<strong>" + hero.clip + "</strong>" + " / " + hero.gunshots;
		}
		else if(hero.gun === 'machete') {
			document.getElementById("gameClip").innerHTML = "<strong>" + "&infin;" + "</strong>";
		}
		else if(hero.gun === "machinegun") {
			document.getElementById("gameClip").innerHTML = "<strong>" + hero.machinegunclip + "</strong>" + " / " + hero.machinegunshots;
		}
		else if(hero.gun === "shotgun") {
			document.getElementById("gameClip").innerHTML = "<strong>" + hero.shotgunclip + "</strong>" + " / " + hero.shotgunshots;
		}
		else if(hero.gun === "flamethrower") {
			document.getElementById("gameClip").innerHTML = "<strong>" + hero.flameshells + "</strong>";
		}
		else {
		}

		//display Health
		if(hero.health < 25) {
			document.getElementById("gameHealth").className = "gameHealth lowHealth";
		}
		else {
			document.getElementById("gameHealth").className = "gameHealth";
		}
		document.getElementById("gameHealth").innerHTML = hero.health;

		//Hero death
		if(hero.health <= 0) {
			if(gameVariables.gameStopped === 0) {
			gameVariables.timeEnd = new Date();
			heroDeath(hero,gameArrays.monsterArray,gameArrays.granadeArray,gameVariables.timeEnd,gameArrays.archivedBulletArray, gameArrays.archivedMonsterArray, gameVariables.numberOfDrops,gameArrays,gameVariables);
			gameVariables.gameStopped = 1;
			}
		}

		//Check for grandes
		for(y=0;y<gameArrays.granadeArray.length;y++) {
			throwGranade(gameArrays.granadeArray[y], hero);
		}

		//check for thrown granades
		for(j=0;j<gameArrays.thrownGranadeArray.length;j++) {
			thrownGranade(gameArrays.thrownGranadeArray[j], gameVariables.timeControler, gameArrays.monsterArray, gameArrays.archivedMonsterArray, hero,gameArrays.thrownGranadeArray,missionArray);
		}

		//Display monster health, if any
		for(y=0;y<gameArrays.monsterArray.length;y++) {
			displayMonsterHealth(gameArrays.monsterArray[y],hero);
		}

		//Display granade explosion & wrapup
		for(y=0;y<gameArrays.thrownGranadeArray.length;y++) {
			if(gameArrays.thrownGranadeArray[y].explosion === 1) {
				//console.log(gameVariables.timeControler.getTime() + ">" + gameArrays.thrownGranadeArray[y].explosionTime);
				ctx.globalAlpha = gameArrays.thrownGranadeArray[y].explosionFade;
				ctx.drawImage(explosionImage, gameArrays.thrownGranadeArray[y].x-(125/gameArrays.thrownGranadeArray[y].explosionExpansion),gameArrays.thrownGranadeArray[y].y-(125/gameArrays.thrownGranadeArray[y].explosionExpansion),(250/gameArrays.thrownGranadeArray[y].explosionExpansion),(250/gameArrays.thrownGranadeArray[y].explosionExpansion));
				ctx.globalAlpha = 1;
				granadeExplosion(gameArrays.thrownGranadeArray[y]);
				if(gameVariables.timeControler.getTime() > gameArrays.thrownGranadeArray[y].explosionTime) {;
				gameArrays.archivedGranadeArray.push(gameArrays.thrownGranadeArray[gameArrays.thrownGranadeArray.length-1]);
				gameArrays.thrownGranadeArray.splice(gameArrays.thrownGranadeArray[gameArrays.thrownGranadeArray.length-1],1);
				}
			}
		}
		if(hero.currentMission == hero.missionProgress && hero.missionPresented === 0) {
		showMissionInPlay(hero,missionArray);
		hero.missionPresented = 1;
		}
};
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update();
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Let's play this game!
var then = Date.now();
reset(drops,gameVariables,gameArrays,inventory,hero,keyPressed,backgroundImage,gameDisplay,tileDisplay,keysDown,tileArray,schematics,missionArray,environmentalPoints);
main();
}