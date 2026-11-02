import { FiInbox } from "react-icons/fi";

export default function EmptyState({
    icon: Icon = FiInbox,
    title,
    text,
    children,
}) {
    return (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-base-300 bg-base-200/40 px-6 py-14 text-center">

            <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-7" aria-hidden="true" />
            </span>

            <h3 className="mt-5 text-xl font-semibold">{title}</h3>

            {text && <p className="mt-2 max-w-md text-base-content/70">{text}</p>}

            {children && <div className="mt-6">{children}</div>}

        </div>
    );
}