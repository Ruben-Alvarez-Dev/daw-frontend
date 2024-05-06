import './Card.css';
import { useState, useEffect } from 'react';

export const Card = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const url = 'http://localhost:8000/api/users';
    const res = await fetch(url);
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    (data === null) && getData();
    (data !== null) && console.log(data);
  }, [data]);

  return (
    <>
      <div className='card'>
        <h2>HOLAA</h2>
        {data && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};