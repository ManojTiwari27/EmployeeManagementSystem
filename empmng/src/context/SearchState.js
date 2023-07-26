import React from 'react'
import { createContext ,useState } from "react";

const SearchContext = createContext();


const SearchState = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <SearchContext.Provider value={{searchQuery , setSearchQuery}}>
         {props.children}
        </SearchContext.Provider>
      )
}

export {SearchContext}

export default SearchState