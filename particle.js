class Particle {
    
    constructor(x, y, dx, dy, radius) {
        this.canvas;
        this.ctx;

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;

        this.radius = radius;

        this.prevX = 0;
        this.prevY = 0;

        this.init();
    }

    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = innerWidth - 4;
        this.canvas.height = innerHeight - 4;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#eee";
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.prevX, this.prevY);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.fillStyle = "blue";
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // this.ctx.rect(this.x, this.y, 5, 5);
        this.ctx.fill();
    }

    update(prevX, prevY) {
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }
        if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.prevX = prevX;
        this.prevY = prevY;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function main() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    var x = 0, y = 0, radius = 3;
    var dx, dy;

    var particles = [];
    for (i = 0; i < 200; i++) {
        x = Math.random() * (innerWidth - radius * 2) + radius;
        y = Math.random() * (innerHeight - radius * 2) + radius;
        dx = (Math.random() - 0.7);
        dy = (Math.random() - 0.7);

        var particle = new Particle(x, y, dx, dy, radius);
        particles.push(particle);
    }
    function draw() {
        requestAnimationFrame(draw);
        // ctx.fillStyle = "rgba(255,255,255,.1)"
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < particles.length; i++) {
            var prevX = i == 0 ? undefined : particles[i - 1].x;
            var prevY = i == 0 ? undefined : particles[i - 1].y;
            particles[i].update(prevX, prevY);
        }
    }

    draw();

}

main();