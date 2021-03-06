import { useDataContext, videoConstants } from "../../context";

import { FiSearch } from "react-icons/fi";
import "./search-filter.scss";

import { Tab } from "../";

const SearchFilter = ({ categories }) => {
  const {
    dataState: {
      vid: {
        filterOptions: { category, time, searchQuery },
      },
    },
    dataDispatch,
  } = useDataContext();

  const debounce = (cb, delay = 1000) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    dataDispatch({
      type: videoConstants.SEARCH,
      payload: e.target.value,
    });
  };

  const debounedSearch = debounce(handleSearch);

  const handleFilterByCategory = (name) => {
    dataDispatch({
      type: videoConstants.FILTER_CATEGORY,
      payload: name,
    });
  };

  const handleFilterByTime = (e) => {
    dataDispatch({
      type: videoConstants.FILTER_BY_TIME,
      payload: e.target.value,
    });
  };

  return (
    <div className="b-margin-lg">
      <div className="search-filter b-margin-lg">
        <select
          className="category-dropdown"
          value={time}
          onChange={handleFilterByTime}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <div className="search-container">
          <FiSearch className="search-container__icon" />
          <input
            type="search"
            placeholder="Search by title"
            className="search-container__input"
            onChange={debounedSearch}
            defaultValue={searchQuery}
          />
        </div>
      </div>
      <div className="tabs">
        <Tab
          name="all"
          handleClick={handleFilterByCategory}
          isActive={category === "all"}
        />
        {categories?.map(({ id, categoryName }) => (
          <Tab
            key={id}
            name={categoryName}
            handleClick={handleFilterByCategory}
            isActive={category === categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
