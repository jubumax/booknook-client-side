import HeroSlider from "@/components/home/HeroSlider";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">BookNook, a small online library</h1>

      <HeroSlider />
      <NewArrivals />
      <HowBorrowingWorks />
      <TopCategories />
      
    </>
  );
}