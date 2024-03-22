import React, { useState } from 'react'
import RatingFormModal from './RatingFormModal';
import FullHeart from '../assets/icons8-heart-48.png'
import OutlinedHeart from '../assets/icons8-heart-50 (1).png'
const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
function Card({ thumbnail, authors, title, onClick, saveBookLocally, removeBookLocally, isFavourite, isFavouriteComponent }) {

    const [modalOpen, setModalOpen] = useState(false);
    const rate = (e) => {
        e.stopPropagation()
        setModalOpen(true)
    }

    return (
        <div className='card' >
            <div className='cursor-pointer' onClick={onClick}>
                <img className='image' src={thumbnail} height={120} width={150} />
                <div className='content'>
                    <b className='title'>{title.slice(0,30)}</b>
                    <p className='authors'>
                        {
                            authors ? authors.join(',') : ''
                        }
                    </p>

                </div>
            </div>

            <div className='card-footer'>
                {!isFavouriteComponent &&
                    <div>

                        {isFavourite ? <img src={FullHeart} width={30} onClick={removeBookLocally} /> :
                            <img onClick={saveBookLocally} src={OutlinedHeart} width={30} />
                        }
                    </div>}
                <button className='rate-btn' onClick={rate}>Rate</button>
            </div>
            <RatingFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={(data) => console.log(data)} />
        </div>
    )
}

export default Card