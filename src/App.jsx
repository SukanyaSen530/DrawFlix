import "./App.scss";

import { Footer, Navbar, Alert, PlayListModal } from "./components";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  return (
    <main>
      <Navbar />
      <section className="main-section">
        <Alert />
        <PlayListModal />
        <AllRoutes />
      </section>
      <Footer />
    </main>
  );
};

export default App;
