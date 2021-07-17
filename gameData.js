/* You define all game data lists here. */


var treesNames = ["Arne", "Birger", "Frode", "Gorm", "Halfdan", "Harald", "Leif", "Rune", "Skarde", "Troels",
	"Trygve", "Astrid", "Gudrun", "Gunhild", "Randi", "Sigrid", "Ulfhild", "Alfhild", "Asmund", "Runolf", "Unnsson",
	"Hjarrandi", "Skallagrim", "Thjostolf", "Authulf", "Selkollr", "Kjallak", "Thorald", "Thorvard", "Thorlaug", 
	"Thorhalla", "Hrafnhild", "Skufdottir", "Vigotdottir", "Ljufu", "Thorhalla", "Gudfinna", "Arnbjorg", "Yri", "Svala",
	"Droplaug", "Thorballa", "Veturlididottir", "Eyjolf", "Geirolf"];



/* AXES */

var totalAxes = 10; // Update with the amount of axes that exists in the game!
var gameAxes = {
	
	//The numbers are the id used for reference in the player saved file!
	
	axe_1: {
		name: "Basic Axe",
		dmgMultiplier: 1,
		imbueName: "NONE",
		imbueDesc: function(){
			return "No imbuements";
		}
	},
	
	axe_2: {
		name: "Strong Axe",
		dmgMultiplier: 2,
		imbueName: "NONE",
		imbueDesc: function(){
			return "No imbuements";
		},
		wood: 100,
		fgem: 0,
		wgem: 0,
		egem: 0,
		agem: 0
	},

	axe_3: {
		name: "Refined Axe",
		dmgMultiplier: 3,
		imbueName: "Sharpness",
		imbueDesc: function(m){
				if(m == true)
				{
					return "The axe gains a % of hardness\npenetration";
				}
				else
				{
					let sharplevel = ((player.imbueStats["axe_3"].level+1) * 2).toFixed(0);
					return sharplevel + "% of hardness penetration";
				}
		},
		wood: 1500,
		fgem: 5,
		wgem: 5,
		egem: 5,
		agem: 5,
		upgrade: function(l, p){ // l is level, p is price.
			
			player.imbueVars.sharpness += 0.02;
			
			if((player.imbueStats["axe_3"].level + 1) == 20){
				player.imbueStats["axe_3"].state = "maxed";
			}
			
			let np = p*2;
			return np;
		}
	},

	axe_4: {
		name: "Witch's Axe",
		dmgMultiplier: 5,
		imbueName: "Magic Dust",
		imbueDesc: function(m){
			if(m == true)
			{
				return "Passive % chance of generating\naxe experience per tick";
			}
			else
			{
				let magicdust = (player.imbueStats["axe_4"].level + 1);
				return magicdust + "% chance of generating axe experience per tick";
			}
		},
		wood: 25000,
		fgem: 100,
		wgem: 100,
		egem: 100,
		agem: 100,
		upgrade: function(l, p){ // l is level, p is price.
			
			player.imbueVars.expDrop += 1;
			
			if((player.imbueStats["axe_4"].level + 1) == 25){ 
				player.imbueStats["axe_4"].state = "maxed";
			}
			
			let np = p*2;
			return np;
		}
	},

	axe_5: {
		name: "Bloody Axe",
		dmgMultiplier: 25,
		imbueName: "Bleed",
		imbueDesc: function(m){
			if(m == true)
			{
					return "Chance of bleeding the tree in\neach chop, causing extra damage\n(Stacks if triggered consecutively)";
			}
			else
			{
				let blevel = player.imbueStats["axe_5"].level + 1;
				if(blevel == 1){
					return "5% chance of causing 25% bleeding damage";
				}
				else if(blevel == 5 || blevel == 10 || blevel == 15 || blevel == 20){
					let bleedingDmg = player.imbueVars.bleedingDmg * 100;
					let bleeding = (5 + player.imbueVars.bleeding);
					return bleeding + "% chance of causing " + bleedingDmg.toFixed(0) + "% bleeding damage";
				}else{
					let fixedLevel = player.imbueStats["axe_5"].level;
					if((fixedLevel >= 5) && (fixedLevel < 10)){fixedLevel -= 1;}
					else if((fixedLevel >= 10) && (fixedLevel < 15)){fixedLevel -= 2;}
					else if((fixedLevel >= 15) && (fixedLevel < 20)){fixedLevel -= 3;}
					let bleeding = player.imbueVars.bleeding;
					let bleedingDmg = (0.2 + (fixedLevel * 0.05)) * 100;

					return bleeding + "% chance of causing " + bleedingDmg.toFixed(0) + "% bleeding damage";
				}
			}
		},
		wood: 100000,
		fgem: 1000,
		wgem: 750,
		egem: 750,
		agem: 750,
		upgrade: function(l, p){ // l is level, p is price.
			
			if(l == 0){
				player.imbueVars.bleeding += 5;
				player.imbueVars.bleedingDmg += 0.25;
			}
			else if(l == 4 || l == 9 || l == 14 || l == 19){
				player.imbueVars.bleeding += 5;
			} else {				
				player.imbueVars.bleedingDmg += 0.05;
			}
			
			if((player.imbueStats["axe_5"].level+1) == 20){ 
				player.imbueStats["axe_5"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		}
	},

	axe_6: {
		name: "Alchemist Blade",
		dmgMultiplier: 100,
		imbueName: "Infusion",
		imbueDesc: function(m){
			if(m == true)
			{
					return "Passive % chance of generating\nwood and gem per tick";
			}
			else
			{
				let woodChance = (player.imbueStats["axe_6"].level + 1) * 4;
				let gemChance = (Math.floor((player.imbueStats["axe_6"].level + 1) / 5)) * 4;
				return woodChance + "% chance of generating wood per tick\n" + gemChance + "% chance of generating gem per tick";
			}
		},
		wood: 2500000,
		fgem: 25000,
		wgem: 25000,
		egem: 25000,
		agem: 25000,
		upgrade: function(l, p){ // l is level, p is price.
			
			if(l == 4 || l == 9 || l == 14 || l == 19 || l == 24 ){
				player.imbueVars.woodDrop += 4;
				player.imbueVars.gemDrop += 4;
			} else {
				player.imbueVars.woodDrop += 4;
			}
			
			if((player.imbueStats["axe_6"].level+1) == 25){ 
				player.imbueStats["axe_6"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		},
	},

	axe_7: {
		name: "Lunar Blade",
		dmgMultiplier: 250,
		imbueName: "Purity",
		imbueDesc: function(m){
			if(m == true)
			{
					return "Chance of ignoring a part of\nthe tree elements";
			}
			else
			{
				let defChance = (player.imbueStats["axe_7"].level + 1) * 4;
				let defBreak = ((player.imbueStats["axe_7"].level + 1) * 0.02) * 100;
				return defChance + "% chance of ignoring " + defBreak.toFixed(0) + "% of the tree elements";
			}
		},
		wood: 50000000,
		fgem: 125000,
		wgem: 150000,
		egem: 200000,
		agem: 150000,
		upgrade: function(l, p){ // l is level, p is price.
			
			player.imbueVars.defBreak += 0.02;
			player.imbueVars.defChance += 4;
	
			if((player.imbueStats["axe_7"].level+1) == 20){ 
				player.imbueStats["axe_7"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		},
	},

	axe_8: {
		name: "Elemental Axe",
		dmgMultiplier: 500,
		imbueName: "Enhance",
		imbueDesc: function(m){
			if(m == true)
			{
					return "Chance of gaining an axe aura\nboost in each chop\n(Stacks if triggered consecutively)";
			}
			else
			{
				let axeAuras = (player.imbueStats["axe_8"].level + 1) * 2;
				return axeAuras + "% chance of gaining the double of axe's auras base values";				
			}
		},
		wood: 500000000,
		fgem: 500000,
		wgem: 500000,
		egem: 500000,
		agem: 500000,
		upgrade: function(l, p){ // l is level, p is price.
			
			player.imbueVars.auraChance += 2;			
			
			if((player.imbueStats["axe_8"].level+1) == 20){
				player.imbueStats["axe_8"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		},
	},

	axe_9: {
		name: "Seal Blade",
		dmgMultiplier: 750,
		imbueName: "Freedom",
		imbueDesc: function(m){
			if(m == true)
			{
					return "Chance of breaking tree's\ndebuffs in each chop\n(lasts for a time period)";
			}
			else
			{
				let blevel = player.imbueStats["axe_9"].level + 1;
				if(blevel == 4 || blevel == 6 || blevel == 8 || blevel == 10){
					let bdebuff = player.imbueVars.breakDebuff + 1;
					let btimer = player.imbueVars.breakTimer + 2;
					return bdebuff + "% chance of breaking free from debuffs for " + btimer + " chops";
				}else{
					let bdebuff = player.imbueVars.breakDebuff + 1;
					let btimer = player.imbueVars.breakTimer;
					return bdebuff + "% chance of breaking free from debuffs for " + btimer + " chops";
				}
			}
		},
		wood: 1000000000,
		fgem: 2500000,
		wgem: 1000000,
		egem: 2500000,
		agem: 1500000,
		upgrade: function(l, p){ // l is level, p is price.
			
			if(l == 3 || l == 5 || l == 7 || l == 9){
				player.imbueVars.breakDebuff += 1;
				player.imbueVars.breakTimer += 2;
			} else {
				player.imbueVars.breakDebuff += 1;
			}
			
			if((player.imbueStats["axe_9"].level+1) == 10){ 
				player.imbueStats["axe_9"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		},
	},

	axe_10: {
		name: "Dragon's Blade",
		dmgMultiplier: 999,
		imbueName: "Fury",
		imbueDesc: function(m){
			if(m == true)
			{
				return "Multiply the axe's base damage";
			}
			else
			{
				return (player.imbueVars.basePower + 1) + "x extra base axe damage power";
			}
		},
		wood: 9999999999,
		fgem: 9999999,
		wgem: 9999999,
		egem: 9999999,
		agem: 9999999,
		upgrade: function(l, p){ // l is level, p is price.
			
			player.imbueVars.basePower += 1;			
			
			if((player.imbueStats["axe_10"].level+1) == 10){ // Where 4 is the max level
				player.imbueStats["axe_10"].state = "maxed";
			}
			
			let np = (p*2) + 1;
			return np;
		},
	}

}



