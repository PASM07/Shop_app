import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from "antd";
import axios from 'axios';
const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
  
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
  
    return (
        <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.imageUrl} />}
            >
              <Card.Meta title={product.name} description={`Цена: ${product.price} руб.`} />
            </Card>
          </Col>
          <Col span={16}>
            <Card title="Описание товара">
              <p>{product.description}</p>
              <p><strong>Бренд:</strong> {product.brand}</p>
              <p><strong>Рейтинг:</strong> {product.rating}</p>
              <p><strong>Количество на складе:</strong> {product.stock}</p>
              // Добавьте другую нужную информацию
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default ProductPage;
  
