import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-300">
      <WeatherCard />
    </div>
  );
}

export default App;
