import React from 'react';
import { Link } from 'react-router-dom';
import {
  FcHome,
  FcAbout,
  FcContacts,
  FcViewDetails,
  FcAdvertising,
  FcShipped,
  FcPrivacy,
} from 'react-icons/fc';
import { BiSolidAddToQueue, BiCartAdd } from 'react-icons/bi';
import { FaShopify } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';

function Sidebar() {
  return (
    <div className="Nav">
      <Link to="/">
        <div className="bg-emerald-600 hover:bg-[#00885c] p-2 rounded-lg">
          <FcHome className="text-[200px]" />
        </div>
      </Link>
      <Link to="/About">
        <div className="bg-emerald-600 hover:bg-[#00885c] p-2 rounded-lg">
          <FcAdvertising />
        </div>
      </Link>
      <Link to="/Shop">
        <div className="bg-emerald-600 hover:bg-[#00885c] p-2 rounded-lg">
          <FaShopify />
        </div>
      </Link>
      <Link to="/AddProduct">
        <div className="bg-emerald-600 hover:bg-[#00885c] p-2 rounded-lg">
          <FcShipped />
        </div>
      </Link>
      <Link to="/Admin">
        <div className="bg-emerald-600 hover:bg-[#00885c] p-2 rounded-lg">
          <FcPrivacy />
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
