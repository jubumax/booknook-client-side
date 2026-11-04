"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Container from "@/components/shared/Container";


export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container className="grid min-h-[60vh] place-items-center py-16">
            <div className="mx-auto max-w-md text-center">

                <span className="mx-auto grid size-16 place-items-center rounded-full bg-error/10 text-error">
                    <FiAlertTriangle className="size-8" aria-hidden="true" />
                </span>

                <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>

                <p className="mt-3 leading-relaxed text-base-content/70">
                    We could not load this page. Please try again, or head back home.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="btn btn-primary rounded-full px-8"
                    >
                        Try Again
                    </button>

                    <Link href="/" className="btn btn-outline rounded-full">
                        Back to Home
                    </Link>
                </div>

            </div>
        </Container>
    );
}