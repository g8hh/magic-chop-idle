/* GLOBAL SCENE
	
	Working as a global scene. Anything running in here will never stop when the sub scenes swap!

*/

class Global extends Phaser.Scene {
	constructor(){
		super("globalScene");
	}
	
	create(){
		loadFinished = true;

		this.scene.launch('mainScene');
		this.mainScene = this.scene.get('mainScene');

		this.scene.launch('expScene');
		this.scene.sleep('expScene');
		this.scene.launch('forgeScene');
		this.scene.sleep('forgeScene');
		this.scene.launch('upgradeScene');
		this.scene.sleep('upgradeScene');
		this.scene.launch('auraScene');
		this.scene.sleep('auraScene');
		this.scene.launch('reforgedScene');
		this.scene.sleep('reforgedScene');
		this.scene.launch('optionScene');
		this.scene.sleep('optionScene');
		
		this.expScene = this.scene.get('expScene');
		this.forgeScene = this.scene.get('forgeScene');
		this.upgradeScene = this.scene.get('upgradeScene');
		this.auraScene = this.scene.get('auraScene');
		this.reforgedScene = this.scene.get('reforgedScene');
		
		
		this.scene.bringToTop();
		
		this.gameTick = this.time.addEvent({ delay: 100, callback: this.updateTick, callbackScope: this, loop: true });
		this.dmgPerSecondRender = 0;
		this.dmgPerSecondRenderM = 0;
		this.choppedCheck = false;
		
		
		this.bottomLayer = this.add.image(400, 565, "botlayer").setDepth(1);
		this.bottomLight = this.add.image(40, 577, "botlight").setDepth(1);
		
		this.chopMenu = new MenuButton(this, 40, 570, "icon_chop", 1);
		this.expMenu = new MenuButton(this, 115, 570, "icon_exp", 2);
		this.forgeMenu = new MenuButton(this, 190, 570, "icon_forge", 3);
		this.upgradeMenu = new MenuButton(this, 265, 570, "icon_upgrade", 4);
		this.auraMenu = new MenuButton(this, 340, 570, "icon_aura", 5);
		this.reforgedMenu = new MenuButton(this, 415, 570, "icon_reforged", 6);
		this.optionMenu = new MenuButton(this, 740, 570, "icon_config", 7);
		
	}
	
	update(time, delta){
		//config
		if(globalChecks.sceneRestart.global == true){
			if(player.gameFinished == false){this.scene.remove("endingScene");}
			globalChecks.sceneRestart.global = false;
			//this.scene.stop('endingScene');
			this.scene.restart();
		}

		//game finished check
		if(player.gameFinished == true){
			//open the game scene while sleeping global!
			this.scene.sleep('mainScene');
			this.scene.sleep('expScene');
			this.scene.sleep('forgeScene');
			this.scene.sleep('upgradeScene');
			this.scene.sleep('auraScene');
			this.scene.sleep('reforgedScene');
			this.scene.sleep('optionScene');

			this.scene.launch('endingScene');
			this.scene.sleep();
		}

		// IDLE CHECK
		if((idleCheck == true) || (player.idleValue > 0))
		{
			if(this.scene.isActive('mainScene'))
			{
				this.scene.pause('mainScene');
			}

			if(this.scene.isActive('expScene'))
			{
				this.scene.pause('expScene');
			}

			if(this.scene.isActive('forgeScene'))
			{
				this.scene.pause('forgeScene');
			}

			if(this.scene.isActive('upgradeScene'))
			{
				this.scene.pause('upgradeScene');
			}

			if(this.scene.isActive('auraScene'))
			{
				this.scene.pause('auraScene');
			}

			if(this.scene.isActive('reforgedScene'))
			{
				this.scene.pause('reforgedScene');
			}

			this.scene.launch('idleScene');
			this.scene.pause();
		}
	
	}	
	
