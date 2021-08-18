/* LOAD SCENE */

class Load extends Phaser.Scene {
	constructor(){
		super({
			key: 'loadScene',
			pack: {
				files: [{
					type: 'plugin',
					key: 'rexwebfontloaderplugin',
					url: 'rexwebfontloaderplugin.min.js',
					start: true
				}]
			}
		});
	}
	
	preload(){	

		this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		
		let WebFontConfig = {
			custom: {
				families: ['euphorigenic', 'octin'],
				urls: ['fonts.css']
			}
		};
		this.load.rexWebFont(WebFontConfig);
	
		//Load
		this.loadText = this.add.text(300, 300, "游戏加载中...", {fontSize: '32px', fill: 'white' });
		this.prog = this.add.text(400, 335, "0%", { fontSize: '32px', fill: 'white' });
		
		this.load.on('progress', function (value) {
			this.prog.setText((value*100).toFixed(0) + "%");
		}, this);
		
		//loading list
		
		//trees
		this.load.image("treePic1", "assets/treePic1.png");
		this.load.image("treePic2", "assets/treePic2.png");
		this.load.image("treePic3", "assets/treePic3.png");
		this.load.image("treePic4", "assets/treePic4.png");
		this.load.image("treePic5", "assets/treePic5.png");
		this.load.image("treePic6", "assets/treePic6.png");
		this.load.image("treePic7", "assets/treePic7.png");
		this.load.image("treePic8", "assets/treePic8.png");
		this.load.image("treePic9", "assets/treePic9.png");
		this.load.image("treePic10", "assets/treePic10.png");
		this.load.image("treePic11", "assets/treePic11.png");
		this.load.image("treePic12", "assets/treePic12.png");
		this.load.image("treePic13", "assets/treePic13.png");
		this.load.image("treePic14", "assets/treePic14.png");
		this.load.image("treePic15", "assets/treePic15.png");
		this.load.image("treePic16", "assets/treePic16.png");
		this.load.image("treePic17", "assets/treePic17.png");
		this.load.image("treePic18", "assets/treePic18.png");
		this.load.image("treePic19", "assets/treePic19.png");
		this.load.image("treePic20", "assets/treePic20.png");
		this.load.image("treePic21", "assets/treePic21.png");
		this.load.image("treePic22", "assets/treePic22.png");
		this.load.image("treePic23", "assets/treePic23.png");
		this.load.image("treePic24", "assets/treePic24.png");
		this.load.image("treePic25", "assets/treePic25.png");
		this.load.image("treePic26", "assets/treePic26.png");
		this.load.image("treePic27", "assets/treePic27.png");
		this.load.image("treePic28", "assets/treePic28.png");
		this.load.image("treePic29", "assets/treePic29.png");
		this.load.image("treePic30", "assets/treePic30.png");
		this.load.image("treePic0", "assets/yggdrasil.png");
		
		this.load.image("botlayer", "assets/botlayer.png");
		this.load.image("botlight", "assets/bothighlight.png");
		
		this.load.image("icon_chop", "assets/icon_chop.png");
		this.load.image("icon_exp", "assets/icon_exp.png");
		this.load.image("icon_forge", "assets/icon_forge.png");
		this.load.image("icon_upgrade", "assets/icon_upgrade.png");
		this.load.image("icon_aura", "assets/icon_aura.png");
		this.load.image("icon_reforged", "assets/icon_reforged.png");
		this.load.image("icon_config", "assets/icon_config.png");

		this.load.image("gemFire", "assets/gemFire.png");
		this.load.image("gemWater", "assets/gemWater.png");
		this.load.image("gemEarth", "assets/gemEarth.png");
		this.load.image("gemAir", "assets/gemAir.png");
		
		this.load.image("bardot", "assets/bardot.png");
		this.load.image("staminaBase", "assets/staminaB.png");
		this.load.image("staminaFill", "assets/staminaF.png");
		this.load.image("treelifeBase", "assets/treelifeB.png");
		this.load.image("treelifeFill", "assets/treelifeF.png");
		this.load.image("treelifeBase2", "assets/treelifeExtraB.png");
		this.load.image("treelifeFill2", "assets/treelifeExtraF.png");
		
		this.load.image("treeShield", "assets/treeShield.png");
		this.load.image("debuffRegeneration", "assets/debuffRegeneration.png");
		this.load.image("debuffExhaustion", "assets/debuffExhaustion.png");
		this.load.image("debuffGreedy", "assets/debuffGreedy.png");
		this.load.image("debuffHollow", "assets/debuffHollow.png");
		this.load.image("debuffBlessedRoot", "assets/debuffBlessedRoot.png");
		
		this.load.image("menuChopBase", "assets/menuChopBase.png");

		this.load.image("debuffBreak", "assets/debuffBreak.png");
		
		//Exp menu
		this.load.image("menuExpStaminaB", "assets/menuExpStaminaB.png");
		this.load.image("menuExpStaminaF", "assets/menuExpStaminaF.png");
		this.load.image("menuExpButtonB", "assets/menuExpButtonB.png");
		this.load.image("menuExpButtonH", "assets/menuExpButtonH.png");
		this.load.image("menuExpButton2B", "assets/menuExpButton2B.png");
		this.load.image("menuExpButton2H", "assets/menuExpButton2H.png");
		this.load.image("menuExpButtonInfo", "assets/menuExpButtonInfo.png");
		this.load.image("menuExpButtonInfo2", "assets/menuExpButtonInfo2.png");
		this.load.image("menuExpInfo1", "assets/menuExpInfo1.png");
		this.load.image("menuExpInfo2", "assets/menuExpInfo2.png");
		this.load.image("menuExpInfo3", "assets/menuExpInfo3.png");
		
		//forge menu
		this.load.image("menuForgeBase", "assets/menuForgeBase.png");
		this.load.image("menuForgeButtonB", "assets/menuForgeButtonB.png");
		this.load.image("menuForgeButtonH", "assets/menuForgeButtonH.png");
		this.load.image("menuForgeFrame", "assets/menuForgeFrame.png");
		
		//upgrade menu
		this.load.image("menuUpgradeB1", "assets/menuUpgradeB1v2.png");
		this.load.image("menuUpgradeB2", "assets/menuUpgradeB2v2.png");
		this.load.image("menuUpgradeB3", "assets/menuUpgradeB3v2.png");
		this.load.image("menuUpgradeBuy1", "assets/menuUpgradeBuy1.png");
		this.load.image("menuUpgradeBuy2", "assets/menuUpgradeBuy2.png");
		this.load.image("menuUpgradeFrame", "assets/menuUpgradeFrameV2.png");
		this.load.image("menuUpgradeAU1", "assets/menuUpgradeArrowUp1.png");
		this.load.image("menuUpgradeAU2", "assets/menuUpgradeArrowUp2.png");
		this.load.image("menuUpgradeAD1", "assets/menuUpgradeArrowDown1.png");
		this.load.image("menuUpgradeAD2", "assets/menuUpgradeArrowDown2.png");
		this.load.image("menuUpgradeAll1", "assets/menuUpgradeAll1.png");
		this.load.image("menuUpgradeAll2", "assets/menuUpgradeAll2.png");
		this.load.image("menuUpgradeShow1", "assets/menuUpgradeShow1.png");
		this.load.image("menuUpgradeShow2", "assets/menuUpgradeShow2.png");
		this.load.image("menuUpgradeShowFrame", "assets/menuUpgradeShowFrame.png");
		this.load.image("menuUpgradeShowClose1", "assets/menuUpgradeShowClose1.png");
		this.load.image("menuUpgradeShowClose2", "assets/menuUpgradeShowClose2.png");
	
		
		//aura menu
		this.load.image("menuAuraFrame", "assets/menuAuraFrame.png");
		this.load.image("menuAuraSelect", "assets/menuAuraSelect.png");
		this.load.image("elementalFire", "assets/elementalFire.png");
		this.load.image("elementalWater", "assets/elementalWater.png");
		this.load.image("elementalEarth", "assets/elementalEarth.png");
		this.load.image("elementalAir", "assets/elementalAir.png");

		//reforged menu
		this.load.image("menuReforgedB1", "assets/menuReforgedB1.png");
		this.load.image("menuReforgedB2", "assets/menuReforgedB2.png");
		this.load.image("menuReforgedSeed", "assets/menuReforgedSeed.png");
		this.load.image("menuReforgedSel", "assets/menuReforgedSel.png");
		this.load.image("menuReforgedYellow", "assets/menuReforgedYellow.png");
		this.load.image("menuReforgedCheck1", "assets/menuReforgedCheck1.png");
		this.load.image("menuReforgedCheck2", "assets/menuReforgedCheck2.png");
		
		//idle menu
		this.load.image("menuIdleBar", "assets/menuIdleBar.png");
		this.load.image("menuIdleBarFill", "assets/menuIdleBarFill.png");
		this.load.image("menuIdleBack", "assets/menuIdleBack.png");

		//option menu
		this.load.image("menuOptionDiv", "assets/menuOptionDiv.png");

		//final menu
		this.load.image("menuFinalBack", "assets/menuFinalBack.png");
		this.load.image("menuFinalReset1", "assets/menuFinalReset1.png");
		this.load.image("menuFinalReset2", "assets/menuFinalReset2.png");
	
		//axes
		this.load.image("axe1", "assets/axe1.png");
		
		//misc
		
		// example of use of font from google import and div initialize!
		// this.debugText = this.add.text(500, 35, "TEXT r +123%", { fontFamily: '"Baloo Da 2", cursive', fontSize: '50pt', color: 'white' });
	}
	
