const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 45;

let particlesArray;

let mouse = {
    x:null,
    y:null,
    radius:(canvas.height/80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        for(let i = 0 ; i<particlesArray.length ; i++){
            particlesArray[i].moveAwayMouse();
        }
    }
    )

class Particle{

    constructor(x, y, d_X, d_Y, size, color){
        this.x = x;
        this.y = y;
        this.d_X = d_X;
        this.d_Y = d_Y;
        this.size = size;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    moveAwayMouse(){
        let change_x = mouse.x - this.x;
        let change_y = mouse.y - this.y;
        let distance = Math.sqrt(change_x * change_x + change_y * change_y);
        const mouseMove = 5;
        const mouseR = 7;
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * mouseR){
                this.x += mouseMove;
            }
            if(mouse.x > this.x && this.x > this.size * mouseR){
                this.x -= mouseMove;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * mouseR){
                this.y += mouseMove;
            }
            if(mouse.y > this.y && this.y > this.size * mouseR) {
                this.y -= mouseMove;
            }
        }
    }

    update(){
        if(this.x > canvas.width || this.x < 0){
            this.d_X = -this.d_X;
        }
        if(this.y > canvas.height || this.y < 0){
            this.d_Y = -this.d_Y;
        }
        this.x += this.d_X;
        this.y += this.d_Y;
        this.draw();
    }
}

function init(){
    particlesArray = [];
    let numberParticles = (canvas.height * canvas.width) / 3000;
    for(let i = 0 ; i<numberParticles ; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * (innerWidth - size * 4) + size * 2);
        let y = (Math.random() * (innerHeight - size * 4) + size * 2);
        let directionX = (Math.random() * 3) - 1.5;
        let directionY = (Math.random() * 3) - 1.5;
        let color = "#CFD3CE";
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate(){
    ctx.globalAlpha = 0.45;
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    for(let i = 0 ; i<particlesArray.length ; i++){
        particlesArray[i].update();
    }
    connect();
    addText();
}

function connect(){
    let opacity = 2;
    for(let i = 0 ; i<particlesArray.length ; i++){
        for(let j = i +1 ; j<particlesArray.length ; j++){
            let distance = Math.pow(particlesArray[i].x - particlesArray[j].x, 2)
            + Math.pow(particlesArray[i].y - particlesArray[j].y, 2)
            if(distance < canvas.width/7 * canvas.height/7){
                opacity = 1 - distance/15000.0;
                ctx.strokeStyle = "rgba(207,211,206," + opacity + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke();
            }
        }
    }
}

function addText(){
    ctx.font = 'bold 48px serif';
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#152238";
    ctx.fillText("Hello, I'm Sherry Liu.", canvas.width/2 - 220, canvas.height/2);
    ctx.font = 'bold 20px serif';
    ctx.fillText("I am a student, leader, and programmer.", canvas.width/2 - 220, canvas.height/2 + 25);
}

init();
animate()