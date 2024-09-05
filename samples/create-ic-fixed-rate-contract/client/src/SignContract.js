import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SignContract() {
  const navigate = useNavigate();
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contractId, setContractId] = useState(undefined);
  const [signature, setSignature] = useState(undefined);
  const [alert, setAlert] = useState({ show: false, error: false, message: '' });

  const handleOnSignContract = async (event) => {
      event.preventDefault();
      setIsProcessing(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/${contractId}/signatures`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          client_signature: signature
        })
      });
      if (response.status === 200) {
        setAlert({
          show: true,
          error: false,
          message: `Contract signed sucessfully. You can invite a contractor now.`
        });
        setIsContractSigned(true);
      } else {
        setAlert({
          show: true,
          error: true,
          message: `Something went wrong, check the logs.`
        });
        setIsContractSigned(false);
      }
      setIsProcessing(false);
  };

  const handleOnClickGoToLanding = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleOnClickGoInvite = (event) => {
    event.preventDefault();
    navigate('/invite');
  };

  return (
      <div className='panel'>
        <h1>Sign a contract</h1>
        <div>
          <ul>
            <li><a href='https://developer.deel.com/docs/sign-contract' target='_blank' rel='noreferrer'>Guide</a></li>
            <li><a href='https://developer.deel.com/reference/signcontract' target='_blank' rel='noreferrer'>Developer reference</a></li>
          </ul>
        </div>
        <div >
          <label for='contract_id'>
            Contract id&nbsp;
            <input
              id='contract_id'
              name='contract_id'
              type='text'
              onChange={(event) => setContractId(event.target.value)} />
          </label>
          <br />
          <label for='signature'>
            Signature &nbsp;
            <input
              id='signature'
              name='signature'
              onChange={(event) => setSignature(event.target.value)} />
          </label>
          <br />
          <button
            type='button'
            onClick={handleOnClickGoToLanding}>
            Back to landing
          </button>
          &nbsp;
          <button
            type='button'
            disabled={(!contractId && !signature) || isProcessing}
            onClick={handleOnSignContract}>
            Sign contract
          </button>
          &nbsp;
          {isContractSigned && 
            <button
              type='button'
              onClick={handleOnClickGoInvite}>
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

export default SignContract;
