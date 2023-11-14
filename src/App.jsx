import { RoutesMain } from "./routes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "./styles/reset.scss"

function App() {

  return (
    <>
      <RoutesMain/>
      <ToastContainer/>
    </>
  )
}

export default App
