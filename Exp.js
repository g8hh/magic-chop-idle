/* EXP SCENE */

class Exp extends Phaser.Scene {
	constructor(){
		super("expScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		// this.sceneText = this.add.text(400, 300, "EXP SCENE", { fontFamily: 'Verdana', fontSize: '30pt', color: 'white' });
		// this.sceneText.x -= this.sceneText.width/2;
		
		this.axeLevel = this.add.text(400, 10, "AXE LEVEL " + player.axe.level, { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: 'white' });
		this.axeLevel.x -= this.axeLevel.width/2;
		
		this.axeExpBar = this.add.image(400, 40, "menuExpStaminaB").setDepth(1);
		this.axeExpFill = this.add.image(400, 40, "menuExpStaminaF").setDepth(1).setOrigin(0, 0).setScale(0, 1);
		this.axeExpFill.x -= this.axeExpFill.width/2;
		this.axeExpFill.y -= this.axeExpFill.height/2;
		
		this.axeExp = this.add.text(400, 50, "? / ?", { metrics: metrics.octin10, fontFamily: 'octin', fontSize: '10pt', color: '#ffe850' });
		this.axeExp.x -= this.axeExp.width/2;
		
		this.axeExpPercent = this.add.text(750, 20, "(?%)", { metrics: metrics.octin9, fontFamily: 'octin', fontSize: '9pt', color: '#fffdf0' });
		this.axeExpPercent.x -= this.axeExpPercent.width;
		
		this.axeImg = this.add.image(400, 100, "axe1").setDepth(1);
		
		this.baseDamage = this.add.text(400, 135, "BASE DAMAGE : 1", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: '#bfbfbf' });
		this.totalDamage = this.add.text(400, 160, "TOTAL DAMAGE : 1 (100%)", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: 'white' });
		this.baseDamage.x -= this.baseDamage.width/2;
		this.totalDamage.x -= this.totalDamage.width/2;
		
		this.expPointsText = this.add.text(400, 485, "EXP POINTS", { metrics: metrics.euphorigenic18, fontFamily: 'euphorigenic', fontSize: '18pt', color: '#bfbfbf' });
		this.expPoints = this.add.text(400, 455, "0", { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: 'yellow' });
		this.expPointsText.x -= this.expPointsText.width/2;
		this.expPoints.x -= this.expPoints.width/2;
		
		//buttons
		this.button1 = new ExpButton(this, 400, 225, 1);
		this.button2 = new ExpButton(this, 400, 315, 2);
		this.button3 = new ExpButton(this, 400, 405, 3);
		
		this.staminaText = this.add.text(50, 225, "S T A M I N A", { metrics: metrics.euphorigenic15, fontFamily: 'euphorigenic', fontSize: '15pt', color: '#8bff67' });
		this.efficiencyText = this.add.text(50, 315, "E F F I C I E N C Y", { metrics: metrics.euphorigenic15, fontFamily: 'euphorigenic', fontSize: '15pt', color: '#8bff67' });
		this.luckText = this.add.text(50, 405, "L U C K", { metrics: metrics.euphorigenic15, fontFamily: 'euphorigenic', fontSize: '15pt', color: '#8bff67' });
		
		this.staminaValue = this.add.text(200, 225, "( 1 )   ( 0 )", { metrics: metrics.euphorigenic16, fontFamily: 'euphorigenic', fontSize: '16pt', color: 'yellow' });
		this.efficiencyValue = this.add.text(200, 315, "( 1 )", { metrics: metrics.euphorigenic16, fontFamily: 'euphorigenic', fontSize: '16pt', color: 'yellow' });
		this.luckValue = this.add.text(200, 405, "( 1 )", { metrics: metrics.euphorigenic16, fontFamily: 'euphorigenic', fontSize: '16pt', color: 'yellow' });
		
