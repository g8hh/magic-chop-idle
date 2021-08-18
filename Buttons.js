/* Class Extended */

//Menu Button

class MenuButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y, k, id){
		super(scene, x, y, k);
		scene.add.existing(this);
		this.scene = scene;
		
		this.setAlpha(0.7).setDepth(1);
		this.sceneId = id;
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		

		
	}
	
	clicked(pointer){			
		this.scene.bottomLight.x = this.x;
		this.sleepScenes();
		
		if(this.sceneId == 1){
			this.scene.sys.scenePlugin.wake("mainScene");
		}else if(this.sceneId == 2){
			this.scene.sys.scenePlugin.wake("expScene");
		}else if(this.sceneId == 3){
			this.scene.sys.scenePlugin.wake("forgeScene");
		}else if(this.sceneId == 4){
			this.scene.sys.scenePlugin.wake("upgradeScene");
		}else if(this.sceneId == 5){
			this.scene.sys.scenePlugin.wake("auraScene");
		}else if(this.sceneId == 6){
			this.scene.sys.scenePlugin.wake("reforgedScene");
		}else if(this.sceneId == 7){
			this.scene.sys.scenePlugin.wake("optionScene");
		}

	}
	
	touched(pointer){
		this.setAlpha(1);		
	}
	
	notTouched(pointer){
		this.setAlpha(0.7);
	}
	
	sleepScenes(){
		this.scene.sys.scenePlugin.sleep("mainScene");
		this.scene.sys.scenePlugin.sleep("expScene");
		this.scene.sys.scenePlugin.sleep("forgeScene");
		this.scene.sys.scenePlugin.sleep("upgradeScene");
		this.scene.sys.scenePlugin.sleep("auraScene");
		this.scene.sys.scenePlugin.sleep("reforgedScene");
		this.scene.sys.scenePlugin.sleep("optionScene");
	}
	
}


//FULL RESET Button

class FullReset extends Phaser.GameObjects.Image {
	constructor(scene, x, y, id){
		super(scene, x, y, "menuFinalReset1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.id = id;

		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
	
		player = null;
		playerInitialize();
		savePlayer();

		globalChecks.sceneRestart.global = true;
		globalChecks.sceneRestart.main = true;
		globalChecks.sceneRestart.exp = true;
		globalChecks.sceneRestart.forge = true;
		globalChecks.sceneRestart.upgrade = true;
		globalChecks.sceneRestart.aura = true;
		globalChecks.sceneRestart.reforged = true;

		if(this.id == 1)
		{
			this.scene.sys.scenePlugin.wake("globalScene");
		}

	}
	
	touched(pointer){
		this.setTexture("menuFinalReset2");
	}
	
	notTouched(pointer){
		this.setTexture("menuFinalReset1");
	}
	
}



//EXP BUTTONS


class ExpButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y, id){
		super(scene, x, y, "menuExpButtonB");
		scene.add.existing(this);
		this.scene = scene;
		
		this.id = id; // 1 -> stamina. 2 -> efficiency. 3 -> luck.
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		
		let amountMult = amount_multiplier;
		if(amountMult == 0){amountMult = player.axe.expPoints;}

		if(this.id === 1){// stamina
			
			for(let i = 1; i <= amountMult; i++){
				if(player.axe.expPoints > 0){
					player.axe.expPoints -= 1;
					player.axe.stamina += 1;
					if((player.axe.stamina >= 100) && (player.axe.fullStamina < player.reforged.extraStaminaBar)){
						player.axe.stamina = 0;
						player.axe.fullStamina += 1;
						player.axe.currentStamina = 0;
						globalChecks.staminaBarUpdate = true;
					}else if((player.axe.stamina > 100) && (player.axe.fullStamina == player.reforged.extraStaminaBar)){
						player.axe.stamina = 100;
						player.axe.expPoints += 1
					}
				}
				else
				{
					break;
				}
			}
			
		}else if(this.id === 2){// efficiency
			
			for(let i = 1; i <= amountMult; i++){
				if(player.axe.expPoints > 0){
					player.axe.expPoints -= 1;
					player.axe.efficiency += 1;
				}
				else
				{
					break;
				}
			}
			
			
		}else if(this.id === 3){// luck
			
			for(let i = 1; i <= amountMult; i++){
				if(player.axe.expPoints > 0){
					player.axe.expPoints -= 1;
					player.axe.luck += 1;
					player.axe.luckGem = Math.floor(player.axe.luck / 5);
				}
				else
				{
					break;
				}
			}
			
		}	
		
	}
	
	touched(pointer){
		this.setTexture("menuExpButtonH");
	}
	
	notTouched(pointer){
		this.setTexture("menuExpButtonB");
	}
	
}

