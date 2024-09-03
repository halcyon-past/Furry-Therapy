"use client";

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initial animations
    gsap.fromTo(
      '.fade-in',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.navbar-link',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power3.out' }
    );

    // Scroll reveal animations
    gsap.utils.toArray<HTMLElement>('.scroll-animate').forEach((elem) => {
      gsap.fromTo(
        elem,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Rotating stars animation
    const stars = gsap.utils.toArray('.star');
    gsap.to(stars, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 2,
        from: 'random'
      }
    });

    // Raining stars animation
    gsap.to('.raining-star', {
      y: '100vh',
      duration: 10,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 1,
        from: 'random'
      }
    });

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-200 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="star absolute w-2 h-2 bg-white rounded-full star-clip-path" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}></div>
      ))}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="raining-star absolute w-5 h-5 bg-white rounded-full star-clip-path" style={{
          left: `${Math.random() * 100}%`,
          top: `-10px`,
        }}></div>
      ))}

      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-pink-600">Furry Therapy</h1>
        <div className="hidden md:flex space-x-6">
          <a href="#about" className="text-gray-800 navbar-link hover:text-pink-600 transition duration-300">About</a>
          <a href="#whatwedo" className="text-gray-800 navbar-link hover:text-pink-600 transition duration-300">What We Do</a>
          <a href="#testimonials" className="text-gray-800 navbar-link hover:text-pink-600 transition duration-300">Testimonials</a>
          <a href="#contact" className="text-gray-800 navbar-link hover:text-pink-600 transition duration-300">Contact</a>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="h-6 w-6 text-gray-800" /> : <Bars3Icon className="h-6 w-6 text-gray-800" />}
        </button>
        {isOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48">
            <a href="#about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300">About</a>
            <a href="#whatwedo" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300">What We Do</a>
            <a href="#testimonials" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300">Testimonials</a>
            <a href="#contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-purple-800 mb-10 fade-in">Welcome to Furry Therapy</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 fade-in">Swipe through and meet your new furry friend!</p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              src: "https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2022/10/man_and_his_cat_1312642536.jpg",
              alt: "Cat and Man",
              text: "Find your purr-fect companion!",
              bgColor: "bg-pink-100",
              bgHoverColor: "bg-pink-400",
            },
            {
              src: "https://www.akc.org/wp-content/uploads/2017/12/Yellow-Lab-High-Five.jpg",
              alt: "Dog and Man",
              text: "Get a high-five from your new best friend!",
              bgColor: "bg-yellow-100",
              bgHoverColor: "bg-yellow-400",
            },
            {
              src: "https://images.ctfassets.net/cnu0m8re1exe/5Ys9FjYKsCXoqjU3OOoq8z/2e7556cb4ef79b100d43d861f6c2e5f8/shutterstock_1200664957.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill",
              alt: "Girl with Dog",
              text: "Cuddle with a furry friend!",
              bgColor: "bg-purple-100",
              bgHoverColor: "bg-purple-400",
            },
            {
              src: "https://andy.pet/cdn/shop/articles/girl-with-rabbit.jpg?v=1664220781",
              alt: "Girl with Rabbit",
              text: "Relax with a fluffy companion!",
              bgColor: "bg-green-100",
              bgHoverColor: "bg-green-400",
            }
          ].map((item, index) => (
            <div key={index} className="max-w-xs rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 fade-in">
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={300}
                className="object-cover"
              />
              <div className={`p-4 h-20 ${item.bgColor} hover:${item.bgHoverColor}`}>
                <p className="text-gray-800 font-semibold">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-12 px-8 py-4 bg-pink-600 text-white text-lg rounded-full shadow-lg hover:bg-pink-700 transform hover:scale-105 transition duration-300 ease-in-out fade-in">
          Get Started
        </button>
      </div>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('https://i0.wp.com/buddymantra.com/wp-content/uploads/2020/04/1.v1.jpg')",
          filter: "brightness(0.6)",
        }}></div>
        <div className="relative z-10 text-center p-8 max-w-3xl scroll-animate">
          <h2 className="text-5xl font-bold text-white mb-6">About Us</h2>
          <p className="text-xl text-white leading-relaxed">
            Furry Therapy is your gateway to emotional well-being through the companionship of adorable pets. We believe in the healing power of animals, and our mission is to bring joy, peace, and comfort to your life. Our dedicated team works tirelessly to connect you with the perfect furry friend, ensuring a therapeutic experience tailored to your unique needs.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="whatwedo" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/cute-rescue-dog-shelter-being-held-by-woman_23-2148682938.jpg')",
          filter: "brightness(0.6)",
        }}></div>
        <div className="relative z-10 text-center p-8 max-w-3xl scroll-animate">
          <h2 className="text-5xl font-bold text-white mb-6">What We Do</h2>
          <p className="text-xl text-white leading-relaxed mb-10">
            Our platform allows you to connect with the perfect therapy animal for your needs. Whether you're looking for a playful pup or a calm cat, we offer a range of options tailored to enhance your emotional health. Our services include:
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { text: "Personalized Sessions", bgColor: "bg-pink-100" },
              { text: "Expert Guidance", bgColor: "bg-green-100" },
              { text: "Variety of Animals", bgColor: "bg-purple-100" }
            ].map((item, index) => (
              <div key={index} className="max-w-xs rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 fade-in bg-white bg-opacity-80">
                <div className={`p-4`}>
                  <p className="text-gray-800 font-semibold">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-purple-200 text-center scroll-animate">
        <h2 className="text-4xl font-bold text-pink-800 mb-6">Testimonials</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { text: "Furry Therapy has brought so much joy into my life. My therapy cat is the best companion I could ask for.", name: "Emily R." },
            { text: "Thanks to Furry Therapy, I found the perfect dog who helps me manage my anxiety. Highly recommended!", name: "John D." },
            { text: "I never thought spending time with a rabbit could be so therapeutic. Furry Therapy is amazing!", name: "Sarah L." }
          ].map((item, index) => (
            <div key={index} className="max-w-xs rounded-lg shadow-xl p-6 bg-white transform hover:scale-105 hover:shadow-2xl transition duration-500 fade-in">
              <p className="text-gray-800 mb-4">"{item.text}"</p>
              <p className="text-gray-600 font-semibold">- {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white text-center scroll-animate">
        <h2 className="text-4xl font-bold text-purple-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Have questions or want to get started? Reach out to us and we'll be happy to assist you.
        </p>
        <a href="mailto:contact@furrytherapy.com" className="px-8 py-4 bg-purple-600 text-white text-lg rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300 ease-in-out">
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-4 text-center">
        <p>&copy; 2024 Furry Therapy. All rights reserved.</p>
      </footer>
    </div>
  );
}