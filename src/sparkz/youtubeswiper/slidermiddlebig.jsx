// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "./CoverflowSlider.css";
// import bird from "../../assets/airport.jpg";

// const MAX_SLIDES = 10; // Set maximum slides limit

// const CoverflowSlider = () => {
//   const [slides, setSlides] = useState([
//     { id: 1, image: bird, title: "Slide 1" },
//     { id: 2, image: bird, title: "Slide 2" },
//     { id: 3, image: bird, title: "Slide 3" },
//     { id: 4, image: bird, title: "Slide 4" },
//     { id: 5, image: bird, title: "Slide 5" },
//     { id: 6, image: bird, title: "Slide 6" },
//   ]);

//   // Function to add a new slide dynamically (only if max limit is not reached)
//   const addSlide = () => {
//     if (slides.length < MAX_SLIDES) {
//       const newId = slides.length + 1;
//       const newSlide = { id: newId, image: bird, title: `Slide ${newId}` };
//       setSlides((prevSlides) => [...prevSlides, newSlide]);
//     }
//   };

//   return (
//     <Swiper
//       effect="coverflow"
//       grabCursor={true}
//       centeredSlides={true}
//       // loop={true}
//       loopAdditionalSlides={slides.length} // Preloads extra slides
//       slidesPerView={3}
//       spaceBetween={40}
//       breakpoints={{
//         640: { slidesPerView: 2, spaceBetween: 20 },
//         768: { slidesPerView: 2, spaceBetween: 60 },
//         1024: { slidesPerView: 3, spaceBetween: 60 },
//       }}
//       //   autoplay={{
//       //     delay: 2500,
//       //     disableOnInteraction: false,
//       //     pauseOnMouseEnter: false,
//       //     stopOnLastSlide: false,
//       //   }}
//       coverflowEffect={{
//         rotate: 0,
//         stretch: 10,
//         depth: 300,
//         modifier: 1,
//         slideShadows: false,
//       }}
//       pagination={{ clickable: true }}
//       modules={[EffectCoverflow, Pagination, Autoplay]}
//       className="coverflow-slider"
//       onSlideChange={addSlide} // Adds new slide when slide changes
//     >
//       {slides.map((slide) => (
//         <SwiperSlide key={slide.id}>
//           <div className="slide-content">
//             <img src={slide.image} alt={slide.title} />
//             <h3>{slide.title}</h3>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default CoverflowSlider;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCards, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import "swiper/css/pagination";
// import "./CoverflowSlider.css"; // Add custom styles if needed
// import bird from "../../assets/bird.png";

// const CardsSlider = () => {
//   return (
//     <Swiper
//       effect="cards"
//       grabCursor={true} // Enables cursor grab effect
//       loop={true} // Enables infinite looping
//       pagination={{ clickable: true }} // Enables pagination dots
//       modules={[EffectCards, Pagination]} // Uses EffectCards module
//       className="cards-slider"
//     >
//       {[1, 2, 3, 4, 5].map((num) => (
//         <SwiperSlide key={num}>
//           <div className="card-content">
//             <img src={bird} alt={`Slide ${num}`} />
//             <h3>Slide {num}</h3>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// // export default CardsSlider;
// import React, { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-creative";
// import "swiper/css/pagination";
// import "./CoverflowSlider.css";
// import bird from "../../assets/airport.jpg";

// const MAX_SLIDES = 10;

// const CoverflowSlider = () => {
//   const [slides, setSlides] = useState([
//     { id: 1, image: bird, title: "Slide 1" },
//     { id: 2, image: bird, title: "Slide 2" },
//     { id: 3, image: bird, title: "Slide 3" },
//     { id: 4, image: bird, title: "Slide 4" },
//     { id: 5, image: bird, title: "Slide 5" },
//     { id: 6, image: bird, title: "Slide 6" },
//   ]);

//   const swiperRef = useRef(null);

//   const addSlide = () => {
//     if (slides.length < MAX_SLIDES) {
//       const newId = slides.length + 1;
//       const newSlide = { id: newId, image: bird, title: `Slide ${newId}` };
//       setSlides((prevSlides) => [...prevSlides, newSlide]);
//     }
//   };

//   return (
//     <Swiper
//       effect="creative"
//       grabCursor={true}
//       centeredSlides={true}
//       loop={true}
//       slidesPerView={5}
//       spaceBetween={20}
//       autoplay={{
//         delay: 2000,
//         disableOnInteraction: false,
//       }}
//       pagination={{ clickable: true }}
//       modules={[EffectCreative, Pagination, Autoplay]}
//       className="coverflow-slider"
//       onSwiper={(swiper) => {
//         swiperRef.current = swiper;
//       }}
//       onSlideChange={addSlide}
//       creativeEffect={{
//         prev: {
//           translate: ["-100%", 0, -300], // Moves previous slides left
//           rotate: [0, 0, 0], // Small tilt
//         },
//         next: {
//           translate: ["100%", 0, -300], // Moves next slides right
//           rotate: [0, 0, 0], // Small tilt
//         },
//         shadow: true, // Adds shadow effect
//       }}
//       breakpoints={{
//         640: { slidesPerView: 2, spaceBetween: 10 },
//         768: { slidesPerView: 3, spaceBetween: 60 },
//         1024: { slidesPerView: 5, spaceBetween: 60 },
//       }}
//     >
//       {slides.map((slide) => (
//         <SwiperSlide key={slide.id}>
//           <div className="slide-content">
//             <img src={slide.image} alt={slide.title} />
//             <h3>{slide.title}</h3>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default CoverflowSlider;

