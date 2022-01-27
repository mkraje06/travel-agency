import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import { OrderOption } from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import PropTypes from 'prop-types';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};


const OrderForm = ({ tripCost, options, setOrderOption,  tripName, countryCode }) => (
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
        <Button onClick={() => sendOrder(options, tripCost, tripName, countryCode)}>Order now!</Button>
    </Grid>
);

OrderForm.propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.node,
    setOrderOption: PropTypes.node,
    tripName: PropTypes.string,
    countryCode: PropTypes.string,
};

export default OrderForm;