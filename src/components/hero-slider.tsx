"use client";

import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { label: "A slower kind of scrolling", title: "Find a story\nthat stays with you.", text: "Thoughtful reads, shared by a community that loves getting lost in a good book.", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85", tone: "from-[#18382d]/95 via-[#18382d]/72 to-[#18382d]/10" },
  { label: "Pass a good thing along", title: "Your next favorite\nis already here.", text: "Browse the shelves, meet your next author, and bring a little wonder home.", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2000&q=85", tone: "from-[#203d32]/95 via-[#203d32]/70 to-[#203d32]/5" },
  { label: "Small library. Wide worlds.", title: "Read more.\nShare more.", text: "Add a title to the collection and give another reader a reason to turn the page.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=85", tone: "from-[#202f2a]/95 via-[#202f2a]/72 to-[#202f2a]/10" },
];

export function HeroSlider() {
  return <section className="container-page pt-5 sm:pt-7"><Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 6000, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="hero-swiper overflow-hidden rounded-[26px] sm:rounded-[34px]">
    {slides.map((slide) => <SwiperSlide key={slide.title}><div className="relative flex min-h-[500px] items-center overflow-hidden bg-cover bg-center sm:min-h-[570px]" style={{ backgroundImage: `url('${slide.image}')` }}>
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.tone}`} /><div className="absolute inset-y-0 right-0 hidden w-[36%] bg-gradient-to-l from-[#dce9b8]/10 to-transparent lg:block" />
      <div className="relative z-10 max-w-2xl px-7 py-16 text-white sm:px-14 lg:px-20"><p className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#dce9b8]"><Leaf size={14} /> {slide.label}</p><h1 className="font-display whitespace-pre-line text-5xl font-bold leading-[1.03] sm:text-6xl lg:text-[76px]">{slide.title}</h1><p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base">{slide.text}</p><Link href="/books" className="button-primary mt-8 !border-[#dce9b8] !bg-[#dce9b8] !text-[#1d3c31] hover:!bg-[#c8dda0]">Browse books <ArrowRight size={16} /></Link></div>
      <div className="absolute bottom-8 right-8 hidden rounded-full border border-white/40 bg-black/15 px-4 py-2 text-xs text-white/85 backdrop-blur sm:block">01 / 03 <span className="ml-2 text-[#dce9b8]">A library for the in-between moments</span></div>
    </div></SwiperSlide>)}
  </Swiper></section>;
}