// import React, { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-creative";
// import "swiper/css/pagination";
// import "./CoverflowSlider.css";
// import bird from "../../assets/airport.jpg";

// const MAX_SLIDES = 10;

// const CoverflowSlider = () => {
//   const [slides, setSlides] = useState([
//     { id: 1, image: bird, title: "Slide 1" },
//     { id: 2, image: bird, title: "Slide 2" },
//     { id: 3, image: bird, title: "Slide 3" },
//     { id: 4, image: bird, title: "Slide 4" },
//     { id: 5, image: bird, title: "Slide 5" },
//     { id: 6, image: bird, title: "Slide 6" },
//   ]);

//   const swiperRef = useRef(null);

//   const addSlide = () => {
//     if (slides.length < MAX_SLIDES) {
//       const newId = slides.length + 1;
//       const newSlide = { id: newId, image: bird, title: `Slide ${newId}` };
//       setSlides((prevSlides) => [...prevSlides, newSlide]);
//     }
//   };

//   return (
//     <Swiper
//       effect="creative"
//       grabCursor={true}
//       centeredSlides={true}
//       loop={true}
//       slidesPerView={5}
//       spaceBetween={20}
//       autoplay={{
//         delay: 2000,
//         disableOnInteraction: false,
//       }}
//       pagination={{ clickable: true }}
//       modules={[EffectCreative, Pagination, Autoplay]}
//       className="coverflow-slider"
//       onSwiper={(swiper) => {
//         swiperRef.current = swiper;
//       }}
//       onSlideChange={addSlide}
//       creativeEffect={{
//         prev: {
//           translate: ["-100%", 0, -300], // Moves previous slides left
//           rotate: [0, 0, 0], // Small tilt
//         },
//         next: {
//           translate: ["100%", 0, -300], // Moves next slides right
//           rotate: [0, 0, 0], // Small tilt
//         },
//         shadow: true, // Adds shadow effect
//       }}
//       breakpoints={{
//         640: { slidesPerView: 2, spaceBetween: 10 },
//         768: { slidesPerView: 3, spaceBetween: 60 },
//         1024: { slidesPerView: 5, spaceBetween: 60 },
//       }}
//     >
//       {slides.map((slide) => (
//         <SwiperSlide key={slide.id}>
//           <div className="slide-content">
//             <img src={slide.image} alt={slide.title} />
//             <h3>{slide.title}</h3>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// // export default CoverflowSlider;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// const CoverflowSlider = () => {
//   return (
//     <div className="w-full max-w-screen-xl mx-auto py-10">
//       <Swiper
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         loop={true}
//         initialSlide={1}
//         spaceBetween={30}
//         slidesPerView={4}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: -29,
//           depth: 100,
//           modifier: 3,
//           slideShadows: true,
//         }}
//         pagination={{ clickable: true }}
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper"
//       >
//         {Array.from({ length: 9 }).map((_, index) => (
//           <SwiperSlide
//             key={index}
//             className=" bg-black rounded-xl overflow-hidden"
//           >
//             <img
//               src={`https://swiperjs.com/demos/images/nature-${index + 1}.jpg`}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-44 object-cover rounded-lg shadow-md"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CoverflowSlider;
// // rotate: 0,
// // stretch: 50,
// // depth: 100,
// // modifier: 4,
// // slideShadows: true,

// // coverflowEffect={{
// //     rotate: 0,
// //     stretch: -10,
// //     depth: 100,
// //     modifier: 3,
// //     slideShadows: true,
// //   }}
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CoverflowSlider = () => {
  const slides = Array.from({ length: 9 }).map((_, index) => ({
    id: index,
    image: `https://swiperjs.com/demos/images/nature-${(index % 9) + 1}.jpg`,
  }));

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, []);

  return (
    <div className="relative mt-96">
      <div className="w-full max-w-screen-xl mx-auto py-10">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          // centeredSlides={true}
          loop={true} // Enables looping
          initialSlide={3}
          spaceBetween={30}
          slidesPerView={5}
          autoplay={{
            delay: 2000, // Adjust speed of looping
            disableOnInteraction: true, // Continue autoplay after manual interaction
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -52,
            depth: 100,
            modifier: 4,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="bg-black rounded-xl overflow-hidden"
            >
              <img
                src={slide.image}
                alt={`Slide ${slide.id + 1}`}
                className="w-full h-44 object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>{" "}
    </div>
  );
};

export default CoverflowSlider;
