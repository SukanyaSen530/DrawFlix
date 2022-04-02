export const compose =
  (...fns) =>
  (state, data) =>
    fns.reduceRight((acc, curr) => curr(state, acc), data);

export const getSearchResults = (
  {
    vid: {
      filterOptions: { searchQuery },
    },
  },
  data
) => {
  if (searchQuery !== "") {
    return data?.filter(
      (video) =>
        video.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        video.categoryName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  }
  return data;
};

export const filterByCategory = (
  {
    vid: {
      filterOptions: { category },
    },
  },
  data
) => {
  if (category === "all") return data;
  else
    data?.filter((video) =>
      video.categoryName?.toLowerCase().includes(category.toLowerCase())
    );
};
