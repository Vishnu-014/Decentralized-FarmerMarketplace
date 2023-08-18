import React, { Fragment, useState } from 'react';
import { useStateContext } from '../context';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

const Admin = () => {
  const { address, contract } = useStateContext();
  const [productName, setProductName] = useState('');
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [availProductQty, setAvailProductQty] = useState('');
  const [totalItems, setTotalItems] = useState('');
  const [sold, setSold] = useState('');
  const [unsold, setUnsold] = useState('');

  const { data: farmerAddress, isLoading: farmerAddressLoading } =
    useContractRead(contract, 'farmer');

  // Farmer Balance
  const { data: farmerBalance, isLoading: farmerBalanceLoading } =
    useContractRead(contract, 'getFarmerBalance');

  // Withdraw
  const {
    mutateAsync: withdrawFarmerBalance,
    isLoading: withdrawFarmerBalanceLoading,
  } = useContractWrite(contract, 'withdrawFarmerBalance');

  const withdrawHandler = async () => {
    const notify = toast.loading('Processing Withdraw ...');
    try {
      const data = await withdrawFarmerBalance({ args: [] });
      console.info('contract call successs', data);
      toast.success('Withdraw Successful', { id: notify });
    } catch (err) {
      toast.error('Withdraw Failed', { id: notify });
      console.error('contract call failure', err);
    }
  };

  const {
    data: getProductPurchaseDetails,
    isLoading: getProductPurchaseDetailsL,
  } = useContractRead(contract, 'getProductPurchaseDetails', [productName]);

  const getPurchase = () => {
    if (productName !== '' && !getProductPurchaseDetailsL) {
      let parsedProducts = [];
      for (let i = 0; i < getProductPurchaseDetails.length; i++) {
        parsedProducts.push({
          userAddress: getProductPurchaseDetails[i].buyer,
          userName: getProductPurchaseDetails[i].username,
          weight: getProductPurchaseDetails[i].purchaseWeight.toNumber(),
          userPhoneno: getProductPurchaseDetails[i].phoneNumber,
          deliveryAddress: getProductPurchaseDetails[i].buyerAddress,
        });
      }
      setPurchaseDetails(parsedProducts);
    }
  };

  const {
    data: getAvailableProductQuantity,
    isLoading: getAvailableProductQuantityL,
  } = useContractRead(contract, 'getAvailableProductQuantity', [productName]);
  const getProductQty = () => {
    if (productName !== '' && !getAvailableProductQuantityL) {
      setAvailProductQty(getAvailableProductQuantity);
    }
  };

  const { data: getTotalProducts, isLoading: getTotalProductsL } =
    useContractRead(contract, 'getTotalProducts');
  const getTotalProductsItem = () => {
    if (!getTotalProductsL) {
      setTotalItems(getTotalProducts);
    }
  };

  const { data: getTotalSoldProducts, isLoading: getTotalSoldProductsL } =
    useContractRead(contract, 'getTotalSoldProducts');
  const getSold = () => {
    if (!getTotalSoldProductsL) {
      setSold(getTotalSoldProducts);
    }
  };

  const { data: getTotalUnsoldProducts, isLoading: getTotalUnsoldProductsL } =
    useContractRead(contract, 'getTotalUnsoldProducts');
  const getUnsold = () => {
    if (!getTotalUnsoldProductsL) {
      setUnsold(getTotalUnsoldProducts);
    }
  };

  return (
    <Fragment>
      {farmerAddress !== address && (
        <div className="flex items-center justify-center w-[92vw] absolute top-20 right-0 h-[770px]">
          <h1 className="dark:bg-gray-800 px-4 py-2 rounded-lg text-6xl font-bubble">
            Only Farmer Can Access
          </h1>
        </div>
      )}
      {farmerAddress === address && (
        <div className="flex flex-col w-[92vw] absolute top-20 right-0 h-[770px] p-5">
          <div className="flex flex-row w-full justify-between mt-10">
            <h1 className="text-black font-rubik font-semibold text-xl">
              Farmer Address:{' '}
              <span className="text-emerald-500">{farmerAddress}</span>
            </h1>
            <div className="flex flex-row items-center">
              <h1 className="text-black font-rubik font-semibold text-xl mr-5">
                Farmer Balance:{' '}
                <span className="text-emerald-500">
                  {farmerBalance?.toNumber() / 1e18 + ' '}
                  {/* {ethers.utils.formatEther(
                    farmerBalance?.toNumber()?.toString()
                  )} */}
                </span>
                ETH
              </h1>
              <button
                onClick={withdrawHandler}
                className="bg-teal-600 px-6 py-2 rounded-lg font-rubik"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* <h1 className="text-xl text-emerald-600 font-rubik font-semibold">
        Get Purchase Details
      </h1> */}
          <br />
          <div className="flex flex-row gap-5 justify-between">
            <div className="space-x-4">
              <input
                placeholder="Product Name"
                className="peer h-full w-[250px] border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 first-line:text-sm text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-teal-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:text-emerald-500 text-black font-rubik font-medium"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <button
                className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-rubik text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getPurchase}
              >
                Get Purcahse Details
              </button>
              <button
                class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-rubik text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getProductQty}
              >
                Get Product Qty : {availProductQty?.toString()}
              </button>
            </div>
            <div className="space-x-4">
              <button
                className="middle none center rounded-lg bg-green-500 py-3 px-6 font-rubik text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getTotalProductsItem}
              >
                Get Total Products : {totalItems?.toString()}
              </button>
              <button
                className="middle none center rounded-lg bg-purple-500 py-3 px-6 font-rubik text-xs font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getSold}
              >
                Get Sold Products : {sold?.toString()}
              </button>
              <button
                className="middle none center rounded-lg bg-purple-500 py-3 px-6 font-rubik text-xs font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={getUnsold}
              >
                Get Unsold Products : {unsold?.toString()}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full mt-10 font-epilogue">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          User Address
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Weight in (Kg)
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Phone Number
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Delivery Address
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseDetails.length === 0 && (
                        <td
                          colSpan="6"
                          className="text-sm text-gray-900 text-center font-rubik px-6 py-4 whitespace-nowrap "
                        >
                          No Purchase found
                        </td>
                      )}
                      {purchaseDetails.length >= 1 &&
                        purchaseDetails.map((item, index) => {
                          return (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                              } border-b`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.userAddress}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.userName}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.weight}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.userPhoneno}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.deliveryAddress}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Admin;
