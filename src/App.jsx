import "./App.scss";

import { Footer, Navbar } from "./components";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  return (
    <main>
      <Navbar />
      <section className="main-section">
        <AllRoutes />
      </section>
      <Footer />
    </main>
  );
};

export default App;
