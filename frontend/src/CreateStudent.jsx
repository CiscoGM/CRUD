import { func } from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateStudent() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()

    function handleSubmit(event){
       event.preventDefault();
       axios.post('http://localhost:8081/create', { name, email })
       .then(res=>{
        console.log(res)
        navigate('/')
    }).catch(e=>console.log(e))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
     <div className='w-75 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type="text" placeholder='Juan Escutia' className='form-control' 
                onChange={e=>setName(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type="email" placeholder='example@example.com' className='form-control'
                onChange={e=>setEmail(e.target.value)}/>
            </div>
            <button className='btn btn-success'>submit</button>
        </form>
     </div>
    </div>
  )
}

export default CreateStudent
