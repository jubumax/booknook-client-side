"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/useAuth";


export default function PrivateRoute({ children }) {

    const { isLoggedIn, isPending } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {

        if (!isPending && !isLoggedIn) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, isLoggedIn, pathname, router]);

    if (isPending || !isLoggedIn) {
        return <Spinner fullPage label="Checking your account..." />;
    }

    return children;
}