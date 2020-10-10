var workshopState = {
    create: function create() {
        var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        var gameLabel = game.add.text(200, 0, 'Welcome to workshop', { font: '40px Courier', fill: '#ffffff' });
        var money = game.add.text(10, 50, 'Munny: $100', { font: '20px Courier', fill: '#ffffff' });

    },
    update: function update() { },

};