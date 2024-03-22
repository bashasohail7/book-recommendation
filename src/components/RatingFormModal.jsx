import React, { useState } from 'react';
import Modal from '../common/Modal';
import '../styles/ratingForm.css'

const RatingFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert('Please select a valid rating between 1 and 5.');
      return;
    }
    if (!comment.trim().length<4) {
      alert('Please enter a valid comment.');
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Rate and Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </div>
        <div style={{display:'flex'}}>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default RatingFormModal;
