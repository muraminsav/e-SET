import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';
import { useState } from 'react';
export default function DashboardComponent() {
  return (
    <>
      <Navibar />
      <div className="d-flex align-items-center" style={{ height: '100%' }}>
        <Container>
          <Card
            style={{
              height: '50vh',
              minWidth: '25vh',
              margin: '5vh 2vh 0 -1vh',
              padding: '5px',
            }}
          >
            <Card.Body>Top Sore</Card.Body>
          </Card>
        </Container>

        <Container
          className="d-flex justify-content-around flex-column "
          style={{
            height: '50vh',
            margin: '5vh 2vh 0 -1vh',
            maxWidth: '30vh',
          }}
        >
          <Button variant="outline-secondary" href="/solo">
            Go Solo
          </Button>
          <Button variant="outline-secondary" href="/multi">
            Go Online
          </Button>
        </Container>
      </div>
    </>
  );
}
