import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BlogProvider } from "./store/BlogContext";

function App() {
  return (
    <BlogProvider>
      <AppRouter />
    </BlogProvider>
  );
}

export default App;
