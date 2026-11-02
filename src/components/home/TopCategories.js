import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { TOP_CATEGORIES } from "@/data/categories";

export default function TopCategories() {
    return (
        <section className="py-16 sm:py-20">
            <Container>
                <SectionHeading
                    eyebrow="Pick your genre"
                    title="Top Categories"
                    subtitle="Whatever you are in the mood for, there is a shelf for it."
                />

                <ul className="mt-12 flex flex-wrap justify-center gap-4">
                    {TOP_CATEGORIES.map(({ name, text, icon: Icon, tone }) => (
                        <li
                            key={name}
                            className="basis-full sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(20%-0.8rem)]"
                        >
                            <Link
                                href={`/books?category=${encodeURIComponent(name)}`}
                                className="group flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                            >
                                <span
                                    className={`grid size-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${tone}`}
                                >
                                    <Icon className="size-7" aria-hidden="true" />
                                </span>
                                <h3 className="mt-4 text-xl font-semibold">{name}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                                    {text}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}