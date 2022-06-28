import { BrowserRouter, Routes, Route } from "react-router-dom";

/* importamos el AuthProvider*/
import { AuthProvider } from "./context/AuthProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/*" element={<AppRouter />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
