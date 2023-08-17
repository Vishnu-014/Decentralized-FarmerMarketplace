import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { useStateContext } from '../context';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

const Product = () => {
  const navigate = useNavigate();
  const { address, contract } = useStateContext();
  const parsedProducts = [];
  const [productsList, setProductsList] = useState([]);

  const { data: getAllProducts, isLoading: getAllProductsLoading } =
    useContractRead(contract, 'getAllProducts');

  const getAllProductsArray = () => {
    const notify = toast.loading('Products Loading ...');

    if (!getAllProductsLoading) {
      for (let i = 0; i < getAllProducts.length; i++) {
        parsedProducts.push({
          productName: getAllProducts[i].productName,
          productPrice: ethers.utils.formatEther(
            getAllProducts[i].productPrice
          ),
          weight: getAllProducts[i].weight.toNumber(),
          isProductSold: getAllProducts[i].isProductSold,
          imageUrl: getAllProducts[i].imageUrl,
        });
      }
    }
    setProductsList(parsedProducts);
    toast.success('Loaded Successfully', { id: notify });
  };
  //console.log(productsList);
  useEffect(() => {
    if (!getAllProductsLoading) {
      getAllProductsArray();
    }
  }, [getAllProductsLoading]);

  let jsonObject = productsList.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return (
    <div className="w-[92vw] absolute top-20 right-0 h-[770px]">
      <h1 className="text-emerald-600 text-6xl font-semibold text-center mt-4 font-rubik">
        Products
      </h1>
      <button
        className="px-5 py-2 bg-blue-500 rounded-lg absolute top-5 right-12 z-10"
        onClick={() => getAllProductsArray()}
      >
        Refresh
      </button>

      <div className="flex flex-row flex-wrap gap-5 mt-5">
        {uniqueArray &&
          uniqueArray.map((item, index) => {
            return (
              <Link
                to="ProductDetails"
                state={{ item: item }}
                key={index}
                className=""
              >
                <div class="relative flex w-72 flex-col rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md">
                  <div class="relative mx-4 mt-4 h-52 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                      src={item.imageUrl}
                      class="h-full w-full object-cover hover:scale-75 transition-all duration-700"
                    />
                  </div>
                  <div class="p-6">
                    <div class="mb-2 flex items-center justify-between">
                      <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {item.productName}
                      </p>
                      <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {item.productPrice} ETH
                      </p>
                    </div>
                    <p class="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                      Stock(Kg): {item.weight}
                    </p>
                  </div>
                  <div class="p-6 pt-0">
                    <button
                      class="block w-full select-none rounded-lg bg-emerald-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      View
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Product;
