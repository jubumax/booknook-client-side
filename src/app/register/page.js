import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import Spinner from "@/components/shared/Spinner";

export const metadata = { title: "Register" };

export default function RegisterPage() {
    return (
        <AuthShell
            title="Create your account"
            subtitle="Join BookNook and start sharing your bookshelf today."
        >
            <Suspense fallback={<Spinner />}>
                <RegisterForm />
            </Suspense>
        </AuthShell>
    );
}