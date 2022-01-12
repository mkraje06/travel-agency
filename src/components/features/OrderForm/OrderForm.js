import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';


const OrderForm = (tripCost, options) => (
    <Grid>
        <Row>
            <Col xs={12}>
                <OrderSummary tripCost={tripCost} tripOptions={options}/>
            </Col>
        </Row>
    </Grid>
);

export default OrderForm;