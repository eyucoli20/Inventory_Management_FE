import "./App.css";
import AppBar from "./AppBar";
import Product from "./Product";
import Shelve from "./Shelve";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <AppBar />
        <Routes>
          <Route index  element={<Product />} />
          <Route exact path="/Shelve" element={<Shelve />} />
        </Routes>
      </QueryClientProvider>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
