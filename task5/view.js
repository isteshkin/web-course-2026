class SimonView {
    constructor() {
        this.buttons = document.querySelectorAll(".simon-button");
        this.startButton = document.getElementById("startButton");
        this.levelElement = document.getElementById("level");
        this.messageElement = document.getElementById("message");
    }

    getButtons() {
        return this.buttons;
    }

    getStartButton() {
        return this.startButton;
    }

    showLevel(level) {
        this.levelElement.textContent = level;
    }

    showMessage(message) {
        this.messageElement.textContent = message;
    }

    setStartButtonDisabled(disabled) {
        this.startButton.disabled = disabled;
    }

    async flashButton(index) {
        const button = this.buttons[index];

        button.classList.add("active");

        await this.delay(500);

        button.classList.remove("active");

        await this.delay(200);
    }

    clearHighlights() {
        this.buttons.forEach(button => {
            button.classList.remove("active");
        });
    }

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}