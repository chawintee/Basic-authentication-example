import React, { useState, useEffect } from 'react';
import './App.css';
import axios from '../config/axios';
import LoginForm from './LoginForm';
import jwtDecode from 'jwt-decode';

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({})

  const fetchData = async () => {
    const result = await axios.get('/student');
    // console.log(result.data);
    setStudents(result.data)
  }

  useEffect(() => {
    fetchData();
    if (localStorage.getItem("ACCESS_TOKEN")){
      // console.log(jwtDecode(localStorage.getItem("ACCESS_TOKEN")));
      const user = jwtDecode(localStorage.getItem("ACCESS_TOKEN"));
      setUserInfo(user)
      setIsLogin(true);
    };
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
    const headers = {Authorization : `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
    await axios.delete(`/student/${targetId}`,{headers : headers});
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

      {/* <button onClick={fetchData}>Fetch Data</button> */}
      <h1>Login Form</h1>
      <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo} setUserInfo={setUserInfo}/>


      <h1>List of student</h1>
      {students.map((ele) => {
        return (


          <div style={{ border: "1px solid black" ,margin: "10px 300px 10px 300px ", padding: "10px"}} key={ele.id}>
            <div>{`name is : ${ele.name}`}</div>
            <div>{`age is : ${ele.age} year old`}</div>
            <div>{`MobileNumber is : ${ele.number_phone}`}</div>
            {isLogin ? <button onClick={()=>deleteStudent(ele.id)}>Del</button> : null}
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
