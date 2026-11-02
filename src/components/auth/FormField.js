
export default function FormField({
    id,
    label,
    icon: Icon,
    error,
    labelAction,
    children,
}) {

    return (

        <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
                {labelAction}
            </div>

            <label className={`input w-full ${error ? "input-error" : ""}`}>
                {Icon && (
                    <Icon className="size-4 shrink-0 opacity-60" aria-hidden="true" />
                )}
                {children}
            </label>

            {error && (
                <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-error">
                    {error}
                </p>
            )}
        </div>

    );
}