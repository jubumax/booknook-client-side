
export default function Spinner({ fullPage = false, label = "Loading..." }) {

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex flex-col items-center justify-center gap-3 ${fullPage ? "min-h-[60vh]" : "py-10"
                }`}
        >

            <span className="loading loading-spinner loading-lg text-primary" />
            
            <span className="text-sm text-base-content/60">{label}</span>
        
        </div>
    );
}