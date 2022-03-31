import { Routes, Route } from "react-router-dom";

import { Home, VideoListing, SignIn, SignUp } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/expore" element={<VideoListing />} />
    </Routes>
  );
};

export default AllRoutes;
