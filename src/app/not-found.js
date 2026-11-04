import Link from "next/link";
import Container from "@/components/shared/Container";


export const metadata = { title: "Page Not Found" };

export default function NotFound() {

    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/10" />
            <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-accent/15" />

            <Container className="relative grid min-h-[70vh] place-items-center py-16">
                <div className="mx-auto max-w-xl text-center">
                    
                    <p
                        aria-hidden="true"
                        className="font-serif text-[8rem] font-bold leading-none text-primary/20 sm:text-[11rem]"
                    >
                        404
                    </p>

                    <h1 className="-mt-4 text-3xl font-bold sm:text-4xl">
                        Page not found
                    </h1>

                    <p className="mt-4 leading-relaxed text-base-content/70">
                        This page seems to have wandered off the shelf. It may have been
                        moved, or the link might be mistyped.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/" className="btn btn-primary btn-lg rounded-full px-8">
                            Back to Home
                        </Link>

                        <Link href="/books" className="btn btn-outline btn-lg rounded-full">
                            Browse Books
                        </Link>
                    </div>

                </div>
            </Container>
        </section>
    );
}