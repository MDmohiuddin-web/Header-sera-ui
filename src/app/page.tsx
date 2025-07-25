import EnhancedCarousel from "./_component/EnhancedCarousel";
import ImageCarousel from "./_component/Imagecarousel";
import ImageSwiperPage from "./_component/imageswiper";





export default function Home() {
  return (
    <main className=" min-h-screen  py-24">
     <ImageSwiperPage />
     <ImageCarousel />
      <EnhancedCarousel />
    </main>
  );
}
