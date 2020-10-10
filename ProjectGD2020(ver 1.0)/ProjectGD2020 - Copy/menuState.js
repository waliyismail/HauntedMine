var menuState = {
    create: function create() {
        var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        var gameLabel = game.add.text(250, 80, 'Haunted Mine', { font: '40px Courier', fill: '#fffff' });
        var startBut = game.add.button(250, game.world.height - 120, 'startButton', this.startButtonAction);
    },
    startButtonAction: function startButtonAction() {
        console.log("start button clicked!");
        game.state.start("level1");
    }
};