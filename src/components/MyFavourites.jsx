import React,{useState} from 'react'
import Card from './Card';

function MyFavourites() {
    const localSavedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const [savedBooks, setSavedBooks] = useState(localSavedBooks)

    const saveBookLocally = (passedBook) => {
        const bookDetails = passedBook;
        savedBooks.push(bookDetails);
        localStorage.setItem('savedBooks', JSON.stringify([...localSavedBooks,...passedBook]));
        setSavedBooks(prev => [...prev, passedBook])
    };
    const removeBookLocally = (passedBook) => {
        const filteredBooks = savedBooks.filter(book => book.id !== passedBook.id)
        localStorage.setItem('savedBooks', JSON.stringify(filteredBooks));
        setSavedBooks(() => [...filteredBooks])
    }
    console.log('favourites rendering...')
    return (
        <>
            <h3 className='favourite-heading'>YOUR FAVOURITES </h3>
            <div className='favourites-card-container'>
                {localSavedBooks.map((book, index) => {
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
        </>

    )
}

export default MyFavourites