import React, { useState,useEffect } from 'react'
import axios  from 'axios';
import Sprinner from '../components/Sprinner';
import BackButton from '../components/BackButton';
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'

function UpdateBook() {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();

  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://localhost:3000/books/${id}`)
    .then((res)=>{
      setTitle(res.data[0].title)
      setAuthor(res.data[0].author)
      setPublishYear(res.data[0].publishYear)
      setLoading(false)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  const editHandler=()=>{
   if((title.trim()==='') || (author.trim()==='') ||  (publishYear.trim()==='')){
    alert("Please fill out all fields");
   }
   else{ 
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios
    .put(`http://localhost:3000/books/${id}`,data)
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
    <div className='w-fit'>
      <div className='mt-5 mb-5'>
      <BackButton/>
      </div>
      {loading?(<Sprinner/>):(

        <form>
        <table className='b border-2 border-purple-600 rounded-lg'>
          <tr className='border-2 border-purple-800'>
            <td className='bg-purple-500 w-[8rem]  h-[2rem]'>Book Name</td>
            <td className='w-[12rem]'><input type="text" className='h-[2rem] w-[20rem]' value={title} onChange={(e)=>setTitle(e.target.value)}/></td>
          </tr>
          <tr className='b border-2 border-purple-600'>
            <td className='bg-purple-500 w-[8rem] h-[2rem]'>Author</td>
            <td><input type="text" className='h-[2rem] w-[20rem]' value={author} onChange={(e)=>setAuthor(e.target.value)}/></td>
          </tr>
          <tr className='b border-2 border-purple-600'>
            <td className='bg-purple-500 w-[8rem] h-[2rem]'>Publish Year</td>
            <td><input type="text" className='h-[2rem] w-[20rem]' value={publishYear} onChange={(e)=>setPublishYear(e.target.value)}/></td>
          </tr>
        </table>
        <div className='flex items-center justify-between mt-7'>
        <button type="reset" className='border-2 border-purple-800 w-[10rem] h-[2.5rem] p-2 rounded-full'>Reset</button>
        <button type="submit" className='bg-purple-600 border-2 border-purple-600 w-[10rem] h-[2.5rem] p-2 text-white font-semibold rounded-full' onClick={editHandler}>Update Book</button>
        </div>
      </form>
        )}
    </div>
  )
}

export default UpdateBook