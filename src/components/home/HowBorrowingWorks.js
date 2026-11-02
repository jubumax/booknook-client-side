import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { BORROW_STEPS } from "@/data/steps";

export default function HowBorrowingWorks() {
    return (
        <section className="border-y border-base-300 bg-base-200/60 py-16 sm:py-20">
            <Container>
                <SectionHeading
                    eyebrow="Simple as 1, 2, 3, 4"
                    title="How Borrowing Works"
                    subtitle="Getting a book from the BookNook shelf takes just a few steps."
                />

                <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {BORROW_STEPS.map(({ title, text, icon: Icon }, index) => (
                        <li
                            key={title}
                            className="relative flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute right-5 top-4 font-serif text-5xl font-bold text-base-content/10"
                            >
                                {index + 1}
                            </span>

                            <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="size-6" aria-hidden="true" />
                            </span>

                            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                            <p className="mt-2 leading-relaxed text-base-content/70">{text}</p>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}