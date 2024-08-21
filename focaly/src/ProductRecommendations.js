import React from 'react';
import { Card, Button } from 'react-bootstrap';
import dronImg from './img/dron.png'; 

const ProductRecommendations = ({ recommendations }) => {
    return (
        <div className="product-recommendations">
            <h3>Recommandations pour Vous</h3>
            <div className="recommendations-list">
                {recommendations.map((product, index) => (
                    <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                Prix: €{product.price}
                            </Card.Text>
                            <Button variant="primary">Voir Détails</Button>
                        </Card.Body>
                    </Card>
                ))}
                <Card style={{ width: '18rem', margin: '10px' }}>
                    <Card.Img variant="top" src={dronImg} />
                    <Card.Body>
                        <Card.Title>Drone</Card.Title>
                        <Card.Text>
                            Prix: €15
                        </Card.Text>
                        <Button variant="primary">Voir Détails</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default ProductRecommendations;
