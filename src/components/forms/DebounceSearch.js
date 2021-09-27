import React from "react";

const DebounceSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      value={keyword}
      className="form-control mb-4"
      placeholder="Filter Categories"
      onChange={handleSearchChange}
    />
  );
};

export default DebounceSearch;
