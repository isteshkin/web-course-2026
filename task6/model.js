
const CELL_SIZE = 20;
const BOARD_SIZE = 400;
const CELLS_COUNT = BOARD_SIZE / CELL_SIZE;
const MOVE_INTERVAL = 150;

class SnakeModel {
    constructor() {
        this.reset();
    }

    reset() {
        this.snake = [
            { x: 5, y: 10 },
            { x: 4, y: 10 },
            { x: 3, y: 10 }
        ];

        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.gameOver = false;

        this.spawnApple();
    }

    spawnApple() {
        const freeCells = [];

        for (let y = 0; y < CELLS_COUNT; y++) {
            for (let x = 0; x < CELLS_COUNT; x++) {
                const occupied = this.snake.some(
                    segment => segment.x === x && segment.y === y
                );

                if (!occupied) {
                    freeCells.push({ x, y });
                }
            }
        }

        if (freeCells.length === 0) {
            this.apple = null;
            this.gameOver = true;
            return;
        }

        const index = Math.floor(Math.random() * freeCells.length);
        this.apple = freeCells[index];
    }

    changeDirection(direction) {
        if (
            direction.x === -this.direction.x &&
            direction.y === -this.direction.y
        ) {
            return;
        }

        this.nextDirection = direction;
    }

    moveSnake() {
        this.direction = this.nextDirection;

        const head = this.snake[0];

        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        if (
            newHead.x < 0 ||
            newHead.x >= CELLS_COUNT ||
            newHead.y < 0 ||
            newHead.y >= CELLS_COUNT
        ) {
            this.gameOver = true;
            return;
        }

        const ateApple =
            newHead.x === this.apple.x &&
            newHead.y === this.apple.y;

        const body = ateApple
            ? this.snake
            : this.snake.slice(0, -1);

        const hitSelf = body.some(
            segment =>
                segment.x === newHead.x &&
                segment.y === newHead.y
        );

        if (hitSelf) {
            this.gameOver = true;
            return;
        }

        this.snake.unshift(newHead);

        if (ateApple) {
            this.score++;
            this.spawnApple();
        } else {
            this.snake.pop();
        }
    }

    update() {
        if (!this.gameOver) {
            this.moveSnake();
        }
    }
}
