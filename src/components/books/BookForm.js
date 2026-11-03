"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiBook, FiLayers, FiMail, FiUser } from "react-icons/fi";
import FormField from "@/components/auth/FormField";
import { CATEGORIES } from "@/lib/constants";
import { uploadImage, validateImageFile } from "@/lib/imgbb";
import BookCover from "./BookCover";

const DEFAULT_BOOK = {
    title: "",
    author: "",
    category: "",
    description: "",
    totalCopies: 1,
    image: "",
};


export default function BookForm({
    initialBook,
    owner,
    submitLabel = "Add Book",
    onSubmit,
    onCancel,
}) {
    const initial = { ...DEFAULT_BOOK, ...initialBook };

    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(initial.image);
    const [stage, setStage] = useState("");                 // "" | "uploading" | "saving"
    const busy = stage !== "";

    const handleFileChange = (event) => {
        const selected = event.target.files?.[0] ?? null;

        if (!selected) {
            setFile(null);
            setPreview(initial.image);
            return;
        }

        const problem = validateImageFile(selected);
        if (problem) {
            event.target.value = "";
            setFile(null);
            setPreview(initial.image);
            setErrors((prev) => ({ ...prev, image: problem }));
            return;
        }

        setErrors((prev) => ({ ...prev, image: "" }));
        setFile(selected);

        const reader = new FileReader();
        reader.onload = () => setPreview(String(reader.result));
        reader.readAsDataURL(selected);
    };

    const validate = (values) => {
        const next = {};

        if (values.title.length < 2) {
            next.title = "Please enter the book title.";
        } else if (values.title.length > 120) {
            next.title = "Title can be at most 120 characters.";
        }

        if (values.author.length < 2) {
            next.author = "Please enter the author's name.";
        }

        if (!CATEGORIES.includes(values.category)) {
            next.category = "Please select a category.";
        }

        if (
            !Number.isInteger(values.totalCopies) ||
            values.totalCopies < 1 ||
            values.totalCopies > 100
        ) {
            next.totalCopies = "Enter a whole number between 1 and 100.";
        }

        if (values.description.length < 10) {
            next.description = "Please write at least 10 characters.";
        } else if (values.description.length > 500) {
            next.description = "Description can be at most 500 characters.";
        }

        if (!file && !initial.image) {
            next.image = "Please choose a book image.";
        }

        return next;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const values = {
            title: String(form.get("title") ?? "").trim(),
            author: String(form.get("author") ?? "").trim(),
            category: String(form.get("category") ?? ""),
            description: String(form.get("description") ?? "").trim(),
            totalCopies: Number(form.get("totalCopies")),
        };

        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;


        let image = initial.image;
        if (file) {
            setStage("uploading");
            try {
                image = await uploadImage(file);
            } catch (error) {
                setStage("");
                setErrors({ image: error.message });
                toast.error(error.message);
                return;
            }
        }

        setStage("saving");
        try {
            await onSubmit({ ...values, image });
        } finally {
            setStage("");
        }
    };


    return (
        <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">

            <FormField id="title" label="Book Title" icon={FiBook} error={errors.title}>
                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={initial.title}
                    placeholder="e.g. The Silent Library"
                    aria-invalid={Boolean(errors.title)}
                    className="grow"
                />
            </FormField>

            <FormField
                id="author"
                label="Author Name"
                icon={FiUser}
                error={errors.author}
            >
                <input
                    id="author"
                    name="author"
                    type="text"
                    defaultValue={initial.author}
                    placeholder="Who wrote it?"
                    aria-invalid={Boolean(errors.author)}
                    className="grow"
                />
            </FormField>

            <FormField id="category" label="Category" bare error={errors.category}>
                <select
                    id="category"
                    name="category"
                    defaultValue={initial.category}
                    aria-invalid={Boolean(errors.category)}
                    className={`select w-full ${errors.category ? "select-error" : ""}`}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </FormField>

            <FormField
                id="totalCopies"
                label="Total Copies"
                icon={FiLayers}
                error={errors.totalCopies}
            >
                <input
                    id="totalCopies"
                    name="totalCopies"
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    defaultValue={initial.totalCopies}
                    aria-invalid={Boolean(errors.totalCopies)}
                    className="grow"
                />
            </FormField>

            <div className="md:col-span-2">
                <FormField
                    id="image"
                    label="Book Image"
                    bare
                    error={errors.image}
                    hint="JPG, PNG or WebP, up to 5 MB."
                >
                    <div className="flex items-center gap-4">
                        <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl border border-base-300 bg-base-200">
                            <BookCover
                                src={preview}
                                alt="Selected book cover preview"
                                className="size-full"
                            />
                        </div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            aria-invalid={Boolean(errors.image)}
                            className={`file-input w-full ${errors.image ? "file-input-error" : ""}`}
                        />
                    </div>
                </FormField>
            </div>

            <div className="md:col-span-2">
                <FormField
                    id="description"
                    label="Short Description"
                    bare
                    error={errors.description}
                    hint="10 to 500 characters."
                >
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        defaultValue={initial.description}
                        placeholder="What is this book about?"
                        aria-invalid={Boolean(errors.description)}
                        className={`textarea w-full ${errors.description ? "textarea-error" : ""}`}
                    />
                </FormField>
            </div>

            {owner && (
                <>
                    <FormField id="ownerName" label="Your Name" icon={FiUser} readOnly>
                        <input
                            id="ownerName"
                            type="text"
                            value={owner.name}
                            readOnly
                            className="grow cursor-not-allowed"
                        />
                    </FormField>

                    <FormField id="ownerEmail" label="Your Email" icon={FiMail} readOnly>
                        <input
                            id="ownerEmail"
                            type="email"
                            value={owner.email}
                            readOnly
                            className="grow cursor-not-allowed"
                        />
                    </FormField>
                </>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end md:col-span-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={busy}
                        className="btn btn-ghost rounded-full"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={busy}
                    className="btn btn-primary rounded-full px-8"
                >
                    {busy ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            {stage === "uploading" ? "Uploading image..." : "Saving..."}
                        </>
                    ) : (
                        submitLabel
                    )}
                </button>
            </div>
        </form>
    );
}