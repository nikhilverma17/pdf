import React, { useState, useEffect } from 'react'; // Import React and required hooks
import './App.css'; // Import CSS file for styling
import html2pdf from 'html2pdf.js';
import logo from "./logo.png"

function App() { // Declare the functional component App
  const [formData, setFormData] = useState({ // Declare formData state using useState hook
    name: '',
    mobile: '',
    email: '',
    fatherName: '',
    dob: '',
    age: '',
    address: '',
    height: '',
    weight: '',
    planNumber: '',
    sumassured: '',
    identityMark: '',
    familyHistory: '',
  });
  const [submissions, setSubmissions] = useState([]); // Declare submissions state using useState hook

  const handleSubmit = async (event) => { // Define form submission handler
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Data submitted successfully.');
        fetchSubmissions();
      } else {
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
    } 
    const content = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid black;">
      <img src={logo} alt="Logo" style="margin-bottom: 1rem;">
      <h1 style="color: red; font-size: 2.2rem; margin-bottom: 2.7rem;">${formData.name} Details</h1>
      <ol style="list-style-type: decimal; margin-left: 20px; font-size: 1.5rem; padding: 20px;">
        <li style="margin-bottom: 2rem;">Father's Name: ${formData.fatherName}</li>
        <li style="margin-bottom: 2rem;">Mobile: ${formData.mobile}</li>
        <li style="margin-bottom: 2rem;">Email: ${formData.email}</li>
        <li style="margin-bottom: 2rem;">Date of Birth: ${formData.dob}</li>
        <li style="margin-bottom: 2rem;">Age: ${formData.age}</li>
        <li style="margin-bottom: 2rem;">Address: ${formData.address}</li>
        <li style="margin-bottom: 2rem;">Height: ${formData.height}</li>
        <li style="margin-bottom: 2rem;">Weight: ${formData.weight}</li>
        <li style="margin-bottom: 2rem;">Plan & Term: ${formData.planNumber}</li>
        <li style="margin-bottom: 2rem;">Sum Assured: ${formData.sumassured}</li>
        <li style="margin-bottom: 2rem;">Identity Mark: ${formData.identityMark}</li>
        <li style="margin-bottom: 2rem;">Family History: ${formData.familyHistory}</li>
      </ol>
    </div>
  `;
  
  
  
  
    const opt = {
      margin: 10,
      filename: 'generated-pdf.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    const element = document.createElement('div');
    element.innerHTML = content;
  
    html2pdf().from(element).set(opt).save();
  };


  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  return ( // JSX code representing the component's UI
    <div className="App">
      <header>
      <img className='logo' src={logo}></img>
        <h1>PDF Generator</h1>
      </header>
      <main>
      
        <form onSubmit={handleSubmit} className="form">
        <div className='pdf-content'>
          <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Father's Name:
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
        </label>
        <label>
          Mobile:
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
          Date Of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
        </label>
        <label>
          Age:
          <input type="age" name="age" value={formData.age} onChange={handleInputChange} />
        </label>
        <label>
          Address:
          <input type="textfield" name="address" value={formData.address} onChange={handleInputChange} />
        </label>
        <label>
          Height:
          <input type="number" name="height" value={formData.height} onChange={handleInputChange} />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
        </label>
        <label>
          Plan & Term:
          <input type="text" name="planNumber" value={formData.planNumber} onChange={handleInputChange} />
        </label>
        <label>
          Sum Assured:
          <input type="number" name="sumassured" value={formData.sumassured} onChange={handleInputChange} />
        </label>
        <label>
          Identity Mark:
          <input type="text" name="identityMark" value={formData.identityMark} onChange={handleInputChange} />
        </label>
        <label>
          Family History:
          <textarea type="text" name="familyHistory" value={formData.familyHistory} onChange={handleInputChange} />
        </label>
        </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      
        <div className="submission-list">
          <h2>Submissions</h2>
          <ul>
            {submissions.map((submission, index) => (
            <li key={index} className="submission-item">
            <p>Name: {submission.name}</p>
            <p>Email: {submission.fatherName}</p>
            <p>Mobile: {submission.mobile}</p>
            <p>email: {submission.email}</p>
            <p>Dob: {submission.dob}</p>
            <p>Age: {submission.age}</p>
            <p>Address: {submission.address}</p>
            <p>Height: {submission.height}</p>
            <p>Weight: {submission.weight}</p>
            <p>Plan & Term: {submission.planNumber}</p>
            <p>Sum Assured: {submission.sumassured}</p>
            <p>Identity Mark: {submission.identityMark}</p>
            <p>Family History: {submission.familyHistory}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App; // Export the App component
