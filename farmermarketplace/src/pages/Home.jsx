import React from 'react';
import Tomato from '../assets/tomato.png';
import bg from '../assets/bgg.png';
//import bg from '../assets/vgback.jpg';

function Home() {
  return (
    <div>
      <div className="z-20">
        <div className=" absolute top-72 left-64 w-[400px] h-[200px] text-[130px] leading-[120px] text-[#539165] font-semibold transition-all duration-500">
          <span className="font-bubble animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Organic
          </span>
          <br />
          <span className="font-bubble animate-text bg-gradient-to-r from-green-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent transition-all duration-500">
            FoodMarket
          </span>
        </div>
      </div>
      <div>
        <img
          className=" w-[100vw] h-[100vh] object-cover absolute top-0 left-0 z-[-100]"
          src={bg}
          alt=""
          srcset=""
        />
        <img
          src={Tomato}
          alt=""
          className="absolute bottom-0 right-[540px] w-20 h-20 animate-bounce duration-700 transition-all"
        />
      </div>
    </div>
  );
}

export default Home;
