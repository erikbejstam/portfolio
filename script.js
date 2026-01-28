const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width, height;
let animationId;
let columns;
let drops;

let fadeOpacity = 0;
let fadingOut = false;

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    columns = Math.floor(width / fontSize);

    drops = new Array(columns).fill(1);
    ctx.font = fontSize + "px monospace";
    ctx.textBaseline = 'top';
}

function draw() {
    ctx.fillStyle = 'rgba(245, 245, 245, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgb(115, 154, 225)';

    for(let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 16, drops[i] * 16);

        if(drops[i] * 16 > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    if(fadingOut) {
        fadeOpacity += 0.02;
        ctx.fillStyle = `rgba(245, 245, 245, ${fadeOpacity})`;
        ctx.fillRect(0, 0, width, height);

        if(fadeOpacity >= 1) {
            cancelAnimationFrame(animationId);
            canvas.style.display = 'none';
            ctx.clearRect(0, 0, width, height);

            document.getElementById('spiritual').style.display = 'none';
        }
    }
}

function startMatrix() {
    canvas.style.display = 'block';
    setup();
    fadeOpacity = 0;
    fadingOut = false;

    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
        fadingOut = true;
    }, 5000);
}

document.getElementById('spiritual').addEventListener('click', e => {
    e.preventDefault();
    startMatrix();
});