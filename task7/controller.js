
import { PostModel } from "./model.js";
import { PostView } from "./view.js";

class PostController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.searchQuery = "";
        this.searchTimer = null;

        this.observer = new IntersectionObserver(
            entries => {
                if (
                    entries[0].isIntersecting &&
                    this.searchQuery === ""
                ) {
                    this.loadPosts();
                }
            },
            {
                rootMargin: "200px",
                threshold: 0
            }
        );

        this.view.searchInput.addEventListener(
            "input",
            () => this.handleSearch()
        );

        this.observer.observe(this.view.sentinel);

        this.loadPosts();
    }

    async loadPosts() {
        if (this.model.isLoading || !this.model.hasMore) {
            return;
        }

        this.view.showLoading(true);
        this.view.showError("");

        try {
            await this.model.loadPosts();

            this.renderPosts();
            this.view.showEndMessage(!this.model.hasMore);
        } catch (error) {
            console.error("Ошибка загрузки постов:", error);

            this.view.showError(
                "Не удалось загрузить посты. Проверьте подключение и попробуйте ещё раз."
            );
        } finally {
            this.view.showLoading(false);
        }
    }

    renderPosts() {
        const posts = this.model.getFilteredPosts(this.searchQuery);
        this.view.renderPosts(posts);
    }

    handleSearch() {
        clearTimeout(this.searchTimer);

        this.searchTimer = setTimeout(() => {
            this.searchQuery = this.view.searchInput.value
                .trim()
                .toLowerCase();

            this.renderPosts();

            if (this.searchQuery === "" && this.model.hasMore) {
                this.observer.observe(this.view.sentinel);
            } else {
                this.observer.unobserve(this.view.sentinel);
            }
        }, 300);
    }
}

const model = new PostModel();
const view = new PostView();
new PostController(model, view);