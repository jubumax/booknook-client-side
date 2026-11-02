import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import Spinner from "@/components/shared/Spinner";

export const metadata = { title: "Login" };

export default function LoginPage() {
    return (
        <AuthShell
            title="Login to your account"
            subtitle="Welcome back! Log in to add, borrow and return books."
        >
            <Suspense fallback={<Spinner />}>
                <LoginForm />
            </Suspense>
        </AuthShell>
    );
}