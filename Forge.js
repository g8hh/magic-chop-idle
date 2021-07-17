/* FORGE SCENE */

class Forge extends Phaser.Scene {
	constructor(){
		super("forgeScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		// this.sceneText = this.add.text(400, 300, "FORGE SCENE", { fontFamily: 'Verdana', fontSize: '30pt', color: 'white' });
		// this.sceneText.x -= this.sceneText.width/2;
		
		this.base = this.add.image(400, 470, "menuForgeBase");
		
		this.frame1 = this.add.image(175, 150, "menuForgeFrame");
		this.frame2 = this.add.image(625, 150, "menuForgeFrame");
		
		this.forgebutton = new ForgeButton(this, 400, 325);
		
		//axes
		this.currentAxe = this.add.image(75, 75, "axe1");
		this.newAxe = this.add.image(525, 75, "axe1");
		
		//gems
		this.fireIcon = this.add.image(100, 395, "gemFire").setDepth(1).setScale(0.75);
		this.waterIcon = this.add.image(300, 395, "gemWater").setDepth(1).setScale(0.75);
		this.earthIcon = this.add.image(500, 395, "gemEarth").setDepth(1).setScale(0.75);
		this.airIcon = this.add.image(700, 395, "gemAir").setDepth(1).setScale(0.75);
		
		this.fireGems = this.add.text(100, 425, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fe6767' });
		this.waterGems = this.add.text(300, 425, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#759bff' });
		this.earthGems = this.add.text(500, 425, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#67fe83' });
		this.airGems = this.add.text(700, 425, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fff372' });
		this.fireGems.x -= this.fireGems.width/2;
		this.waterGems.x -= this.waterGems.width/2;
		this.earthGems.x -= this.earthGems.width/2;
		this.airGems.x -= this.airGems.width/2;
		
		//Texts
		this.playerWoodText = this.add.text(400, 465, "WOOD", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#f27440' });
		this.playerWood = this.add.text(400, 490, "?", { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: 'white' });
		this.playerWoodText.x -= this.playerWoodText.width/2;
		
		this.currentText = this.add.text(175, 10, "CURRENT", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#9a9a9a' });
		this.newText = this.add.text(625, 10, "NEXT", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#9a9a9a' });
		this.currentText.x -= this.currentText.width/2;
		this.newText.x -= this.newText.width/2;
		
		let nextAxeName = "None";
		if(player.axe.id < totalAxes){nextAxeName = gameAxes["axe_"+(player.axe.id+1)].name;}
		this.currentAxeName = this.add.text((175+25), 50, gameAxes["axe_"+player.axe.id].name, { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#ff5959' });
		this.newAxeName = this.add.text((625+25), 50, nextAxeName, { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#74ffb9' });
		
		this.currentPower = this.add.text(175, 100, "POWER : " + (gameAxes["axe_"+player.axe.id].dmgMultiplier*100) + "%", { fontFamily: 'octin', fontSize: '13pt', color: 'white' });
		this.currentPower.x -= this.currentPower.width/2;
		let nextAxePowerT = "0";
		if(player.axe.id < totalAxes){nextAxePowerT = (gameAxes["axe_"+(player.axe.id+1)].dmgMultiplier*100);}
		this.nextPower = this.add.text(625, 100, "POWER : " + nextAxePowerT + "%", { metrics: metrics.octin13, fontFamily: 'octin', fontSize: '13pt', color: 'white' });
		this.nextPower.x -= this.nextPower.width/2;
		
		this.currentImbueT = this.add.text(175, 150, "IMBUEMENT :", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'white' });
		this.currentImbueT.x -= this.currentImbueT.width;
		this.nextImbueT = this.add.text(625, 150, "IMBUEMENT :", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'white' });
		this.nextImbueT.x -= this.nextImbueT.width;
		this.currentImbueN = this.add.text(180, 150, gameAxes["axe_"+player.axe.id].imbueName, { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' });
		let nextAxeImbueN = "NONE";
		if(player.axe.id < totalAxes){nextAxeImbueN = gameAxes["axe_"+(player.axe.id+1)].imbueName;}
		this.nextImbueN = this.add.text(630, 150, nextAxeImbueN, { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' });
		
		this.currentImbueD = this.add.text(50, 185, gameAxes["axe_"+player.axe.id].imbueDesc(true), { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: '#fff68d' });
		let nextAxeImbueD = "No imbuements";
		if(player.axe.id < totalAxes){nextAxeImbueD = gameAxes["axe_"+(player.axe.id+1)].imbueDesc(true);}
		this.nextImbueN = this.add.text(500, 185, nextAxeImbueD, { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: '#fff68d' });
		
		//cost texts
		this.costText = this.add.text(400, 35, "COST", { metrics: metrics.octin22, fontFamily: 'octin', fontSize: '22pt', color: '#9a9a9a' });
		this.costText.x -= this.costText.width/2;
		this.costWoodText = this.add.text(400, 75, "WOOD", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#f27440' });
		this.costWoodText.x -= this.costWoodText.width/2;
		this.costWoodValue = this.add.text(400, 95, "?", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: 'white' });
		
		this.fireIconCost = this.add.image(335, 140, "gemFire").setDepth(1).setScale(0.5);
		this.waterIconCost = this.add.image(335, 171, "gemWater").setDepth(1).setScale(0.5);
		this.earthIconCost = this.add.image(335, 202, "gemEarth").setDepth(1).setScale(0.5);
		this.airIconCost = this.add.image(335, 233, "gemAir").setDepth(1).setScale(0.5);
		
		this.fireGemsCost = this.add.text(350, 140, "?", { metrics: metrics.euphorigenic13, fontFamily: 'euphorigenic', fontSize: '13pt', color: '#fe6767' });
		this.waterGemsCost = this.add.text(350, 171, "?", { metrics: metrics.euphorigenic13, fontFamily: 'euphorigenic', fontSize: '13pt', color: '#759bff' });
		this.earthGemsCost = this.add.text(350, 202, "?", { metrics: metrics.euphorigenic13, fontFamily: 'euphorigenic', fontSize: '13pt', color: '#67fe83' });
		this.airGemsCost = this.add.text(350, 233, "?", { metrics: metrics.euphorigenic13, fontFamily: 'euphorigenic', fontSize: '13pt', color: '#fff372' });
		this.fireGemsCost.y -= this.fireGemsCost.height/2;
		this.waterGemsCost.y -= this.waterGemsCost.height/2;
		this.earthGemsCost.y -= this.earthGemsCost.height/2;
		this.airGemsCost.y -= this.airGemsCost.height/2;
		
		
		this.infoImbue1 = this.add.text(75, 270, "(*) Plus all previous imbuements", { metrics: metrics.octin9, fontFamily: 'octin', fontSize: '9pt', color: '#fff68d' });
		this.infoImbue2 = this.add.text(525, 270, "(*) Plus all previous imbuements", { metrics: metrics.octin9, fontFamily: 'octin', fontSize: '9pt', color: '#fff68d' });
	}
	
	
	
	/* 														UPDATE FUNCTION 													*/
		
	update(time, delta){
		
		//config
		if(globalChecks.sceneRestart.forge == true){
			globalChecks.sceneRestart.forge = false;
			this.scene.restart();
		}
		
		//general
		
		//text
		this.playerWood.setText(numberWithSpaces(player.wood));
		this.playerWood.x = 400 - this.playerWood.width/2;
		
		this.costWoodValue.x = 400 - this.costWoodValue.width/2;
		let costWoodV = "0";
		if(player.axe.id < totalAxes){costWoodV = gameAxes["axe_"+(player.axe.id+1)].wood;}
		this.costWoodValue.setText(numberWithSpaces(costWoodV));
		
		let fgemV = "0";
		let wgemV = "0";
		let egemV = "0";
		let agemV = "0";
		if(player.axe.id < totalAxes){
			fgemV = gameAxes["axe_"+(player.axe.id+1)].fgem;
			wgemV = gameAxes["axe_"+(player.axe.id+1)].wgem;
			egemV = gameAxes["axe_"+(player.axe.id+1)].egem;
			agemV = gameAxes["axe_"+(player.axe.id+1)].agem;
		}
		this.fireGemsCost.setText(numberWithSpaces(fgemV));
		this.waterGemsCost.setText(numberWithSpaces(wgemV));
		this.earthGemsCost.setText(numberWithSpaces(egemV));
		this.airGemsCost.setText(numberWithSpaces(agemV));
		
		this.currentAxeName.x = (175+25) - (this.currentAxeName.width/2);
		this.newAxeName.x = (625+25) - (this.newAxeName.width/2);
		
		this.fireGems.setText(numberWithSpaces(player.fireGem));
		this.waterGems.setText(numberWithSpaces(player.waterGem));
		this.earthGems.setText(numberWithSpaces(player.earthGem));
		this.airGems.setText(numberWithSpaces(player.airGem));
		this.fireGems.x = 101 - (this.fireGems.width/2);
		this.waterGems.x = 301 - (this.waterGems.width/2);
		this.earthGems.x = 501 - (this.earthGems.width/2);
		this.airGems.x = 701 - (this.airGems.width/2);
		
		
		
	}
	
	
	
	/* 														GAME FUNCTIONS 													*/
	
	resetScene(){
		this.scene.restart();
	}
	

}