export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "center",
    className = "",
}) {
    const alignment = align === "left" ? "text-left" : "mx-auto text-center";

    return (
        <div className={`max-w-2xl ${alignment} ${className}`}>

            {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {eyebrow}
                </p>
            )}

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>

            {subtitle && (
                <p className="mt-3 leading-relaxed text-base-content/70">{subtitle}</p>
            )}

        </div>
    );
}