import React,{useRef} from 'react';
import '../styles/header.css'
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch, onRecommend }) => {
    const searchRef=useRef('')
    const history = useNavigate()
    const handleSearch = (e) => {
        let prevValue=searchRef.current.value
        console.log("searchRef ===>",searchRef.current.value)
        onSearch(prevValue)
    };

    const handleRecommend = () => {
        history('recommendbook')
    };
    const myFavouites = () => {
        history('myFavourites')
    };

    return (
        <div className="search-recommend-container">
            <div className="search-container">
                <input ref={searchRef} type="text" placeholder="Search books by title..." />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="recommend-container">
                <button className='recommend-button' onClick={handleRecommend}>Recommend a Book</button>
                <button className='favourite-button' onClick={myFavouites}>My Favourites</button>
            </div>
        </div>
    );
};

export default Header;
