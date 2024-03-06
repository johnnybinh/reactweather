import React, { useEffect, useState } from "react";
import sun from "../assets/sun.png";

function WeatherCard() {
  const [cityName, setcityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [iconLink, seticonLink] = useState(
    "https://openweathermap.org/img/wn/10d@4x.png"
  );
  //console.log(import.meta.env.VITE_API_KEY);

  return (
    <div className="w-[25%] h-[55%] flex-wrap rounded-xl flex items-start justify-center bg-white/35">
      <form
        onSubmit={(e) => {
          //console.log(cityName);

          fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=%27${cityName}%27&limit=1&appid=${
              import.meta.env.VITE_API_KEY
            }`
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${
                  res[0].lat
                }&lon=${res[0].lon}&appid=${
                  import.meta.env.VITE_API_KEY
                }&units=metric`
              )
                .then((res) => res.json())
                .then((data) => {
                  setTemp(data.main.temp);
                  seticonLink(
                    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
                  );
                });
              setcityName(res[0].name);
            });
          e.preventDefault();
        }}
        className="w-[100%] mt-10 flex justify-center gap-1"
        action=""
      >
        <input
          onChange={(e) => {
            setcityName(e.target.value);
          }}
          className="w-[65%] h-[2vw] mr-4 indent-3 rounded-xl"
          type="text"
          placeholder="Enter City Name"
          defaultValue={cityName}
          maxLength={30}
        />
        <button type="submit">⌕</button>
      </form>
      <img className="mb-6 mx-[100%] size-40" src={iconLink} alt="" />
      <div className="w-[50%] flex-wrap flex items-center justify-center">
        <center className="w-[100%]">
          <h1 className="font-bold ">{cityName}</h1>
        </center>
        <h1 className="font-bold">{temp}°C</h1>
      </div>
    </div>
  );
}

export default WeatherCard;
