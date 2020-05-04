import React, { useState, useEffect } from 'react';
import './App.css';
import axios from '../config/axios';

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [numberPhone, setNumberPhone] = useState("");

  const fetchData = async () => {
    const result = await axios.get('/student');
    // console.log(result.data);
    setStudents(result.data)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addNewStudent = async () => {
    // console.log(name, age, numberPhone)
    const body = {
      name,
      age,
      numberPhone
    }
    // console.log(body)
    await axios.post("/student", body);
    alert("Sent data to backend complete")
    setName("");
    setAge("");
    setNumberPhone("");
    fetchData();
  }


  const deleteStudent = async (targetId) => {
    await axios.delete(`/student/${targetId}`);
    alert(`Student Id ${targetId} has been deleted`);
    fetchData();
  }




  // const students = [
  //   {
  //     "id": 2,
  //     "name": "Natthachai",
  //     "age": 18,
  //     "number_phone": null
  //   },
  //   {
  //     "id": 3,
  //     "name": "Sonter",
  //     "age": 18,
  //     "number_phone": "0871234152"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Natthachai",
  //     "age": 18,
  //     "number_phone": "0871234152"
  //   }
  // ]


  return (
    <div className="App">

      <button onClick={fetchData}>Fetch Data</button>

      {students.map((ele) => {
        return (

          <div style={{ border: "1px solid black" }} key={ele.id}>
            <div>{`name is : ${ele.name}`}</div>
            <div>{`age is : ${ele.age} year old`}</div>
            <div>{`MobileNumber is : ${ele.number_phone}`}</div>
            <button onClick={()=>deleteStudent(ele.id)}>Del</button>
          </div>

        )
      }
      )}

      <h1>Add a student</h1>
      <div>
        Name: <input onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div>
        Age: <input onChange={e => setAge(e.target.value)} value={age} />
      </div>
      <div>
        MobileNumber: <input onChange={e => setNumberPhone(e.target.value)} value={numberPhone} />
      </div>
      <button onClick={addNewStudent} >Add new student</button>









    </div>
  );
}

export default App;
