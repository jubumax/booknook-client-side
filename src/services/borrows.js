import { authFetch } from "@/lib/api-client";

export function borrowBook(bookId) {
    return authFetch("/borrows", { method: "POST", body: { bookId } });
}

export function getMyBorrows() {
    return authFetch("/borrows");
}

export function returnBook(borrowId) {
    return authFetch(`/borrows/${encodeURIComponent(borrowId)}`, {
        method: "DELETE",
    });
}