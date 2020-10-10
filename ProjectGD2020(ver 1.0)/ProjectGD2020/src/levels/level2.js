﻿var level2 = {
    create: function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('level2');
        map.addTilesetImage('test');
        map.setCollision(1);
        layer = map.createLayer('Ground');
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

        //sound effect
        this.jmpsfx = game.add.audio('jumpsound');
        this.deathsfx = game.add.audio('deathsfx');
        this.stepsfx = game.add.audio('step');

        //enemy spawn
        ghost = game.add.group();
        ghost.enableBody = true;
        for (var i = 0; i < 4; i++) {
            if (i == 0) {
                var s = ghost.create(480, 208, 'ghost');
                s.name = 'ghost' + i;
                s.body.immovable = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 1) {
                var s = ghost.create(656, 112, 'ghost');
                s.name = 'ghost' + i;
                s.body.immovable = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 2) {
                var s = ghost.create(848, 256, 'ghost');
                s.name = 'ghost' + i;
                s.body.immovable = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 3) {
                var s = ghost.create(528, 304, 'ghost');
                s.name = 'ghost' + i;
                s.body.immovable = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else { }
        }

        //Controls movement
        //upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        var facing = 'left';

        //test trigger
        test = game.add.sprite(448, 366, 'droid');
        test.enableBody = true;
        game.physics.enable(test, Phaser.Physics.ARCADE);
        test.body.collideWorldBounds = true;
        test.body.setSize(20, 32, 5, 16);

        // create player healthbar
        var barConfig = {
            width: 100,
            height: 20,
            x: 100,
            y: 20,
            bg: {
                color: '#FF0000'
            },
            bar: {
                color: '#00FF00'
            },
            animationDuration: 200,
            flipped: false
        }
        this.myHealthBar = new HealthBar(this.game, barConfig);
        this.myHealthBar.setFixedToCamera(true);
        this.currHealth = 100;
    },

    update: function update() {

        var jumpTimer = 0;
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(ghost, layer);
        player.body.velocity.x = 0;
        //if (cursors.left.isDown) {
        if (leftKey.isDown) {
            player.body.velocity.x = -150;
            if (this.facing != 'left') {
                player.animations.play('left');
                this.facing = 'left';
            }
        }
            //else if (cursors.right.isDown) {
        else if (rightKey.isDown) {
            player.body.velocity.x = 150;
            if (this.facing != 'right') {
                player.animations.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing != 'idle') {
                player.animations.stop();
                if (this.facing == 'left') {
                    player.frame = 0;
                }
                else {
                    player.frame = 5;
                }
                this.facing = 'idle';
            }
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -200;
            jumpTimer = game.time.now + 750;
        }
        this.playerHealth();
        game.physics.arcade.collide(player, test, this.playerReachBottom, null, this);
        game.physics.arcade.overlap(player, ghost, this.playerEnemy, null, this);

    },

    //testing purpose
    playerHealth: function playerHealth() {

        if (upKey.isDown) {
            this.currHealth -= 1;
            this.myHealthBar.setPercent(this.currHealth);
        }
        if (this.currHealth <= 0) {
            this.deathsfx.play();
            // goto game over state
            game.state.start('gameover');
        }
    },

    playerHurt: function playerHurt() {

        this.currHealth -= 1;
        this.myHealthBar.setPercent(this.currHealth);

        if (this.currHealth == 0) {
            this.deathsfx.play();
            // goto game over state
            game.state.start('gameover');
        }
    },

    playerEnemy: function playerEnemy(_player, _ghost) {

        this.playerHurt();
    },

    //player reach end of map
    playerReachBottom: function playerReachBottom(_player, _test) {
        _test.kill();
        game.state.start('level3');
    },



    //create: function create() { }
};