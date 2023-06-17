import './main.css';

const playerSprite = new Image();
playerSprite.src = '/player.png';
playerSprite.addEventListener('load', gameLoop);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const keys = {
    left: false,
    up: false,
    right: false,
    down: false,
    x: false,
    c: false
};

const player = {
    x: 48,
    y: 48,
    sprite: playerSprite,
    frame: 0,
    tile: 0,
    animation: 'idle',
    animations: {
        idle: [[0, 0]],
        down: [[0, 0], [1, 0], [2, 0], [3, 0]],
        right: [[0, 1], [1, 1], [2, 1], [3, 1]],
        up: [[0, 2], [1, 2], [2, 2], [3, 2]],
        left: [[0, 3], [1, 3], [2, 3], [3, 3]],
    },
    draw() {
        const currentAnim = this.animations[this.animation];
        if (this.frame > 0) {
            this.frame--;
        } else {
            this.frame = 6; // number of frames between each tile
            this.tile = (this.tile + 1) % currentAnim.length;
        }

        const [row, col] = currentAnim[player.tile] || currentAnim[0];
        ctx.drawImage(this.sprite, row * 32, col * 32, 32, 32, this.x, this.y, 32, 32);
    }
};

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update
    player.animation = 'idle';

    if (keys.left) {
        player.x -= 1;
        player.animation = 'left';
    }
    if (keys.up) {
        player.y -= 1;
        player.animation = 'up';
    }
    if (keys.right) {
        player.x += 1;
        player.animation = 'right';
    }
    if (keys.down) {
        player.y += 1;
        player.animation = 'down';
    }

    player.draw();
    window.requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { keys.left = true }
    if (e.key === 'ArrowUp') { keys.up = true } 
    if (e.key === 'ArrowRight') { keys.right = true } 
    if (e.key === 'ArrowDown') { keys.down = true } 
    if (e.key === 'x') { keys.x = true } 
    if (e.key === 'c') { keys.c = true }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') { keys.left = false }
    if (e.key === 'ArrowUp') { keys.up = false } 
    if (e.key === 'ArrowRight') { keys.right = false } 
    if (e.key === 'ArrowDown') { keys.down = false } 
    if (e.key === 'x') { keys.x = false } 
    if (e.key === 'c') { keys.c = false }
})