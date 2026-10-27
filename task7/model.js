
export class PostModel {
    constructor() {
        this.apiUrl = "https://jsonplaceholder.typicode.com/posts";
        this.posts = [];
        this.page = 0;
        this.limit = 10;
        this.hasMore = true;
        this.isLoading = false;
    }

    async loadPosts() {
        if (this.isLoading || !this.hasMore) {
            return [];
        }

        this.isLoading = true;

        try {
            const start = this.page * this.limit;

            const response = await fetch(
                `${this.apiUrl}?_start=${start}&_limit=${this.limit}`
            );

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const posts = await response.json();

            this.posts.push(...posts);
            this.page++;

            if (posts.length < this.limit) {
                this.hasMore = false;
            }

            return posts;
        } catch (error) {
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    getFilteredPosts(query = "") {
        const normalizedQuery = query.trim().toLowerCase();

        return this.posts.filter(post =>
            post.title.toLowerCase().includes(normalizedQuery)
        );
    }
}
