import React, { useEffect } from 'react';
import {gql, useLazyQuery, useQuery} from '@apollo/client';

const getBooksQuery = gql`
{
    books{
        name
        id
        author{
            name
        }
    }
}
`

const BookList = () => {    
    const [execute, {loading, data}] = useLazyQuery(getBooksQuery);
    
    useEffect(() => {
        console.log(
            loading,
            data
        );
        
        execute();
        return () => {
            
        }
    }, []);

    return (
        <ul>
            {
                data && data.books ? 
                    data.books.map((book) => {
                        return (
                            <li key={book.id}>
                                {book.name} by {book.author.name}
                            </li>
                        )
                    }): 
                    ('')
            }
        </ul>
    )
}

export default BookList