	updateTick(){
		// gameFocus grants that the the tick only works when the game is on focus.
		if((gameFocus == true) && (player.gameFinished == false))
		{	

			// passive imbuements
			if(player.imbueVars.expDrop > 0)
			{
				if(Phaser.Math.Between(1, 100) < player.imbueVars.expDrop)
				{
					let axeEfficiency = player.axe.efficiency + (player.axe.efficiency * player.reforged.extraEfficiency);
					if((player.tree.debuff.includes(4) == true) && (player.imbueVars.breakState == false))
					{
						axeEfficiency = Math.ceil(axeEfficiency * 0.5);
					}
					player.axe.exp += axeEfficiency;
					this.levelUp();
				}
			}
			
			let passiveWoodDrop = player.imbueVars.woodDrop;
			if(passiveWoodDrop > 0)
			{
				if((player.tree.debuff.includes(3) == true) && (player.imbueVars.breakState == false))
				{
					passiveWoodDrop = Math.floor(passiveWoodDrop / 2);
				}

				if(Phaser.Math.Between(1, 100) <= passiveWoodDrop)
				{
					player.wood += 1 * (1 + player.reforged.extraLoot);
				}
			}

			let passiveGemDrop = player.imbueVars.gemDrop;
			if(passiveGemDrop > 0)
			{
				if((player.tree.debuff.includes(3) == true) && (player.imbueVars.breakState == false))
				{
					passiveGemDrop = Math.floor(passiveGemDrop / 2);
				}

				if(Phaser.Math.Between(1, 100) <= passiveGemDrop)
				{
					this.gemChoice(Phaser.Math.Between(1, 4));
				}
			}



			//Update trees regenaration (For now 1% per second (10x 0.001))
			if((player.tree.debuff.includes(1) == true) && (player.imbueVars.breakState == false))
			{
				let reghp = Math.floor(player.tree.healthMax * 0.001);
				let reghpbar = Math.floor(player.tree.healthBarsMax * 0.001);
				if(reghpbar > 0)
				{
					player.tree.healthBars += reghpbar;
					if(player.tree.healthBars > player.tree.healthBarsMax){player.tree.healthBars = player.tree.healthBarsMax;}
				}

				player.tree.health += reghp;
				
				if(player.tree.health > 1000000)
				{
					player.tree.healthBars += 1;
					if(player.tree.healthBars > player.tree.healthBarsMax){player.tree.healthBars = player.tree.healthBarsMax;}
					player.tree.health -= 1000000;
				}
				
				if((player.tree.health > player.tree.healthMax) && (player.tree.healthBars == player.tree.healthBarsMax)){player.tree.health = player.tree.healthMax;}
				
			}		
			
			//Update stamina
			let axeStamina = player.axe.stamina;
			let fullStamina = player.axe.fullStamina;
			if((player.tree.debuff.includes(2) == true) && (player.imbueVars.breakState == false))
			{
				axeStamina = Math.ceil(axeStamina * 0.5);
				fullStamina = Math.ceil(fullStamina * 0.5);
			}
			
			player.axe.currentStamina += axeStamina;	
			
			if(player.axe.currentStamina >= 100){
				player.axe.currentStamina -= 100;
				this.chopTree();
				this.debuffBreak();
			}

			//Extra bars chops!
			for(let i = 1; i <= fullStamina; i++){
				this.chopTree();
			}

			//dmg sec render
			if(this.choppedCheck == true)
			{
				if(this.dmgPerSecondRender >= 1000000)
				{
					let mValue = Math.floor(this.dmgPerSecondRender / 1000000);
					this.dmgPerSecondRenderM += mValue;
					this.dmgPerSecondRender -= mValue * 1000000;
				}

				let dmgSecText = "0";
				if((this.dmgPerSecondRenderM > 0) && (this.dmgPerSecondRender == 0)){ dmgSecText = this.dmgPerSecondRenderM + " M"; }
				else if(this.dmgPerSecondRenderM > 0){ dmgSecText = this.dmgPerSecondRender + " + " + this.dmgPerSecondRenderM + " M"; }
				else { dmgSecText = this.dmgPerSecondRender; }

				this.mainScene.axeDmgValue.setText(numberWithSpaces(dmgSecText));

				this.dmgPerSecondRender = 0;
				this.dmgPerSecondRenderM = 0;
				this.choppedCheck = false;
			}

			//save
			savePlayer();
		}
	}
	
	


