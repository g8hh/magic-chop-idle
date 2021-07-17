/* UPGRADE SCENE */

class Aura extends Phaser.Scene {
	constructor(){
		super("auraScene");
	}
	
	create(){
		this.input.setTopOnly(true);
		
		//this.sceneText = this.add.text(400, 300, "AURA SCENE", { fontFamily: 'Verdana', fontSize: '30pt', color: 'white' });
		//this.sceneText.x -= this.sceneText.width/2;
		
		this.auraFrame = this.add.image(400, 295, "menuAuraFrame").setDepth(1);
		this.base = this.add.image(400, 550, "menuForgeBase");
		
		this.buyButton = new BuyAuraButton(this, 710, 345);
		this.buyAllButton = new AuraBuyAll(this, 400, 385).setScale(0.9);
		this.buyAllCheck = false;
		
		//gems
		this.fireIcon = this.add.image(100, 435, "gemFire").setDepth(1).setScale(0.75);
		this.waterIcon = this.add.image(300, 435, "gemWater").setDepth(1).setScale(0.75);
		this.earthIcon = this.add.image(500, 435, "gemEarth").setDepth(1).setScale(0.75);
		this.airIcon = this.add.image(700, 435, "gemAir").setDepth(1).setScale(0.75);
		
		this.fireGems = this.add.text(100, 465, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fe6767' });
		this.waterGems = this.add.text(300, 465, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#759bff' });
		this.earthGems = this.add.text(500, 465, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#67fe83' });
		this.airGems = this.add.text(700, 465, "?", { metrics: metrics.euphorigenic12, fontFamily: 'euphorigenic', fontSize: '12pt', color: '#fff372' });
		this.fireGems.x -= this.fireGems.width/2;
		this.waterGems.x -= this.waterGems.width/2;
		this.earthGems.x -= this.earthGems.width/2;
		this.airGems.x -= this.airGems.width/2;
		
		//elements
		this.fireElemIcon = new SelectAuraButton(this, 100, 75, "elementalFire", 1);
		this.waterElemIcon = new SelectAuraButton(this, 300, 75, "elementalWater", 2);
		this.earthElemIcon = new SelectAuraButton(this, 500, 75, "elementalEarth", 3);
		this.airElemIcon = new SelectAuraButton(this, 700, 75, "elementalAir", 4);
		
		this.selectHighlight = this.add.image(100, 75, "menuAuraSelect").setDepth(0.9).setVisible(false);
		this.selectText = this.add.text(400, 290, "选择上面的一个元素", { metrics: metrics.octin12, fontFamily: 'octin', fontSize: '12pt', color: 'yellow' }).setDepth(1.1);
		this.selectText.x -= this.selectText.width/2;
		
		this.selectName = this.add.text(400, 250, "", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'white', align: 'center' }).setDepth(1.1);
		
		this.priceTag = this.add.image(80, 345, "gemFire").setDepth(1).setScale(0.5).setVisible(false).setDepth(1.1);
		this.priceValue = this.add.text(100, 345, "?", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: 'white' }).setDepth(1.1).setVisible(false);
		this.priceValue.y -= this.priceValue.height/2;
		
		this.fireElemGems = this.add.text(100, 135, "?%", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#fe6767' });
		this.waterElemGems = this.add.text(300, 135, "?%", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#759bff' });
		this.earthElemGems = this.add.text(500, 135, "?%", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#67fe83' });
		this.airElemGems = this.add.text(700, 135, "?%", { metrics: metrics.euphorigenic14, fontFamily: 'euphorigenic', fontSize: '14pt', color: '#fff372' });
		this.fireElemGems.x -= this.fireElemGems.width/2;
		this.waterElemGems.x -= this.waterElemGems.width/2;
		this.earthElemGems.x -= this.earthElemGems.width/2;
		this.airElemGems.x -= this.airElemGems.width/2;
	
	}
	
	
	
	/* 														UPDATE FUNCTION 													*/
		
	update(time, delta){
		
		//config
		if(globalChecks.sceneRestart.aura == true){
			globalChecks.sceneRestart.aura = false;
			this.scene.restart();
		}
		
		//general
		this.buyButton.colorPrice();
		
		//text
		this.selectName.x = 400 - this.selectName.width/2;
		
		this.fireGems.setText(numberWithSpaces(player.fireGem));
		this.waterGems.setText(numberWithSpaces(player.waterGem));
		this.earthGems.setText(numberWithSpaces(player.earthGem));
		this.airGems.setText(numberWithSpaces(player.airGem));
		this.fireGems.x = 101 - (this.fireGems.width/2);
		this.waterGems.x = 301 - (this.waterGems.width/2);
		this.earthGems.x = 501 - (this.earthGems.width/2);
		this.airGems.x = 701 - (this.airGems.width/2);
		
		this.fireElemGems.setText(numberWithSpaces(player.fireElem*100) + "%");
		this.waterElemGems.setText(numberWithSpaces(player.waterElem*100) + "%");
		this.earthElemGems.setText(numberWithSpaces(player.earthElem*100) + "%");
		this.airElemGems.setText(numberWithSpaces(player.airElem*100) + "%");
		this.fireElemGems.x = 101 - (this.fireElemGems.width/2);
		this.waterElemGems.x = 301 - (this.waterElemGems.width/2);
		this.earthElemGems.x = 501 - (this.earthElemGems.width/2);
		this.airElemGems.x = 701 - (this.airElemGems.width/2);
		
	}
	
	
	
	/* 														GAME FUNCTIONS 													*/
	

}