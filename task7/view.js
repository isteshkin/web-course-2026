
export class PostView {
    constructor() {
        this.postsContainer = document.getElementById("posts");
        this.searchInput = document.getElementById("searchInput");
        this.loadingMessage = document.getElementById("loading");
        this.errorMessage = document.getElementById("error");
        this.endMessage = document.getElementById("endMessage");
        this.sentinel = document.getElementById("sentinel");
    }

    renderPosts(posts) {
        this.postsContainer.replaceChildren();

        if (posts.length === 0) {
            const message = document.createElement("p");
            message.className = "message";
            message.textContent = "Посты не найдены.";
            this.postsContainer.appendChild(message);
            return;
        }

        posts.forEach(post => {
            const card = document.createElement("article");
            card.className = "post";

            const title = document.createElement("h2");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body;

            const author = document.createElement("p");
            author.className = "author";
            author.textContent = `ID автора: ${post.userId}`;

            card.append(title, body, author);
            this.postsContainer.appendChild(card);
        });
    }

    showLoading(isLoading) {
        this.loadingMessage.hidden = !isLoading;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.hidden = !message;
    }

    showEndMessage(show) {
        this.endMessage.hidden = !show;
    }
}
