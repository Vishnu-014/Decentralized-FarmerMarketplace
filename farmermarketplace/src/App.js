import { Route, Routes } from 'react-router-dom';
import { ConnectWallet } from "@thirdweb-dev/react";


import Nav from './components/Nav';
import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import About from './pages/About';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import Admin from './pages/Admin';


export default function App() {
  return (
    <div className="App">
      <Nav />
      <div className='main flex'>
        <div>
          <Sidebar />
        </div>
        <div className="content  w-[100%] h-[85vh] flex relative">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Shop' element={<Product />} />
            <Route path='/Shop/ProductDetails' element={<ProductDetails />} />
            <Route path='/AddProduct' element={<AddProduct />} />
            <Route path='/Admin' element={<Admin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
