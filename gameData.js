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
		name: "基础斧子",
		dmgMultiplier: 1,
		imbueName: "无",
		imbueDesc: function(){
			return "No imbuements";
		}
	},
	
	axe_2: {
		name: "强大的斧子",
		dmgMultiplier: 2,
		imbueName: "无",
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
		name: "精致的斧子",
		dmgMultiplier: 3,
		imbueName: "锐度",
		imbueDesc: function(m){
				if(m == true)
				{
					return "这把斧头增加了%的硬度\n穿透";
				}
				else
				{
					let sharplevel = ((player.imbueStats["axe_3"].level+1) * 2).toFixed(0);
					return sharplevel + "% 硬度穿透";
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
		name: "女巫之斧",
		dmgMultiplier: 5,
		imbueName: "魔尘",
		imbueDesc: function(m){
			if(m == true)
			{
				return "每tick产生\n斧子经验的被动百分比";
			}
			else
			{
				let magicdust = (player.imbueStats["axe_4"].level + 1);
				return magicdust + "% 几率产生斧头经验每刻";
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
		imbueName: "流血",
		imbueDesc: function(m){
			if(m == true)
			{
					return "有几率在每次砍伐时使树流血，造成额外伤害\n（如果连续触发则叠加）";
			}
			else
			{
				let blevel = player.imbueStats["axe_5"].level + 1;
				if(blevel == 1){
					return "5% 几率造成 25% 流血伤害";
				}
				else if(blevel == 5 || blevel == 10 || blevel == 15 || blevel == 20){
					let bleedingDmg = player.imbueVars.bleedingDmg * 100;
					let bleeding = (5 + player.imbueVars.bleeding);
					return bleeding + "% 几率造成 " + bleedingDmg.toFixed(0) + "% 流血伤害";
				}else{
					let fixedLevel = player.imbueStats["axe_5"].level;
					if((fixedLevel >= 5) && (fixedLevel < 10)){fixedLevel -= 1;}
					else if((fixedLevel >= 10) && (fixedLevel < 15)){fixedLevel -= 2;}
					else if((fixedLevel >= 15) && (fixedLevel < 20)){fixedLevel -= 3;}
					let bleeding = player.imbueVars.bleeding;
					let bleedingDmg = (0.2 + (fixedLevel * 0.05)) * 100;

					return bleeding + "% 几率造成 " + bleedingDmg.toFixed(0) + "% 流血伤害";
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
		imbueName: "灌输",
		imbueDesc: function(m){
			if(m == true)
			{
					return "每刻产生\n木材和宝石的被动百分比几率";
			}
			else
			{
				let woodChance = (player.imbueStats["axe_6"].level + 1) * 4;
				let gemChance = (Math.floor((player.imbueStats["axe_6"].level + 1) / 5)) * 4;
				return woodChance + "% 几率产生木材每刻\n" + gemChance + "% chance of generating gem per tick";
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
		name: "月刃",
		dmgMultiplier: 250,
		imbueName: "纯净",
		imbueDesc: function(m){
			if(m == true)
			{
					return "忽略部分\n树元素的机会";
			}
			else
			{
				let defChance = (player.imbueStats["axe_7"].level + 1) * 4;
				let defBreak = ((player.imbueStats["axe_7"].level + 1) * 0.02) * 100;
				return defChance + "% 几率忽略 " + defBreak.toFixed(0) + "% 树的元素";
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
		name: "元素之斧",
		dmgMultiplier: 500,
		imbueName: "增强",
		imbueDesc: function(m){
			if(m == true)
			{
					return "有几率获得斧光环\n每次斩击提升\n（连续触发可叠加）";
			}
			else
			{
				let axeAuras = (player.imbueStats["axe_8"].level + 1) * 2;
				return axeAuras + "% 获得双倍斧头光环基础值的几率";				
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
		name: "封印刀片",
		dmgMultiplier: 750,
		imbueName: "自由",
		imbueDesc: function(m){
			if(m == true)
			{
					return "砍倒树几率\n每次砍树减益\n（持续一段时间）";
			}
			else
			{
				let blevel = player.imbueStats["axe_9"].level + 1;
				if(blevel == 4 || blevel == 6 || blevel == 8 || blevel == 10){
					let bdebuff = player.imbueVars.breakDebuff + 1;
					let btimer = player.imbueVars.breakTimer + 2;
					return bdebuff + "% 几率摆脱自由减益 " + btimer + " 砍";
				}else{
					let bdebuff = player.imbueVars.breakDebuff + 1;
					let btimer = player.imbueVars.breakTimer;
					return bdebuff + "% 几率摆脱自由减益 " + btimer + " 砍";
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
		imbueName: "愤怒",
		imbueDesc: function(m){
			if(m == true)
			{
				return "乘以斧头的基础伤害";
			}
			else
			{
				return (player.imbueVars.basePower + 1) + "x 额外的基础斧头伤害能力";
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



