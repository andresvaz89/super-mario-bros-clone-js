// global Phaser

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: 'white',
  parent: 'game',
  scene: {
    preload, // se ejecuta para precargar juegos
    create // se ejecuta cuando el juego comienza
  }
};

new Phaser.Game(config);

function preload() {
  console.log('preload');
}
function create() {
  console.log('create');
}
function update() {}

// min 38 video Midu
