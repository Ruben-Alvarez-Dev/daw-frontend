import { useState } from 'react';


export const TableForm = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [seats, setSeats] = useState('');
  const [isOccupied, setIsOccupied] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save the form data to the database
    saveFormDataToDatabase();
  };

  const saveFormDataToDatabase = () => {
    // Implement your logic to save the form data to the database here
    // You can use an API call or any other method to interact with the database
    // For example:
    // axios.post('/api/saveFormData', { tableNumber, seats, isOccupied })
    //   .then(response => {
    //     console.log('Form data saved successfully');
    //   })
    //   .catch(error => {
    //     console.error('Error saving form data:', error);
    //   });
  };

  return (
    <div className="table-form card">
      TableForm
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-line">
            <label htmlFor="table-number">Table number</label>
          </div>
          <div>
            <input
              type="text"
              id="table-number"
              name="table-number"
              value={tableNumber}
              onChange={(event) => setTableNumber(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input
            type="text"
            id="seats"
            name="seats"
            value={seats}
            onChange={(event) => setSeats(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="is-occupied">Is occupied</label>
          <input
            type="checkbox"
            id="is-occupied"
            name="is-occupied"
            checked={isOccupied}
            onChange={(event) => setIsOccupied(event.target.checked)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

