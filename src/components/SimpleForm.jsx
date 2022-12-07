import React from 'react'
import { GlobleContext } from './context'
const SimpleForm = () => {
    const { query, handle_search } = GlobleContext();
    return (
        <form className='search-form' onSubmit={(e) => e.preventDefault()}>
            <h2>Search Hacker News</h2>
            <input type="text" className='form-input'
                value={query}
                onChange={(e) => handle_search(e.target.value)}
            />
        </form>
    )
}

export default SimpleForm