	//Chopping mechanics
	chopTree(){
		this.choppedCheck = true;
		
		let treeLevel = player.tree.level;
		let treeFinished = false;

		let treeHardness = player.tree.hardness;
		let treeFdef = player.tree.fdef;
		let treeWdef = player.tree.wdef;
		let treeEdef = player.tree.edef;
		let treeAdef = player.tree.adef;
		if(player.imbueVars.defChance > 0)
		{
			if(Phaser.Math.Between(1, 100) <= player.imbueVars.defChance)
			{
				treeFdef = Math.floor(treeFdef * player.imbueVars.defBreak);
				treeWdef = Math.floor(treeWdef * player.imbueVars.defBreak);
				treeEdef = Math.floor(treeEdef * player.imbueVars.defBreak);
				treeAdef = Math.floor(treeAdef * player.imbueVars.defBreak);
			}
		}


		//(damage = att * att / (att + def))


		let treeDef = treeHardness - (Math.ceil(treeHardness * player.imbueVars.sharpness));
		let extraDef = (treeDef*treeFdef) + (treeDef*treeWdef) + (treeDef*treeEdef) + (treeDef*treeAdef);
		treeDef += extraDef;
		
		if(player.imbueVars.auraChance > 0)
		{
			if(Phaser.Math.Between(1, 100) <= player.imbueVars.auraChance)
			{
				player.imbueVars.auraValue += 1;
			}
			else
			{
				player.imbueVars.auraValue = 1;
			}
		}

		let axePower = (player.axe.power * (1 + player.imbueVars.basePower));
		let extraPower = 0;
		if(player.tree.fdef > 0){extraPower += (axePower * (player.fireElem * player.imbueVars.auraValue));}
		if(player.tree.wdef > 0){extraPower += (axePower * (player.waterElem * player.imbueVars.auraValue));}
		if(player.tree.edef > 0){extraPower += (axePower * (player.earthElem * player.imbueVars.auraValue));}
		if(player.tree.adef > 0){extraPower += (axePower * (player.airElem * player.imbueVars.auraValue));}
		axePower += extraPower;
		
		let totalPower = axePower*gameAxes["axe_"+player.axe.id].dmgMultiplier;
		let bdmg = (totalPower**2)/(totalPower + treeDef);
		let dmg = Math.floor(bdmg+0.5); // FINAL DAMAGE!
		
		if(dmg < 1){dmg = 1;} // Minimum damage of 1;

		//bleeding!
		if(player.imbueVars.bleeding > 0)
		{
			if(Phaser.Math.Between(1, 100) <= player.imbueVars.bleeding)
			{
				dmg = Math.floor(dmg * (player.imbueVars.bleedingDmg + player.imbueVars.bleedingStack));
				player.imbueVars.bleedingStack += player.imbueVars.bleedingDmg;
			}
			else
			{
				player.imbueVars.bleedingStack = 0;
			}
		}
		
		//Dmg the tree
		let barDmg = 0;

		if((dmg >= 1000000) && (player.tree.healthBars > 1)){
			barDmg = Math.floor(dmg/1000000);
			player.tree.healthBars -= barDmg;
			dmg -= barDmg*1000000;
		}
		
		let cutDmg = 0; //if the tree's hp goes under 0, it will calculates the extra dmg left for the next bar
		if((player.tree.health - dmg) < 0){
			cutDmg = Math.abs(player.tree.health - dmg);
		}
		
		player.tree.health -= dmg;

		this.dmgPerSecondRender += dmg;
		this.dmgPerSecondRenderM += barDmg;

		if(player.tree.health <= 0){
			
			player.tree.health = 1000000 - cutDmg;
			player.tree.healthMax = 1000000;
			player.tree.healthBars -= 1;
			
			if(player.tree.healthBars <= 0){
				treeFinished = true;
				this.destroyTree();
			}
		}
		else if(player.tree.healthBars <= 0)
		{
			treeFinished = true;
			this.destroyTree();
		}
		
		
		//Add and calculates exp
		
		let axeEfficiency = (player.axe.efficiency + (player.axe.efficiency * player.reforged.extraEfficiency));
		if((player.tree.debuff.includes(4) == true) && (player.imbueVars.breakState == false))
		{
			axeEfficiency = Math.ceil(axeEfficiency * 0.5);
		}
		
		player.axe.exp += axeEfficiency;
		
		this.levelUp();
		
		//loot
		if(treeFinished == true) //Collects extra loot based on the tree's level!
		{
			for(let i = 1; i <= treeLevel**2; i++)
			{
				this.collectLoot();
			}
		}
		else //normal collection per hit
		{
			this.collectLoot();
		}

	}

