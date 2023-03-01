import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

/* returns an element representing a cityButton*/
function CityButton ({name, onCityClick}){
  return <button class="citybtn" onClick={onCityClick}> { name } </button>;
}

function InputButton ({onInputClick}){
  return <button class='addbtn' onClick={onInputClick}>+</button>;
}

function DisplayCurrentWeather({val}){
  return (
    <div>
      <h1>Current Weather: {val} °C</h1>
    </div>
  );
}

function DisplayNextFewDays({time, temp}){
  if(time != null && temp != null){
    return (
      <div>
        <div>
          <h1 class='alignleft'>Time</h1> 
          <h1 class='alignright'>Temp</h1> 
        </div>
        
        <div class='alignleft'>
          <p>{time[1].substring(time[1].length - 5)}</p>
          <p>{time[2].substring(time[2].length - 5)}</p>
          <p>{time[3].substring(time[3].length - 5)}</p>
          <p>{time[4].substring(time[4].length - 5)}</p>
          <p>{time[5].substring(time[5].length - 5)}</p>
          <p>{time[6].substring(time[6].length - 5)}</p>
          <p>{time[7].substring(time[7].length - 5)}</p>
          <p>{time[8].substring(time[8].length - 5)}</p>
          <p>{time[9].substring(time[9].length - 5)}</p>
          <p>{time[10].substring(time[10].length - 5)}</p>
        </div>
        <div class='alignright'>
          <p> {temp[1]}°C</p>
          <p> {temp[2]}°C</p>
          <p> {temp[3]}°C</p>
          <p> {temp[4]}°C</p>
          <p> {temp[5]}°C</p>
          <p> {temp[6]}°C</p>
          <p> {temp[7]}°C</p>
          <p> {temp[8]}°C</p>
          <p> {temp[9]}°C</p>
          <p> {temp[10]}°C</p>
        </div>
      </div>
    );
  }
  return "No data available for this region";
}




function App() {
  // beginning state
  let weather = ["https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&hourly=temperature_2m&current_weather=true", 
                  "https://api.open-meteo.com/v1/forecast?latitude=29.76&longitude=-95.36&hourly=temperature_2m&current_weather=true", 
                  "https://api.open-meteo.com/v1/forecast?latitude=32.78&longitude=-96.81&hourly=temperature_2m&current_weather=true", null];
  let displayThis = weather[0];
  const [currentTemp, setCurrent] = useState(null); 
  const [times, setTime] = useState(null);
  const [temps, setTemp] = useState(null);
  const [curCity, setCity] = useState(0);
  const [userLat,setLat] = useState(null);
  const [userLon,setLon] = useState(null);
  const [userURL, setURL] = useState(null);

  /**
   * runs one time at the opening of app, ensure array's
   *  will not be null essentially
   */
  useEffect(() => {
    // only runs once
    console.log('useEffect ran');
    handleWeatherDisplay(0);
  }, []);



  /* set the URL and city for the required location */ 
  function handleWeatherDisplay(i){
    displayThis = weather[i];
    setCity(i);
    console.log(weather.length + " " + i);
    RetrieveInfo(displayThis);
  }

  /* retrieves JSON from the given url and sets state.*/
  function RetrieveInfo ( url ) { 
    fetch(url)
      .then(res=>res.json())
      .then((json)=>{
        const data = JSON.parse(JSON.stringify(json));
        setCurrent( data.current_weather.temperature);
        setTime(data.hourly.time);
        setTemp(data.hourly.temperature_2m);
      });
  }

  function createButton(lat, long){
    console.log("creatButtonCalled");
    if(lat != null && long != null){
      if(lat <= 90 && lat >=-90 && long <= 180 && long >= -180){
        //TODO create button
        let x = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +"&longitude=" + long + "&hourly=temperature_2m&current_weather=true";
        weather.pop();
        weather.push(x);
        setURL(x);
        console.log("display info with lat:" + lat + " and long: " + long);
        RetrieveInfo(x);
      } else{
        alert("no weather for city");
      }
    }
  }

  const getLat = (event)=>{
    // do cool stuff here!
    setLat(event.target.value);
  };

  const getLong = (event)=>{
    // do cool stuff here!
    setLon(event.target.value);
  };


  return (
    <div className="App">
      <header clasName="App-header">
        <div><p> </p></div>
        <div>
          <CityButton name="Austin" onCityClick={() => handleWeatherDisplay(0)}></CityButton>
          <CityButton name="Dallas" onCityClick={() => handleWeatherDisplay(2)}></CityButton>
          <CityButton name="Houston" onCityClick={() => handleWeatherDisplay(1)}></CityButton>
        </div>
    
        <div>
          <label>Latitude: </label>
          <input type="number" id="lat" onChange={getLat} />
        </div>
        <div>
          <label>Longitude: </label>
          <input type="number" id="long" onChange={getLong}/>
        </div>
        <InputButton onInputClick={() => createButton(userLat, userLon)}></InputButton>

        <DisplayCurrentWeather val={currentTemp}></DisplayCurrentWeather>
        <DisplayNextFewDays time={times} temp={temps}></DisplayNextFewDays>
        
      </header>
    </div>
  );
}

export default App;
