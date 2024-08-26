import React from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

function PeopleDetails() {
  const [people, setPeople] = React.useState(null);
  const { id } = useParams();
  React.useEffect(() => {
    const loadPeople = async () => { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/people/${id}`);

      const responseJson = await response.json();
      setPeople(responseJson.data);
    };

    if (id) {
      loadPeople();
    }
  }, [id]);

  return (
    <div>
      <h1>People details</h1>
      <ul>
        <li>Name: {people?.full_name}</li>
        <li>Contract type: {people?.hiring_type}</li>
        <li>Status: {people?.hiring_status}</li>
        <li>Start date: {people?.start_date}</li>
        <li>Email: {people?.emails[0]?.value}</li>
        <li>Country: {people?.country}</li>
        <li>State: {people?.state}</li>
        <li>Job title: {people?.job_title}</li>
      </ul>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default PeopleDetails;
