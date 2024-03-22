import React from 'react';
import CrossIcon from '../assets/icons8-cross-48.png'
import Modal from '../common/Modal';

const BookModal = ({ isOpen, onClose, book }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <img className="cross-icon" src={CrossIcon} height={30} width={40} onClick={onClose} />
            <div>
                <img src={book.volumeInfo.imageLinks.thumbnail || ''} alt={`thumbnail for ${book.volumeInfo.title}`} />
                <h2>{book.volumeInfo.title}</h2>
                <p><span className='bold-text'>Author:</span> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'NA'}</p>
                <p><span className='bold-text'>Categories:</span> {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'NA'}</p>
                <p><span className='bold-text'>Publisher:</span> {book.volumeInfo.publisher}</p>
                <p><span className='bold-text'>Published Date:</span> {book.volumeInfo.publishedDate}</p>
                <p><span className='bold-text'>Description:</span> {book.volumeInfo.description}</p>
            </div>
        </Modal>
    );
};

export default BookModal;
