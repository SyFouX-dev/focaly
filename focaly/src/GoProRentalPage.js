import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './GoProRentalPage.css';
import hero11Img from './img/gopro-hero11.png';
import hero12Img from './img/gopro-hero12.png';
import dronImg from './img/dron.png';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import ProductRecommendations from './ProductRecommendations';
import { FaTruck, FaShieldAlt, FaClock, FaStar } from 'react-icons/fa';
import NavigationBar from './NavigationBar';

const GoProRentalPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedModel, setSelectedModel] = useState('Hero 12');
    const [selectedInsurance, setSelectedInsurance] = useState('Aucune');
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [accessories, setAccessories] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [cartItems] = useState([]);

    const models = {
        'Hero 11': { price: 5, image: hero11Img },
        'Hero 12': { price: 10, image: hero12Img }
    };

    const insurances = {
        'Aucune': 0,
        'Assurance de base': 5,
        'Assurance complète': 10
    };

    const calculateTotalPrice = useCallback(() => {
        if (!startDate || !endDate) return 0;

        const differenceInMillis = endDate - startDate;
        const days = Math.max(0, Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24)));

        if (days < 4) {
            setError('La durée minimale de location est de 4 jours.');
            return 0;
        } else {
            setError('');
            return days * models[selectedModel].price + insurances[selectedInsurance];
        }
    }, [startDate, endDate, selectedModel, selectedInsurance, models, insurances]);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [calculateTotalPrice]);

    useEffect(() => {
        const fetchAccessories = () => {
            const availableAccessories = [
                { name: 'Monopode', price: 3, image: 'Monopode.png' },
                { name: 'Boîtier étanche', price: 4, image: 'path_to_waterproof_case_image' },
                { name: 'Chargeur supplémentaire', price: 2, image: 'path_to_extra_charger_image' }
            ];
            setAccessories(availableAccessories);
        };
        
        fetchAccessories();
    }, [selectedModel]);

    useEffect(() => {
        const fetchRecommendations = () => {
            const recommendedProducts = [
                { name: 'Drone', price: 15, image: dronImg }
            ];
            setRecommendations(recommendedProducts);
        };
        
        fetchRecommendations();
    }, [selectedModel]);

    const handleModelChange = (event) => {
        const model = event.target.value;
        setSelectedModel(model);
    };

    const handleInsuranceChange = (event) => {
        const insurance = event.target.value;
        setSelectedInsurance(insurance);
    };

    const handleReserve = () => {
        toast.success('Réservation effectuée avec succès !');
    };

    return (
        <>
            <NavigationBar cartItems={cartItems} />
            <Container>
                <Row className="mt-5">
                    <Col md={6}>
                        <Card className="shadow-sm rounded">
                            <Card.Img variant="top" src={models[selectedModel].image} />
                            <Card.Body>
                                <Card.Title>{selectedModel}</Card.Title>
                                <Card.Text>
                                    Chez Focaly, vous recevez votre location chez vous 48h avant votre premier jour de location !
                                </Card.Text>
                                <Button variant="primary" className="mt-2" onClick={handleReserve}>
                                    Louer maintenant
                                </Button>
                            </Card.Body>
                        </Card>

                        {/* Section Recommandations sous le produit */}
                        <div className="mt-4">
                            <ProductRecommendations recommendations={recommendations} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <Form>
                            <Form.Group controlId="formBasicSelect">
                                <Form.Label>Sélectionner le modèle GoPro</Form.Label>
                                <Form.Control as="select" value={selectedModel} onChange={handleModelChange}>
                                    <option value="Hero 11">GoPro Hero 11 - 5€/jour</option>
                                    <option value="Hero 12">GoPro Hero 12 - 10€/jour</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Sélectionner la date de début</Form.Label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Choisir une date"
                                    locale={fr}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Sélectionner la date de fin</Form.Label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Choisir une date"
                                    locale={fr}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Sélectionner l'assurance</Form.Label>
                                <Form.Control as="select" value={selectedInsurance} onChange={handleInsuranceChange}>
                                    {Object.keys(insurances).map((insurance) => (
                                        <option key={insurance} value={insurance}>
                                            {insurance} - €{insurances[insurance]}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            {error && (
                                <div className="mt-3 text-danger">
                                    {error}
                                </div>
                            )}
                            <Form.Group className="mt-3">
                                <Form.Label>Prix total</Form.Label>
                                <Form.Control type="text" value={`€${totalPrice}`} readOnly />
                            </Form.Group>

                            <Row className="mt-4">
                                <Col>
                                    <h4>Accessoires disponibles</h4>
                                    <div className="accessories-list">
                                        {accessories.map((accessory) => (
                                            <Card key={accessory.name} className="mb-3">
                                                <Card.Img variant="top" src={accessory.image} />
                                                <Card.Body>
                                                    <Card.Title>{accessory.name}</Card.Title>
                                                    <Card.Text>
                                                        €{accessory.price} par jour
                                                    </Card.Text>
                                                    <Button variant="primary">Ajouter au panier</Button>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <div className="features">
                            <div className="feature-item">
                                <FaTruck size={24} color="#0b7fc2" />
                                <h5 className="mt-2">Livraison Gratuite</h5>
                                <p>Pour toute commande de plus de 50€.</p>
                            </div>
                            <div className="feature-item">
                                <FaShieldAlt size={24} color="#0b7fc2" />
                                <h5 className="mt-2">Sécurité Garantie</h5>
                                <p>Vos informations sont protégées.</p>
                            </div>
                            <div className="feature-item">
                                <FaClock size={24} color="#0b7fc2" />
                                <h5 className="mt-2">Disponibilité 24/7</h5>
                                <p>Service client disponible en tout temps.</p>
                            </div>
                            <div className="feature-item">
                                <FaStar size={24} color="#0b7fc2" />
                                <h5 className="mt-2">Avis Clients</h5>
                                <p>Des avis positifs de nos clients satisfaits.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default GoProRentalPage;