//exp info buttons

class ExpInfo extends Phaser.GameObjects.Image {
	constructor(scene, x, y, id, fr){
		super(scene, x, y, "menuExpButtonInfo");
		scene.add.existing(this);
		this.scene = scene;
		
		this.id = id; // 1 -> stamina. 2 -> efficiency. 3 -> luck.
		this.setDepth(1.1);
		
		this.infoFrame = scene.add.image(375, 300, fr).setVisible(false).setDepth(2);
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			

	}
	
	touched(pointer){
		this.setTexture("menuExpButtonInfo2");
		this.infoFrame.setVisible(true);
	}
	
	notTouched(pointer){
		this.setTexture("menuExpButtonInfo");
		this.infoFrame.setVisible(false);
	}
	
}

class ExpMult extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuExpButton2B");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		if(amount_multiplier == 1)
		{
			amount_multiplier = 10;
			this.scene.multText.setText("x " + amount_multiplier);
		}
		else if(amount_multiplier == 10)
		{
			amount_multiplier = 100;
			this.scene.multText.setText("x " + amount_multiplier);
		}
		else if(amount_multiplier == 100)
		{
			amount_multiplier = 0;
			this.scene.multText.setText("最大");
		}
		else if(amount_multiplier == 0)
		{
			amount_multiplier = 1;
			this.scene.multText.setText("x " + amount_multiplier);
		}
	}
	
	touched(pointer){
		this.setTexture("menuExpButton2H");
	}
	
	notTouched(pointer){
		this.setTexture("menuExpButton2B");
	}
	
}


//forge button

class ForgeButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuForgeButtonB");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		
		let axeId = player.axe.id;
		if(axeId < totalAxes){
			
			if((player.wood >= gameAxes["axe_"+(axeId+1)].wood) &&
			(player.fireGem >= gameAxes["axe_"+(axeId+1)].fgem) &&
			(player.waterGem >= gameAxes["axe_"+(axeId+1)].wgem) &&
			(player.earthGem >= gameAxes["axe_"+(axeId+1)].egem) &&
			(player.airGem >= gameAxes["axe_"+(axeId+1)].agem)){ // Also, need to check for gems price!
				
				player.wood -= gameAxes["axe_"+(axeId+1)].wood;
				player.fireGem -= gameAxes["axe_"+(axeId+1)].fgem;
				player.waterGem -= gameAxes["axe_"+(axeId+1)].wgem;
				player.earthGem -= gameAxes["axe_"+(axeId+1)].egem;
				player.airGem -= gameAxes["axe_"+(axeId+1)].agem;
				player.axe.id += 1;
				if(gameAxes["axe_"+(axeId+1)].imbueName != "NONE")
				{
					player.imbueStats["axe_"+(axeId+1)].state = "open";
				}
				
				
				//update forge texts!
				this.scene.resetScene();
				
			}
			
		}	
	}
	
	touched(pointer){
		this.setTexture("menuForgeButtonH");
	}
	
	notTouched(pointer){
		this.setTexture("menuForgeButtonB");
	}
	
}




//upgrade buy button

class BuyButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuUpgradeBuy1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		this.axeId = 0;
		this.imbuePrice = 0;
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		
		if(((this.axeId != 0) && (player.imbueStats["axe_"+this.axeId].state == "open")) && (player.wood >= this.imbuePrice)){
			
			player.wood -= this.imbuePrice;
			
			let newPrice = gameAxes["axe_"+this.axeId].upgrade(player.imbueStats["axe_"+this.axeId].level, player.imbueStats["axe_"+this.axeId].price);
			player.imbueStats["axe_"+this.axeId].level += 1;
			player.imbueStats["axe_"+this.axeId].price = newPrice;
			
			this.scene.resetScene();
		}	
		
	}
	
	touched(pointer){
		this.setTexture("menuUpgradeBuy2");
	}
	
	notTouched(pointer){
		this.setTexture("menuUpgradeBuy1");
	}
	
}


//upgrade buy all button

