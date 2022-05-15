const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 99;
let particlesArray = [];
const bitcoin = new Image();
bitcoin.src = 'btc.png';

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 80 + 20;
		this.speed = Math.random() * 2 + .5;
		this.angle = Math.random() * 360;
		this.spin = Math.random() < .5 ? -1 : 1;
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * Math.PI/360 * this.spin);
		ctx.drawImage(bitcoin, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
		ctx.restore();
	}

	update() {
		this.angle += 2;
		if (this.y > canvas.height) {
			this.y = 0 - this.size;
			this.x = Math.random() * canvas.width;
			this.size = Math.random() * 70 + 10;
			this.speed = Math.random() * 2 + .5;
		}
		this.y += this.speed;
	}
}


function init() {
	for (let i = 0; i < numberOfParticles; i++) {
		particlesArray.push(new Particle());
	}
}

init();


function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].draw();
		particlesArray[i].update();
	}
	requestAnimationFrame(animate);
}

animate();