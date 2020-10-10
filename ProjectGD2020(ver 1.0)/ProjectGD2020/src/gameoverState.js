var gameoverState = {
    create: function create() {
        var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        var gameLabel = game.add.text(250, 80, 'Game Over bro', { font: '40px Courier', fill: '#fffff' });
        //this.bgm = game.add.audio('bgm', 1, true);
        var restart = game.add.button(250, game.world.height - 120, 'start', this.startButtonAction);
        //this.bgm.play();
    },
    startButtonAction: function startButtonAction() {
        console.log("start button clicked!");
        //playsound

        game.state.start("level1");
    }
};