/* MAIN SCENE */


class Main extends Phaser.Scene {
	constructor(){
		super("mainScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		// this.sceneText = this.add.text(400, 300, "MAIN SCENE", { fontFamily: 'euphorigenic', fontSize: '30pt', color: 'white' });
		// this.sceneText.x -= this.sceneText.width/2;
		
		this.base = this.add.image(400, 470, "menuChopBase");
		
		//Axe images and text
		this.axeImg = this.add.image(400, 415, "axe1").setDepth(1);
		
		this.axeStamina = this.add.image(400, 455, "staminaBase").setDepth(1);
		this.axeStaminaFill = this.add.image(400, 455, "staminaFill").setDepth(1).setOrigin(0, 0).setScale(0, 1);
		this.axeStaminaFill.x -= this.axeStaminaFill.width/2;
		this.axeStaminaFill.y -= this.axeStaminaFill.height/2;
		this.axePercent = this.add.text(550, 435, "0%", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: 'white' });
		this.axePercent.x -= this.axePercent.width;
		
		this.listDots = {};
		this.staminaDots();
		
		this.axeDmgText = this.add.text(400, 347, "每次砍树造成的伤害", { metrics: metrics.octin10, fontFamily: 'octin', fontSize: '10pt', color: '#ABABAB' });
		this.axeDmgValue = this.add.text(400, 365, "0", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: 'white' });
		this.axeDmgText.x -= this.axeDmgText.width/2;
		this.axeDmgValue.x -= this.axeDmgValue.width/2;
		
		this.axeLevel = this.add.text(275, 435, "等级 " + player.axe.level, { metrics: metrics.euphorigenic11, fontFamily: 'euphorigenic', fontSize: '11pt', color: 'white' });
		
