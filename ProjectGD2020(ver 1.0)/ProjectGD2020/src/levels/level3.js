var level3 = {
    create: function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('level3');
        map.addTilesetImage('test');
        map.setCollision(1);
        layer = map.createLayer('Ground');
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
        
        //enemy spawn
        ghost = game.add.group();
        ghost.enableBody = true;
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                var s = ghost.create(1168, 80, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 1) {
                var s = ghost.create(848, 352, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 2) {
                var s = ghost.create(848, 464, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 3) {
                var s = ghost.create(1040, 464, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 4) {
                var s = ghost.create(1120, 464, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 5) {
                var s = ghost.create(272, 384, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
                s.scale.setTo(1.40, 1.25);
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 6) {
                var s = ghost.create(1216, 224, 'ghost');
                s.name = 'ghost' + s;
                s.body.collideWorldBounds = true;
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
        test = game.add.sprite(64, 480, 'droid');
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
        //if enemy reached the end of level, go to next state
        //game.state.start("level2");
        //game.state.start("gameoverState");
    },

    playerHealth: function playerHealth() {

        if (upKey.isDown) {
            this.currHealth -= 1;
            this.myHealthBar.setPercent(this.currHealth);
        }
    },
    //player reach end of map
    playerReachBottom: function playerReachBottom(_player, _test) {
        _test.kill();
        this.myHealthBar.kill();
        //stop sound
        game.state.start('boot');
    },


    //create: function create() { }
};