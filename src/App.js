import React, { useState } from 'react';

function App() {
  const [same_bank_enabled, setsame_bank_enabled] = useState(true);
  const [same_bank_weight, setsame_bank_weight] = useState(3.0);

  const [online_or_auto_enabled, setonline_or_auto_enabled] = useState(true);
  const [online_or_auto_weight, setonline_or_auto_weight] = useState(10);

  const [least_total_amount_enabled, setleast_total_amount_enabled] = useState(true);
  const [least_total_amount_weight, setleast_total_amount_weight] = useState(0.1);

  const [deprioritize_offer_has_cancelled_enabled, setdeprioritize_offer_has_cancelled_enabled] = useState(true);
  const [deprioritize_offer_has_cancelled_weight, setdeprioritize_offer_has_cancelled_weight] = useState(-100);
  const [deprioritize_offer_has_cancelled_within_hours, setdeprioritize_offer_has_cancelled_within_hours] = useState(24);
  const [trading_volume_portion_enabled, settrading_volume_portion_enabled] = useState(true);
  const [trading_volume_portion_weight, settrading_volume_portion_weight] = useState(50);

  const [released_rate_enabled, setreleased_rate_enabled] = useState(true);
  const [released_rate_weight, setreleased_rate_weight] = useState(10);

  const [completion_time_block_in_seconds_enabled, setcompletion_time_block_in_seconds_enabled] = useState(true);
  const [completion_time_block_in_seconds_weight, setcompletion_time_block_in_seconds_weight] = useState(30);

  const renderElementWithWeightOnly = (name, enable, setEnableFunc, weight, setWeightFunc) => {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input type="checkbox" checked={enable} onChange={ e => setEnableFunc(e.target.checked)}/>
          </div>
        </div>
        <lablel>{name}</lablel>
        <input type="text" className="form-control" value={weight} onChange={e => setWeightFunc(e.target.value)}/>
      </div>
    )
  };

  const renderElementWithWeightAndExtra = (name, enable, setEnableFunc, weight, setWeightFunc, extra_name, extra_value, extraSetFunc) => {
    return (
      <div className='col'>
        <input type="checkbox" checked={enable} onChange={ e => setEnableFunc(e.target.checked)}/>
        <lablel>{name}</lablel>
        <lablel>weight:</lablel>
        <input type="text" className="form-control" value={weight} onChange={e => setWeightFunc(e.target.value)}/>
        <lablel>{extra_name}:</lablel>
        <input type="text" className="form-control" value={extra_value} onChange={e => extraSetFunc(e.target.value)}/>
      </div>
    )
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          {renderElementWithWeightOnly("same_bank", same_bank_enabled, setsame_bank_enabled, same_bank_weight, setsame_bank_weight)}
          {renderElementWithWeightOnly("online_or_auto", online_or_auto_enabled, setonline_or_auto_enabled, online_or_auto_weight, setonline_or_auto_weight)}
          {renderElementWithWeightOnly("least_total_amount", least_total_amount_enabled, setleast_total_amount_enabled, least_total_amount_weight, setleast_total_amount_weight)}

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
         
          {renderElementWithWeightOnly("trading_volume_portion", trading_volume_portion_enabled, settrading_volume_portion_enabled, trading_volume_portion_weight, settrading_volume_portion_weight)}
          {renderElementWithWeightOnly("released_rate", released_rate_enabled, setreleased_rate_enabled, released_rate_weight, setreleased_rate_weight)}
          {renderElementWithWeightOnly("completion_time_block_in_seconds", completion_time_block_in_seconds_enabled, setcompletion_time_block_in_seconds_enabled, completion_time_block_in_seconds_weight, setcompletion_time_block_in_seconds_weight)}
        </div>
        <div className="col">
          
        </div>
      </div>
    </div>
  );
}

export default App;