		this.axeAuraFire = this.add.image(775, 375, "elementalFire").setDepth(1).setScale(0.4);
		this.axeAuraWater = this.add.image(775, 415, "elementalWater").setDepth(1).setScale(0.4);
		this.axeAuraEarth = this.add.image(775, 455, "elementalEarth").setDepth(1).setScale(0.4);
		this.axeAuraAir = this.add.image(775, 495, "elementalAir").setDepth(1).setScale(0.4);
		this.auraFireValueAxe = this.add.text(750, 375, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fe6767' });
		this.auraWaterValueAxe = this.add.text(750, 415, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#759bff' });
		this.auraEarthValueAxe = this.add.text(750, 455, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#67fe83' });
		this.auraAirValueAxe = this.add.text(750, 495, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fff372' });
		
		this.auraFireValueAxe.y -= this.auraFireValueAxe.height/2;
		this.auraWaterValueAxe.y -= this.auraWaterValueAxe.height/2;
		this.auraEarthValueAxe.y -= this.auraEarthValueAxe.height/2;
		this.auraAirValueAxe.y -= this.auraAirValueAxe.height/2;
		
		
		//Tree images and text
		this.treeImg = this.add.image(400, 180, ("treePic"+player.tree.texture)).setDepth(1);
		this.treeImg.setTint(player.tree.textureColor);
		
		this.treeHealthBar = this.add.image(400, 305, "treelifeBase").setDepth(1);
		this.treeHealthFill = this.add.image(400, 305, "treelifeFill").setDepth(1).setOrigin(0, 0).setScale(1, 1);
		this.treeHealthFill.x -= this.treeHealthFill.width/2;
		this.treeHealthFill.y -= this.treeHealthFill.height/2;
		
		this.treeHealthValue = this.add.text(400, 275, "? / ?", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#92CA6E' });
		this.treeHealthValue.x -= this.treeHealthValue.width/2;
		
		this.treeHealthBar2 = this.add.image(400, 320, "treelifeBase2").setDepth(1);
		this.treeHealthFill2 = this.add.image(400, 320, "treelifeFill2").setDepth(1).setOrigin(0, 0).setScale(1, 1);
		this.treeHealthFill2.x -= this.treeHealthFill2.width/2;
		this.treeHealthFill2.y -= this.treeHealthFill2.height/2;
		
		this.treeHealthValue2 = this.add.text(400, 325, "? / ?", { metrics: metrics.euphorigenic10, fontFamily: 'euphorigenic', fontSize: '10pt', color: '#9b2727' });
		this.treeHealthValue2.x -= this.treeHealthValue2.width/2;
		
		this.treeShield = this.add.image(130, 65, "treeShield").setDepth(1);
		this.treeHardness = this.add.text(130, 100, "0", { metrics: metrics.octin14, fontFamily: 'octin', fontSize: '14pt', color: 'white' });
		this.treeHardness.x -= this.treeHardness.width/2;

		this.elementalDesc = this.add.text(790, 205, "元素\n防御", { metrics: metrics.octin10, fontFamily: 'octin', fontSize: '10pt', color: 'white', align: 'right', fontStyle: 'italic'});
		this.elementalDesc.x -= this.elementalDesc.width;

		this.debuffRegeneration = this.add.image(35, 175, "debuffRegeneration").setDepth(1).setAlpha(0.1).setInteractive();
		this.debuffExhaustion = this.add.image(85, 175, "debuffExhaustion").setDepth(1).setAlpha(0.1).setInteractive();
		this.debuffGreedy = this.add.image(135, 175, "debuffGreedy").setDepth(1).setAlpha(0.1).setInteractive();
		this.debuffHollow = this.add.image(185, 175, "debuffHollow").setDepth(1).setAlpha(0.1).setInteractive();
		this.debuffBlessedRoot = this.add.image(235, 175, "debuffBlessedRoot").setDepth(1).setAlpha(0.1).setInteractive();

		this.debuffBreak1 = this.add.image(35, 175, "debuffBreak").setDepth(1.1).setVisible(false);
		this.debuffBreak2 = this.add.image(85, 175, "debuffBreak").setDepth(1.1).setVisible(false);
		this.debuffBreak3 = this.add.image(135, 175, "debuffBreak").setDepth(1.1).setVisible(false);
		this.debuffBreak4 = this.add.image(185, 175, "debuffBreak").setDepth(1.1).setVisible(false);
		this.debuffBreak5 = this.add.image(235, 175, "debuffBreak").setDepth(1.1).setVisible(false);

		this.debuffTitle = this.add.text(130, 205, "...", { metrics: metrics.octin14, fontFamily: 'octin', fontSize: '14pt', color: 'yellow'});
		this.debuffTitle.x -= this.debuffTitle.width / 2;
		this.debuffDesc = this.add.text(130, 235, "", { metrics: metrics.octin10, fontFamily: 'octin', fontSize: '10pt', color: 'white', align: 'center' });
		this.debuffDesc.x -= this.debuffDesc.width / 2;

		this.debuffRegeneration.on("pointerover", function(pointer){
			this.debuffTitle.setText("再生");
			this.debuffDesc.setText("树超时恢复生命");
		}, this);

		this.debuffExhaustion.on("pointerover", function(pointer){
			this.debuffTitle.setText("枯竭");
			this.debuffDesc.setText("斧头失去一半的耐力");
		}, this);

		this.debuffGreedy.on("pointerover", function(pointer){
			this.debuffTitle.setText("贪婪");
			this.debuffDesc.setText("斧头的掉落几率减少一半");
		}, this);

		this.debuffHollow.on("pointerover", function(pointer){
			this.debuffTitle.setText("空洞");
			this.debuffDesc.setText("斧头损失一半的效率/经验增益");
		}, this);

		this.debuffBlessedRoot.on("pointerover", function(pointer){
			this.debuffTitle.setText("幸福的根源");
			this.debuffDesc.setText("斧头失去所有一半\n它的元素光环能量");
		}, this);

		this.debuffRegeneration.on("pointerout", function(pointer){
			this.debuffTitle.setText("...");
			this.debuffDesc.setText("");
		}, this);

		this.debuffExhaustion.on("pointerout", function(pointer){
			this.debuffTitle.setText("...");
			this.debuffDesc.setText("");
		}, this);

		this.debuffGreedy.on("pointerout", function(pointer){
			this.debuffTitle.setText("...");
			this.debuffDesc.setText("");
		}, this);

		this.debuffHollow.on("pointerout", function(pointer){
			this.debuffTitle.setText("...");
			this.debuffDesc.setText("");
		}, this);

		this.debuffBlessedRoot.on("pointerout", function(pointer){
			this.debuffTitle.setText("...");
			this.debuffDesc.setText("");
		}, this);
		
		this.treeAuraFire = this.add.image(775, 25, "elementalFire").setDepth(1).setScale(0.5);
		this.treeAuraWater = this.add.image(775, 75, "elementalWater").setDepth(1).setScale(0.5);
		this.treeAuraEarth = this.add.image(775, 125, "elementalEarth").setDepth(1).setScale(0.5);
		this.treeAuraAir = this.add.image(775, 175, "elementalAir").setDepth(1).setScale(0.5);
		this.auraFireValue = this.add.text(750, 25, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fe6767' });
		this.auraWaterValue = this.add.text(750, 75, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#759bff' });
		this.auraEarthValue = this.add.text(750, 125, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#67fe83' });
		this.auraAirValue = this.add.text(750, 175, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fff372' });
		
		this.auraFireValue.y -= this.auraFireValue.height/2;
		this.auraWaterValue.y -= this.auraFireValue.height/2;
		this.auraEarthValue.y -= this.auraFireValue.height/2;
		this.auraAirValue.y -= this.auraFireValue.height/2;
		
		this.treeName = this.add.text(400, 10, player.tree.name, { metrics: metrics.euphorigenic25, fontFamily: 'euphorigenic', fontSize: '25pt', color: 'white' });
		this.treeLevel = this.add.text(400, 50, "Lv. ???", { metrics: metrics.euphorigenic18, fontFamily: 'euphorigenic', fontSize: '18pt', color: '#ABABAB' });
		this.treeName.x -= this.treeName.width/2;
		this.treeLevel.x -= this.treeLevel.width/2;
		
		
		//Others
		this.playerWoodText = this.add.text(10, 500, "木头: ", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#f27440' });
		this.playerWood = this.add.text(65, 501, "?", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: 'white' });
		
		this.fireIcon = this.add.image(15, 375, "gemFire").setDepth(1).setScale(0.5);
		this.waterIcon = this.add.image(15, 405, "gemWater").setDepth(1).setScale(0.5);
		this.earthIcon = this.add.image(15, 435, "gemEarth").setDepth(1).setScale(0.5);
		this.airIcon = this.add.image(15, 465, "gemAir").setDepth(1).setScale(0.5);
		
		this.fireGems = this.add.text(30, 375, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fe6767' });
		this.waterGems = this.add.text(30, 405, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#759bff' });
		this.earthGems = this.add.text(30, 435, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#67fe83' });
		this.airGems = this.add.text(30, 465, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fff372' });
		this.fireGems.y -= this.fireGems.height/2;
		this.waterGems.y -= this.waterGems.height/2;
		this.earthGems.y -= this.earthGems.height/2;
		this.airGems.y -= this.airGems.height/2;
		
		
	
	}
	
	
	
	/* 														UPDATE FUNCTION 													*/
		
	update(time, delta){
		//config
		if(globalChecks.sceneRestart.main == true){
			globalChecks.sceneRestart.main = false;
			this.scene.restart();
		}
		
		//General
		this.playerWood.setText(numberWithSpaces(player.wood));
		this.fireGems.setText(numberWithSpaces(player.fireGem));
		this.waterGems.setText(numberWithSpaces(player.waterGem));
		this.earthGems.setText(numberWithSpaces(player.earthGem));
		this.airGems.setText(numberWithSpaces(player.airGem));
		
		this.treeHardness.setText(numberWithSpaces(player.tree.hardness));
		this.treeHardness.x = 130 - (this.treeHardness.width/2);

		this.debuffTitle.x = 130 - (this.debuffTitle.width / 2);
		this.debuffDesc.x = 130 - (this.debuffDesc.width / 2);

		this.axeDmgValue.x = 400 - (this.axeDmgValue.width / 2);

		//debuff break
		if(player.imbueVars.breakState == true)
		{
			this.debuffBreak1.setVisible(true);
			this.debuffBreak2.setVisible(true);
			this.debuffBreak3.setVisible(true);
			this.debuffBreak4.setVisible(true);
			this.debuffBreak5.setVisible(true);
		}
		else
		{
			this.debuffBreak1.setVisible(false);
			this.debuffBreak2.setVisible(false);
			this.debuffBreak3.setVisible(false);
			this.debuffBreak4.setVisible(false);
			this.debuffBreak5.setVisible(false);
		}
		
		//axe elements
		this.auraFireValueAxe.x = 750 - this.auraFireValueAxe.width;
		this.auraWaterValueAxe.x = 750 - this.auraWaterValueAxe.width;
		this.auraEarthValueAxe.x = 750 - this.auraEarthValueAxe.width;
		this.auraAirValueAxe.x = 750 - this.auraAirValueAxe.width;
		
		if(player.imbueVars.auraValue > 1)
		{
			this.auraFireValueAxe.setText("+" + numberWithSpaces((player.fireElem*100) * player.imbueVars.auraValue) + "% (x" + player.imbueVars.auraValue + ")");
			this.auraWaterValueAxe.setText("+" + numberWithSpaces((player.waterElem*100) * player.imbueVars.auraValue) + "% (x" + player.imbueVars.auraValue + ")");
			this.auraEarthValueAxe.setText("+" + numberWithSpaces((player.earthElem*100) * player.imbueVars.auraValue) + "% (x" + player.imbueVars.auraValue + ")");
			this.auraAirValueAxe.setText("+" + numberWithSpaces((player.airElem*100) * player.imbueVars.auraValue) + "% (x" + player.imbueVars.auraValue + ")");
		}
		else
		{
			this.auraFireValueAxe.setText("+" + numberWithSpaces(player.fireElem*100) + "%");
			this.auraWaterValueAxe.setText("+" + numberWithSpaces(player.waterElem*100) + "%");
			this.auraEarthValueAxe.setText("+" + numberWithSpaces(player.earthElem*100) + "%");
			this.auraAirValueAxe.setText("+" + numberWithSpaces(player.airElem*100) + "%");
		}		
		
		if(player.fireElem <= 0){this.auraFireValueAxe.alpha = 0.1; this.axeAuraFire.alpha = 0.1;}else{this.auraFireValueAxe.alpha = 1; this.axeAuraFire.alpha = 1;}
		if(player.waterElem <= 0){this.auraWaterValueAxe.alpha = 0.1; this.axeAuraWater.alpha = 0.1;}else{this.auraWaterValueAxe.alpha = 1; this.axeAuraWater.alpha = 1;}
		if(player.earthElem <= 0){this.auraEarthValueAxe.alpha = 0.1; this.axeAuraEarth.alpha = 0.1;}else{this.auraEarthValueAxe.alpha = 1; this.axeAuraEarth.alpha = 1;}
		if(player.airElem <= 0){this.auraAirValueAxe.alpha = 0.1; this.axeAuraAir.alpha = 0.1;}else{this.auraAirValueAxe.alpha = 1; this.axeAuraAir.alpha = 1;}
		
		//tree elements		
		this.auraFireValue.x = 750 - this.auraFireValue.width;
		this.auraWaterValue.x = 750 - this.auraWaterValue.width;
		this.auraEarthValue.x = 750 - this.auraEarthValue.width;
		this.auraAirValue.x = 750 - this.auraAirValue.width;
		
		let hardness = player.tree.hardness;
		this.auraFireValue.setText(numberWithSpaces(player.tree.fdef*hardness) + " (+" + numberWithSpaces(player.tree.fdef*100) + "%)");
		this.auraWaterValue.setText(numberWithSpaces(player.tree.wdef*hardness) + " (+" + numberWithSpaces(player.tree.wdef*100) + "%)");
		this.auraEarthValue.setText(numberWithSpaces(player.tree.edef*hardness) + " (+" + numberWithSpaces(player.tree.edef*100) + "%)");
		this.auraAirValue.setText(numberWithSpaces(player.tree.adef*hardness) + " (+" + numberWithSpaces(player.tree.adef*100) + "%)");
		
		if(player.tree.fdef <= 0){this.auraFireValue.alpha = 0.1; this.treeAuraFire.alpha = 0.1; this.axeAuraFire.alpha = 0.1; this.auraFireValueAxe.alpha = 0.1;}
		else{this.auraFireValue.alpha = 1; this.treeAuraFire.alpha = 1; this.axeAuraFire.alpha = 1; this.auraFireValueAxe.alpha = 1;}
		if(player.tree.wdef <= 0){this.auraWaterValue.alpha = 0.1; this.treeAuraWater.alpha = 0.1; this.axeAuraWater.alpha = 0.1; this.auraWaterValueAxe.alpha = 0.1;}
		else{this.auraWaterValue.alpha = 1; this.treeAuraWater.alpha = 1; this.axeAuraWater.alpha = 1; this.auraWaterValueAxe.alpha = 1;}
		if(player.tree.edef <= 0){this.auraEarthValue.alpha = 0.1; this.treeAuraEarth.alpha = 0.1; this.axeAuraEarth.alpha = 0.1; this.auraEarthValueAxe.alpha = 0.1;}
		else{this.auraEarthValue.alpha = 1; this.treeAuraEarth.alpha = 1; this.axeAuraEarth.alpha = 1; this.auraEarthValueAxe.alpha = 1;}
		if(player.tree.adef <= 0){this.auraAirValue.alpha = 0.1; this.treeAuraAir.alpha = 0.1; this.axeAuraAir.alpha = 0.1; this.auraAirValueAxe.alpha = 0.1;}
		else{this.auraAirValue.alpha = 1; this.treeAuraAir.alpha = 1; this.axeAuraAir.alpha = 1; this.auraAirValueAxe.alpha = 1;}
		
		if(player.tree.debuff.includes(1) == false){this.debuffRegeneration.alpha = 0.1;}else{this.debuffRegeneration.alpha = 1;}
		if(player.tree.debuff.includes(2) == false){this.debuffExhaustion.alpha = 0.1;}else{this.debuffExhaustion.alpha = 1;}
		if(player.tree.debuff.includes(3) == false){this.debuffGreedy.alpha = 0.1;}else{this.debuffGreedy.alpha = 1;}
		if(player.tree.debuff.includes(4) == false){this.debuffHollow.alpha = 0.1;}else{this.debuffHollow.alpha = 1;}
		if(player.tree.debuff.includes(5) == false){this.debuffBlessedRoot.alpha = 0.1;}else{this.debuffBlessedRoot.alpha = 1;}

		this.treeLevel.setText("Lv. " + player.tree.level);

		this.treeName.x = 400 - (this.treeName.width / 2);
		this.treeLevel.x = 400 - (this.treeLevel.width / 2);
		
		//Axe stamina bar
		let percentStamina = player.axe.currentStamina;
		let xAxeScale = player.axe.currentStamina/100;
		if(player.axe.stamina == 100){
			xAxeScale = 1;
			percentStamina = 100;
		}
		
		if(globalChecks.staminaBarUpdate == true){
			this.staminaDotsUpdate();
			globalChecks.staminaBarUpdate = false;
		}
		
		this.axeStaminaFill.setScale(xAxeScale, 1);
		this.axePercent.setText(percentStamina + "%");
		this.axePercent.x = 525 - this.axePercent.width;
		
		//Tree health bar
		if(player.tree.healthBars == player.tree.healthBarsMax)
		{
			this.treeHealthValue.setText(numberWithSpaces(player.tree.health) + " / " + numberWithSpaces(player.tree.healthMax));
		}
		else
		{
			this.treeHealthValue.setText(numberWithSpaces(player.tree.health) + " / " + numberWithSpaces(1000000));
		}
		this.treeHealthValue.x = 400 - (this.treeHealthValue.width/2);
		let xTreeScale = player.tree.health / player.tree.healthMax;
		this.treeHealthFill.setScale(xTreeScale, 1);
		
		this.treeHealthValue2.setText(numberWithSpaces(player.tree.healthBars) + " / " + numberWithSpaces(player.tree.healthBarsMax));
		this.treeHealthValue2.x = 400 - (this.treeHealthValue2.width/2);
		let xTreeScale2 = player.tree.healthBars/player.tree.healthBarsMax;
		this.treeHealthFill2.setScale(xTreeScale2, 1);
		
	}	
	
	
	/* 														GAME FUNCTIONS 													*/
	
	staminaDots(){
		
		for(let i = 0; i < 25; i++){
			this.listDots["dot"+i] = this.add.image((280+(10*i)), 465, "bardot").setDepth(1.1).setVisible(false);
		}
		
		this.staminaDotsUpdate();
		
	}
	
	staminaDotsUpdate(){
		
		for(let i = 0; i < player.axe.fullStamina; i++){
			this.listDots["dot"+i].setVisible(true);
		}
		
	}
	

}