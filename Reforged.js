/* REFORGED SCENE */

class Reforged extends Phaser.Scene {
	constructor(){
		super("reforgedScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		// this.sceneText = this.add.text(400, 300, "REFORGED SCENE", { fontFamily: 'Verdana', fontSize: '30pt', color: 'white' });
		// this.sceneText.x -= this.sceneText.width/2;
		
		this.base = this.add.image(400, 550, "menuChopBase");

		this.yellowStrips = this.add.image(400, 277, "menuReforgedYellow");
		this.selectStrip1 = this.add.image(400, 177, "menuReforgedSel").setInteractive({useHandCursor: true});
		this.selectStrip2 = this.add.image(400, 227, "menuReforgedSel").setInteractive({useHandCursor: true});
		this.selectStrip3 = this.add.image(400, 277, "menuReforgedSel").setInteractive({useHandCursor: true});
		this.selectStrip4 = this.add.image(400, 327, "menuReforgedSel").setInteractive({useHandCursor: true});
		this.selectStrip5 = this.add.image(400, 377, "menuReforgedSel").setInteractive({useHandCursor: true});
		this.selectStrip1.alpha = 0.01;
		this.selectStrip2.alpha = 0.01;
		this.selectStrip3.alpha = 0.01;
		this.selectStrip4.alpha = 0.01;
		this.selectStrip5.alpha = 0.01;

		//seeds values
		//Texts
		this.seeds = this.add.text(400, 475, numberWithSpaces(player.reforged.seeds), { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: '#54ff64' });
		this.seeds.x -= this.seeds.width/2;
		this.seeds.y -= this.seeds.height/2;

		let xPos = this.seeds.x;
		this.seedArt = this.add.image(0, 475, "menuReforgedSeed");
		this.seedArt.x = xPos - this.seedArt.width;

		
		this.reforgeSeeds = this.add.text(400, 115, "+ " + (numberWithSpaces(player.reforged.collect)), { metrics: metrics.euphorigenic16, fontFamily: 'euphorigenic', fontSize: '16pt', color: '#0080ff' });
		this.reforgeSeeds.x -= this.seeds.width/2;
		this.reforgeSeeds.y -= this.seeds.height/2;
		
		xPos = this.reforgeSeeds.x;
		this.reforgeSeedsArt = this.add.image(0, 115, "menuReforgedSeed").setScale(0.5);
		this.reforgeSeedsArt.x = (xPos + this.reforgeSeeds.width) + (this.reforgeSeedsArt.width / 2);

		this.upgradeCost = this.add.text(675, 115, "UPGRADE COST", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#ffd633', fontStyle: 'italic' });
		
		this.seedsDrop = this.add.text(25, 115, "SEEDS ARE GAINED AFTER CUTTING A TREE", { metrics: metrics.octin10, fontFamily: 'octin', fontSize: '10pt', color: '#0080ff', fontStyle: 'italic' });

		//buttons
		this.reforgeButton = new ReforgedButton(this, 400, 65, 0);
		
		this.buttonExp = this.add.text(15, 160, "+ " + (player.reforged.extraLevelPoints + 1) + " exp points per level up", { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.buttonDmg = this.add.text(15, 210, "+ " + (player.reforged.extraDmgScaling + 1) + " base axe damage per level up", { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.buttonEff = this.add.text(15, 260, "x " + (player.reforged.extraEfficiency + 1) + " efficiency multiplier", { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.buttonDrop = this.add.text(15, 310, "x " + (player.reforged.extraLoot + 1) + " wood/gem drop multiplier", { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.buttonBars = this.add.text(15, 360, (player.reforged.extraStaminaBar) + " / 25 extra stamina bars", { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });

		// resetSeedsStatus = false; //reset when the scene restart!
		// this.resetSeeds = new ResetCheck(this, 660, 50);

		//prices text
		this.priceExp = this.add.text(785, 160, numberWithSpaces(player.reforged.priceLevelPoints), { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.priceDmg = this.add.text(785, 210, numberWithSpaces(player.reforged.priceDmgScaling), { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.priceEff = this.add.text(785, 260, numberWithSpaces(player.reforged.priceEfficiency), { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.priceDrop = this.add.text(785, 310, numberWithSpaces(player.reforged.priceLoot), { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.priceBars = this.add.text(785, 360, numberWithSpaces(player.reforged.priceStaminaBar), { metrics: metrics.euphorigenic22, fontFamily: 'euphorigenic', fontSize: '22pt', color: 'white' });
		this.priceExp.x -= this.priceExp.width;
		this.priceDmg.x -= this.priceDmg.width;
		this.priceEff.x -= this.priceEff.width;
		this.priceDrop.x -= this.priceDrop.width;
		this.priceBars.x -= this.priceBars.width;

		//exp
		this.selectStrip1.on("pointerdown", function()
		{
			if(player.reforged.seeds >= player.reforged.priceLevelPoints)
			{
				player.reforged.seeds -= player.reforged.priceLevelPoints;
				player.reforged.extraLevelPoints += 1;
				player.reforged.priceLevelPoints += ((player.reforged.extraLevelPoints ** 3) * 2);
				globalChecks.sceneRestart.reforged = true;
			}
		}, this);
		this.selectStrip1.on("pointerover", function(){this.selectStrip1.alpha = 1;}, this);
		this.selectStrip1.on("pointerout", function(){this.selectStrip1.alpha = 0.01;}, this);

		//dmg
		this.selectStrip2.on("pointerdown", function()
		{
			if(player.reforged.seeds >= player.reforged.priceDmgScaling)
			{
				player.reforged.seeds -= player.reforged.priceDmgScaling;
				player.reforged.extraDmgScaling += 1;
				player.reforged.priceDmgScaling += ((player.reforged.extraDmgScaling  ** 3) * 2);
				globalChecks.sceneRestart.reforged = true;
			}
		}, this);
		this.selectStrip2.on("pointerover", function(){this.selectStrip2.alpha = 1;}, this);
		this.selectStrip2.on("pointerout", function(){this.selectStrip2.alpha = 0.01;}, this);

		//eff
		this.selectStrip3.on("pointerdown", function()
		{
			if(player.reforged.seeds >= player.reforged.priceEfficiency)
			{
				player.reforged.seeds -= player.reforged.priceEfficiency;
				player.reforged.extraEfficiency += 1;
				player.reforged.priceEfficiency += ((player.reforged.extraEfficiency ** 3) * 2);
				globalChecks.sceneRestart.reforged = true;
			}
		}, this);
		this.selectStrip3.on("pointerover", function(){this.selectStrip3.alpha = 1;}, this);
		this.selectStrip3.on("pointerout", function(){this.selectStrip3.alpha = 0.01;}, this);

		//drop
		this.selectStrip4.on("pointerdown", function()
		{
			if(player.reforged.seeds >= player.reforged.priceLoot)
			{
				player.reforged.seeds -= player.reforged.priceLoot;
				player.reforged.extraLoot += 1;
				player.reforged.priceLoot += ((player.reforged.extraLoot ** 3) * 2);
				globalChecks.sceneRestart.reforged = true;
			}
		}, this);
		this.selectStrip4.on("pointerover", function(){this.selectStrip4.alpha = 1;}, this);
		this.selectStrip4.on("pointerout", function(){this.selectStrip4.alpha = 0.01;}, this);

		//bars
		this.selectStrip5.on("pointerdown", function()
		{
			if((player.reforged.seeds >= player.reforged.priceStaminaBar) && (player.reforged.extraStaminaBar < 25))
			{
				player.reforged.seeds -= player.reforged.priceStaminaBar;
				player.reforged.extraStaminaBar += 1;
				player.reforged.priceStaminaBar += ((player.reforged.extraStaminaBar ** 2) * 3);
				globalChecks.sceneRestart.reforged = true;
			}
		}, this);
		this.selectStrip5.on("pointerover", function(){this.selectStrip5.alpha = 1;}, this);
		this.selectStrip5.on("pointerout", function(){this.selectStrip5.alpha = 0.01;}, this);
	
		
  }

  update(time, delta)
  {
    //config
		if(globalChecks.sceneRestart.reforged == true){
			globalChecks.sceneRestart.reforged = false;
			resetSeedsStatus = false;
			this.scene.restart();
		}

		//text
		this.seeds.x = 400 - (this.seeds.width / 2);
		let xPos = this.seeds.x;
		this.seedArt.x = xPos - this.seedArt.width;

		this.reforgeSeeds.x = 400 - ((this.reforgeSeeds.width + this.reforgeSeedsArt.width) / 2);
		xPos = this.reforgeSeeds.x;
		this.reforgeSeedsArt.x = (xPos + this.reforgeSeeds.width) + (this.reforgeSeedsArt.width / 2);

		this.seeds.setText(numberWithSpaces(player.reforged.seeds));
		this.reforgeSeeds.setText("+ " + (numberWithSpaces(player.reforged.collect)));

		if((player.reforged.extraStaminaBar >= 25) && (this.priceBars.visible == true))
		{
			this.selectStrip5.removeInteractive();
			this.priceBars.setVisible(false);
		}

		if(player.reforged.priceValue <= player.reforged.seeds) { this.priceExp.setColor("#4dff4d"); }
		else { this.priceExp.setColor("#ff3333"); }

		if(player.reforged.priceValue <= player.reforged.seeds) { this.priceDmg.setColor("#4dff4d"); }
		else { this.priceDmg.setColor("#ff3333"); }

		if(player.reforged.priceValue <= player.reforged.seeds) { this.priceEff.setColor("#4dff4d"); }
		else { this.priceEff.setColor("#ff3333"); }

		if(player.reforged.priceValue <= player.reforged.seeds) { this.priceDrop.setColor("#4dff4d"); }
		else { this.priceDrop.setColor("#ff3333"); }

		if(player.reforged.extraStaminaBar < 25)
		{
			if(player.reforged.priceValue <= player.reforged.seeds) { this.priceBars.setColor("#4dff4d"); }
			else { this.priceBars.setColor("#ff3333"); }
		}
		
  }

}