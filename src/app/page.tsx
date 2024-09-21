import HomeSection from './components/Landing/HomeSection';
import About from './components/Landing/About';
import Testimonials from './components/Landing/Testimonials';
import ContactUs from './components/Landing/ContactUs';



export default function Home() {


  return (
    <div className='w-full'>
      <section id="home">
        <HomeSection />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
}