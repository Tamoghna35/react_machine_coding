/** @format */

import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});
  function handleInput(event) {
    setInput(event.target.value);
  }
  async function fetchData() {
    if (cache[input]) {
      console.log("Api call from Cache", input);

      console.log("cache", cache);
      setResult(cache[input]);
      console.log("cache input", cache[input]);

      return;
    }
    console.log(`Api Call`, input);

    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const result = await data.json();
    console.log(result);

    setResult(result?.recipes);
    setCache((previous) => ({ ...previous, [input]: result?.recipes }));
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h2>SeaechBar</h2>
      <input
        type="text"
        className="text__box__style"
        value={input}
        onChange={handleInput}
        onFocus={() => {
          setShowResult(true);
        }}
        onBlur={() => {
          setShowResult(false);
        }}
      />
      {showResult && (
        <div className="result__box__style">
          {result.map((item) => (
            <div key={item.id} className="item__style">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
