import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Sprinner.jsx'
import { Link } from 'react-router-dom'


import { IoAddCircle } from "react-icons/io5";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

function Home() {

  const [books,setBooks]=useState([]);//to show books
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    axios
     .get('http://localhost:3000/books')
     .then((res)=>{
      setBooks(res.data.data)
      setLoading(false);
     })
     .catch((err)=>{
      //console.log(err)
     })
     
  },[])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <h1 className='text-[1.7rem] font-bold'>Book List</h1>
      <Link to='/books/create'>
        <div className='flex items-center justify-between w-[10rem] bg-purple-400 px-[15px] py-[10px] mx-5 rounded-md hover:bg-purple-500 '>
        <IoAddCircle className='scale-150'/>
        <h2>Add New Book</h2>
        </div>
        </Link>
      </div>

      {loading?(<Spinner/>):(
        <table className='w-full border-separate border-spacing-2 mt-[1.5rem]'>
        <thead>
          <tr className='h-[2.5rem]'>
            <th className='border-2 border-purple-600 rounded-md'>No</th>
            <th className='border-2 border-purple-600 rounded-md'>Title</th>
            <th className='border-2 border-purple-600 rounded-md max-md:hidden'>
              Author
            </th>
            <th className='border-2 border-purple-600 rounded-md max-md:hidden'>
              Publish Year
            </th>
            <th className='border-2 border-purple-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='h-8 hover:bg-purple-100'>
              <td className='border-2 border-purple-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border-2 border-purple-700 rounded-md text-center'>
                {book.title}
              </td>
              <td className='border-2 border-purple-700 rounded-md text-center max-md:hidden'>
                {book.author}
              </td>
              <td className='border-2 border-purple-700 rounded-md text-center max-md:hidden'>
                {book.publishYear}
              </td>
              <td className='border-2 border-purple-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/books/view/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
       
    
    </div>
  )
}

export default Home