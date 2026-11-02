"use client";

import Link from "next/link";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "@/components/shared/Container";
import { SLIDES } from "@/data/slides";


const BOOK_POSITIONS = [
    "-rotate-12 -translate-x-10 translate-y-3",
    "rotate-12 translate-x-10 translate-y-3",
    "rotate-0",
];


function BookStackArt({ colors, icon: Icon }) {

    return (
        <div className="relative mx-auto h-80 w-64" aria-hidden="true">

            {colors.map((color, index) => (
                <div
                    key={`${color}-${index}`}
                    className={`absolute inset-0 rounded-2xl p-5 shadow-2xl ${color} ${BOOK_POSITIONS[index]}`}
                >

                    <div className="flex h-full flex-col justify-between rounded-xl border-2 border-white/30 p-4">

                        <span className="block h-2 w-16 rounded-full bg-white/60" />

                        <div className="space-y-2">
                            <span className="block h-3 w-full rounded-full bg-white/70" />
                            <span className="block h-3 w-2/3 rounded-full bg-white/50" />
                        </div>

                    </div>

                </div>
            ))}

            <span className="absolute -right-6 -top-4 grid size-16 place-items-center rounded-full bg-base-100 text-primary shadow-xl">
                <Icon className="size-7" />
            </span>
        </div>
    );
}


export default function HeroSlider() {

    return (
        <section aria-label="Featured" className="border-b border-base-300">
            
            <Swiper
                className="hero-swiper"
                modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                speed={800}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation
                pagination={{ clickable: true }}
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={`relative overflow-hidden bg-linear-to-br ${slide.background}`}
                        >
                            <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/10" />
                            <div className="pointer-events-none absolute -bottom-28 right-10 size-72 rounded-full bg-accent/15" />

                            <Container className="relative grid min-h-[32rem] items-center gap-10 pb-20 pt-14 lg:min-h-[36rem] lg:grid-cols-2">
                                <div className="max-w-xl">
                                    <p
                                        className="hero-animate text-sm font-semibold uppercase tracking-widest text-primary"
                                        style={{ "--i": 0 }}
                                    >
                                        {slide.eyebrow}
                                    </p>
                                    <h2
                                        className="hero-animate mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                                        style={{ "--i": 1 }}
                                    >
                                        {slide.title}
                                    </h2>
                                    <p
                                        className="hero-animate mt-5 text-lg leading-relaxed text-base-content/75"
                                        style={{ "--i": 2 }}
                                    >
                                        {slide.text}
                                    </p>
                                    <div className="hero-animate mt-8" style={{ "--i": 3 }}>
                                        <Link
                                            href="/books"
                                            className="btn btn-primary btn-lg rounded-full px-8"
                                        >
                                            Browse Books
                                        </Link>
                                    </div>
                                </div>

                                <div className="hero-animate hidden lg:block" style={{ "--i": 2 }}>
                                    <BookStackArt colors={slide.books} icon={slide.icon} />
                                </div>
                            </Container>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}