import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State to store the input value
  const [inputValue, setInputValue] = useState('');
  // State to store the response from the API
  const [textList, setTextList] = useState([]);

  // Function to handle the Send button click
  const handleSend = async () => {
    if (inputValue.trim()) {
      try {
        // Make the API call using axios
        // const response = await axios.post('https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/', {
         
        //   prompt: textList
          
        // },{
        //   'Content-Type': 'application/json'
        // });
         

        // const testConnection = async () => {
        //   try {
        //     const response = await axios.get('https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/');
        //     console.log('Connection successful:', response.data);
        //   } catch (error) {
        //     console.error('Error:', error);
        //   }
        // };

        
        const url = 'https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/';

        const payload = {
          prompt: inputValue
        };
      
        const headers = {
          'Content-Type': 'application/json'
        };
      
        //setTextList(''); 
        const response1 = await axios.post(url, payload, {headers});
        console.log(response1.data['body']['output']);
        setTextList([...textList, JSON.stringify(response1.data['body']['output'].text)]);
        // Append the API response to the text list
        //setTextList([...textList, `Response: ${JSON.stringify(response.data)}`]);
        //setInputValue(''); // Clear the input box after sending
      } catch (error) {
        console.error("Error calling API:", error);
       
        setTextList([...textList, 'Error calling API.', error,]);
      }
    }
  };

  return (
    <div className="App">
      <h1>Sikka API Assistant</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask your question here"
          style={{ width: '300px', padding: '8px' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '8px' }}>
          Ask
        </button>
      </div>
      <div className="text-viewer" style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <textarea
          value={textList.join('\n')}
          readOnly
          rows="10"
          cols="50"
          style={{ width: '600px', height: '400px', padding: '10px' }}
        />
      </div>
    </div>
  );
}

export default App;
