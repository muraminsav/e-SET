import React from 'react';
import { Card } from 'react-bootstrap';
import '../utilities/card.css';

export default function CardFace(props) {
  const cardContent = (card) => {
    let content = [];
    for (let i = 0; i < card.count; i++) {
      content.push(
        <div className={`${card.shape} ${card.shade + card.color}`}></div>
      );
    }
    return content;
  };
  return (
    <Card className="cardF d-flex align-items-center justify-content-center justify-content-around">
      {cardContent(props.card)}
    </Card>
  );
}
