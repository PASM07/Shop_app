import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <h1>E-Shop</h1>
        <Routes>
          <Route path="/" element={<ProductTable products={products} />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
