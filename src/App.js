import React, { useState } from 'react';
import initOfferList from './offer_list.json';
import { filter, first, map, max, maxBy, sortBy, sumBy } from "lodash";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';


function App() {
  const [same_bank_enabled, setsame_bank_enabled] = useState(true);
  const [same_bank_weight, setsame_bank_weight] = useState(0.5);

  const [online_or_auto_enabled, setonline_or_auto_enabled] = useState(true);
  const [online_or_auto_weight, setonline_or_auto_weight] = useState(100);

  const [least_total_amount_enabled, setleast_total_amount_enabled] = useState(true);
  const [least_total_amount_weight, setleast_total_amount_weight] = useState(0.1);

  const [trading_volume_portion_enabled, settrading_volume_portion_enabled] = useState(true);
  const [trading_volume_portion_weight, settrading_volume_portion_weight] = useState(20);

  const [released_rate_enabled, setreleased_rate_enabled] = useState(false);
  const [released_rate_weight, setreleased_rate_weight] = useState(10);

  const [completion_time_block_in_seconds_enabled, setcompletion_time_block_in_seconds_enabled] = useState(false);
  const [completion_time_block_in_seconds_weight, setcompletion_time_block_in_seconds_weight] = useState(30);

  const [deprioritize_offer_has_cancelled_enabled, setdeprioritize_offer_has_cancelled_enabled] = useState(false);
  const [deprioritize_offer_has_cancelled_weight, setdeprioritize_offer_has_cancelled_weight] = useState(-100);
  const [deprioritize_offer_has_cancelled_within_hours, setdeprioritize_offer_has_cancelled_within_hours] = useState(24);

  const [least_disputed_rate_enabled, setleast_disputed_rate_enabled] = useState(false);
  const [least_disputed_rate_weight, setleast_disputed_rate_weight] = useState(-10);
  const [least_disputed_rate_within_hours, setleast_disputed_rate_within_hours] = useState(24);

  const [taker_fiat_trading_amount_enabled, settaker_fiat_trading_amount_enabled] = useState(false);
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

  const [offerList, setOfferList] = useState(initOfferList);
  const [sortedOfferList, setSortedOfferList] = useState([]);


  const findBestOffer = () => {
    const offer_type = "sell";
    const amount = 200000;
    const bank_name = "Vietcombank";

    const availableOffer = offerList.filter(o => o.offer_type == offer_type && o.total_amount >= amount);
    const total_amount_field =  offer_type == "sell" ? "effective_max_amount":  "total_amount";
    const maxTotalAmount =  max(map(availableOffer, total_amount_field)) || 0;
    const sum_vol_field = offer_type == "sell" ? "supported_deposit" : "supported_withdrawal";
    const tradedVol = sumBy(filter(offerList, {"offer_type": offer_type}), sum_vol_field) || 0;
    availableOffer.forEach(offer => {
      if(same_bank_enabled){
        offer.same_bank_score = offer.bank_name == bank_name ? Number(same_bank_weight) : 0; 
      }

      if(online_or_auto_enabled){
        offer.online_or_auto_score = offer.online_or_auto == "TRUE" ? Number(online_or_auto_weight) : 0; 
      }

      if(least_total_amount_enabled){
        offer.least_total_amount_score = maxTotalAmount == 0 ? 0 : -1 * Number(least_total_amount_weight) * offer[total_amount_field] / maxTotalAmount;
      }

      if(trading_volume_portion_enabled) {
        const userTradedVol = sumBy(filter(offerList, {"offer_type": offer_type, username: offer.username}), sum_vol_field) || 0;
        offer.trading_volume_portion_score = tradedVol == 0 ? 0 : -1 * Number(trading_volume_portion_weight) * userTradedVol / tradedVol;
      }

      let total_score = 0;
      [
        "same_bank_score", "online_or_auto_score", "least_total_amount_score", "trading_volume_portion_score"
      ].forEach(key_score => total_score += offer[key_score] ? offer[key_score] : 0 )

      offer.total_score = total_score;
    })
    
    const sortedOffers = sortBy(availableOffer, "total_score").reverse();
    const bestOffer = first(sortedOffers);
    if(bestOffer) {
      bestOffer[sum_vol_field] = (bestOffer[sum_vol_field] || 0) + amount;
    }
    setSortedOfferList(sortedOffers);
  }
  const [sortingConfigOpen, setsortingConfigOpen] = useState(false);
  const [offerListOpen, setofferListOpen] = useState(true);
  const [bestOffersOpen, setbestOffersOpen] = useState(true);
  return (
    <div className="container">
      <br />
      <div className='row'>
        <div className='col'>
          <Button
            onClick={() => setsortingConfigOpen(!sortingConfigOpen)}
          >
            Sorting Configuration
          </Button>

        </div>
        <div className='col'>
          <Button onClick={findBestOffer}>Find Best Offers</Button>
        </div>
        <div className='col'>
          <Button
            onClick={() => setofferListOpen(!offerListOpen)}
          >
            Offer List
          </Button>
        </div>
      </div>
      <br />
      <Collapse in={sortingConfigOpen}>
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
        </Form>
      </Collapse>
        <div>
          <br />
          <h2 onClick={() => setbestOffersOpen(!bestOffersOpen)} >Best Offers</h2>
          <Collapse in={bestOffersOpen}>
            <Table striped bordered hover>
                <thead>
                  <tr>
                      <th>id</th>
                      <th>total_score</th>
                      {same_bank_enabled && <th>same_bank_score</th>}
                      {online_or_auto_enabled && <th>online_or_auto_score</th>}
                      {least_total_amount_enabled && <th>least_total_amount_score</th>}
                      {trading_volume_portion_enabled && <th>trading_volume_portion_score</th>}
                      <th>offer_type</th>
                      <th>username</th>
                      <th>online_or_auto</th>
                      <th>bank_name</th>
                      <th>total_amount</th>
                      <th>effective_max_amount</th>
                      <th>payment_method</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOfferList.map(offer => 
                    <tr>
                      <td>{offer.id}</td>
                      <td>{offer.total_score}</td>
                      {same_bank_enabled && <td>{offer.same_bank_score}</td>}
                      {online_or_auto_enabled && <td>{offer.online_or_auto_score}</td>}
                      {least_total_amount_enabled && <td>{offer.least_total_amount_score}</td>}
                      {trading_volume_portion_enabled && <td>{offer.trading_volume_portion_score}</td>}
                      <td>{offer.offer_type}</td>
                      <td>{offer.username}</td>
                      <td>{offer.online_or_auto}</td>
                      <td>{offer.bank_name}</td>
                      <td>{offer.total_amount}</td>
                      <td>{offer.effective_max_amount}</td>
                      <td>{offer.payment_method}</td>
                    </tr>
                  )}
                </tbody>
            </Table>
          </Collapse>
        </div>
      <Collapse in={offerListOpen}>
        <div>
          <br />
          <h2>Offer List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                  <th>offer_type</th>
                  <th>username</th>
                  <th>online_or_auto</th>
                  <th>bank_name</th>
                  <th>total_amount</th>
                  <th>effective_max_amount</th>
                  <th>supported_deposit</th>
                  <th>supported_withdrawal</th>
                  <th>payment_method</th>
              </tr>
            </thead>
            <tbody>
              {offerList.map(offer => 
                <tr>
                  <td>{offer.offer_type}</td>
                  <td>{offer.username}</td>
                  <td>{offer.online_or_auto}</td>
                  <td>{offer.bank_name}</td>
                  <td>{offer.total_amount}</td>
                  <td>{offer.effective_max_amount}</td>
                  <td>{offer.supported_deposit}</td>
                  <td>{offer.supported_withdrawal}</td>
                  <td>{offer.payment_method}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Collapse>
    </div>
  );
}

export default App;
