import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCart from "./BookCard";

const OrderPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState(null);
    useEffect(() => {
        if (firebase.isLoading) {
            firebase.fetchMyBook(firebase.user.uid).then(res => setBooks(res.docs));
        }
    }, [firebase])
    if (books == null) {
        return <h1> loading...</h1>
    }
    return (
        <>{
            books.map(book => {
                return <BookCart links={`/book/order/${book.id}`} key={book.id} bookId={book.id} {...book.data()} />
            })
        }</>
    )
};

export default OrderPage;