import React, { useState,useEffect } from 'react';
import axios from 'axios';
// import { json } from 'react-router-dom';

function Api({docId}) {
  const [resName, setResName] = useState('');
  const [mailId, setMailId] = useState('');
  const [results, setResults] = useState([]);
  const [abs,setAbs] =useState('');
  useEffect(() => {
    console.log( abs);
  }, [results,abs]);
  
  const getResults = async () => {
    try {
      const url = `https://api.unpaywall.org/v2/search?query=${resName}&is_oa=true&email=${mailId}`;

    //   const response = await axios.get(url);
      const response = await fetch(url);
      
      const jsonData = await response.json();

      setResults( jsonData.results);
    console.log(JSON.stringify(results,null,2));
    } catch (error) {
      console.log(error);
    }
  };
  const abstract = async (doi)=>{
    try {
        const url = `https://api.semanticscholar.org/graph/v1/paper/${doi}?fields=url,authors,abstract`

      //   const response = await axios.get(url);
      const metadata = await fetch(url);
        
        const jsonData = await metadata.json();
  
          setAbs( `abstract-:${ jsonData.abstract}`);

          console.log(JSON.stringify(jsonData,null,2));
          // console.log(` ${abs}`)
      } catch (error) {
        console.log(error);
      }
  }
  const add =async(doi)=>{
    await abstract(doi);
    console.log("abs"+abs);
    const res = await axios.put("http://localhost:3001/user/item", {
      id:docId,
    taskDes: abs,
    Status: true,
  });
  console.log(res);
  }

  const handleFormSubmit =  (e) => {
    e.preventDefault();
    getResults();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource Name:
          <input
            type="text"
            value={resName}
            onChange={(e) => setResName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={mailId}
            onChange={(e) => setMailId(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {abs}

      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.response.title}</h3>
          <p>DOI: {result.response.doi}</p>
          <button onClick={()=>{abstract(result.response.doi)}}>Select</button>
          <button onClick={()=>{add(result.response.doi)}}>Add</button>

        </div>
      ))}
    </div>
  );
}

export default Api;
