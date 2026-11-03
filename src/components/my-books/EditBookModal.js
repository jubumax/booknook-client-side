"use client";

import BookForm from "@/components/books/BookForm";
import Modal from "@/components/shared/Modal";


export default function EditBookModal({ book, onClose, onSave }) {
    return (
        <Modal
            open={Boolean(book)}
            onClose={onClose}
            title="Edit Book"
            description="Update the details below and save your changes."
            size="lg"
        >

            {book && (
                <BookForm
                    initialBook={book}
                    submitLabel="Save Changes"
                    onSubmit={onSave}
                    onCancel={onClose}
                />
            )}
            
        </Modal>
    );
}