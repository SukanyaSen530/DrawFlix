import "./App.scss";

import { Footer, Navbar, Alert } from "./components";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  return (
    <main>
      <Navbar />
      <section className="main-section" style={{ paddingTop: "10rem" }}>
        <Alert />
        <AllRoutes />
      </section>
      <Footer />
    </main>
  );
};

export default App;
