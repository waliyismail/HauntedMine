var game = new Phaser.Game(800, 300, Phaser.CANVAS, 'game-content');

// all the game screen here
// must be added the respective file in index.html
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('gameover', gameoverState);
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);

game.state.start("boot");