class BuyAll extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuUpgradeAll1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		
		if(this.scene.selectArray.length > 0)
		{
			let sceneReset = false;
			this.scene.selectArray.forEach(
				function(upgrade) { //Upgrade is the inidivdual object with price and id.
					
					if((player.imbueStats["axe_"+upgrade.id].state == "open") && (player.wood >= upgrade.price))
					{
						player.wood -= upgrade.price;
			
						let newPrice = gameAxes["axe_"+upgrade.id].upgrade(player.imbueStats["axe_"+upgrade.id].level, player.imbueStats["axe_"+upgrade.id].price);
						player.imbueStats["axe_"+upgrade.id].level += 1;
						player.imbueStats["axe_"+upgrade.id].price = newPrice;
						
						sceneReset = true;
					}

				}
			);
			
			if(sceneReset == true){ this.scene.resetScene(); }
		}

	}
	
	touched(pointer){
		this.setTexture("menuUpgradeAll2");
	}
	
	notTouched(pointer){
		this.setTexture("menuUpgradeAll1");
	}
	
}



//upgrade show all button

class ImbueShowAll extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuUpgradeShow1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);

		this.imbueFrame = scene.add.image(400, 265, "menuUpgradeShowFrame").setVisible(false).setDepth(2).setInteractive().setActive(false);
		
		this.closeButton = scene.add.image(400, 485, "menuUpgradeShowClose1").setVisible(false).setDepth(2.1).setActive(false);
		this.closeButton.setInteractive({useHandCursor: true});
		this.closeButton.on("pointerdown",  function(pointer){
			this.imbueFrame.setVisible(false).setActive(false);
			this.closeButton.setVisible(false).setActive(false);
			this.toggleTexts();
		}, this);
		this.closeButton.on("pointerover", function(pointer){this.closeButton.setTexture("menuUpgradeShowClose2");}, this);
		this.closeButton.on("pointerout", function(pointer){this.closeButton.setTexture("menuUpgradeShowClose1");}, this);

		//upgrades text
		this.textToggle = false;

		this.titleSharpness = scene.add.text(50, 50, "锐度 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleMagicDust = scene.add.text(50, 100, "魔尘 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleBloodyAxe = scene.add.text(50, 150, "流血 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleAlchemistBlade = scene.add.text(50, 200, "灌输 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleLunarBlade = scene.add.text(50, 250, "纯净 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleElementalAxe = scene.add.text(50, 300, "增强 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleSealBlade = scene.add.text(50, 350, "自由 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);
		this.titleDragonsBlade = scene.add.text(50, 400, "愤怒 : ", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: '#ef6bff' }).setDepth(2.2).setVisible(false);

		this.dataSharpness = scene.add.text((this.titleSharpness.x + this.titleSharpness.width), 50, ((player.imbueVars.sharpness * 100).toFixed(0) + "% 硬度渗透"), { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataMagicDust = scene.add.text((this.titleMagicDust.x + this.titleMagicDust.width), 100, player.imbueVars.expDrop + "% 几率产生斧头经验每tick", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataBloodyAxe = scene.add.text((this.titleBloodyAxe.x + this.titleBloodyAxe.width), 150, (player.imbueVars.bleeding + "% 几率造成 " + ((player.imbueVars.bleedingDmg - 1) * 100).toFixed(0) + "% 流血伤害"), { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataAlchemistBlade = scene.add.text((this.titleAlchemistBlade.x + this.titleAlchemistBlade.width), 200, player.imbueVars.woodDrop + "% / " + player.imbueVars.gemDrop + "% 几率产生 木头/宝石 每tick", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataLunarBlade = scene.add.text((this.titleLunarBlade.x + this.titleLunarBlade.width), 250, player.imbueVars.defChance + "% 忽略几率 " + ((player.imbueVars.defBreak - 1) * 100).toFixed(0) + "% 树元素", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataElementalAxe = scene.add.text((this.titleElementalAxe.x + this.titleElementalAxe.width), 300, player.imbueVars.auraChance + "% 几率获得双倍斧头光环基础值", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataSealBlade = scene.add.text((this.titleSealBlade.x + this.titleSealBlade.width), 350, player.imbueVars.breakDebuff + "% 脱离减益的几率 " + player.imbueVars.breakTimer + " chops", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);
		this.dataDragonsBlade = scene.add.text((this.titleDragonsBlade.x + this.titleDragonsBlade.width), 400, player.imbueVars.basePower + "x 额外的基础斧头伤害能力", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' }).setDepth(2.2).setVisible(false);


		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){
		this.imbueFrame.setVisible(true).setActive(true);
		this.closeButton.setVisible(true).setActive(true);
		this.toggleTexts();
	}
	
	touched(pointer){
		this.setTexture("menuUpgradeShow2");
	}
	
	notTouched(pointer){
		this.setTexture("menuUpgradeShow1");
	}

	toggleTexts()
	{
		this.textToggle = (this.textToggle == true) ? false : true;

		this.titleSharpness.setVisible(this.textToggle);
		this.titleMagicDust.setVisible(this.textToggle);
		this.titleBloodyAxe.setVisible(this.textToggle);
		this.titleAlchemistBlade.setVisible(this.textToggle);
		this.titleLunarBlade.setVisible(this.textToggle);
		this.titleElementalAxe.setVisible(this.textToggle);
		this.titleSealBlade.setVisible(this.textToggle);
		this.titleDragonsBlade.setVisible(this.textToggle);

		this.dataSharpness.setVisible(this.textToggle);
		this.dataMagicDust.setVisible(this.textToggle);
		this.dataBloodyAxe.setVisible(this.textToggle);
		this.dataAlchemistBlade.setVisible(this.textToggle);
		this.dataLunarBlade.setVisible(this.textToggle);
		this.dataElementalAxe.setVisible(this.textToggle);
		this.dataSealBlade.setVisible(this.textToggle);
		this.dataDragonsBlade.setVisible(this.textToggle);
	}
	
}


//upgrade select button

class SelectUpgradeButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y, t, i){
		super(scene, x, y, t);
		scene.add.existing(this);
		this.scene = scene;
		
		this.scene.selectGroup.add(this);
		
		this.setDepth(1.1);
		this.tex = t;
		this.id = i;
		let tcolor = (i%2==0) ? "#b3b3b3" : "#e6e6e6";
		
		this.activated = false;

		this.imbuementName = this.scene.add.text(75, y, "灌输", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: tcolor }).setDepth(1.1).setVisible(false);
		this.imbuementName.y -= this.imbuementName.height/2;
		
		this.imbuePriceW = this.scene.add.text(725, y, "W", { metrics: metrics.octin11, fontFamily: 'euphorigenic', fontSize: '11pt', color: '#f27440' }).setDepth(1.1).setVisible(false);
		this.imbuePriceW.y -= this.imbuePriceW.height/2;
		this.imbuementPrice = this.scene.add.text(720, y, "0", { metrics: metrics.octin12, fontFamily: 'euphorigenic', fontSize: '12pt', color: 'yellow' }).setDepth(1.1).setVisible(false);
		this.imbuementPrice.y -= this.imbuementPrice.height/2;
		this.imbuementPrice.x -= this.imbuementPrice.width;
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
		
		// Select data that can be used by the buy button!
		
		if(this.activated == true){
			
			let axeId = this.scene.selectArray[(this.id + this.scene.selectStep)-1].id;
			this.scene.buyButton.axeId = axeId;
			this.scene.buyButton.imbuePrice = this.scene.selectArray[(this.id + this.scene.selectStep)-1].price;
			this.scene.imbueNameDesc.setText(gameAxes["axe_"+axeId].imbueName);
			this.scene.imbueDesc.setText(gameAxes["axe_"+axeId].imbueDesc());
			lastBuyId = axeId;
			
		}		
		
	}
	
	touched(pointer){
		this.setTexture("menuUpgradeB3");
	}
	
	notTouched(pointer){
		this.setTexture(this.tex);
	}
	
}


//aura select button

class SelectAuraButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y, t, i){
		super(scene, x, y, t);
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1);
		this.id = i;		
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){
		this.scene.selectHighlight.setVisible(true);
		this.scene.selectHighlight.x = this.x;
		this.scene.selectText.setVisible(false);
		this.scene.priceTag.setVisible(true);
		this.scene.priceValue.setVisible(true);
		
		if(this.id == 1){
			this.scene.selectName.setText("火元素光环\n+100%\大幅增加对具有火抗性的树木的伤害");
			this.scene.selectName.setColor("#fe6767");
			this.scene.priceTag.setTexture("gemFire");
			this.scene.priceValue.setText(numberWithSpaces(player.priceElem.fire));
			this.scene.buyButton.id = this.id;
		}else if(this.id == 2){
			this.scene.selectName.setText("水元素光环\n+100%\大幅增加对水属性树木的伤害");
			this.scene.selectName.setColor("#759bff");
			this.scene.priceTag.setTexture("gemWater");
			this.scene.priceValue.setText(numberWithSpaces(player.priceElem.water));
			this.scene.buyButton.id = this.id;
		}else if(this.id == 3){
			this.scene.selectName.setText("土元素光环\n+100%\大幅增加对土抗性树木的伤害");
			this.scene.selectName.setColor("#67fe83");
			this.scene.priceTag.setTexture("gemEarth");
			this.scene.priceValue.setText(numberWithSpaces(player.priceElem.earth));
			this.scene.buyButton.id = this.id;
		}else if(this.id == 4){
			this.scene.selectName.setText("气元素光环\n+100%\大幅增加对气抗性树木的伤害");
			this.scene.selectName.setColor("#fff372");
			this.scene.priceTag.setTexture("gemAir");
			this.scene.priceValue.setText(numberWithSpaces(player.priceElem.air));
			this.scene.buyButton.id = this.id;
		}
		
	}
	
	touched(pointer){
		this.setAlpha(0.5);
	}
	
	notTouched(pointer){
		this.setAlpha(1);
	}
	
}



//aura buy button

class BuyAuraButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuUpgradeBuy1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		this.id = 0;
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			
			
		if(this.id == 1){
			if(player.priceElem.fire <= player.fireGem){
				player.fireGem -= player.priceElem.fire;
				player.fireElem += 1;
				player.priceElem.fire = Math.floor(player.priceElem.fire * 1.5);
				this.scene.priceValue.setText(numberWithSpaces(player.priceElem.fire));
				this.scene.buyAllCheck = true;
			}
		}else if(this.id == 2){
			if(player.priceElem.water <= player.waterGem){
				player.waterGem -= player.priceElem.water;
				player.waterElem += 1;
				player.priceElem.water = Math.floor(player.priceElem.water * 1.5);
				this.scene.priceValue.setText(numberWithSpaces(player.priceElem.water));
				this.scene.buyAllCheck = true;
			}
		}else if(this.id == 3){
			if(player.priceElem.earth <= player.earthGem){
				player.earthGem -= player.priceElem.earth;
				player.earthElem += 1;
				player.priceElem.earth = Math.floor(player.priceElem.earth * 1.5);
				this.scene.priceValue.setText(numberWithSpaces(player.priceElem.earth));
				this.scene.buyAllCheck = true;
			}
		}else if(this.id == 4){
			if(player.priceElem.air <= player.airGem){
				player.airGem -= player.priceElem.air;
				player.airElem += 1;
				player.priceElem.air = Math.floor(player.priceElem.air * 1.5);
				this.scene.priceValue.setText(numberWithSpaces(player.priceElem.air));
				this.scene.buyAllCheck = true;
			}
		}
		
	}
	
	touched(pointer){
		this.setTexture("menuUpgradeBuy2");
	}
	
	notTouched(pointer){
		this.setTexture("menuUpgradeBuy1");
	}
	
	colorPrice(){
		if(this.id == 1){
			if(player.priceElem.fire > player.fireGem){this.scene.priceValue.setColor("red")}else{this.scene.priceValue.setColor("green")}
		}else if(this.id == 2){
			if(player.priceElem.water > player.waterGem){this.scene.priceValue.setColor("red")}else{this.scene.priceValue.setColor("green")}
		}else if(this.id == 3){
			if(player.priceElem.earth > player.earthGem){this.scene.priceValue.setColor("red")}else{this.scene.priceValue.setColor("green")}
		}else if(this.id == 4){
			if(player.priceElem.air > player.airGem){this.scene.priceValue.setColor("red")}else{this.scene.priceValue.setColor("green")}
		}
	}
}



//aura buy all button

class AuraBuyAll extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuUpgradeAll1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.setDepth(1.1);
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){			

		this.scene.buyAllCheck = false;

		this.scene.buyButton.id = 1;
		this.scene.buyButton.clicked();
		this.scene.buyButton.id = 2;
		this.scene.buyButton.clicked();
		this.scene.buyButton.id = 3;
		this.scene.buyButton.clicked();
		this.scene.buyButton.id = 4;
		this.scene.buyButton.clicked();

		if(this.scene.buyAllCheck == true)
		{
			globalChecks.sceneRestart.aura = true;
		}

	}
	
	touched(pointer){
		this.setTexture("menuUpgradeAll2");
	}
	
	notTouched(pointer){
		this.setTexture("menuUpgradeAll1");
	}
	
}



