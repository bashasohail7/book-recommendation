import React, { useState } from 'react';
import '../styles/userRecommendation.css'; // Import the CSS file

const UserRecommendationForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !recommendation) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ title, author, recommendation });
    setTitle('');
    setAuthor('');
    setRecommendation('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recommendation">Recommendation:</label>
        <textarea
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
        />
      </div>
      <button type="submit">Submit Recommendation</button>
    </form>
  );
};

export default UserRecommendationForm;
