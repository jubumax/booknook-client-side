"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiImage, FiMail, FiUser } from "react-icons/fi";
import FormField from "@/components/auth/FormField";
import Modal from "@/components/shared/Modal";
import { authClient } from "@/lib/auth-client";
import { isValidUrl } from "@/lib/validators";


export default function EditProfileModal({ open, onClose, user }) {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const image = String(form.get("image") ?? "").trim();

        const nextErrors = {};
        if (name.length < 2) nextErrors.name = "Please enter your full name.";
        if (!isValidUrl(image)) {
            nextErrors.image =
                "Enter a valid photo URL starting with http:// or https://";
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setLoading(true);
        const { error } = await authClient.updateUser({ name, image });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Could not update your profile.");
            return;
        }

        toast.success("Profile updated successfully!");
        onClose();
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit Profile"
            description="Change your name or profile photo."
        >

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField id="profileName" label="Name" icon={FiUser} error={errors.name}>
                    <input
                        id="profileName"
                        name="name"
                        type="text"
                        defaultValue={user?.name ?? ""}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        className="grow"
                    />
                </FormField>

                <FormField
                    id="profileImage"
                    label="Photo URL"
                    icon={FiImage}
                    error={errors.image}
                >
                    <input
                        id="profileImage"
                        name="image"
                        type="url"
                        defaultValue={user?.image ?? ""}
                        placeholder="https://example.com/your-photo.jpg"
                        aria-invalid={Boolean(errors.image)}
                        className="grow"
                    />
                </FormField>

                <FormField
                    id="profileEmail"
                    label="Email"
                    icon={FiMail}
                    hint="Your email cannot be changed."
                    readOnly
                >
                    <input
                        id="profileEmail"
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                        className="grow cursor-not-allowed"
                    />
                </FormField>


                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="btn btn-ghost rounded-full"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary rounded-full px-8"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>

            </form>
        </Modal>
    );
}