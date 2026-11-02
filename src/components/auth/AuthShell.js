import { FiBookmark, FiBookOpen, FiPlusCircle, FiRotateCcw } from "react-icons/fi";

const STEPS = [
    { icon: FiPlusCircle, text: "Add a book to the shelf" },
    { icon: FiBookmark, text: "Borrow it for a few days" },
    { icon: FiRotateCcw, text: "Return it when you are done" },
];


export default function AuthShell({ title, subtitle, children }) {

    return (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl lg:grid-cols-2">

                {/* Left brand panel (only in desktop) */}
                <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-content lg:flex">
                    <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary-content/10" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-primary-content/10" />

                    <div className="relative">
                        <span className="grid size-14 place-items-center rounded-2xl bg-primary-content/15">
                            <FiBookOpen className="size-7" aria-hidden="true" />
                        </span>
                        <h2 className="mt-8 font-serif text-4xl font-bold leading-tight">
                            Every shelf has a story worth sharing.
                        </h2>
                        <p className="mt-4 max-w-sm leading-relaxed text-primary-content/80">
                            Join BookNook to share the books you love and borrow the ones
                            you have been meaning to read.
                        </p>
                    </div>

                    <ul className="relative mt-10 space-y-4">
                        {STEPS.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3">
                                <span className="grid size-9 place-items-center rounded-full bg-primary-content/15">
                                    <Icon className="size-4" aria-hidden="true" />
                                </span>
                                <span className="font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right form side */}
                <div className="p-6 sm:p-10">
                    <h1 className="font-serif text-3xl font-bold">{title}</h1>
                    <p className="mt-2 mb-8 text-base-content/70">{subtitle}</p>
                    {children}
                </div>
            </div>
        </section>
    );
}