	create(){
		// metrics (game.js)

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '9pt', color: 'black' });
			metrics.octin9 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '10pt', color: 'black' });
			metrics.octin10 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '11pt', color: 'black' });
			metrics.octin11 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '12pt', color: 'black' });
			metrics.octin12 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '13pt', color: 'black' });
			metrics.octin13 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '14pt', color: 'black' });
			metrics.octin14 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '15pt', color: 'black' });
			metrics.octin15 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '16pt', color: 'black' });
			metrics.octin16 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '18pt', color: 'black' });
			metrics.octin18 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'octin', fontSize: '22pt', color: 'black' });
			metrics.octin22 = this.metricText.getTextMetrics();



			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '10pt', color: 'black' });
			metrics.euphorigenic10 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '11pt', color: 'black' });
			metrics.euphorigenic11 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '12pt', color: 'black' });
			metrics.euphorigenic12 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '13pt', color: 'black' });
			metrics.euphorigenic13 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '14pt', color: 'black' });
			metrics.euphorigenic14 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '15pt', color: 'black' });
			metrics.euphorigenic15 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '16pt', color: 'black' });
			metrics.euphorigenic16 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '18pt', color: 'black' });
			metrics.euphorigenic18 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '20pt', color: 'black' });
			metrics.euphorigenic20 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '22pt', color: 'black' });
			metrics.euphorigenic22 = this.metricText.getTextMetrics();

			this.metricText = this.add.text(0, 0, "Metrics", { fontFamily: 'euphorigenic', fontSize: '25pt', color: 'black' });
			metrics.euphorigenic25 = this.metricText.getTextMetrics();
			
		
		//initialize
		
		this.loadText.destroy();
		this.prog.destroy();
		
		this.scene.start("globalScene");
	}
	
}