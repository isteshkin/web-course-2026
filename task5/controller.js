class SimonController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.view.getButtons().forEach(button => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.index);
                this.handlePlayerClick(index);
            });
        });

        this.view.getStartButton().addEventListener("click", () => {
            this.startGame();
        });
    }

    startGame() {
        const gameId = this.model.startGame();

        this.view.showLevel(this.model.level);
        this.view.setStartButtonDisabled(true);

        this.playSequence(gameId);
    }

    async playSequence(gameId) {
        this.view.showMessage("Запоминайте последовательность...");

        for (const index of this.model.sequence) {
            if (gameId !== this.model.gameId) {
                return;
            }

            await this.view.flashButton(index);
        }

        if (gameId !== this.model.gameId) {
            return;
        }

        this.model.enablePlayerInput();

        this.view.showMessage("Повторите последовательность");
    }

    handlePlayerClick(index) {
        const result = this.model.checkPlayerInput(index);

        if (result === "ignored") {
            return;
        }

        if (result === "wrong") {
            this.gameOver();
        } else if (result === "correct") {
            this.nextRound();
        }
    }

    async nextRound() {
        const gameId = this.model.gameId;

        this.view.showMessage("Правильно!");

        await this.view.delay(700);

        if (gameId !== this.model.gameId) {
            return;
        }

        this.model.nextRound();

        this.view.showLevel(this.model.level);

        this.playSequence(gameId);
    }

    gameOver() {
        this.model.gameOver();

        this.view.clearHighlights();

        this.view.showMessage(
            `Игра окончена! Вы дошли до уровня ${this.model.level}`
        );

        this.view.setStartButtonDisabled(false);
    }
}

const model = new SimonModel();
const view = new SimonView();
const controller = new SimonController(model, view);

controller.init();