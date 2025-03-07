﻿var level1 = {
    create: function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('level1');
        map.addTilesetImage('test');
        //map.addTilesetImage('ghost');

        map.setCollision(1);
        layer = map.createLayer('Ground');
        layer.resizeWorld();
        game.physics.arcade.gravity.y = 500;

        wDoor = game.add.sprite(544, 64, 'door');
        game.physics.enable(wDoor, Phaser.Physics.ARCADE);
        wDoor.scale.setTo(1.5, 1.5);
        wDoor.enableBody = true;
        wDoor.body.immovable = true;

        //ores spawn
        ores = game.add.group();
        ores.enableBody = true;
        for (var i = 0; i < 7; i++) {
            if (i == 0) {
                var o = ores.create(208, 80, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 1) {
                var o = ores.create(416, 112, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 2) {
                var o = ores.create(672, 80, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 3) {
                var o = ores.create(864, 144, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 4) {
                var o = ores.create(976, 192, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 5) {
                var o = ores.create(1136, 256, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else if (i == 6) {
                var o = ores.create(1392, 208, 'ores');
                o.name = 'ores' + i;
                o.scale.setTo(1, 1);
                o.body.setSize(28, 32);
                o.body.immovable = true;
            }
            else { }
        }

        game.physics.enable(ores, Phaser.Physics.ARCADE);

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

        //enemy spawn
        ghost = game.add.group();
        ghost.enableBody = true;
        for (var i = 0; i < 2; i++) {
            if (i == 0)
            {
                var s = ghost.create(752, 80, 'ghost');
                s.name = 'ghost' + i;
                s.scale.setTo(1.40, 1.25);
                s.body.setSize(28, 32);
                s.body.immovable = true;
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else if (i == 1) {
                var s = ghost.create(1216, 224, 'ghost');
                s.name = 'ghost' + i;
                s.scale.setTo(1.40, 1.25);
                s.body.setSize(28, 32);
                s.body.immovable = true;
                //ghost.animations.add('leftEnemy', [6, 5, 1], 10, true);
            }
            else { }
        }

        game.physics.enable(ghost, Phaser.Physics.ARCADE);

        //ghost.animations.play('leftEnemy');

        //bullets
        bulletsRight = game.add.group();
        bulletsRight.enableBody = true;
        bulletsRight.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 20; i++) {
            var br = bulletsRight.create(0, 0, 'bulletRight');
            br.name = 'bulletRight' + i;
            br.exists = false;
            br.visible = false;
            br.checkWorldBounds = true;
            br.scale.setTo(0.5, 0.5);
            br.body.allowGravity = false;
        }

        bulletsLeft = game.add.group();
        bulletsLeft.enableBody = true;
        bulletsLeft.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 20; i++) {
            var bl = bulletsLeft.create(0, 0, 'bulletLeft');
            bl.name = 'bulletLeft' + i;
            bl.exists = false;
            bl.visible = false;
            bl.checkWorldBounds = true;
            bl.scale.setTo(0.5, 0.5);
            bl.body.allowGravity = false;
        }

        bulletTime = 0;

        //sound effect
        this.jmpsfx = game.add.audio('jumpsound');
        this.deathsfx = game.add.audio('deathsfx');
        this.stepsfx = game.add.audio('step');

        //test trigger
        test = game.add.sprite(1312, 336, 'trigger');
        test.enableBody = true;
        //test.visible = false;
        game.physics.enable(test, Phaser.Physics.ARCADE);
        test.body.collideWorldBounds = true;
        test.body.setSize(20, 32, 5, 16);

        //Controls movement
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        shootKey = game.input.keyboard.addKey(Phaser.Keyboard.E);

        var facing = 'left';
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
        console.log(this.bgm);
        
        //text
        scoreText = game.add.text(48, 32, 'Score: 0', {
            font: "16px Arial", fill: "#ffffff",
            align: "left"
        });
        scoreText.visible = true;
        scoreText.fixedToCamera = true;

        score = 0;

        doorText = game.add.text(48, 32, 'Under construction!', {
            font: "16px Arial", fill: "#ffffff",
            align: "left"
        });
        doorText.visible = false;
        doorint = 0;
    },

    update: function update() {

        var jumpTimer = 0;
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(ghost, layer);
        game.physics.arcade.collide(ores, layer);
        game.physics.arcade.collide(wDoor, layer);

        player.body.velocity.x = 0;

        doorText.x = wDoor.position.x;
        doorText.y = wDoor.position.y - 48;

        //if (cursors.left.isDown) {
        if (leftKey.isDown) {
            player.body.velocity.x = -150;
            if (this.facing != 'left') {
                player.animations.play('left');
                this.facing = 'left';
            }
            //this.stepsfx.play();
        }
            //else if (cursors.right.isDown) {
        else if (rightKey.isDown) {
            player.body.velocity.x = 150;
            if (this.facing != 'right') {
                player.animations.play('right');
                this.facing = 'right';
            }
            //this.stepsfx.play();
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
            //this.stepsfx.play();
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            this.jmpsfx.play();
            player.body.velocity.y = -200;
            jumpTimer = game.time.now + 750;
        }

        if (shootKey.isDown)
        {
            this.fireBullet();
        }

        this.playerHealth();

        //collision between player & trigger
        game.physics.arcade.collide(player, test, this.playerReachBottom, null, this);
        game.physics.arcade.overlap(player, ghost, this.playerEnemy, null, this);

        game.physics.arcade.overlap(bulletsRight, ghost, this.bulletEnemy, null, this);
        game.physics.arcade.overlap(bulletsLeft, ghost, this.bulletEnemy, null, this);

        game.physics.arcade.overlap(bulletsRight, ores, this.bulletOre, null, this);
        game.physics.arcade.overlap(bulletsLeft, ores, this.bulletOre, null, this);

        game.physics.arcade.overlap(bulletsRight, wDoor, this.knockknock, null, this);
        game.physics.arcade.overlap(bulletsLeft, wDoor, this.knockknock, null, this);

    },

    //testing purpose
    playerHealth: function playerHealth() {

        if (upKey.isDown) {
            this.currHealth -= 1;
            this.myHealthBar.setPercent(this.currHealth);
        }
        if (this.currHealth == 0)
        {
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
        game.state.start('level2');
    },

    bulletEnemy: function bulletEnemy(_bullet, _ghost) {
        console.log("enemy died");
        _bullet.kill();
        _ghost.kill();
        score = score + 2;
        scoreText.text = 'Score: ' + score;
        //this.enemyKilled();
    },

    bulletOre: function bulletOre(_bullet, _ore) {
        console.log("ore mined");
        _bullet.kill();
        _ore.kill();
        score = score + 1;
        scoreText.text = 'Score: ' + score;
    },

    knockknock: function knockknock(_door, _bullet) {
        console.log("knock knock");
        _bullet.kill();

        if (doorint == 0) {
            doorint++;
        }
        else if (doorint == 1)
        {
            doorint++;
            doorText.text = 'What are you still doing here?'
        }
        else if (doorint == 2) {
            doorint++;
            doorText.text = 'Cant you read?'
        }
        else if (doorint == 3) {
            doorint++;
            doorText.text = 'No one is here!'
        }
        else {
            doorint++;
            doorText.text = '$#&^%(&*^)*!'
        }

        doorText.visible = true;
    },

    fireBullet : function fireBullet () {
        if (game.time.now > bulletTime)
        {
            if (player.frame >= 5)
            {
                bullet = bulletsRight.getFirstExists(false);
                if (bullet) {
                    bullet.reset(player.x + 16, player.y + 16);
                    bullet.body.velocity.x = 300;
                    bulletTime = game.time.now + 150;
                    bullet.lifespan = 500;
                }
            }
            else if (player.frame < 5) {
                bullet = bulletsLeft.getFirstExists(false);
                if (bullet) {
                    bullet.reset(player.x - 16, player.y + 16);
                    bullet.body.velocity.x = -300;
                    bulletTime = game.time.now + 150;
                    bullet.lifespan = 500;
                }
            }
            else { }

        }
    },
};