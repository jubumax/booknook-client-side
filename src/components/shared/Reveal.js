"use client";

import { motion, useReducedMotion } from "motion/react";

const TAGS = { div: motion.div, li: motion.li };

export default function Reveal({
    as = "div",
    delay = 0,
    y = 24,
    className = "",
    children,
}) {
    const reduceMotion = useReducedMotion();
    const Tag = TAGS[as] ?? motion.div;

    if (reduceMotion) {
        return as === "li" ? (
            <li className={className}>{children}</li>
        ) : (
            <div className={className}>{children}</div>
        );
    }

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.55, delay, ease: "easeOut" }}
        >
            {children}
        </Tag>
    );
}