import PrivateRoute from "@/components/auth/PrivateRoute";
import ProfileCard from "@/components/profile/ProfileCard";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";


export const metadata = { title: "My Profile" };

export default function ProfilePage() {

    return (
        <>
            <PageHeader
                title="My Profile"
                subtitle="Your account details and a quick look at your library activity."
            />

            <Container className="py-12 sm:py-16">
                <div className="mx-auto max-w-3xl">

                    <PrivateRoute>
                        <ProfileCard />
                    </PrivateRoute>
                
                </div>
            </Container>
        </>
    );

}