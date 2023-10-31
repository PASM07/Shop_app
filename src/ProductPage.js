import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Image } from 'antd';

const ProductPage = ({ products }) => {
  const { title } = useParams();
  
  const product = products.find(p => p.title.toLowerCase() === title.replace(/_/g, ' ').toLowerCase());

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row gutter={16}>
        <Col span={10}>
          <Card 
            style={{ width: '100%' }} 
            cover={<Image width={'100%'} alt={product.title} src={product.thumbnail} />}
          />
        </Col>
        <Col span={14}>
          <Card 
            style={{ width: 300 }} 
            title={product.title}
          >
            <p>Бренд: {product.brand}</p>
            <p>Количество на складе: {product.stock}</p>
            <p>Рейтинг: {product.rating}</p>
            <p>Скидка: {product.discountPercentage}%</p>
          </Card>
          <Card 
            style={{ width: 300, marginTop: 16 }} 
            title="Цена"
          >
            ${product.price}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