		this.staminaDesc = this.add.text(410, 225, "The amount of speed between chops.", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: 'white' });
		this.efficiencyDesc = this.add.text(410, 315, "The amount of exp gained per chop.", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: 'white' });
		this.luckDesc = this.add.text(410, 405, "The chance of dropping loot per chop.", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: 'white' });
		
		//y correction
		this.staminaText.y -= this.staminaText.height/2;
		this.efficiencyText.y -= this.efficiencyText.height/2;
		this.luckText.y -= this.luckText.height/2;
		this.staminaValue.y -= this.staminaValue.height/2;
		this.efficiencyValue.y -= this.efficiencyValue.height/2;
		this.luckValue.y -= this.luckValue.height/2;
		this.staminaDesc.y -= this.staminaDesc.height/2;
		this.efficiencyDesc.y -= this.efficiencyDesc.height/2;
		this.luckDesc.y -= this.luckDesc.height/2;
		
		this.infoButton1 = new ExpInfo(this, 735, 225, 1, "menuExpInfo1");
		this.infoButton2 = new ExpInfo(this, 735, 315, 2, "menuExpInfo2");
		this.infoButton3 = new ExpInfo(this, 735, 405, 3, "menuExpInfo3");

		this.multiplier = new ExpMult(this, 75, 500);
		let textToShow = "x " + amount_multiplier;
		if(amount_multiplier == 0){textToShow = "MAX";}
		this.multText = this.add.text(75, 500, textToShow, { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: 'yellow' }).setDepth(1.2); 
		this.multText.x -= this.multText.width / 2;
		this.multText.y -= this.multText.height / 2;
	}
	
	
	
	/* 														UPDATE FUNCTION 													*/
		
	update(time, delta){
		
		//config
		if(globalChecks.sceneRestart.exp == true){
			globalChecks.sceneRestart.exp = false;
			this.scene.restart();
		}
		
		//general
		
		let xExpScale = player.axe.exp/player.axe.expNext;
		this.axeExpFill.setScale(xExpScale, 1);
		
		//position and text updates
		this.axeExpPercent.x = 750 - this.axeExpPercent.width;
		this.axeExpPercent.setText("(" + ((player.axe.exp/player.axe.expNext)*100).toFixed(2) + "%)");
		
		this.axeExp.x = 400 - this.axeExp.width/2;
		this.axeExp.setText(player.axe.exp + " / " + player.axe.expNext);
		
		this.expPoints.setText(player.axe.expPoints);
		this.expPoints.x = 400 - this.expPoints.width/2;
		
		this.staminaValue.setText("( " + player.axe.stamina + " )   ( " + player.axe.fullStamina + " )");
		this.efficiencyValue.setText("( " + (player.axe.efficiency * (1 + player.reforged.extraEfficiency)) + " )");
		this.luckValue.setText("( " + player.axe.luck + " )");
		
		this.baseDamage.setText("BASE DAMAGE : " + numberWithSpaces(player.axe.power * (1 + player.imbueVars.basePower)));
		this.totalDamage.setText("TOTAL DAMAGE : " + numberWithSpaces(player.axe.power*gameAxes["axe_"+player.axe.id].dmgMultiplier) + 
								" (" + gameAxes["axe_"+player.axe.id].dmgMultiplier*100 + "%)");
		this.baseDamage.x = 400 - (this.baseDamage.width/2);
		this.totalDamage.x = 400 - (this.totalDamage.width/2);

		this.axeLevel.setText("AXE LEVEL " + player.axe.level);

		this.multText.x = 75 - (this.multText.width / 2);
		this.multText.y = 500 - (this.multText.height / 2);
		
		//stamina upgrade check
		if(((player.axe.stamina >= 100) && (player.axe.fullStamina == player.reforged.extraStaminaBar)) && (this.staminaValue.color != "red")){
			this.staminaValue.setColor("red");
		}else if(this.staminaValue.color != "yellow"){
			this.staminaValue.setColor("yellow");
		}
		
	}
	
	
	
	/* 														GAME FUNCTIONS 													*/
	
	

}