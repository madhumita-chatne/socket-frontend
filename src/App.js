import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const App = () => {
    const [response, setResponse] = useState([]);
    const [welcome, setWelcome] = useState("")
    let socket;
    useEffect(() => {
         socket = io.connect("https://socket-backend-3towjekr2q-ue.a.run.app");
        // socket = io.connect("http://localhost:4000")

        socket.on("connect", data=>{
         setWelcome("Welcome!")

         setInterval(()=> setWelcome(""), 7000)
        })
        socket.on("status", data => {
          setResponse(data);
          console.log("data", data)
        });

        
      }, []);

  return(
      <div className = "App">
        {welcome !== "" && <h2>{welcome}</h2>}
          Logs
          <ul>
         {response.map(resp =>{
             return <li>{resp}</li>
         })}
          </ul>
      </div>
  )
  };

export default App;
