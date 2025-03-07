﻿//load all the assets
var bootState = {
    preload: function preload() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#fffff' });
        game.load.tilemap('level1', 'assets/maps/LevelTest.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('test', 'assets/maps/test.png');

        game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
        game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32);

        game.load.image('background', 'assets/maps/background.png');
        game.load.image('startButton', 'startButton.png')
    },
    create: function create() {
        game.state.start('menu');
    }
    //  create: function create() { }
    //create: function create() { }
};