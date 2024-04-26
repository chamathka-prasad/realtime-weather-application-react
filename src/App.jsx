import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Context from './components/Context'
import SingleView from './components/SingleView';
import LoadToLocalStor from './components/LoadToLocalStor';



const App = () => {
  return (

    <>
      <LoadToLocalStor />
      <Routes>
        <Route path='/' element={<Context />} />
        <Route path='singleView' element={<SingleView />} />
      </Routes>

    </>


  )
}

export default App

