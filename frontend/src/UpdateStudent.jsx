import { func } from 'prop-types'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateStudent() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const { id } = useParams()
    const navigate=useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
            .then(res => {
                setName(res.data.name); 
                setEmail(res.data.email); 
            })
            .catch(e => console.log(e));
    }, [id])


    function handleSubmit(event){
       event.preventDefault();
       axios.put(`http://localhost:8081/update/${id}`, { name, email })
       .then(res=>{
        console.log(res)
        navigate('/')
    }).catch(e=>console.log(e))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
     <div className='w-75 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type="text" placeholder='Juan Escutia' className='form-control' 
                value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type="email" placeholder='example@example.com' className='form-control'
                value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <button className='btn btn-success'>update</button>
        </form>
     </div>
    </div>
  )
}

export default UpdateStudent
