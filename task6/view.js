
class SnakeView {
    constructor(model) {
        this.model = model;

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.scoreElement = document.getElementById("score");
        this.finalScoreElement = document.getElementById("finalScore");
        this.gameOverElement = document.getElementById("gameOver");
    }

    drawGrid() {
        const ctx = this.ctx;

        ctx.strokeStyle = "#eeeeee";
        ctx.lineWidth = 2;

        for (let i = 0; i <= CELLS_COUNT; i++) {
            const position = i * CELL_SIZE;

            ctx.beginPath();
            ctx.moveTo(position, 0);
            ctx.lineTo(position, BOARD_SIZE);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, position);
            ctx.lineTo(BOARD_SIZE, position);
            ctx.stroke();
        }
    }

    drawSnake() {
        const ctx = this.ctx;

        this.model.snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? "#176b35" : "#2eaa57";

            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );
        });
    }

    drawApple() {
        const apple = this.model.apple;

        if (!apple) {
            return;
        }

        const ctx = this.ctx;

        ctx.fillStyle = "#e53935";
        ctx.beginPath();

        ctx.arc(
            apple.x * CELL_SIZE + CELL_SIZE / 2,
            apple.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    draw() {
        this.ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

        this.drawGrid();
        this.drawApple();
        this.drawSnake();

        this.scoreElement.textContent = this.model.score;

        this.gameOverElement.hidden = !this.model.gameOver;

        if (this.model.gameOver) {
            this.finalScoreElement.textContent = this.model.score;
        }
    }
}
