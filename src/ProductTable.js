import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Input, Table } from "antd";
import { useParams } from 'react-router-dom';
import axios from 'axios';



const { Search } = Input;
const { Option } = Select;

const ProductTable = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о товаре", error);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortValue = params.get('sort');
    if (sortValue) {
      handleSortChange(sortValue);
    }
  }, []);

  const setQuery = (name, value) => {
    let params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    window.history.pushState(null, '', "?" + params.toString());
  };

  const handleSortChange = (value) => {
    let sorted = [...products];
    switch (value) {
      case "name_asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "brand_asc":
        sorted.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "brand_desc":
        sorted.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "discount_asc":
        sorted.sort((a, b) => a.discountPercentage - b.discountPercentage);
        break;
      case "discount_desc":
        sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case "rating_asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "rating_desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "stock_asc":
        sorted.sort((a, b) => a.stock - b.stock);
        break;
      case "stock_desc":
        sorted.sort((a, b) => b.stock - a.stock);
    }
    setSortedProducts(sorted);
    setQuery('sort', value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(search)
  );

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/products/${record.title.replace(/\s+/g, '_').toLowerCase()}`}>{text}</Link>,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Бренд",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Рейтинг",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Количество на складе",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Размер скидки",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Картинка",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: "200px" }} />
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Поиск по названию"
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <Select
        defaultValue="Выберите сортировку"
        style={{ width: 200, marginBottom: 16 }}
        onChange={handleSortChange}
      >
        <Option value="name_asc">Название (A - Z)</Option>
        <Option value="name_desc">Название (Z - A)</Option>
        <Option value="brand_asc">Бренд (A - Z)</Option>
        <Option value="brand_desc">Бренд (Z - A)</Option>
        <Option value="price_asc">Цена (по возрастанию)</Option>
        <Option value="price_desc">Цена (по убыванию)</Option>
        <Option value="discount_asc">Скидка (по возрастанию)</Option>
        <Option value="discount_desc">Скидка (по убыванию)</Option>
        <Option value="rating_asc">Рейтинг (по возрастанию)</Option>
        <Option value="rating_desc">Рейтинг (по убыванию)</Option>
        <Option value="stock_asc">Количество на складе (по возрастанию)</Option>
        <Option value="stock_desc">Количество на складе (по убыванию)</Option>
      </Select>
      <Table dataSource={filteredProducts} columns={columns} rowKey="id" />
    </>
  );
};

export default ProductTable;