	levelUp()
	{
		if(player.axe.exp >= player.axe.expNext)
		{	// LEVEL UP
			player.axe.exp = 0;
			player.axe.level += 1;
			
			//exp points
			player.axe.expPoints += (1 + player.reforged.extraLevelPoints);
			
			//Exp scaling!
			player.axe.expNext += 1 * player.axe.level;
			
			//axe power up
			player.axe.power += (1 + player.reforged.extraDmgScaling);
			
			//text updates
			this.mainScene.axeLevel.setText("等级. " + player.axe.level);
			
		}
	}
	
	collectLoot(){
		
		let axeLuck = player.axe.luck;
		let axeLuckGem = player.axe.luckGem;
		if((player.tree.debuff.includes(3) == true) && (player.imbueVars.breakState == false))
		{
			axeLuck = Math.ceil(axeLuck * 0.5);
			axeLuckGem = Math.ceil(axeLuckGem * 0.5);
		}
		
		//wood drop
		let woodChance = 0;
		let woodLuckCalc = Math.floor((axeLuck*25)/100); //amount of 100%
		woodChance = (axeLuck*25)-(woodLuckCalc*100); //chance of wood drop
		
		player.wood += woodLuckCalc * (1 + player.reforged.extraLoot); //granted 100% woods
		if(Phaser.Math.Between(1, 100) <= woodChance){ //normal wood drop
			player.wood += (1 + (1 * player.reforged.extraLoot));
		}
		
		//gems drop
		let gemChance = 0;
		let gemLuckCalc = Math.floor((axeLuckGem*5)/100); //amount of 100%
		gemChance = (axeLuckGem*5)-(gemLuckCalc*100); //chance of gem drop
		
		for(let i = 1; i <= gemLuckCalc; i++){
			this.gemChoice(Phaser.Math.Between(1, 4));
		}
		
		if(Phaser.Math.Between(1, 100) <= gemChance){ //normal gem drop
			this.gemChoice(Phaser.Math.Between(1, 4));
		}
		
	}
	
	gemChoice(c){
		if(c == 1){
			player.fireGem += (1 * (1 + player.reforged.extraLoot)); 
		}else if(c == 2){
			player.waterGem += (1 * (1 + player.reforged.extraLoot)); 
		}else if(c == 3){
			player.earthGem += (1 * (1 + player.reforged.extraLoot)); 
		}else if(c == 4){
			player.airGem += (1 * (1 + player.reforged.extraLoot)); 
		}
	}
	


