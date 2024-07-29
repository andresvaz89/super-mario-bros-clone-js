// global Phaser

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false }
  },
  scene: {
    preload, // se ejecuta para precargar juegos
    create,
    update // se ejecuta cuando el juego comienza
  }
};

new Phaser.Game(config);
// this --> game --> el juego que estamos programando

function preload() {
  this.load.image('cloud1', './assets/scenery/overworld/cloud1.png');

  this.load.image('floorbricks', './assets/scenery/overworld/floorbricks.png');

  this.load.spritesheet('mario', './assets/entities/mario.png', {
    frameWidth: 18,
    frameHeight: 16
  });
}
function create() {
  //image (x,y, id-del-asset)
  // con setOrigin se dice que el origen de la imagen sea 0,0
  // sin setOrigin cuando se posiciona la imagen se toma el
  //centro de la imagen como punto de partida
  this.add.image(100, 50, 'cloud1').setOrigin(0, 0).setScale(0.15);

  this.floor = this.physics.add.staticGroup();

  this.floor
    .create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  this.floor
    .create(150, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.mario = this.physics.add.sprite(50, 100, 'mario').setOrigin(0, 1);

  this.physics.add.collider(this.mario, this.floor);

  this.keys = this.input.keyboard.createCursorKeys();
  this.anims.create({
    key: 'mario-walk',
    frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
    frameRate: 12,
    repeat: -1
  });

  this.anims.create({
    key: 'mario-idle',
    frames: [{ key: 'mario', frame: 0 }]
  });
  this.anims.create({
    key: 'mario-jump',
    frames: [{ key: 'mario', frame: 5 }]
  });
}
function update() {
  if (this.keys.left.isDown) {
    this.mario.anims.play('mario-walk', true);
    this.mario.x -= 2;
    this.mario.flipX = true;
  } else if (this.keys.right.isDown) {
    this.mario.anims.play('mario-walk', true);
    this.mario.x += 2;
    this.mario.flipX = false;
  } else {
    this.mario.anims.stop();
    this.mario.setFrame(0);
  }

  if (this.keys.up.isDown) {
    this.mario.y -= 5;
    this.mario.anims.play('mario-jump', true);
  }
}

// continúa min 56:04
