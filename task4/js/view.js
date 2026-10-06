const GameView = {
    elements: {
        guessInput: document.getElementById("guessInput"),
        checkButton: document.getElementById("checkButton"),
        newGameButton: document.getElementById("newGameButton"),
        showNumberButton: document.getElementById("showNumberButton"),
        errorMessage: document.getElementById("errorMessage"),
        resultMessage: document.getElementById("resultMessage"),
        secretMessage: document.getElementById("secretMessage"),
        attemptsCount: document.getElementById("attemptsCount"),
        historyElement: document.getElementById("history")
    },

    setInputMaxLength(length) {
        this.elements.guessInput.maxLength = length;
    },

    renderHistory(history) {
        this.elements.historyElement.innerHTML = "";

        history.forEach((attempt) => {
            const li = document.createElement("li");

            li.textContent =
                `${attempt.guess} → ${attempt.bulls} бык${GameModel.getBullsEnding(attempt.bulls)}, ` +
                `${attempt.cows} коров${GameModel.getCowsEnding(attempt.cows)}`;

            this.elements.historyElement.appendChild(li);
        });
    },

    updateAttempts(attempts) {
        this.elements.attemptsCount.textContent = attempts;
    },

    showError(message) {
        this.elements.errorMessage.textContent = message;
    },

    clearError() {
        this.elements.errorMessage.textContent = "";
    },

    showResult(bulls, cows) {
        this.elements.resultMessage.textContent =
            `${bulls} бык${GameModel.getBullsEnding(bulls)}, ` +
            `${cows} коров${GameModel.getCowsEnding(cows)}`;
    },

    showWin(attempts) {
        this.elements.resultMessage.textContent =
            `Победа! Угадано за ${attempts} попыток`;
    },

    clearResult() {
        this.elements.resultMessage.textContent = "";
    },

    showSecret(secretNumber) {
    this.elements.secretMessage.textContent =
        `Загаданное число: ${secretNumber}`;
    },

    clearSecret() {
    this.elements.secretMessage.textContent = "";
    },

    disableControls() {
        this.elements.guessInput.disabled = true;
        this.elements.checkButton.disabled = true;
    },

    enableControls() {
        this.elements.guessInput.disabled = false;
        this.elements.checkButton.disabled = false;
    },

    clearInput() {
        this.elements.guessInput.value = "";
    },

    getInputValue() {
        return this.elements.guessInput.value.trim();
    },

    focusInput() {
        this.elements.guessInput.focus();
    },

    reset(attempts, history) {
        this.clearInput();
        this.clearError();
        this.clearResult();
        this.clearSecret();
        this.enableControls();
        this.updateAttempts(attempts);
        this.renderHistory(history);
        this.focusInput();
    }
};