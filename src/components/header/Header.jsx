import React from "react";
import Search from "./hover-card/Search";
import SearchResult from "./hover-card/SearchResult";

const Header = () => {
  return (
    <div className="">
      {/* Modales */}
      <Search />
      <SearchResult />
    </div>
  );
};

export default Header;
