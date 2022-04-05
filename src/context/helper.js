export const compose =
  (...fns) =>
  (state, data) =>
    fns.reduce((acc, curr) => curr(state, acc), data);

export const getSearchResults = (
  {
    vid: {
      filterOptions: { searchQuery },
    },
  },
  data
) => {
  if (searchQuery !== "") {
    return data?.filter((video) =>
      video.title?.toLowerCase().includes(searchQuery?.toLowerCase())
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
  if (category === "all" || category === "") return data;
  else
    return data?.filter((video) =>
      video.categoryName?.toLowerCase().includes(category?.toLowerCase())
    );
};


export const addedorRemovedVideo = (playlists, newPlaylist) => {
  const index = playlists.findIndex((item) => item._id === newPlaylist._id);

  return [
    ...playlists.slice(0, index),
    newPlaylist,
    ...playlists.slice(index + 1),
  ];
};