import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BlogProvider } from "./store/BlogContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BlogProvider>
      <AppRouter />
      <ToastContainer />
    </BlogProvider>
  );
}

export default App;
