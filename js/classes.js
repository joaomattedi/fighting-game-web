class Sprite {
  constructor({ position, imageSrc, scale, frameMax = 1 }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 5;
  }

  drawSprite() {
    context.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frameMax ) * this.scale,
      this.image.height * this.scale
      );
  }

  update() {
    this.drawSprite();
    this.frameElapsed += 1;

    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax -1) {
      this.frameCurrent += 1;
      } else {
      this.frameCurrent = 0;
      }
    }

    
    
  }
}

class Fighter {
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
    this.health = 100;
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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