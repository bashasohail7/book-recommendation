import { useState } from 'react'
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import './App.css'
import BookList from './components/BookList'
import UserRecommendationForm from './components/UserRecommendation';
import MyFavourites from './components/MyFavourites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<BookList />} />
        <Route path='recommendbook' element={<UserRecommendationForm />} />
        <Route path='myFavourites' element={<MyFavourites/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
