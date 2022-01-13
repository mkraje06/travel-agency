import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import { OrderOption } from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';


const OrderForm = ({ tripCost, options, setOrderOption }) => (
    <Grid>
        <Row>
            {pricing.map((option) => (
                <Col md={4} key={option.id}>
                    <OrderOption
                    {...option}
                    currentValue={options[option.id]}
                    setOrderOption={setOrderOption}
                    />
                </Col>
            ))}
            <Col xs={12}>
                <OrderSummary tripCost={tripCost} tripOptions={options} />
            </Col>
        </Row>
    </Grid>
);

export default OrderForm;