import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import TypewriterComponent, {
  Typewriter,
  TypewriterClass,
} from "typewriter-effect";

function App() {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");
  // State to store the response from the API
  const [textList, setTextList] = useState([]);
  const [loader, setLoader] = useState(false);

  // Function to handle the Send button click
  // const handleSend = async () => {
  //   if (inputValue.trim()) {
  //     try {
  //       // Make the API call using axios
  //       // const response = await axios.post('https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/', {

  //       //   prompt: textList

  //       // },{
  //       //   'Content-Type': 'application/json'
  //       // });

  //       // const testConnection = async () => {
  //       //   try {
  //       //     const response = await axios.get('https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/');
  //       //     console.log('Connection successful:', response.data);
  //       //   } catch (error) {
  //       //     console.error('Error:', error);
  //       //   }
  //       // };

  //       const url =
  //         "https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/";

  //       const payload = {
  //         prompt: inputValue,
  //       };

  //       const headers = {
  //         "Content-Type": "application/json",
  //       };

  //       //setTextList('');
  //       const response1 = await axios.post(url, payload, { headers });
  //       console.log(response1.data["body"]["output"]);
  //       setTextList([
  //         ...textList,
  //         JSON.stringify(response1.data["body"]["output"].text),
  //       ]);
  //       // Append the API response to the text list
  //       //setTextList([...textList, `Response: ${JSON.stringify(response.data)}`]);
  //       //setInputValue(''); // Clear the input box after sending
  //     } catch (error) {
  //       console.error("Error calling API:", error);

  //       setTextList([...textList, "Error calling API.", error]);
  //     }
  //   }
  // };
  const textChange = (e) => {
    setInputValue(e.target.value);
    setTextList([]);
  };
  const handleSend = (async) => {
    setTextList([]);
    if (inputValue.trim()) {
      setLoader(true);
      axios
        .get("https://v9s5dtkotd.execute-api.us-east-1.amazonaws.com/dev/", {
          params: {
            prompt: inputValue,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response1) => {
          setLoader(false);
          console.log(response1.data["body"]["output"]);
          setTextList([
            ...textList,
            JSON.stringify(response1.data["body"]["output"].text),
          ]);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error calling API:", error);

          setTextList([...textList, "Error calling API.", error]);
        });
    }
  };
  return (
    <div className="App">
      <h1
        style={{
          fontFamily: "system-ui",
        }}
      >
        Welcome to Sikka API Assistant
      </h1>

      <div
        className="text-viewer"
        style={{
          marginTop: "20px",
          whiteSpace: "pre-wrap",
          color: "dimgrey",
        }}
      >
        {loader ? (
          <>
            <div
              className="container"
              style={{
                width: "70em",
                height: "28em",
                padding: "15px",
                borderRadius: "1em",
                fontFamily: "system-ui",
                border: "2px solid grey",
              }}
            >
              <div className="spinner_style" style={{ marginTop: "10em" }}>
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // <textarea
          //   value={textList.join("\n")}
          //   readOnly
          //   rows="10"
          //   cols="50"
          //   style={{
          //     width: "70em",
          //     height: "28em",
          //     padding: "15px",
          //     borderRadius: "1em",
          //     fontFamily: "system-ui",
          //   }}
          // />
          <div
            className="container"
            style={{
              width: "70em",
              height: "28em",
              padding: "15px",
              borderRadius: "1em",
              fontFamily: "system-ui",
              border: "2px solid grey",
            }}
          >
            <TypewriterComponent
            
              onInit={(typewriter) => {
                typewriter
                  .typeString(textList.join("\n"))
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2500)
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </div>
        )}
      </div>
      <br />
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => textChange(e)}
          placeholder="Ask your question here"
          style={{
            width: "62em",
            padding: "8px",
            borderRadius: "1em",
            border: "1px solid",
          }}
        />
        <Button
          className="btn"
          style={{
            width: "8em",
            marginLeft: "1em",
            padding: "8px",
            borderRadius: "1em",
            border: "0.5px solid black",
            background: "#f0f0f0",
            color: "grey",
          }}
          onClick={() => {
            handleSend();
          }}
        >
          <b>Ask</b>
        </Button>
      </div>
    </div>
  );
}

export default App;
