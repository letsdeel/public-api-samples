import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InviteContractor() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [contractId, setContractId] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [alert, setAlert] = useState({ show: false, error: false, message: '' });

  const handleOnInviteContractor = async (event) => {
      event.preventDefault();
      setIsProcessing(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contracts/${contractId}/invitations`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          message: 'Welcome to the company!'
        })
      });

      if (response.status === 200) {
        setAlert({
          show: true,
          error: false,
          message: `Contractor invited successfully`
        });
      } else {
        setAlert({
          show: true,
          error: true,
          message: `Something went wrong, check the logs.`
        })
      }
      setIsProcessing(false);
  };

  const handleOnClickGoToLanding = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
      <div className='panel'>
        <h1>Invite a contractor</h1>
        <div>
          <ul>
            <li><a href='https://developer.deel.com/docs/invite-contractor' target='_blank' rel='noreferrer'>Guide</a></li>
            <li><a href='https://developer.deel.com/reference/invitetosigncontract' target='_blank' rel='noreferrer'>Developer reference</a></li>
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
          <label for='email'>
            Email &nbsp;
            <input
              id='email'
              name='email'
              onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br />
          <label for='message'>
            Message &nbsp;
            <input
              id='message'
              name='message'
              onChange={(event) => setMessage(event.target.value)} />
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
            disabled={(!contractId && !email && !message) || isProcessing}
            onClick={handleOnInviteContractor}>
            Invite
          </button>
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

export default InviteContractor;
