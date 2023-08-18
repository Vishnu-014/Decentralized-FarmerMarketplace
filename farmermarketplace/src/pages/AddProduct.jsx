import React, { Fragment, useState } from 'react';
import { useStateContext } from '../context';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const { address, contract } = useStateContext();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [updateProductName, setUpdateProductName] = useState('');
  const [updateProductPrice, setUpdateProductPrice] = useState();

  const { data: farmerAddress, isLoading: farmerAddressLoading } =
    useContractRead(contract, 'farmer');

  const { mutateAsync: addProduct, isLoading: addProductLoading } =
    useContractWrite(contract, 'addProduct');
  const addProductHandler = async () => {
    const notify = toast.loading('Adding Product ...');
    try {
      const data = await addProduct({
        args: [productName, +productPrice, +stock, imageUrl],
      });
      console.info('contract call successs', data);
      toast.success('Product Added Successfully', { id: notify });
    } catch (err) {
      toast.error('Failed to add product', { id: notify });
      console.error('contract call failure', err);
    }
  };

  // Update price
  const {
    mutateAsync: updateProductPriceFunc,
    isLoading: updateProductPriceLoading,
  } = useContractWrite(contract, 'updateProductPrice');

  const updateProductHandler = async () => {
    const notify = toast.loading('Updating Product Price...');
    try {
      const data = await updateProductPriceFunc({
        args: [updateProductName, updateProductPrice],
      });
      console.info('contract call successs', data);
      toast.success('Product Updated Successfully', { id: notify });
    } catch (err) {
      toast.error('Failed to update product', { id: notify });
      console.error('contract call failure', err);
    }
  };

  return (
    <Fragment>
      {farmerAddress !== address && (
        <div className="flex items-center justify-center w-[92vw] absolute top-20 right-0 h-[770px]">
          <h1 className="dark:bg-gray-800 px-4 py-2 rounded-lg text-6xl font-bubble">
            Only Farmer can add Products
          </h1>
        </div>
      )}
      {farmerAddress === address && (
        <div className="flex w-[92vw] absolute top-10 right-0 h-[770px]">
          <div className="grid grid-cols-2 w-full">
            <div className="bg-white">
              <div className="min-h-[90vh] bg-white py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                  <div className="relative px-4 py-10 bg-[#fbfbfb] shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                      <div>
                        <h1 className="text-2xl text-black font-semibold">
                          Add Product for sales
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Product Name"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Product Name
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Product Price"
                              value={productPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Prodcut Price in WEI
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Stock in Kg"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Stock Kg
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Image URL"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Image URL
                            </label>
                          </div>

                          <div className="relative">
                            <button
                              onClick={addProductHandler}
                              className="bg-blue-500 text-white rounded-md px-2 py-1"
                            >
                              Add Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Down */}
            <div className="bg-white">
              <div className="min-h-[90vh] bg-white py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                  <div className="relative px-4 py-10 bg-[#fbfbfb] shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                      <div>
                        <h1 className="text-2xl text-black font-semibold">
                          Update Product Price
                        </h1>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Product Name"
                              value={updateProductName}
                              onChange={(e) =>
                                setUpdateProductName(e.target.value)
                              }
                            />
                            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Product Name
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Product New Price"
                              value={updateProductPrice}
                              onChange={(e) =>
                                setUpdateProductPrice(e.target.value)
                              }
                            />
                            <label
                              htmlFor="password"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              New Price in WEI
                            </label>
                          </div>
                          <div className="relative">
                            <button
                              onClick={updateProductHandler}
                              className="bg-blue-500 text-white rounded-md px-2 py-1"
                            >
                              Update Price
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddProduct;
