/* OPTION SCENE */


class Option extends Phaser.Scene {
	constructor(){
		super("optionScene");
	}
	
	create(){
		this.input.setTopOnly(true);
	
    this.div = this.add.image(400, 75, "menuOptionDiv").setScale(1, 0.5);

    //info
    this.buttonInfo = this.add.text(200, 25, "信息", { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: 'white' }).setAlpha(0.75);
    this.buttonInfo.x -= this.buttonInfo.width / 2;
    
    this.text1 = this.add.text(25, 100, "(*) 树的健康：每个红条相当于 1,000,000 点生命值。", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text2 = this.add.text(25, 150, "(*) 树的减益：它们也会影响斧的灌输", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text3 = this.add.text(25, 200, "(*) 放置：离线时间放置限制为 1 小时", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text4 = this.add.text(25, 245, "(*) 放置 ：切换浏览器的标签页时，它算作放置\n并且它也被限制为一小时。", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text5 = this.add.text(25, 310, "(*) 元素光环：斧子的元素光环增强了它的力量\n仅针对与防御具有相同类型元素的树。", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text6 = this.add.text(25, 370, "(*)重铸：它也会重置您当前的种子和升级！", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: '#33ccff' }).setVisible(false);
    this.text7 = this.add.text(25, 410, "(*) 伤害公式：总伤害 = 伤害 * 伤害 / (伤害 + 防御)", { metrics: metrics.octin16, fontFamily: 'octin', fontSize: '16pt', color: 'yellow' }).setVisible(false);

    this.reset = new FullReset(this, 400, 485, 2);

    //credits

    this.buttonCredits = this.add.text(600, 25, "鸣谢", { metrics: metrics.euphorigenic20, fontFamily: 'euphorigenic', fontSize: '20pt', color: 'white' }).setAlpha(0.75);
    this.buttonCredits.x -= this.buttonCredits.width / 2;

    this.creditsLink = this.add.text(400, 125, "All vectors created by freepik, ddraw, jemastock,\ncreativepack, dreamwaves, macrovector, kjpargeter,\nmacrovector-official, brgfx, rawpixel.com - www.freepik.com", { fontFamily: 'octin', fontSize: '16pt', color: 'white', align: 'center' }).setVisible(false).setAlpha(0.5).setActive(false);
    this.creditsLink.x -= this.creditsLink.width / 2;
    this.creditsLink.setInteractive({useHandCursor: true});
		this.creditsLink.on("pointerdown", function(pointer){window.open('https://www.freepik.com/free-photos-vectors/tree', '_blank');}, this);
		this.creditsLink.on("pointerover", function(pointer){this.creditsLink.setAlpha(1)}, this);
    this.creditsLink.on("pointerout", function(pointer){this.creditsLink.setAlpha(0.5)}, this);

    this.creditsKyrise = this.add.text(400, 250, "kyrise.itch.io", { metrics: metrics.octin18, fontFamily: 'octin', fontSize: '18pt', color: 'white', align: 'center' }).setVisible(false).setAlpha(0.5).setActive(false);
    this.creditsKyrise.x -= this.creditsKyrise.width / 2;
    this.creditsKyrise.setInteractive({useHandCursor: true});
		this.creditsKyrise.on("pointerdown", function(pointer){window.open('https://kyrise.itch.io/');}, this);
		this.creditsKyrise.on("pointerover", function(pointer){this.creditsKyrise.setAlpha(1)}, this);
    this.creditsKyrise.on("pointerout", function(pointer){this.creditsKyrise.setAlpha(0.5)}, this);

    this.creditsShikashi = this.add.text(400, 300, "shikashiassets.itch.io", { metrics: metrics.octin18, fontFamily: 'octin', fontSize: '18pt', color: 'white', align: 'center' }).setVisible(false).setAlpha(0.5).setActive(false);
    this.creditsShikashi.x -= this.creditsShikashi.width / 2;
    this.creditsShikashi.setInteractive({useHandCursor: true});
		this.creditsShikashi.on("pointerdown", function(pointer){window.open('https://shikashiassets.itch.io');}, this);
		this.creditsShikashi.on("pointerover", function(pointer){this.creditsShikashi.setAlpha(1)}, this);
    this.creditsShikashi.on("pointerout", function(pointer){this.creditsShikashi.setAlpha(0.5)}, this);


    //button
    this.buttonInfo.setInteractive({useHandCursor: true});
		this.buttonInfo.on("pointerdown", function(pointer){this.selected = 1;}, this);
		this.buttonInfo.on("pointerover", function(pointer){this.buttonInfo.setAlpha(1)}, this);
    this.buttonInfo.on("pointerout", function(pointer){this.buttonInfo.setAlpha(0.75)}, this);
    
    this.buttonCredits.setInteractive({useHandCursor: true});
		this.buttonCredits.on("pointerdown", function(pointer){this.selected = 2;}, this);
		this.buttonCredits.on("pointerover", function(pointer){this.buttonCredits.setAlpha(1)}, this);
		this.buttonCredits.on("pointerout", function(pointer){this.buttonCredits.setAlpha(0.75)}, this);

    //config
    this.selected = 1;

  }

  update(){

    if(this.selected == 1)
    {
      this.buttonInfo.setColor("yellow");
      this.buttonCredits.setColor("white");

      this.text1.setVisible(true);
      this.text2.setVisible(true);
      this.text3.setVisible(true);
      this.text4.setVisible(true);
      this.text5.setVisible(true);
      this.text6.setVisible(true);
      this.text7.setVisible(true);

      this.reset.setVisible(true).setActive(true);

      this.creditsLink.setVisible(false).setActive(false);
      this.creditsKyrise.setVisible(false).setActive(false);
      this.creditsShikashi.setVisible(false).setActive(false);
    }
    else if(this.selected == 2)
    {
      this.buttonInfo.setColor("white");
      this.buttonCredits.setColor("yellow");

      this.reset.setVisible(false).setActive(false);

      this.text1.setVisible(false);
      this.text2.setVisible(false);
      this.text3.setVisible(false);
      this.text4.setVisible(false);
      this.text5.setVisible(false);
      this.text6.setVisible(false);
      this.text7.setVisible(false);

      this.creditsLink.setVisible(true).setActive(true);
      this.creditsKyrise.setVisible(true).setActive(true);
      this.creditsShikashi.setVisible(true).setActive(true);
    }

  }
}