import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home.jsx'
import AddBook from './pages/AddBook.jsx'
import DeleteBook from './pages/DeleteBook.jsx'
import UpdateBook from './pages/UpdateBook.jsx'
import ViewBook from './pages/ViewBook.jsx'

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/books/create' element={<AddBook/>}/>
        <Route path='/books/delete/:id' element={<DeleteBook/>}/>
        <Route path='/books/edit/:id' element={<UpdateBook/>}/>
        <Route path='/books/view/:id' element={<ViewBook/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
