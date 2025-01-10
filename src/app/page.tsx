import ImageSlider from "./components/image-slider/ImageSlider";
import LoginForm from "./components/login-form/LoginForm";


export default function Home() {
  return (
    <div className="h-full flex justify-center items-center p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="rounded-3xl bg-white w-full max-w-[1280px] mx-auto h-full">
        <div className="grid grid-cols-2 gap-8 h-full">
          <ImageSlider />
          <LoginForm  />
        </div>        
      </main>
    </div>
  );
}
