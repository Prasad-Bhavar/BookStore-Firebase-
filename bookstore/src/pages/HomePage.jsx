import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import BookCart from './BookCard';
import CardGroup from 'react-bootstrap/CardGroup';


const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.getAllBook().then(res => setBooks(res.docs));
    }, []);

    return (
        <div className='container mt-4'>
            <CardGroup>
                {books.map((book) => {
                    console.log(book.data());
                    return <BookCart links={`/book/${book.id}/view`} key={book.id} bookId={book.id}  {...book.data()} />
                })}
            </CardGroup>
        </div>
    );
}

export default HomePage;