import React from 'react';
import { Link } from "react-router-dom";

function PeopleList() {
  const [peopleList, setPeopleList] = React.useState([]);
  React.useEffect(() => {
    const loadPeopleList = async () => { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/people`);

      const responseJson = await response.json();
      setPeopleList(responseJson.data);
    };
    loadPeopleList();
  }, []);

  return (
    <div>
      <h1>People list</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Contract type</th>
          <th>Status</th>
          <th></th>
        </tr>
        {peopleList.map((people) => {
          return <tr>
            <td>{people.full_name}</td>
            <td>{people.hiring_type}</td>
            <td>{people.hiring_status}</td>
            <td>
                <Link to={`/${people.id}`}>See details</Link>
            </td>
          </tr>
        })}
      </table>
    </div>
  );
}

export default PeopleList;
