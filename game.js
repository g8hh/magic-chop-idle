 /* You can define global custom vars before config here. Like player stats. */



var player = null;
var gameFocus = true;
var idleCheck = false;
var loadFinished = false;

var amount_multiplier = 1;
var resetSeedsStatus = false;

var lastBuyId = 0;

var globalChecks = {
	sceneRestart: {
			global: false,
			main: false,
			exp: false,
			forge: false,
			upgrade: false,
			aura: false,
			reforged: false,
		},
	staminaBarUpdate: false,
};

//SAVE LOAD FUNCTIONS
function savePlayer(){
	player.date = new Date();
	localStorage.setItem("playerSave", JSON.stringify(player));
}

function loadPlayer(){
	player = JSON.parse(localStorage.getItem("playerSave"));
	player.date = new Date(player.date);
	idleCheck = true;

	if(player.version == 1)
	{
		localStorage.setItem("playerSaveBackup", JSON.stringify(player));
		player.version = 1.1;
	}
	
	if(player == null || player.reforged == undefined)
	{
		playerInitialize();
		savePlayer();
	}

	if((player.reforged.priceValue != false) && (player.reforged.priceLevel != false))
	{
		player.reforged.priceLevelPoints = 5;	
		player.reforged.priceStaminaBar = 5;		
		player.reforged.priceEfficiency = 5;			
		player.reforged.priceLoot = 5;						
		player.reforged.priceDmgScaling = 5;

		let extraLP = 0;
		for(let i = 1; i <= player.reforged.extraLevelPoints; i++){
			extraLP += 1;
			player.reforged.priceLevelPoints += ((extraLP ** 3) * 2);
		}

		let extraSB = 0;
		for(let i = 1; i <= player.reforged.extraStaminaBar; i++){
			extraSB += 1;
			player.reforged.priceStaminaBar += ((extraSB ** 2) * 3);
		}

		let extraEff = 0;
		for(let i = 1; i <= player.reforged.extraEfficiency; i++){
			extraEff += 1;
			player.reforged.priceEfficiency += ((extraEff ** 3) * 2);
		}

		let extraL = 0;
		for(let i = 1; i <= player.reforged.extraLoot; i++){
			extraL += 1;
			player.reforged.priceLoot += ((extraL ** 3) * 2);
		}

		let extraD = 0;
		for(let i = 1; i <= player.reforged.extraDmgScaling; i++){
			extraD += 1;
			player.reforged.priceDmgScaling += ((extraD ** 3) * 2);
		}

	}

}

function playerInitialize()
{
	player = {
		version: 1.1,

		date: null,
		idleValue: 0,

		gameFinished: false,
		
		wood: 0,
		fireGem: 0,
		waterGem: 0,
		earthGem: 0,
		airGem: 0,
		
		fireElem: 0,
		waterElem: 0,
		earthElem: 0,
		airElem: 0,
		priceElem: {
			fire: 25000,
			water: 25000,
			earth: 25000,
			air: 25000
		},
		
		axe: {
			id: 1,								// init 1
			level: 1,							// init 1
			power: 1,							// init 1
			currentStamina: 0,		// init 0
			exp: 0,								// init 0
			expNext: 1,						// init 1
			expPoints: 0,					// init 0
			stamina: 1,						// init 1
			fullStamina: 0,				// init 0
			efficiency: 1,				// init 1
			luck: 1, 							// init 1
			luckGem: 0,						// init 0
		},
		
		tree: {
			name: "ASTRID",
			level: 1,
			seed: 1,
			health: 1500,
			healthMax: 1500,
			healthBars: 1, // worth 1 million each
			healthBarsMax: 1,
			hardness: 0,
			fdef: 0,
			wdef: 0,
			edef: 0,
			adef: 0,
			debuff: [0],

			texture: 1,
			textureColor: 0xffffff,
		},
		
		reforged: {
			seeds: 0,
			collect: 0,
			
			extraLevelPoints: 0,		// raw number
			extraStaminaBar: 0,			// raw number
			extraEfficiency: 0,			// raw number
			extraLoot: 0,						// raw number
			extraDmgScaling: 0,			// raw number

			priceLevel: false,
			priceValue: false,

			priceLevelPoints: 5,		
			priceStaminaBar: 5,			
			priceEfficiency: 5,			
			priceLoot: 5,						
			priceDmgScaling: 5,
		},
		
		imbueVars: {
			sharpness: 0,
			expDrop: 0,
			bleeding: 0,			//raw chance
			bleedingDmg: 1,		//dmg multiplier
			bleedingStack: 0,
			woodDrop: 0,
			gemDrop: 0,
			defBreak: 1,
			defChance: 0,
			auraChance: 0,
			auraValue: 1,
			breakDebuff: 0,
			breakTimer: 2,
			breakState: false,
			breakStateTime: 0,
			basePower: 0,
		},
		
		imbueStats: {
			axe_2: { // Count as id
				level: 0, // Current upgraded level.
				price: 1,
				state: "unavailable" // unavailable, open, maxed
			},
			
			axe_3: { 
				level: 0,
				price: 5,
				state: "unavailable"
			},

			axe_4: { 
				level: 0,
				price: 15,
				state: "unavailable"
			},

			axe_5: { 
				level: 0,
				price: 50,
				state: "unavailable"
			},

			axe_6: { 
				level: 0,
				price: 5,
				state: "unavailable"
			},

			axe_7: { 
				level: 0,
				price: 750,
				state: "unavailable"
			},

			axe_8: { 
				level: 0,
				price: 2000,
				state: "unavailable"
			},

			axe_9: { 
				level: 0,
				price: 15000,
				state: "unavailable"
			},

			axe_10: { 
				level: 0,
				price: 9999999,
				state: "unavailable"
			},
			
		}
		
	}
}

if (localStorage.getItem("playerSave") == null){
	
	playerInitialize();

	//first save function
	savePlayer();
	
} else {
	
	//load function
	loadPlayer();
	
}

var metrics = {
	
}
 
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//CONFIGURATIONS


var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: "101010",
	scene: [Load, Global, Main, Exp, Forge, Upgrade, Aura, Reforged, Idle, Option, Ending],
	//pixelArt: true,
	antialias: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		width: 800,
		height: 600
	},
};

var game = new Phaser.Game(config);


//DOCUMENT CONFIGS 

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
		gameFocus = true;
	} else {
		if((idleCheck == false) && (loadFinished == true)) 
		// Only works if the game is not already updating the idle.
		{
			gameFocus = false;
			player.date = new Date();
			idleCheck = true;
		}
  }
});