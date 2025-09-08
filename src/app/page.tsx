import Image from "next/image";
import Herosection from "../components/Herosection";
import About from "../components/AboutPage";
import Service from "../components/ServiceSection";
import Testimonials from "../components/Testimonials";
import BlogSectionPublic from "@/components/BlogSectionPublic";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
<div>
<Herosection/>
<About/>
<Service/>
<Testimonials/>
<BlogSectionPublic/>
<ContactSection/>
<Footer />
</div>
  );
}
