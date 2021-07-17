/* Ending SCENE */

class Ending extends Phaser.Scene {
	constructor(){
		super("endingScene");
	}

	create(){
		this.input.setTopOnly(true);
    this.scene.bringToTop();

    this.base = this.add.image(400, 300, "menuFinalBack");

		//this.reset = new FullReset(this, 200, 500, 1);
		this.reforgeButton = new ReforgedButton(this, 400, 500, 1);
    
  }

}