import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateContract() {
  const initialPayload = {
      type: 'ongoing_time_based',
      start_date: undefined,
      title: undefined,
      frequency: 'monthly',
      cycle_end_type: 'DAY_OF_MONTH',
      payment_due_type: 'REGULAR',
      scale: 'monthly',
      amount: 10000,
      currency_code: 'GBP',
      cycle_end: 15,
      payment_due_days: 0,
      legal_entity: undefined,
      team: undefined,
      expected_email: undefined,
      first_name: undefined,
      last_name: undefined,
      job_title: undefined,
      seniority: undefined,
  };
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState({});
  const [payload, setPayload] = useState(initialPayload);
  const [alert, setAlert] = useState({ show: false, error: false, message: '' });
  const [isContractCreated, setIsContractCreated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
        setIsLoadingData(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/data`);
        const responseJson = await response.json();

        setData(responseJson);
        setIsLoadingData(false);
    };

    loadData();
  }, []);

  const handleOnChangeInput = (event) => {
    event.preventDefault();
    setPayload({...payload, [event.target.name]: event.target.value })
  };

  const handleOnCreateContract = async (event) => {
      event.preventDefault();
      setIsProcessing(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts`, {
        cache: 'force-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        setAlert({
          show: true,
          error: false,
          message: `Contract created sucessfully. Contract ID: ${responseJson.id}. You will need this to sign the contract and invite worker.`
        });
        setPayload({...initialPayload});
        setIsContractCreated(true);
      } else {
        setAlert({
          show: true,
          error: true,
          message: `Something went wrong, check the logs.`
        });
        setIsContractCreated(false);
      }
      setIsProcessing(false);
  };

  const handleOnClickGoToLanding = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleOnClickGoSign = (event) => {
    event.preventDefault();
    navigate('/sign');
  };

  const isPayloadValid = Object.entries(payload).filter(([key, value], i)=> value === undefined).length === 0;

  return (
      <div className='panel'>
        <h1>Create a contract</h1>
        <div>
          <ul>
            <li><a href='https://developer.deel.com/docs/create-contract-fixed-rate' target='_blank' rel='noreferrer'>Guide</a></li>
            <li><a href='https://developer.deel.com/reference/createcontract' target='_blank' rel='noreferrer'>Developer reference</a></li>
          </ul>
        </div>
        <div >
          <h2>Generic details</h2>
          <label for='start_date'>
            Start date&nbsp;
            <input
              id='start_date'
              name='start_date'
              type='date'
              value={payload.start_date}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='title'>
            Title &nbsp;
            <input
              id='title'
              name='title'
              value={payload.title}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='type'>
            Type &nbsp;
            <input
              id='type'
              name='type'
              value={payload.type}
              disabled
              onChange={handleOnChangeInput} />
          </label>
          <hr />
          <h2>Client details</h2>
          <label for='legal_entity'>
            Legal entity &nbsp;
            <select
              id='legal_entity'
              name='legal_entity'
              onChange={handleOnChangeInput}>
              <option selected>{isLoadingData ? 'Loading...' : 'Select'}</option>
              {data?.legalEntities?.map((legalEntity) => (
                <option value={legalEntity.id}>{legalEntity.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label for='team'>
            Team &nbsp;
            <select
              id='team'
              name='team'
              onChange={handleOnChangeInput}>
              <option selected>{isLoadingData ? 'Loading...' : 'Select'}</option>
              {data?.teams?.map((team) => (
                <option value={team.id}>{team.name}</option>
              ))}
            </select>
          </label>
          <hr />
          <h2>Worker details</h2>
          <label for='expected_email'>
            Expected email &nbsp;
            <input
              id='expected_email'
              name='expected_email'
              value={payload.expected_email}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label id='first_name'>
            First name &nbsp;
            <input
              id='first_name'
              name='first_name'
              value={payload.first_name}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='last_name'>
            Last name &nbsp;
            <input
              id='last_name'
              name='last_name'
              value={payload.last_name}
              onChange={handleOnChangeInput} />
          </label>
          <hr />
          <h2>Compensation details</h2>
          <label for='ampunt'>
            Amount &nbsp;
            <input 
              id='amount'
              name='amount'
              type='number'              
              value={payload.amount}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='currency_code'>
            Currency code &nbsp;
            <input
              id='currency_code'
              name='currency_code'
              maxlength='3'
              value={payload.currency_code}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='cycle_end'>
            Cycle end &nbsp;
            <input
              id='cycle_end'
              name='cycle_end'
              type='number'
              value={payload.cycle_end}
              onChange={handleOnChangeInput} />
          </label>
          <br />
          <label for='cycle_end_type'>
            Cycle end type &nbsp;
            <select
              id='cycle_end_type'
              name='cycle_end_type'
              value={payload.cycle_end_type}
              onChange={handleOnChangeInput}
            >
              <option value='DAY_OF_MONTH'>DAY_OF_MONTH</option>
              <option value='DAY_OF_WEEK'>DAY_OF_WEEK</option>
              <option value='DAY_OF_LAST_WEEK'>DAY_OF_LAST_WEEK</option>
            </select>
          </label>
          <br />
          <label for='frequency'>
            Frequency &nbsp;
            <select
              id='frequency'
              name='frequency'
              value={payload.frequency}
              onChange={handleOnChangeInput}
            >
              <option value='weekly'>weekly</option>
              <option value='monthly'>monthly</option>
              <option value='biweekly'>biweekly</option>
              <option value='semimonthly'>semimonthly</option>
              <option value='calendar'>calendar</option>
            </select>
          </label>
          <br />
          <label for='scale'>
            Scale &nbsp;
            <select
              id='scale'
              name='scale'
              value={payload.scale}
              onChange={handleOnChangeInput}
            >
              <option value='weekly'>weekly</option>
              <option value='monthly'>monthly</option>
              <option value='biweekly'>biweekly</option>
              <option value='semimonthly'>semimonthly</option>
              <option value='calendar'>calendar</option>
            </select>
          </label>
          <br />
          <label for='payment_due_type'>
            Payment due type &nbsp;
            <select
              id='payment_due_type'
              name='payment_due_type'
              value={payload.payment_due_type}
              onChange={handleOnChangeInput}
            >
              <option value='REGULAR'>REGULAR</option>
              <option value='WITHIN_MONTH'>WITHIN_MONTH</option>
            </select>
          </label>
          <br />
          <label for='payment_due_days'>
            Payment due days &nbsp;
            <input
              id='payment_due_days'
              name='payment_due_days'
              value={payload.payment_due_days}
              type='number'
              min='0'
              max='90'
              onChange={handleOnChangeInput} />
          </label>
          <hr />

          <h2>Job title and Seniority</h2>
          <label for='job_title'>
            Job title &nbsp;
            <select
              id='job_title'
              name='job_title'
              onChange={handleOnChangeInput}
            >
              <option selected>{isLoadingData ? 'Loading...' : 'Select'}</option>
              {data?.jobTitles?.map((jobTitle) => (
                <option value={jobTitle.id}>{jobTitle.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label for='seniority'>
            Seniority &nbsp;
            <select
              id='seniority'
              name='seniority'
              onChange={handleOnChangeInput}
            >
              <option selected>{isLoadingData ? 'Loading...' : 'Select'}</option>
              {data?.seniorities?.map((seniority) => (
                <option value={seniority.id}>{seniority.name}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <button
            type='button'
            onClick={handleOnClickGoToLanding}>
            Back to landing
          </button>
          &nbsp;
          <button
            type='button'
            disabled={!isPayloadValid || isProcessing}
            onClick={handleOnCreateContract}>
            Create contract
          </button>
          &nbsp;
          {isContractCreated && 
            <button
              type='button'
              onClick={handleOnClickGoSign}>
              Go to Sign
            </button>}
          <br />
          {alert.show &&
            <div className={`alert ${alert.error ? 'error' : 'success'}`}>
              {alert.message}
            </div>
          }
        </div>
      </div>
  );
}

export default CreateContract;
