import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Form from './components/Form/Form'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import DetailCard from './components/DetailCard/DetailCard'
import FormNote from './components/FormNote/FormNote'
import ArchivedNotes from './components/ArchivedNotes/ArchivedNotes'

const App = () => {

  const userId = useSelector(state => state.userId)
  const location = useLocation().pathname;
  return (
    <>
      {(location !== "/" && userId) && <NavBar></NavBar>}
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/archived' element={<ArchivedNotes />}></Route>
        <Route path='/note/create' element={<DetailCard />}></Route>
        <Route path='/note/:id' element={<DetailCard />}></Route>
      </Routes>
    </>
  )
}

export default App
