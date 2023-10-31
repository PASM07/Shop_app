import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductTable from './ProductTable';
import ProductPage from './ProductPage';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=100')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  return (
    <Router>
      <div>
      <h1><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>E-Shop</Link></h1>
        <Routes>
        <Route path="/" element={<ProductTable products={products} />} />
        <Route path="/products/:title" element={<ProductPage products={products} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
