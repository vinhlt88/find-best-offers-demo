import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function App() {
  const [same_bank_enabled, setsame_bank_enabled] = useState(true);
  const [same_bank_weight, setsame_bank_weight] = useState(3.0);

  const [online_or_auto_enabled, setonline_or_auto_enabled] = useState(true);
  const [online_or_auto_weight, setonline_or_auto_weight] = useState(10);

  const [least_total_amount_enabled, setleast_total_amount_enabled] = useState(true);
  const [least_total_amount_weight, setleast_total_amount_weight] = useState(0.1);

  const [trading_volume_portion_enabled, settrading_volume_portion_enabled] = useState(true);
  const [trading_volume_portion_weight, settrading_volume_portion_weight] = useState(50);

  const [released_rate_enabled, setreleased_rate_enabled] = useState(true);
  const [released_rate_weight, setreleased_rate_weight] = useState(10);

  const [completion_time_block_in_seconds_enabled, setcompletion_time_block_in_seconds_enabled] = useState(true);
  const [completion_time_block_in_seconds_weight, setcompletion_time_block_in_seconds_weight] = useState(30);

  const [deprioritize_offer_has_cancelled_enabled, setdeprioritize_offer_has_cancelled_enabled] = useState(true);
  const [deprioritize_offer_has_cancelled_weight, setdeprioritize_offer_has_cancelled_weight] = useState(-100);
  const [deprioritize_offer_has_cancelled_within_hours, setdeprioritize_offer_has_cancelled_within_hours] = useState(24);

  const [least_disputed_rate_enabled, setleast_disputed_rate_enabled] = useState(true);
  const [least_disputed_rate_weight, setleast_disputed_rate_weight] = useState(-10);
  const [least_disputed_rate_within_hours, setleast_disputed_rate_within_hours] = useState(24);

  const [taker_fiat_trading_amount_enabled, settaker_fiat_trading_amount_enabled] = useState(true);
  const [taker_fiat_trading_amount_weight, settaker_fiat_trading_amount_weight] = useState(-10);
  const [taker_fiat_trading_amount_within_hours, settaker_fiat_trading_amount_within_hours] = useState(24);

  const [effective_max_amount_enabled, seteffective_max_amount_enabled] = useState(true);
  const [effective_max_amount_weight, seteffective_max_amount_weight] = useState(0);
  const [effective_max_amount_within_hours, seteffective_max_amount_within_hours] = useState(500000000);

  const renderElementWithWeightOnly = (name, enable, setEnableFunc, weight, setWeightFunc) => {
    return (
      <Row>
        <Col >
          <input type="checkbox" checked={enable} onChange={ e => setEnableFunc(e.target.checked)}/>
          <lablel>&emsp;{name}</lablel>
        </Col>
        <Col xs={8}>
          <input type="text" className="form-control" value={weight} onChange={e => setWeightFunc(e.target.value)}/>
        </Col>
      </Row>
    )
  };

  const renderElementWithWeightAndExtra = (name, enable, setEnableFunc, weight, setWeightFunc, extra_name, extra_value, extraSetFunc) => {
    return (
      <Form>
        <Row>
          <Col >
            <input type="checkbox" checked={enable} onChange={ e => setEnableFunc(e.target.checked)}/>
            <lablel>&ensp;{name}</lablel>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <lablel>&nbsp;&emsp;weight:</lablel>
          </Col>
          <Col xs={8}>
            <input type="text" className="form-control" value={weight} onChange={e => setWeightFunc(e.target.value)}/>
          </Col>
        </Row>  
        <br />
        <Row>
          <Col>
            <lablel>&nbsp;&emsp;{extra_name}:</lablel>
          </Col>
          <Col xs={8}>
          <input type="text" className="form-control" value={extra_value} onChange={e => extraSetFunc(e.target.value)}/>
          </Col>
        </Row>  
      </Form>
    )
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <br />
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="secondary"
      >
        Click here
      </Button>

      <Collapse in={open}>
        <Form>
          <br />
          <Row>
            {renderElementWithWeightOnly("same_bank", same_bank_enabled, setsame_bank_enabled, same_bank_weight, setsame_bank_weight)}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightOnly("online_or_auto", online_or_auto_enabled, setonline_or_auto_enabled, online_or_auto_weight, setonline_or_auto_weight)}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightOnly("least_total_amount", least_total_amount_enabled, setleast_total_amount_enabled, least_total_amount_weight, setleast_total_amount_weight)}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightOnly("trading_volume_portion", trading_volume_portion_enabled, settrading_volume_portion_enabled, trading_volume_portion_weight, settrading_volume_portion_weight)}
          </Row>
          <br />
          
          <Row>
            {renderElementWithWeightOnly("released_rate", released_rate_enabled, setreleased_rate_enabled, released_rate_weight, setreleased_rate_weight)}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightOnly("completion_time_block_in_seconds", completion_time_block_in_seconds_enabled, setcompletion_time_block_in_seconds_enabled, completion_time_block_in_seconds_weight, setcompletion_time_block_in_seconds_weight)}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightAndExtra(
              "deprioritize_offer_has_cancelled",
              deprioritize_offer_has_cancelled_enabled,
              setdeprioritize_offer_has_cancelled_enabled,
              deprioritize_offer_has_cancelled_weight,
              setdeprioritize_offer_has_cancelled_weight,
              "within_hours",
              deprioritize_offer_has_cancelled_within_hours,
              setdeprioritize_offer_has_cancelled_within_hours,
            )}        
          </Row>
          <br />
          <Row>
            {renderElementWithWeightAndExtra(
              "least_disputed_rate",
              least_disputed_rate_enabled,
              setleast_disputed_rate_enabled,
              least_disputed_rate_weight,
              setleast_disputed_rate_weight,
              "within_hours",
              least_disputed_rate_within_hours,
              setleast_disputed_rate_within_hours,
            )}
          </Row>
          <br />
          <Row>
            {renderElementWithWeightAndExtra(
              "taker_fiat_trading_amount",
              taker_fiat_trading_amount_enabled,
              settaker_fiat_trading_amount_enabled,
              taker_fiat_trading_amount_weight,
              settaker_fiat_trading_amount_weight,
              "within_hours",
              taker_fiat_trading_amount_within_hours,
              settaker_fiat_trading_amount_within_hours,
            )}       
          </Row>
          <br />
          <Row>
            {renderElementWithWeightAndExtra(
              "effective_max_amount",
              effective_max_amount_enabled,
              seteffective_max_amount_enabled,
              effective_max_amount_weight,
              seteffective_max_amount_weight,
              "within_hours",
              effective_max_amount_within_hours,
              seteffective_max_amount_within_hours,
            )}
          </Row>
          <br />
          <Button variant="secondary">Find Best Offers</Button>
        </Form>
      </Collapse>
    </div>
  );
}

export default App;