//reforged reset check

class ResetCheck extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "menuReforgedCheck1");
		scene.add.existing(this);
		this.scene = scene;
		
		this.infoText = scene.add.text(660, 65, "如果您还想\n重置种子和升级，请选中此框！", { metrics: metrics.octin11, fontFamily: 'octin', fontSize: '11pt', color: '#ff1a75', align: 'center', fontStyle: 'bold' });
		this.infoText.x -= this.infoText.width / 2;

		this.setDepth(1.1);
		this.setAlpha(0.9);
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){
		if(resetSeedsStatus == false)
		{
			this.setTexture("menuReforgedCheck2");
			resetSeedsStatus = true;
		}
		else if(resetSeedsStatus == true)
		{
			this.setTexture("menuReforgedCheck1");
			resetSeedsStatus = false;
		}

	}
	
	touched(pointer){
		this.setAlpha(1);
	}
	
	notTouched(pointer){
		this.setAlpha(0.9);
	}

	
}


//reforged button

class ReforgedButton extends Phaser.GameObjects.Image {
	constructor(scene, x, y, id){
		super(scene, x, y, "menuReforgedB1");
		scene.add.existing(this);
		this.scene = scene;

		this.id = id;
		
		this.infoText = scene.add.text(400, 10, "(*) 这将重置您所有斧头的状态和进度！", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#ff3333' }).setVisible(false);
		this.infoText.x -= this.infoText.width / 2;

		this.setDepth(1.1);
		
		this.setInteractive({useHandCursor: true});
		this.on("pointerdown", this.clicked, this);
		this.on("pointerover", this.touched, this);
		this.on("pointerout", this.notTouched, this);
		
	}
	
	clicked(pointer){
		if((player.reforged.collect > 0) || (player.gameFinished == true))
		{
			this.resetSave();

			globalChecks.sceneRestart.main = true;
			globalChecks.sceneRestart.exp = true;
			globalChecks.sceneRestart.forge = true;
			globalChecks.sceneRestart.upgrade = true;
			globalChecks.sceneRestart.aura = true;
			globalChecks.sceneRestart.reforged = true;

			if(this.id == 1)
			{
				player.gameFinished = false;
				globalChecks.sceneRestart.global = true;
				this.scene.sys.scenePlugin.wake("globalScene");
				//this.scene.sys.scenePlugin.remove();
			}

		}
	}
	
	touched(pointer){
		this.setTexture("menuReforgedB2");
		if(this.id != 1){this.infoText.setVisible(true);}
	}
	
	notTouched(pointer){
		this.setTexture("menuReforgedB1");
		if(this.id != 1){this.infoText.setVisible(false);}
	}

	resetSave(){
		player.date = new Date();
		player.idleValue = 0;
		
		player.reforged.seeds += player.reforged.collect;
		player.reforged.collect = 0;


		if((player.reforged.priceValue != false) && (player.reforged.priceLevel != false))
		{
			this.retrieveSeeds();
			
			player.reforged.extraLevelPoints = 0;
			player.reforged.extraStaminaBar = 0;	
			player.reforged.extraEfficiency = 0;	
			player.reforged.extraLoot = 0;						
			player.reforged.extraDmgScaling = 0;

			player.reforged.priceValue = false;
			player.reforged.priceLevel = false;

			player.reforged.priceLevelPoints = 5;	
			player.reforged.priceStaminaBar = 5;		
			player.reforged.priceEfficiency = 5;			
			player.reforged.priceLoot = 5;						
			player.reforged.priceDmgScaling = 5;
		}
		
		// if(resetSeedsStatus == true)
		// {
		// 	this.retrieveSeeds();
			
		// 	player.reforged.extraLevelPoints = 0;
		// 	player.reforged.extraStaminaBar = 0;	
		// 	player.reforged.extraEfficiency = 0;	
		// 	player.reforged.extraLoot = 0;						
		// 	player.reforged.extraDmgScaling = 0;	

		// 	player.reforged.priceLevel = 1;
		// 	player.reforged.priceValue = 5;
		// }

		player.wood = 0;
		player.fireGem = 0;
		player.waterGem = 0;
		player.earthGem = 0;
		player.airGem = 0;

		player.fireElem = 0;
		player.waterElem = 0;
		player.earthElem = 0;
		player.airElem = 0;
		player.priceElem.fire = 25000;
		player.priceElem.water = 25000;
		player.priceElem.earth = 25000;
		player.priceElem.air = 25000;
		
		player.axe.id = 1;								// init 1
		player.axe.level = 1;							// init 1
		player.axe.power = 1;							// init 1
		player.axe.currentStamina = 0;		// init 0
		player.axe.exp = 0;								// init 0
		player.axe.expNext = 1;						// init 1
		player.axe.expPoints = 0;					// init 0
		player.axe.stamina = 1;						// init 1
		player.axe.fullStamina = 0;				// init 0
		player.axe.efficiency = 1;				// init 1
		player.axe.luck = 1; 							// init 1
		player.axe.luckGem = 0;						// init 0

		player.tree.name = treesNames[Phaser.Math.Between(0, (treesNames.length - 1))].toUpperCase();
		player.tree.level = 1;
		player.tree.seed = 1;
		player.tree.health = 1500;
		player.tree.healthMax = 1500;
		player.tree.healthBars = 1; // worth 1 million each
		player.tree.healthBarsMax = 1;
		player.tree.hardness = 0;
		player.tree.fdef = 0;
		player.tree.wdef = 0;
		player.tree.edef = 0;
		player.tree.adef = 0;
		player.tree.debuff = [0];

		player.tree.texture = 1;
		player.tree.textureColor = 0xffffff;

		player.imbueVars.sharpness = 0;
		player.imbueVars.expDrop = 0;
		player.imbueVars.bleeding = 0;			//raw chance
		player.imbueVars.bleedingDmg = 1;		//dmg multiplier
		player.imbueVars.bleedingStack = 0;
		player.imbueVars.woodDrop = 0;
		player.imbueVars.gemDrop = 0;
		player.imbueVars.defBreak = 1;
		player.imbueVars.defChance = 0;
		player.imbueVars.auraChance = 0;
		player.imbueVars.auraValue = 1;
		player.imbueVars.breakDebuff = 0;
		player.imbueVars.breakTimer = 2;
		player.imbueVars.breakState = false;
		player.imbueVars.breakStateTime = 0;
		player.imbueVars.basePower = 1;

		player.imbueStats = null;
		player.imbueStats = {
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
				price: 999999,
				state: "unavailable"
			},
			
		};

	}

