import { apiFetch } from "@/lib/api";
import { authFetch } from "@/lib/api-client";


export function getBooks({ limit } = {}) {
    const params = new URLSearchParams({ sort: "newest" });
    
    if (limit) params.set("limit", String(limit));
    return apiFetch(`/books?${params}`);
}

export function getMyBooks() {
    return authFetch("/books?mine=true");
}

export function getBook(id) {
    return authFetch(`/books/${encodeURIComponent(id)}`);
}

export function addBook(book) {
    return authFetch("/books", { method: "POST", body: book });
}

export function updateBook(id, updates) {
    return authFetch(`/books/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: updates,
    });
}

export function deleteBook(id) {
    return authFetch(`/books/${encodeURIComponent(id)}`, { method: "DELETE" });
}