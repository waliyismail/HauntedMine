var game = new Phaser.Game(800, 300, Phaser.CANVAS, 'game', {
    preload: preload,
    //create: create, update: update, render: render
});

//game.state.add('boot', bootState);
//game.state.add('menu', menuState);

function preload() {
    game.load.tilemap('level1', 'assets/maps/LevelTest.json', null,
    Phaser.Tilemap.TILED_JSON);

    game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null,
    Phaser.Tilemap.TILED_JSON);

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

var nextLevelText;

var level1 = {
    
    preload:function preload() {
    game.load.tilemap('level1', 'assets/maps/LevelTest.json', null,
    Phaser.Tilemap.TILED_JSON);

    game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null,
    Phaser.Tilemap.TILED_JSON);

    game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null,
    Phaser.Tilemap.TILED_JSON);

    game.load.image('test', 'assets/maps/test.png');
    game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
    game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32);
    game.load.image('background', 'assets/maps/background.png');
    },

    create: function create() {
    console.log("hai");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';
    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');
    map.addTilesetImage('test');
    map.setCollision(1);
    //permLayer = map.createLayer('PermObject');
    layer = map.createLayer('Ground');
    //BGlayer = map.createLayer('Background');

    layer.resizeWorld();
    game.physics.arcade.gravity.y = 500;

    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    player.scale.setTo(0.75, 0.75);

    game.camera.follow(player);

    test = game.add.sprite(1312, 336, 'droid');
    test.enableBody = true;
    game.physics.enable(test, Phaser.Physics.ARCADE);
    test.body.collideWorldBounds = true;
    test.body.setSize(20, 32, 5, 16);

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

    nextLevelText = game.add.text(game.world.centerX, 150, 'Next Level', {
    font:
    "40px Arial", fill: "#ffffff", align: "center"
    });
    nextLevelText.visible = false;
    nextLevelText.anchor.setTo(0.5, 0.5);
    },

    update: function update() {
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

    game.physics.arcade.collide(player, test, playerReachBottom, null, this);

    nextLevelText.x = player.body.position.x;
    },

    playerReachBottom: function playerReachBottom(_player, _test) {
    _test.kill();
    nextLevelText.visible = true;
    this.state.start('level2');
    },
};

var level2 = {
    preload: function preload() {
        game.load.tilemap('level1', 'assets/maps/LevelTest.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.image('test', 'assets/maps/test.png');
        game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
        game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32);
        game.load.image('background', 'assets/maps/background.png');
    },

    create: function create() {
        console.log("hai");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        layer.destroy();
        player.destroy();

        map = game.add.tilemap('level2');
        map.addTilesetImage('test');
        map.setCollision(1);
        //permLayer = map.createLayer('PermObject');
        layer = map.createLayer('Ground');
        //BGlayer = map.createLayer('Background');

        layer.resizeWorld();
        game.physics.arcade.gravity.y = 500;

        player = game.add.sprite(16, 32, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player.scale.setTo(0.75, 0.75);

        game.camera.follow(player);

        test = game.add.sprite(1312, 336, 'droid');
        test.enableBody = true;
        game.physics.enable(test, Phaser.Physics.ARCADE);
        test.body.collideWorldBounds = true;
        test.body.setSize(20, 32, 5, 16);

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

        nextLevelText = game.add.text(game.world.centerX, 150, 'Next Level', {
            font:
            "40px Arial", fill: "#ffffff", align: "center"
        });
        nextLevelText.visible = false;
        nextLevelText.anchor.setTo(0.5, 0.5);
    },

    update: function update() {
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

        game.physics.arcade.collide(player, test, playerReachBottom, null, this);

        nextLevelText.x = player.body.position.x;
    },

    playerReachBottom: function playerReachBottom(_player, _test) {
        _test.kill();
        nextLevelText.visible = true;
        this.state.start('level3');
    },
};

var level3 = {
    preload: function preload() {
        game.load.tilemap('level1', 'assets/maps/LevelTest.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('level2', 'assets/maps/LevelTest2.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('level3', 'assets/maps/LevelTest3.json', null,
        Phaser.Tilemap.TILED_JSON);

        game.load.image('test', 'assets/maps/test.png');
        game.load.spritesheet('dude', 'assets/movables/dude.png', 32, 48);
        game.load.spritesheet('droid', 'assets/movables/droid.png', 32, 32);
        game.load.image('background', 'assets/maps/background.png');
    },

    create: function create() {
        console.log("hai");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        layer.destroy();

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

        test = game.add.sprite(1312, 336, 'droid');
        test.enableBody = true;
        game.physics.enable(test, Phaser.Physics.ARCADE);
        test.body.collideWorldBounds = true;
        test.body.setSize(20, 32, 5, 16);

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

        nextLevelText = game.add.text(game.world.centerX, 150, 'End Demo', {
            font:
            "40px Arial", fill: "#ffffff", align: "center"
        });
        nextLevelText.visible = false;
        nextLevelText.anchor.setTo(0.5, 0.5);
    },

    update: function update() {
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

        game.physics.arcade.collide(player, test, playerReachBottom, null, this);

        nextLevelText.x = player.body.position.x;
    },

    playerReachBottom: function playerReachBottom(_player, _test) {
        _test.kill();
        nextLevelText.visible = true;
    },
};

game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);

game.state.start('level1');

function render() {

}