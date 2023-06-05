import React, { useState } from 'react';

import './App.css';

import Table from './Table';

import calculate from './calculations';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };

export default () => {
  const [initial, setInitial] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('25');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const { monthlyPayment, payments } = calculate({
    initial: +initial,
    years: +years,
    rate: +rate,
    monthlyOverpayment: +monthlyOverpayment,
    overpayments
  });

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <div className="navbar-brand">Mortgage Overpayment Calculator</div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">
          <div className="col-sm-4">
            <div>
              <h2>Initial</h2>
              <label>Amount</label>
              <input
                maxLength={7}
                value={initial}
                onChange={e => setInitial(e.target.value)}
              />
            </div>
            <div>
              <label>Years</label>
              <input
                type="number"
                maxLength={2}
                value={years}
                onChange={e => setYears(e.target.value)}
              />
            </div>
            <div>
              <label>Rate</label>
              <input
                type="number"
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-sm-12">
            <h2>
              Monthly Payment
              <span className="money">
                {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
              </span>
            </h2>
            
          </div>
        </div>
        <Table className="col-sm-4" payments={payments} />
      </div>
    </div>
  );
};