	//Tree ended
	destroyTree()
	{
		if(player.tree.level == 100){player.gameFinished = true;}
		else {
			player.tree.level += 1;
			this.treeReset();

			player.tree.name = treesNames[Phaser.Math.Between(0, (treesNames.length - 1))].toUpperCase();
			if(player.tree.level == 100){player.tree.name = "YGGDRASIL"}
			this.mainScene.treeName.setText(player.tree.name);
			
			// texture
			let textureValue = player.tree.texture;
			while(textureValue == player.tree.texture)
			{
				textureValue = Phaser.Math.Between(1, 30);
			}
			player.tree.texture = textureValue;
			player.tree.textureColor = Math.random() * 0xffffff;

			if(player.tree.level == 100){player.tree.texture = 0; player.tree.textureColor = 0xffffff;}
			this.mainScene.treeImg.setTexture("treePic"+player.tree.texture);
			this.mainScene.treeImg.setTint(player.tree.textureColor);

			//seed amount
			player.reforged.collect += player.tree.seed;

			let extraSeeds = 1;
			if(player.tree.level >= 25){extraSeeds = 2;}
			if(player.tree.level >= 50){extraSeeds = 5;}
			if(player.tree.level >= 75){extraSeeds = 10;}
			if(player.tree.level == 100){extraSeeds = 100;}

			player.tree.seed = player.tree.level * extraSeeds;

			// life points		
			let baseFactor = 1500;		// Can be adjusted (Inital raw value)
			let baseExp = 2;					// Can be adjusted (Exponential grownth value)
			let millionCount = 1;
			let xFactor = 0;
			
			while(xFactor < 1000000)
			{
				xFactor = baseFactor*(millionCount**baseExp);
				millionCount++;
			}
			millionCount -= 2; // 2 steps back. One for the etxtra ++ and the other to go one before the last.
			// Represents the tree level. 
			// Trees will only have 1 million bars after the last level before 1 million total hp.

			if(baseFactor*(player.tree.level**baseExp) <= 1000000)
			{
				player.tree.health = baseFactor*(player.tree.level**2);
				player.tree.healthMax = player.tree.health;
			}
			else
			{
				let barsAmount = player.tree.level - millionCount;
				player.tree.health = Phaser.Math.Between(1, 1000000);
				player.tree.healthMax = player.tree.health;
				player.tree.healthBars = 1 + (barsAmount**baseExp);
				player.tree.healthBarsMax = player.tree.healthBars;
			}
			
			
			// hardness
			let extraHard = 1;
			if(player.tree.level >= 25){extraHard = 2;}
			if(player.tree.level >= 50){extraHard = 3;}
			if(player.tree.level >= 75){extraHard = 4;}
			if(player.tree.level == 100){extraHard = 5;}
			player.tree.hardness = (player.tree.level * extraHard) ** 5;
			
			// debuffs (levels 10, 15, 20, 25)
			let debuffPool = [1, 2, 3, 4, 5];
			let debuffChances = {
				debuff1: 0,
				debuff2: 0,
				debuff3: 0,
				debuff4: 0,
				debuff5: 0
			}

			if((player.tree.level >= 10) && (player.tree.level < 20)){debuffChances.debuff1 = 25;}
			else if((player.tree.level >= 20) && (player.tree.level < 30)){debuffChances.debuff1 = 50; debuffChances.debuff2 = 25;}
			else if((player.tree.level >= 30) && (player.tree.level < 40)){debuffChances.debuff1 = 75; debuffChances.debuff2 = 50; debuffChances.debuff3 = 25;}
			else if((player.tree.level >= 40) && (player.tree.level < 50)){debuffChances.debuff1 = 100; debuffChances.debuff2 = 75; debuffChances.debuff3 = 50; debuffChances.debuff4 = 25;}
			else if((player.tree.level >= 50) && (player.tree.level < 60)){debuffChances.debuff1 = 100; debuffChances.debuff2 = 100; debuffChances.debuff3 = 75; debuffChances.debuff4 = 50;}
			else if((player.tree.level >= 60) && (player.tree.level < 75)){debuffChances.debuff1 = 100; debuffChances.debuff2 = 100; debuffChances.debuff3 = 100; debuffChances.debuff4 = 75;}
			else if((player.tree.level >= 75) && (player.tree.level < 100)){debuffChances.debuff1 = 100; debuffChances.debuff2 = 100; debuffChances.debuff3 = 100; debuffChances.debuff4 = 100;}
			else if(player.tree.level >= 100){debuffChances.debuff1 = 100; debuffChances.debuff2 = 100; debuffChances.debuff3 = 100; debuffChances.debuff4 = 100; debuffChances.debuff5 = 100;}


			for(let i = 1; i <= 5; i++)
			{
				let debuffChance = Phaser.Math.Between(1, 100);
				
				if(debuffChance <= debuffChances["debuff" + i])
				{
					let randomDebuff = Phaser.Math.Between(0, (debuffPool.length - 1));

					player.tree.debuff.push(debuffPool[randomDebuff]);

					debuffPool.splice(randomDebuff, 1);
				}
			}

			// elemental defenses
			if(player.tree.level >= 25)
			{	
				let chance1 = false;
				let chance2 = false;
				let chance3 = false;
				let chance4 = false;

				if(player.tree.level < 50){chance1 = true;}
				else if(player.tree.level < 75){chance1 = true; chance2 = true;}
				else if(player.tree.level < 100){chance1 = true; chance2 = true; chance3 = true;}
				else{chance1 = true; chance2 = true; chance3 = true; chance4 = true;}
				
				let minValue = player.tree.level - 24;
				let maxValue = minValue * 2;

				if(player.tree.level == 100){minValue = maxValue;}
				
				let elemFunctions = [
					function(){player.tree.fdef = Phaser.Math.Between(minValue, maxValue)},
					function(){player.tree.wdef = Phaser.Math.Between(minValue, maxValue)},
					function(){player.tree.edef = Phaser.Math.Between(minValue, maxValue)},
					function(){player.tree.adef = Phaser.Math.Between(minValue, maxValue)}
				];
				
				if(chance1 == true)
				{
					let luckN = Phaser.Math.Between(0, (elemFunctions.length - 1));
					elemFunctions[luckN]();
					elemFunctions.splice(luckN, 1);
				}
				
				if(chance2 == true)
				{
					let luckN = Phaser.Math.Between(0, (elemFunctions.length - 1));
					elemFunctions[luckN]();
					elemFunctions.splice(luckN, 1);
				}
				
				if(chance3 == true)
				{
					let luckN = Phaser.Math.Between(0, (elemFunctions.length - 1));
					elemFunctions[luckN]();
					elemFunctions.splice(luckN, 1);
				}
				
				if(chance4 == true)
				{
					let luckN = Phaser.Math.Between(0, (elemFunctions.length - 1));
					elemFunctions[luckN]();
					elemFunctions.splice(luckN, 1);
				}
				
			}
		
		}
	}

	debuffBreak()
	{
		if(player.imbueVars.breakState == true)
		{
			if(player.imbueVars.breakStateTime > 0)
			{
				player.imbueVars.breakStateTime -= 1;
			}
			else
			{
				player.imbueVars.breakState = false;
			}
		}

		if((player.imbueVars.breakDebuff > 0) && (player.imbueVars.breakState == false))
		{
			if(Phaser.Math.Between(1, 100) < player.imbueVars.breakDebuff)
			{
				player.imbueVars.breakState = true;
				player.imbueVars.breakStateTime = player.imbueVars.breakTimer;		
			}
		}
	}
	
	treeReset()
	{
		player.tree.health = 1500;
		player.tree.healthMax = 1500;
		player.tree.healthBars = 1;
		player.tree.healthBarsMax = 1;
		player.tree.hardness = 0;
		player.tree.fdef = 0;
		player.tree.wdef = 0;
		player.tree.edef = 0;
		player.tree.adef = 0;
		player.tree.debuff = [0];
	}
	
	
	
}