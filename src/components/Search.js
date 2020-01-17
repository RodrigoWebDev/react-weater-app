import React from "react"

const Search = ({handleSubmit, handleChange}) => (
    <form onSubmit={handleSubmit} className="search">
        <input onChange={handleChange} type="text" placeholder="Busca por cidade" />
        <button className="button" type="submit">Procurar</button>
    </form>
)

export default Search