const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0,canvas.width,canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = 'red', offset}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,                                                   //same of offset: offset
      width: 100,
      height: 50
    };
    this.color = color;
    this.isAttacking;
  }

  drawSprite() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x,this.position.y,this.width,this.height);

    //attack box
    if (this.isAttacking) {
      context.fillStyle = 'green';
      context.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
    }
  }

  update() {
    this.drawSprite();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  }
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: -50,
    y: 0
  },
  color : 'blue'
});


enemy.drawSprite();
player.drawSprite();

console.log(player);

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

function rectangularCollision({rectangle1, rectangle2}) {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
    && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
    && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

function animate() {
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
  player.update();
  enemy.update();
  window.requestAnimationFrame(animate)

  player.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -4;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 4;
  }

  enemy.velocity.x = 0;

  //enemy movement
  if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 4;
  } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -4;
  }

  //detect for collision
  if (rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
      }) && player.isAttacking) {
    player.isAttacking = false;
    console.log('contact');
  }
  if (rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
    }) && enemy.isAttacking) {
  enemy.isAttacking = false;
  console.log('contact');
}
}

animate();

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;

  }
  // console.log(e.key);
});
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }
  switch (e.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
  // console.log(e.key);
});