import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoutes.tsx";
import '../1_app/styles/index.css'

function App() {

  return (
      <BrowserRouter>
          <AppRoute />
      </BrowserRouter>
  )
}

export default App
