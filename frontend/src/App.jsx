import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Form from './components/Form/Form'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import DetailCard from './components/DetailCard/DetailCard'
import ArchivedNotes from './components/ArchivedNotes/ArchivedNotes'

const App = () => {

  const userId = useSelector(state => state.userId);
  const location = useLocation().pathname;
  return (
    <>
      {(location !== "/" && userId.length) && <NavBar></NavBar>}
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path='/home' element={userId.length ? <Home /> : <Navigate to={"/"}></Navigate>}></Route>
        <Route path='/archived' element={userId.length ? <ArchivedNotes /> : <Navigate to={"/"}></Navigate>}></Route>
        <Route path='/note/create' element={userId.length ? <DetailCard /> : <Navigate to={"/"}></Navigate>}></Route>
        <Route path='/note/:id' element={userId.length ? <DetailCard /> : <Navigate to={"/"}></Navigate>}></Route>
      </Routes>
    </>
  )
}

export default App
