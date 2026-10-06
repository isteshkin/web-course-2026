const GameController = {
    init() {
        GameView.elements.checkButton.addEventListener("click", () => {
            this.handleCheckGuess();
        });

        GameView.elements.newGameButton.addEventListener("click", () => {
            this.handleNewGame();
        });

        GameView.elements.showNumberButton.addEventListener("click", () => {
            this.handleShowNumber();
        });

        GameView.elements.guessInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.handleCheckGuess();
            }
        });

        this.handleNewGame();
    },

    handleShowNumber() {
        GameView.showSecret(GameModel.secretNumber);
    },

    handleCheckGuess() {
        if (GameModel.gameFinished) {
            return;
        }

        const guess = GameView.getInputValue();
        const outcome = GameModel.makeGuess(guess);

        if (outcome.type === "error") {
            GameView.showError(outcome.message);
            return;
        }

        GameView.clearError();
        GameView.updateAttempts(GameModel.attempts);
        GameView.renderHistory(GameModel.history);

        if (outcome.type === "win") {
            GameView.showWin(outcome.attempts);
            GameView.disableControls();
            return;
        }

        GameView.showResult(outcome.bulls, outcome.cows);
        GameView.clearInput();
        GameView.focusInput();
    },

    handleNewGame() {
        GameModel.reset();
        GameView.reset(GameModel.attempts, GameModel.history);
    }
};

// Запускаем игру при загрузке страницы
GameController.init();