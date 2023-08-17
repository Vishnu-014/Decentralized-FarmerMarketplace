import { ethers } from 'ethers';
import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const location = useLocation();
  const { item } = location.state;

  const [productName, setProductName] = useState(item.productName);
  const [productWeight, setProductWeight] = useState(1);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState();
  const [homeAddress, setHomeAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const { address, contract } = useStateContext();
  //let weiAmount = ethers.utils.parseEther(amount.toString());

  const { data: farmerAddress, isLoading: farmerAddressLoading } =
    useContractRead(contract, 'farmer');

  const { mutateAsync: purchaseProduct, isLoading: purchaseProductLoading } =
    useContractWrite(contract, 'purchaseProduct');

  const buyHandler = async (e) => {
    e.preventDefault();
    const notify = toast.loading('Purchasing Product ...');
    console.log(+productWeight);
    try {
      const data = await purchaseProduct({
        args: [productName, +productWeight, name, phoneNo, homeAddress],
        overrides: {
          gasLimit: 1000000, // override default gas limit
          value: ethers.utils.parseEther(amount.toString()), // send 0.1 native token with the contract call
        },
      });
      console.info('contract call successs', data);
      toast.success('Purchase Successful', { id: notify });
    } catch (err) {
      toast.error('Purchase Failed', { id: notify });
      console.error('contract call failure', err);
    }
  };

  return (
    <Fragment>
      {farmerAddress === address && (
        <div className="flex items-center justify-center w-[92vw] absolute top-20 right-0 h-[770px]">
          <h1 className="text-red-500 text-6xl font-bubble">
            Farmer can't purchase their product
          </h1>
        </div>
      )}
      {farmerAddress !== address && (
        <div className="flex w-[92vw] absolute top-20 right-0 h-[770px]">
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col justify-center items-center">
              <img className="w-[500px] h-[500px]" src={item.imageUrl} alt="" />
              <p className="text-2xl text-black font-semibold font-rubik mt-5">
                Price:{' '}
                <span className="text-emerald-600">
                  {item.productPrice} ETH
                </span>
              </p>
              <p className="text-2xl text-black font-semibold font-rubik">
                Stock:{' '}
                <span className="text-emerald-600">{item.weight} Kg</span>
              </p>
            </div>

            <div className="flex flex-col mt-24 text-black mr-2">
              <h1 className="font-semibold text-6xl text-black mb-10">
                {item.productName}
              </h1>
              <form onSubmit={buyHandler} className="flex flex-col space-y-8">
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg height="30" width="30">
                    <text x="0" y="22" fill="gray">
                      Kg
                    </text>
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Weight"
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone No"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Home Address"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg height="30" width="30">
                    <text x="0" y="22" fill="gray">
                      ETH
                    </text>
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Amount ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                  Buy
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
