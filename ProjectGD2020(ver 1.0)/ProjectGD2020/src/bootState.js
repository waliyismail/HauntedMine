//load all the assets
var bootState = {
    preload: function preload() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#fffff' });
        game.load.tilemap('level1', 'assets/maps/LevelTest.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('test', 'assets/maps/test.png');

        game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
        game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32); //temp trigger

        game.load.spritesheet('ghost', 'assets/movables/ghost.png', 32, 32);
        //game.load.spritesheet('ghost', 'assets/movables/ghost2.png', 32, 32);

        game.load.image('background', 'assets/maps/background.png');
        game.load.image('startButton', 'startButton.png')

        //bullets
        game.load.image('bulletRight', 'assets/movables/bulletRight.png', 32, 32);
        game.load.image('bulletLeft', 'assets/movables/bulletLeft.png', 32, 32);

        //ore
        game.load.image('ores', 'assets/movables/ores.png', 32, 32);

        game.load.audio('jumpsound', 'src/sounds/jump.mp3');
        game.load.audio('bgm', 'src/sounds/spookybgm.mp3');
        game.load.audio('deathsfx', 'src/sounds/death-sound.mp3');
        game.load.audio('step', 'src/sounds/footsteps1.mp3');
    },
    create: function create() {

        game.state.start('menu');
    }
    //  create: function create() { }
    //create: function create() { }
};