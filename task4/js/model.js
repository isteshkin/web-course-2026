const GameModel = {
    digitsCount: 6,
    secretNumber: "",
    attempts: 0,
    history: [],
    gameFinished: false,

    generateNumber() {
        const digits = [];
        const availableDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        if (this.digitsCount > availableDigits.length) {
            throw new Error(
                `Нельзя загадать ${this.digitsCount} цифр без повторов: всего доступно ${availableDigits.length}.`
            );
        }

        while (digits.length < this.digitsCount) {
            const index = Math.floor(Math.random() * availableDigits.length);
            const digit = availableDigits[index];

            digits.push(digit);
            availableDigits.splice(index, 1);
        }

        return digits.join("");
    },

    validateInput(value) {
        const re = new RegExp(`^\\d{${this.digitsCount}}$`);

        if (!re.test(value)) {
            return `Введите ровно ${this.digitsCount} цифр.`;
        }

        const digits = value.split("");

        if (new Set(digits).size !== this.digitsCount) {
            return "Цифры не должны повторяться.";
        }

        return "";
    },

    countBullsAndCows(secret, guess) {
        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < this.digitsCount; i++) {
            if (guess[i] === secret[i]) {
                bulls++;
            } else if (secret.includes(guess[i])) {
                cows++;
            }
        }

        return { bulls, cows };
    },

    reset() {
        this.secretNumber = this.generateNumber();
        this.attempts = 0;
        this.history = [];
        this.gameFinished = false;

        console.log("Загаданное число:", this.secretNumber);
    },

    makeGuess(guess) {
        const validationError = this.validateInput(guess);

        if (validationError) {
            return { type: "error", message: validationError };
        }

        const result = this.countBullsAndCows(this.secretNumber, guess);

        this.attempts++;
        this.history.push({
            guess: guess,
            bulls: result.bulls,
            cows: result.cows
        });

        if (result.cows >= 4) {
            this.gameFinished = true;
            return { type: "win", attempts: this.attempts };
        }

        return {
            type: "result",
            bulls: result.bulls,
            cows: result.cows
        };
    },

    getBullsEnding(count) {
        if (count === 1) return "";
        if (count >= 2 && count <= 4) return "а";
        return "ов";
    },

    getCowsEnding(count) {
        if (count === 1) return "а";
        if (count >= 2 && count <= 4) return "ы";
        return "";
    }
};