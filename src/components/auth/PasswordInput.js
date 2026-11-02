"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";


export default function PasswordInput(props) {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <input {...props} type={visible ? "text" : "password"} className="grow" />

            <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="text-base-content/60 transition-colors hover:text-base-content"
            >
                
                {visible ? (
                    <FiEyeOff className="size-4" />
                ) : (
                    <FiEye className="size-4" />
                )}
            </button>
        </>
    );
}