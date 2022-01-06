import { useState, useEffect } from "react"
import axios from "axios";


function About() {

  const [title, setCommet]  = useState('');
  const [test , setData] = useState([]);

  const submitCommet  = async ()  =>  {
    if(test){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      };
  
      const response = await fetch('http://localhost:8888/api/add', requestOptions).then(response => response.json());

      test.push(response);

      setCommet("");
  
    }
  }

  const deleteComment = async (id) => {
    if(id){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      };
  
      const response = await fetch('http://localhost:8888/api/delete?item='+id, requestOptions).then(response => response.json());
      console.log(response);
    }
  }

  useEffect(()=> {
    const getData = async () => {
      axios.get('http://localhost:8888/api/list').then(res=> {
        setData(res.data);
        console.log(res.data);
      }).catch(error => console.log(error));
    }
  
    getData();  
  }, []);


  return (
    <div className="flex-col">
      <div className="flex-row">
        <div className="content">
          <div className="input">
            <input placeholder="Todo add" type="text" value={title} onChange={(e)=> setCommet(e.target.value)} />
            <button onClick={submitCommet}>Submit</button>
          </div>
          <ul>
              {test.map((data)=>(
                <li key={data._id}>
                  <span> {data.title} </span>
                  <button onClick={(e)=> deleteComment(data._id)}>Sil</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
   
  )
}

export default About;