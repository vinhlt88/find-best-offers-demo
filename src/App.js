import React, { useState } from 'react';

function App() {
  const [same_bank_enabled, setsame_bank_enabled] = useState(true);
  const [same_bank_weight, setsame_bank_weight] = useState(3.0);

  const [online_or_auto_enabled, setonline_or_auto_enabled] = useState(true);
  const [online_or_auto_weight, setonline_or_auto_weight] = useState(10);

  const [least_total_amount_enabled, setleast_total_amount_enabled] = useState(true);
  const [least_total_amount_weight, setleast_total_amount_weight] = useState(0.1);

  const renderElementWithWeightOnly = (name, enable, setEnableFunc, weight, setWeightFunc) => {
    return (
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" checked={enable} onChange={ e => setEnableFunc(e.target.checked)}/>
          </div>
        </div>
        <lablel>{name}</lablel>
        <input type="text" class="form-control" value={weight} onChange={e => setWeightFunc(e.target.value)}/>
      </div>
    )
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-2">
          {renderElementWithWeightOnly("same_bank", same_bank_enabled, setsame_bank_enabled, same_bank_weight, setsame_bank_weight)}
          {renderElementWithWeightOnly("online_or_auto", online_or_auto_enabled, setonline_or_auto_enabled, online_or_auto_weight, setonline_or_auto_weight)}
          {renderElementWithWeightOnly("least_total_amount", least_total_amount_enabled, setleast_total_amount_enabled, least_total_amount_weight, setleast_total_amount_weight)}
         
        </div>
        <div class="col">
          
        </div>
      </div>
    </div>
  );
}

export default App;
