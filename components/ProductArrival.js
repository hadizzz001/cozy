'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard from './CarCard';
import { useRouter } from 'next/navigation';

const YourComponent = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [productsBySub, setProductsBySub] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prodRes = await fetch('/api/products', { cache: 'no-store' });
      const products = await prodRes.json();

      const subRes = await fetch('/api/sub', { cache: 'no-store' });
      const subs = await subRes.json();

      const sortedSubs = subs.sort((a, b) => {
        if (a.sort === undefined) return 1;
        if (b.sort === undefined) return -1;
        return a.sort - b.sort;
      });

      const filteredProducts = {};
      sortedSubs.forEach((sub) => {
        const subProducts = products.filter((p) => p.sub === sub.name);
        if (subProducts.length > 0) {
          filteredProducts[sub.name] = subProducts;
        }
      });

      const subsWithProducts = sortedSubs
        .filter((sub) => filteredProducts[sub.name])
        .slice(0, 5);

      setSubCategories(subsWithProducts);
      setProductsBySub(filteredProducts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
{subCategories.map((sub, index) => (
  <div
    key={sub._id}
    className={`slider-row ${index % 2 === 0 ? 'row-gray' : 'row-white'} relative`}
  >
    <h2 className="text-left my-6 px-4 myGrayCat11">
      {sub.name}
    </h2>

    {/* Slider */}
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop
        breakpoints={{
          150: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
      >
        {productsBySub[sub.name].map((product) => (
          <SwiperSlide key={product._id}>
            <CarCard temp={product} />
          </SwiperSlide>
        ))}
      </Swiper>

{/* Shop All Button UNDER slider */}
<div className="flex justify-center mt-6">
  <button
    className="myinsidebtn"
    onClick={() =>
      router.push(`/search?sub=${encodeURIComponent(sub.name)}`)
    }
  >
    Shop All
  </button>
</div>

    </div>
  </div>
))}

    </div>
  );
};

export default YourComponent;
