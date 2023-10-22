import React from 'react';

const Navbar = ({ query, changeHandler, searchMovie }) => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="text-2xl font-semibold pl-8">Movies</div>
      <form className="flex items-center" onSubmit={searchMovie}>
        <input
          type="search"
          placeholder="Movie Search"
          className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none w-full"
          name="query"
          value={query}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg ml-2 px-4 py-2"
        >
          Search
        </button>
      </form>
    </div>
  </nav>
);

export default Navbar;
