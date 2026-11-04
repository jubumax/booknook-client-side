import Container from "./Container";
import Reveal from "./Reveal";

export default function PageHeader({ title, subtitle, children }) {
    
    return (
        <section className="relative overflow-hidden border-b border-base-300 bg-base-200/60">

            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 size-40 rounded-full bg-accent/15" />

            <Container className="relative py-12 sm:py-16">
                
                <Reveal y={16}>
                    <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>

                    {subtitle && (
                        <p className="mt-3 max-w-2xl leading-relaxed text-base-content/70">
                            {subtitle}
                        </p>
                    )}
                    
                    {children && <div className="mt-6">{children}</div>}
                </Reveal>

            </Container>

        </section>
    );
}