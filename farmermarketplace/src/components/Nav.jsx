import React from 'react';
import logo from '../assets/logo.png';
import { useStateContext } from '../context';
import { useDisconnect } from '@thirdweb-dev/react';

const Nav = () => {
  const { connect, address } = useStateContext();
  const disconnect = useDisconnect();

  return (
    <div className="w-full h-16 bg-[#f0f0f0] absolute top-0 right-0 left-0 flex flex-row items-center justify-between p-10 z-20">
      <div className="flex flex-row justify-center items-center gap-5">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-[#464646] font-medium font-epilogue">
          User :{' '}
          <span className="text-[#289e65]">
            {address && address.substring(0, 5)}...
            {address && address.substring(address.length, address.length - 5)}
          </span>
        </p>
      </div>

      <div className="flex flex-row gap-7 z-10">
        <button
          className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg text-white font-rubik"
          onClick={() => connect()}
        >
          {address ? 'Connected' : 'Connect'}
        </button>
        <button
          className="bg-pink-600 hover:bg-pink-500 px-3 py-2 rounded-lg text-white font-rubik"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Nav;
