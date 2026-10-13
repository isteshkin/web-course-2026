class SimonModel {
    constructor() {
        this.sequence = [];
        this.playerInput = [];
        this.level = 0;
        this.isWaitingForPlayer = false;
        this.gameId = 0;
    }

    // Начать новую игру
    startGame() {
        this.gameId++;

        this.sequence = [];
        this.playerInput = [];
        this.level = 1;

        this.isWaitingForPlayer = false;

        this.addRandomButton();

        return this.gameId;
    }

    // Добавить случайную кнопку
    addRandomButton() {
        const index = Math.floor(Math.random() * 4);
        this.sequence.push(index);
    }

    // Разрешить ввод игрока
    enablePlayerInput() {
        this.playerInput = [];
        this.isWaitingForPlayer = true;
    }

    // Проверить нажатие игрока
    checkPlayerInput(index) {
        if (!this.isWaitingForPlayer) {
            return "ignored";
        }

        this.playerInput.push(index);

        const position = this.playerInput.length - 1;

        if (index !== this.sequence[position]) {
            this.isWaitingForPlayer = false;
            return "wrong";
        }

        if (this.playerInput.length === this.sequence.length) {
            this.isWaitingForPlayer = false;
            return "correct";
        }

        return "continue";
    }

    // Перейти на следующий уровень
    nextRound() {
        this.level++;
        this.addRandomButton();
    }

    // Завершить игру
    gameOver() {
        this.isWaitingForPlayer = false;
        this.gameId++;
    }
}