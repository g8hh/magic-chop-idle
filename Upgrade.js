/* UPGRADE SCENE */

class Upgrade extends Phaser.Scene {
	constructor(){
		super("upgradeScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		// this.sceneText = this.add.text(400, 300, "UPGRADE SCENE", { fontFamily: 'Verdana', fontSize: '30pt', color: 'white' });
		// this.sceneText.x -= this.sceneText.width/2;
		
		this.upgradeFrame = this.add.image(400, 230, "menuUpgradeFrame").setDepth(1);
		
		this.buyButton = new BuyButton(this, 705, 420);
		
		this.base = this.add.image(400, 600, "menuForgeBase");
		
		this.selectGroup = this.add.group();
		this.select1 = new SelectUpgradeButton(this, 400, 40, "menuUpgradeB1", 1);
		this.select2 = new SelectUpgradeButton(this, 400, 71, "menuUpgradeB2", 2);
		this.select3 = new SelectUpgradeButton(this, 400, 103, "menuUpgradeB1", 3);
		this.select4 = new SelectUpgradeButton(this, 400, 135, "menuUpgradeB2", 4);
		this.select5 = new SelectUpgradeButton(this, 400, 167, "menuUpgradeB1", 5);
		this.select6 = new SelectUpgradeButton(this, 400, 199, "menuUpgradeB2", 6);
		this.select7 = new SelectUpgradeButton(this, 400, 231, "menuUpgradeB1", 7);
		this.select8 = new SelectUpgradeButton(this, 400, 263, "menuUpgradeB2", 8);
		
		this.buyAll = new BuyAll(this, 75, 480);
		this.showAll = new ImbueShowAll(this, 75, 510);

		this.doOnce = false;

		//texts
		this.playerWoodText = this.add.text(400, 465, "木头", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#f27440' });
		this.playerWood = this.add.text(400, 490, "?", { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: 'white' });
		this.playerWoodText.x -= this.playerWoodText.width/2;
		
		this.imbueNameDesc = this.add.text(75, 325, "选择一个灌输", { metrics: metrics.octin14, fontFamily: 'octin', fontSize: '14pt', color: "#ef6bff" }).setDepth(1.1);
		// this.imbueNameDesc.x -= this.imbueNameDesc.width/2;
		
		this.imbueDesc =  this.add.text(75, 355, "", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: '#fff68d' }).setDepth(1.1);
		

		//List vars
		this.selectArray = [];
		this.selectStep = 0;
		
		this.upArrow = this.add.image(775, 75, "menuUpgradeAU2").setInteractive({useHandCursor: true}).setDepth(1.1).setVisible(false);
		this.downArrow = this.add.image(775, 225, "menuUpgradeAD2").setInteractive({useHandCursor: true}).setDepth(1.1).setVisible(false);
		
		this.upArrow.on("pointerdown", function(pointer){
			if(this.selectStep > 0){
				this.selectStep -= 1;
				this.showSelect();
			}
		}, this);
		
		this.downArrow.on("pointerdown", function(pointer){
			if((this.selectArray.length > 8) && (8 + this.selectStep < this.selectArray.length)){
				this.selectStep += 1;
				this.showSelect();
			}
		}, this);
		
	}
	
	
	
	/* 														UPDATE FUNCTION 													*/
		
	update(time, delta){
		
		//config
		if(globalChecks.sceneRestart.upgrade == true){
			globalChecks.sceneRestart.upgrade = false;
			this.scene.restart();
		}
		
		//general
		this.selectSorting();
		this.showSelect();
		
		
		if(this.selectStep > 0){this.upArrow.setTexture("menuUpgradeAU1").setInteractive({useHandCursor: true});
		}else if(this.upArrow.texture != "menuUpgradeAU2"){this.upArrow.setTexture("menuUpgradeAU2").removeInteractive();}
	
		if((this.selectArray.length > 8) && (8 + this.selectStep < this.selectArray.length)){this.downArrow.setTexture("menuUpgradeAD1").setInteractive({useHandCursor: true});
		}else if(this.downArrow.texture != "menuUpgradeAD2"){this.downArrow.setTexture("menuUpgradeAD2").removeInteractive();}
		
		//text
		this.playerWood.setText(numberWithSpaces(player.wood));
		this.playerWood.x = 400 - (this.playerWood.width/2);
		
		
		if(this.doOnce == false)
		{
			if(lastBuyId != 0)
			{
				let thisId = null;

				for(let i = 0; i < this.selectArray.length; i++){
					if(this.selectArray[i].id == lastBuyId){thisId = i;}
				}

				if(thisId != null)
				{
					let axeId = this.selectArray[(thisId + this.selectStep)].id;
					this.buyButton.axeId = axeId;
					this.buyButton.imbuePrice = this.selectArray[(thisId + this.selectStep)].price;
					this.imbueNameDesc.setText(gameAxes["axe_"+axeId].imbueName);
					this.imbueDesc.setText(gameAxes["axe_"+axeId].imbueDesc());
				}
			}

			this.doOnce = true;
		}


		
	}
	
	
	
	/* 														GAME FUNCTIONS 													*/
	showSelect(){
		
		this.selectGroup.children.iterate(function (child) {
			
			let myId = child.id;
			if((child.scene.selectArray.length >= (myId + child.scene.selectStep)) && (child.scene.selectArray.length > 0)){
				child.imbuementName.setText(gameAxes["axe_"+child.scene.selectArray[(myId + child.scene.selectStep)-1].id].imbueName);
				child.imbuementPrice.setText(numberWithSpaces(child.scene.selectArray[(myId + child.scene.selectStep)-1].price));
				
				if(child.scene.selectArray[(myId + child.scene.selectStep)-1].price <= player.wood){
					child.imbuementPrice.setColor("yellow");
				}else{
					child.imbuementPrice.setColor("red");
				}	
				
				child.imbuementPrice.x = 720 - child.imbuementPrice.width;
				child.activated = true;
			}else{
				child.activated = false;
			}
			
			if(child.activated == true){
				child.imbuementName.setVisible(true);
				child.imbuePriceW.setVisible(true);
				child.imbuementPrice.setVisible(true);
			}else {
				child.imbuementName.setVisible(false);
				child.imbuePriceW.setVisible(false);
				child.imbuementPrice.setVisible(false);
			}
        });
		
	}
	
	
	selectSorting(){
		this.selectArray.length = 0;
		for(let i = 2; i <= totalAxes; i++){
			if(player.imbueStats["axe_"+i].state == "open"){
				this.selectArray.push({id: i, price: player.imbueStats["axe_"+i].price});
			}
		}
		
		if(this.selectArray.length > 1){
			this.selectArray.sort(function(a,b) { return a.price - b.price; });
		}
	}
	
	
	resetScene(){
		this.scene.restart();
	}

}