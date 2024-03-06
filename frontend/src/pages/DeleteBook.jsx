import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import Sprinner from '../components/Sprinner';
import BackButton from '../components/BackButton';
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'

function DeleteBook() {

  const [loading,setLoading]=useState(false);
  const [book,setBook]=useState({})
  const navigate=useNavigate();
  const {id}=useParams();


  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://localhost:3000/books/${id}`)
    .then((res)=>{
      if (Array.isArray(res.data) && res.data.length > 0) {
        setBook(res.data[0]);
      } else {
        setBook(res.data);
      }

      setLoading(false)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const deleteHandler=()=>{
    setLoading(true);
    const sure=confirm("are you sure to delete this book?");

    if(sure){
      axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(()=>{
        setLoading(false)
        navigate('/')
      })
      .catch((err)=>{
        setLoading(false)
        alert(err)
        navigate('/')
  
      })
    }
  }


  return (
    <div>
      <div><BackButton/> <h1>Delete Item</h1></div>

      <div>
        {loading?(<Sprinner/>):(
          <div className='border-2 border-purple-600 p-5 mt-3 w-fit'>
            <h1 className='text-center text-[2rem] mb-5'>{book.title}</h1>
           <p className='border-l-2 border-r-2 border-t-2 border-b-1 border-purple-700'>
            <span className='inline-block bg-purple-300 w-[9rem] p-2 font-bold'>ISBN:</span>{book._id}
            </p>
            <p className='border-l-2 border-r-2 border-t-2 border-b-1 border-purple-700'>
            <span className='inline-block bg-purple-300 w-[9rem] p-2 font-bold'>Book Author:</span>{book.author}
            </p>
            <p className='border-l-2 border-r-2 border-t-2 border-b-1 border-purple-700'>
            <span className='inline-block bg-purple-300 w-[9rem] p-2 font-bold'>Published Year:</span>{book.publishYear}
            </p>
            <p className='border-l-2 border-r-2 border-t-2 border-b-1 border-purple-700'>
            <span className='inline-block bg-purple-300 w-[9rem] p-2 font-bold'>Created Date:</span>{new Date(book.createdAt).toString()}
            </p>
            <p className='border-l-2 border-r-2 border-t-2 border-b-2 border-purple-700'>
            <span className='inline-block bg-purple-300 w-[9rem] p-2 font-bold'>Updated Date:</span>{new Date(book.updatedAt).toString()}
            </p>
            <button className='bg-purple-700 text-white p-3 w-[9rem] mt-2 rounded-lg font-bold' onClick={deleteHandler}>Delete Book</button> 
          </div> 
        )}
      </div>
    </div>
  )
}

export default DeleteBook