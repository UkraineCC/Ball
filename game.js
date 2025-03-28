const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = { x: 200, y: 500, radius: 10 };
let obstacles = [];
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && ball.x > 10) ball.x -= 20;
    if (e.key === "ArrowRight" && ball.x < 390) ball.x += 20;
});

function spawnObstacle() {
    let x = Math.random() * (canvas.width - 20);
    obstacles.push({ x: x, y: 0, width: 20, height: 20 });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    obstacles.forEach((obs, index) => {
        obs.y += 2;
        ctx.fillStyle = "black";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        if (
            ball.x + ball.radius > obs.x &&
            ball.x - ball.radius < obs.x + obs.width &&
            ball.y + ball.radius > obs.y &&
            ball.y - ball.radius < obs.y + obs.height
        ) {
            alert("Game Over! Score: " + score);
            obstacles = [];
            score = 0;
        }

        if (obs.y > canvas.height) obstacles.splice(index, 1);
    });

    score++;
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(gameLoop);
}

setInterval(spawnObstacle, 1000);
gameLoop();