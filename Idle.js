/* REFORGED SCENE */

class Idle extends Phaser.Scene {
	constructor(){
		super("idleScene");
	}

	create(){
		this.input.setTopOnly(true);
    this.scene.bringToTop();

    this.globalScene = this.scene.get('globalScene');

    this.base = this.add.image(400, 300, "menuIdleBack");

    this.bar = this.add.image(400, 300, "menuIdleBar").setOrigin(0, 0);
    this.barFill = this.add.image(400, 300, "menuIdleBarFill").setOrigin(0, 0).setScale(0, 1);
    this.bar.x -= this.bar.width / 2;
    this.barFill.x -= this.barFill.width / 2;

    this.percentage = this.add.text(400, 275, "0%", { metrics: metrics.octin15, fontFamily: 'octin', fontSize: '15pt', color: 'yellow' });

    this.hold = player.idleValue;

    this.div = 0;
    this.remainder = 0;
  }

  update(time, delta)
  {
    this.percentage.x = 400 - (this.percentage.width / 2);
    this.percentage.setText("0%");

    if(idleCheck == true)
    {
      // IDLE CALCULATION
      let nowDate = new Date();

      let timeDiff = (Math.abs(nowDate - player.date) / 1000).toFixed(1);

      timeDiff = Phaser.Math.Clamp(timeDiff, 0, 3600);
      if(timeDiff >= 1)
      {
        
        player.idleValue += timeDiff * 10;
        player.idleValue = Phaser.Math.Clamp(player.idleValue, 0, 3600);

        // player.idleValue += 3600 * 10;

        this.div = Math.floor(player.idleValue / 100);
        this.remainder = (player.idleValue % 100);
        
      }

      player.date = nowDate;
      idleCheck = false;

      this.barFill.setScale(0, 1);
      this.hold = player.idleValue;
    }

    // IDLE FINISH
    // In case the game ends in the middle of a idle check, the remaining idle calls will be checked here next time!
		if(player.idleValue > 0)
    {
      for(let i = 1; i <= (this.div + this.remainder); i++)
      {
        this.globalScene.updateTick();
        player.idleValue--;

        let progress = Math.floor((100 * player.idleValue) / this.hold);
        this.percentage.setText(progress);
        if(isFinite(progress / 100))
        {
          this.barFill.setScale((progress / 100), 1);
        }
        else
        {
          this.barFill.setScale(0, 1);
        }
      }

      this.remainder = 0;      
    }
    else
    {

      if(this.scene.isPaused('mainScene'))
      {
        this.scene.resume('mainScene');
      }

      if(this.scene.isPaused('expScene'))
      {
        this.scene.resume('expScene');
      }

      if(this.scene.isPaused('forgeScene'))
      {
        this.scene.resume('forgeScene');
      }

      if(this.scene.isPaused('upgradeScene'))
      {
        this.scene.resume('upgradeScene');
      }

      if(this.scene.isPaused('auraScene'))
      {
        this.scene.resume('auraScene');
      }

      if(this.scene.isPaused('reforgedScene'))
      {
        this.scene.resume('reforgedScene');
      }

      this.scene.resume('globalScene');
      this.scene.stop();
    }
  }
}