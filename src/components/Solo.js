import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import CardFace from './CardFace';
import Navibar from './Navibar';
import createDeck from '../utilities/game';
import { useState, useEffect } from 'react';

export default function Solo() {
  const [deck, setDeck] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    setDeck(createDeck());
    let helper = [...deck];
    let tables = helper.splice(0, 12);
    setTable([...tables]);
  }, []);

  return (
    <div>
      <Navibar />
      <Button
        onClick={() => {
          console.log(table);
        }}
      ></Button>
      <Container
        className="d-flex flex-wrap justify-content-center align-items-center mt-5"
        style={{ maxWidth: '51vh', minHeight: '50vh' }}
      >
        {table.map((card) => (
          <CardFace card={card} />
        ))}
      </Container>
    </div>
  );
}
