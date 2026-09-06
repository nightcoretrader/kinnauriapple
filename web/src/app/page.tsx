import { Journey } from "@/components/Journey";
import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Facts } from "@/components/Facts";

export default function HomePage() {
  return (
    <main>
      <Journey />
      <Facts />
      <BookingForm />
      <Faq />
      <Footer />
    </main>
  );
}
