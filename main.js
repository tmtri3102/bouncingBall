// // Khởi tạo trò chơi
// draw();
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let l = canvas.getContext("2d");

// Ball properties
let x = Math.random() * innerWidth;
let y = (Math.random() * innerHeight) / 2; // Start the ball higher
let vx = Math.random() * 2 + 2; // Speed X
let vy = Math.random() * 2 + 2; // Speed Y
let radius = 20;

// Paddle properties
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (innerWidth - paddleWidth) / 2; // Center paddle
const paddleY = innerHeight - paddleHeight - 20; // Paddle position from bottom

move();

function move() {
	requestAnimationFrame(move);
	l.clearRect(0, 0, innerWidth, innerHeight);

	// Draw the ball
	l.beginPath();
	l.strokeStyle = "black";
	l.arc(x, y, radius, 0, Math.PI * 2, false);
	l.stroke();

	// Draw the paddle
	l.fillStyle = "yellow";
	l.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

	// Ball bouncing logic
	if (x + radius > innerWidth || x - radius < 0) vx = -vx; // Bounce off left/right
	if (y - radius < 0) vy = -vy; // Bounce off the top

	// Check if the ball hits the paddle
	if (y + radius > paddleY && x > paddleX && x < paddleX + paddleWidth) {
		vy = -vy; // Bounce the ball back up
		y = paddleY - radius; // Position the ball above the paddle
	}

	// Check if the ball goes below the paddle
	if (y + radius > innerHeight) {
		alert("Game Over!");
		reset(); // Restart game
	}

	// Update ball position
	x += vx;
	y += vy;
}

function reset() {
	x = Math.random() * innerWidth;
	y = (Math.random() * innerHeight) / 2;
	vx = Math.random() * 2 + 2;
	vy = Math.random() * 2 + 2;
	paddleX = (innerWidth - paddleWidth) / 2; // Reset paddle position
}

// Handle paddle movement
window.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		paddleX = Math.max(0, paddleX - 20); // Move left
	}
	if (e.key === "ArrowRight") {
		paddleX = Math.min(innerWidth - paddleWidth, paddleX + 20); // Move right
	}
});