	retrieveSeeds()
	{

		let totalSeeds = 0;
		let currentPrice = 0; // Every upgrade start at the same value. So just reset this var.
		
		currentPrice = 5;
		let extraLP = 0;
		for(let i = 1; i <= player.reforged.extraLevelPoints; i++){
			totalSeeds += currentPrice;
			extraLP += 1;
			currentPrice += ((extraLP ** 3) * 2);
		}

		currentPrice = 5;
		let extraSB = 0;
		for(let i = 1; i <= player.reforged.extraStaminaBar; i++){
			totalSeeds += currentPrice;
			extraSB += 1;
			currentPrice += ((extraSB ** 2) * 3);
		}

		currentPrice = 5;
		let extraEff = 0;
		for(let i = 1; i <= player.reforged.extraEfficiency; i++){
			totalSeeds += currentPrice;
			extraEff += 1;
			currentPrice += ((extraEff ** 3) * 2);
		}

		currentPrice = 5;
		let extraL = 0;
		for(let i = 1; i <= player.reforged.extraLoot; i++){
			totalSeeds += currentPrice;
			extraL += 1;
			currentPrice += ((extraL ** 3) * 2);
		}

		currentPrice = 5;
		let extraD = 0;
		for(let i = 1; i <= player.reforged.extraDmgScaling; i++){
			totalSeeds += currentPrice;
			extraD += 1;
			currentPrice += ((extraD ** 3) * 2);
		}


		// let totalSeeds = 0;
		// let price = 5;
		// let mult = 1;
		// for(let i = 1; i < player.reforged.priceLevel; i++)
		// {
		// 	totalSeeds += price;
		// 	price += mult * 3;

		// 	mult++;		
		// }

		player.reforged.seeds += totalSeeds;
	
	}
	
}




