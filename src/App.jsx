import AgeCalculator from "./component/AgeCalculator.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./component/Footer.jsx";
function App() {
  return (
    <div className="select-none">
      <Toaster position="top-center" reverseOrder={false} />
      <AgeCalculator />
      <Footer/>
    </div>
  );
}

export default App;
