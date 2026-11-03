import PrivateRoute from "@/components/auth/PrivateRoute";
import BorrowsTable from "@/components/my-borrows/BorrowsTable";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {

    return (
        <>
            <PageHeader
                title="My Borrows"
                subtitle="Keep track of the books you have borrowed and return them when you are done."
            />

            <Container className="py-12 sm:py-16">
                
                <PrivateRoute>
                    <BorrowsTable />
                </PrivateRoute>
                
            </Container>
        </>
    );

}