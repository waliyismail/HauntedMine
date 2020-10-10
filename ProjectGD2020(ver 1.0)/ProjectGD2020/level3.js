﻿var game = new Phaser.Game(800, 300, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create, update: update, render: render
});

function preload() {
    game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null,
    Phaser.Tilemap.TILED_JSON);
    game.load.image('test', 'assets/maps/test.png');
    game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
    game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32);
    game.load.image('background', 'assets/maps/background.png');
}

var map;
var tileset;
var layer;
var BGlayer;
var permLayer;

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;

var upKey;
var downKey;
var leftKey;
var rightKey;

function create() {
    console.log("hai");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';
    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level3');
    map.addTilesetImage('test');
    map.setCollision(1);
    //permLayer = map.createLayer('PermObject');
    layer = map.createLayer('Ground');
    //BGlayer = map.createLayer('Background');

    layer.resizeWorld();
    game.physics.arcade.gravity.y = 500;

    player = game.add.sprite(1408, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    player.scale.setTo(0.75, 0.75);

    game.camera.follow(player);

    //game.camera.setSize(20, 20, 20, 0);
    //game.camera.main.zoom += 10;
    //game.camera.scale.x = 10;
    //game.camera.scale.y = 10;
    //game.camera.bounds.x = size.x * game.camera.scale.x;
    //game.camera.bounds.y = size.y * game.camera.scale.y;

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Controls movement
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update() {
    game.physics.arcade.collide(player, layer);
    player.body.velocity.x = 0;
    if (leftKey.isDown) {
        player.body.velocity.x = -150;
        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (rightKey.isDown) {
        player.body.velocity.x = 150;
        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        if (facing != 'idle') {
            player.animations.stop();
            if (facing == 'left') {
                player.frame = 0;
            }
            else {
                player.frame = 5;
            }
            facing = 'idle';
        }
    }
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
        player.body.velocity.y = -200;
        jumpTimer = game.time.now + 750;
    }
}

function render() {

}