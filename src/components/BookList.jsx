import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import Card from './Card';
import BookModal from './BookModal';
import Header from './Header';
import { useBooks } from '../context/BookContext';
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
const BookList = () => {
    const localSavedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const { books, setBooks } = useBooks();
    const [passedQuery, setPassedQuery] = useState('')
    const [startIndex, setStartIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [selectedBook, setSelectedBook] = useState(null);
    const [savedBooks, setSavedBooks] = useState(localSavedBooks)
    let cancelTokenSource;
    useEffect(() => {
        if (books.length === 0) {
            fetchBooks('first');
        }
        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel('Request canceled by cleanup');
            }
        };
    }, [books]);

    const fetchBooks = async (first, query = 'a|e|i|o|u') => {
        try {
            cancelTokenSource = axios.CancelToken.source();
            setLoading(true);
            console.log('query ==>', query);
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=15&key=${apiKey}`,
                { cancelToken: cancelTokenSource.token }
            );

            console.log("respnseiq query", response);
            if (first == 'first') {
                setBooks(response.data.items)
            } else {
                if (response.data.items) {
                    console.log("yes...");
                    setBooks(prev => [...prev, ...response.data.items]);
                }
            }
            setStartIndex(prevIndex => prevIndex + 15);
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching books:', error);
                setErrorMsg(error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    const handleLoadMore = () => {
        if (passedQuery) {
            fetchBooks('', passedQuery);
        } else { fetchBooks() }
    };

    const handleCardClick = (book) => {
        setSelectedBook(book);

    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };
    const onSearch = (query) => {
        if (query !== passedQuery) {
            setPassedQuery(query)
            fetchBooks('first', query)
        }
    }
    const saveBookLocally = (passedBook) => {
        localStorage.setItem('savedBooks', JSON.stringify([...localSavedBooks,passedBook]));
        setSavedBooks(prev => [...prev, passedBook])
    };
    const removeBookLocally = (passedBook) => {
        const tempSavedBooks=savedBooks;
        const filteredBooks = tempSavedBooks.filter(book => book.id !== passedBook.id)
        localStorage.setItem('savedBooks', JSON.stringify(filteredBooks));
        setSavedBooks(() => [...filteredBooks])
        // setBooks(() => [...filteredBooks])
        
    }
    if (errorMsg) {
        return <h3>Oops !! {errorMsg}</h3>
    }

    return (
        <div>
            <h1 className='app-heading'>Book Recommendation App</h1>
            <Header onSearch={onSearch} />
            {errorMsg ? <h3>Oops !! {errorMsg}</h3> :
                <>
                    <div className='card-container'>
                        {books.map((book, index) => {
                            const isFavourite = savedBooks.filter(savedBook => savedBook.id == book.id).length
                           
                            return <Card
                                removeBookLocally={() => { removeBookLocally(book) }}
                                saveBookLocally={() => { saveBookLocally(book) }}
                                book={book}
                                isFavourite={isFavourite}
                                key={book.id}
                                title={book.volumeInfo.title} authors={book.volumeInfo.authors}
                                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                                onClick={() => handleCardClick(book)}
                            />
                        }
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {/* {loading && <progress typeof='spin' />} */}
                        <ClipLoader
                            color={'blue'}
                            loading={loading}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        {!loading && (

                            <button className='load-more-button' onClick={handleLoadMore}>Load More</button>
                        )}
                    </div>
                </>}
            <BookModal isOpen={selectedBook !== null} onClose={handleCloseModal} book={selectedBook} />
        </div>

    );
};

export default BookList;
