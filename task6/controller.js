
class SnakeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.lastMoveTime = 0;
        this.animationId = null;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        document.addEventListener("keydown", this.handleKeyDown);

        document
            .getElementById("startButton")
            .addEventListener("click", () => this.startGame());

        document
            .getElementById("restartButton")
            .addEventListener("click", () => this.restart());

        this.view.draw();
        this.isStarted = false;
    }

    startGame() {
        this.model.reset();
        this.isStarted = true;

        document.getElementById("startScreen").hidden = true;

        this.view.draw();
        this.start();
    }

    handleKeyDown(event) {
        if (!this.isStarted) {
            return;
        }

        const directions = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 }
        };

        const direction = directions[event.key];

        if (!direction) {
            return;
        }

        event.preventDefault();

        if (this.model.gameOver) {
            return;
        }

        this.model.changeDirection(direction);
    }

    gameLoop(currentTime) {
        if (this.model.gameOver) {
            this.view.draw();
            this.animationId = null;
            return;
        }

        if (currentTime - this.lastMoveTime >= MOVE_INTERVAL) {
            this.model.update();
            this.lastMoveTime = currentTime;
        }

        this.view.draw();

        if (!this.model.gameOver) {
            this.animationId = requestAnimationFrame(this.gameLoop);
        } else {
            this.animationId = null;
        }
    }

    start() {
        this.lastMoveTime = 0;
        this.animationId = requestAnimationFrame(this.gameLoop);
    }

    restart() {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }

        this.model.reset();
        this.isStarted = true;

        this.view.draw();
        this.start();
    }
}

const model = new SnakeModel();
const view = new SnakeView(model);
const controller = new SnakeController(model, view);