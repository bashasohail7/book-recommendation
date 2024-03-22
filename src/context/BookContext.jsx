import React, { createContext, useContext,useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BookContext);
};
