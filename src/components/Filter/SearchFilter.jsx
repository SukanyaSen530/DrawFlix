import { useDataContext, videoConstants } from "../../context";

import { FiSearch } from "react-icons/fi";
import "./search-filter.scss";

const SearchFilter = ({ categories }) => {
  const {
    dataState: {
      vid: {
        filterOptions: { category },
      },
    },
    dataDispatch,
  } = useDataContext();

  const handleSearch = (e) => {
    setTimeout(() => {
      dataDispatch({
        type: videoConstants.SEARCH,
        payload: e.target.value,
      });
    }, 1000);
  };

  return (
    <div className="search-filter b-margin-lg">
      <select
        className="category-dropdown"
        value={category}
        onChange={(e) =>
          dataDispatch({
            type: videoConstants.FILTER_CATEGORY,
            payload: e.target.value,
          })
        }
      >
        <option value="all"> All </option>
        {categories?.map((data) => (
          <option key={data.id} value={data.categoryName}>
            {data.categoryName}
          </option>
        ))}
      </select>

      <div className="search-container">
        <FiSearch className="search-container__icon" />
        <input
          type="search"
          placeholder="Search by video title and category"
          className="search-container__input"
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
