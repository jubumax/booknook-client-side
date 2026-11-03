export default function FormField({
    id,
    label,
    icon: Icon,
    error,
    hint,
    labelAction,
    bare = false, 
    readOnly = false,
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

            {bare ? (
                children
            ) : (
                <label
                    className={`input w-full ${error ? "input-error" : ""} ${readOnly ? "bg-base-200/70 text-base-content/70" : ""
                        }`}
                >
                    {Icon && (
                        <Icon className="size-4 shrink-0 opacity-60" aria-hidden="true" />
                    )}
                    {children}
                </label>
            )}

            {hint && !error && (
                <p className="mt-1.5 text-xs text-base-content/60">{hint}</p>
            )}
            {error && (
                <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    );
}