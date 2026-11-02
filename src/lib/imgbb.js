const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;
const MAX_IMAGE_SIZE_MB = 5;


export function validateImageFile(file) {
    if (!file || file.size === 0) return "Please choose a book image.";
    if (!file.type.startsWith("image/")) {
        return "Please choose an image file (JPG, PNG or WebP).";
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        return `Image must be smaller than ${MAX_IMAGE_SIZE_MB} MB.`;
    }
    return "";
}


export async function uploadImage(file) {
    if (!IMGBB_KEY) {
        throw new Error(
            "Image upload is not set up. Add NEXT_PUBLIC_IMGBB_KEY to .env.local.",
        );
    }

    const formData = new FormData();
    formData.append("image", file);

    let response;
    try {
        response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
            method: "POST",
            body: formData,
        });
    } catch {
        throw new Error("Could not upload the image. Please check your connection.");
    }

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
        throw new Error(
            result?.error?.message || "Image upload failed. Please try again.",
        );
    }

    return result.data.url;
}