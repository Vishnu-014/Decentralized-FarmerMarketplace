import React from 'react';

function About() {
  return (
    <div className="flex justify-center items-center w-[92vw] absolute top-20 right-0 h-[770px] ">
      <img
        src="https://ninetheme.com/themes/html-templates/oganik/assets/images/shapes/call-shape-2-1.png"
        alt=""
        className="absolute bottom-0 left-0 -z-10 animate-imgMove transition-all duration-700 object-contain"
      />
      <div className="grid grid-cols-2 w-full m-5">
        <div>
          <img
            src="https://ninetheme.com/themes/html-templates/oganik/assets/images/shapes/leaf-1-1.png"
            alt=""
            className="w-4 h-4 object-contain"
          />
          <p className="text-gray-400 font-epilogue">Pure Organic Products</p>
          <h1 className="text-black/80 text-6xl font-bubble mt-3">
            Everyday Fresh Food
          </h1>
          <h4 className="text-gray-400 text-lg text-justify mt-3 font-epilogue">
            There are many variations of passages of available but the majority
            have suffered alteration in some form, by injected humou or words
            even slightly believable.
          </h4>
        </div>
        <div className="">
          <img
            src="https://ninetheme.com/themes/html-templates/oganik/assets/images/resources/call-2-1.png"
            alt="bg"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
