const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    t: innerHeight / 2
};

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.color;
        c.shadowBlur = 15;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };

    this.update = () => {
        this.draw();
    };
}

let particles;

function init() {
    particles = [];
    for (let i = 0; i < 400; i++) {
        const canvasWidth = canvas.width + 300;
        const canvasHeight = canvas.height + 300;
        const x = (Math.random() * canvasWidth) - canvasWidth / 2;
        const y = (Math.random() * canvasHeight) - canvasHeight / 2;
        const radius = 2 * Math.random();
        const color = randomColor(colors);
        particles.push(new Particle(x, y, radius, color));
    }
}
let radians = 0

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(10, 10, 10, 1)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(radians);
    particles.forEach(particle => {
        particle.update();
    });
    c.restore()
    radians += 0.005;
}

init();
animate();