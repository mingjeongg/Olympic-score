import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import React from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  //map 돌릴거니까 배열로
  //목록을 다루기 젤 편한게 배열
  // [{ 국가: "" ,금메달: '', 은메달:'', 동메달:''},
  // { 국가: "" ,금메달: '', 은메달:'', 동메달:''},
  // { 국가: "" ,금메달: '', 은메달:'', 동메달:''},
  // { 국가: "" ,금메달: '', 은메달:'', 동메달:''},]
  const [nation, setNation] = useState("");
  const [gold, setGold] = useState("0");
  const [silver, setSilver] = useState("0");
  const [bronze, setBronze] = useState("0");

  const nationInputHandler = (e) => {
    setNation(e.target.value);
  };
  const goldInputHandler = (e) => {
    setGold(e.target.value);
  };
  const silverInputHandler = (e) => {
    setSilver(e.target.value);
  };
  const bronzeInputHandler = (e) => {
    setBronze(e.target.value);
  };

  //수정 함수
  //input칸에 새로 넣은 값이 원래 있던 값 리스트의 국가랑 동일하면서, 메달 수는 다를때, 바꾼다
  const editCountries = () => {
    //countries를 수정하는 로직
    // 사용자의 입력값이

    const sameCountry = countries.find((country) => {
      return country.nation === nation;
    });
    const newCountries = countries.map((country) => {
      if (sameCountry.nation === country.nation) {
        const newMedal = {
          nation: nation,
          gold: gold,
          silver: silver,
          bronze: bronze,
        };
        return newMedal;
      } else {
        return country;
      }
    });
    setCountries(newCountries);
  };

  //추가함수
  const addCountry = (e) => {
    // form태그 안에 있는 버튼을 누를때마다 새로고침 하는거 막아줘
    // e 어디서 받아? -> 매개변수로 e 넣어줘
    e.preventDefault();
    const isIncluded = countries.some((country) => {
      return country.nation === nation;
    });
    if (isIncluded) {
      return alert("안돼");
    }
    const newInfo = {
      nation: nation,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };
    setCountries([...countries, newInfo]);
  };

  //삭제함수
  // name - props.info.nation 받아온 거 매개변수를 사용해서 활용할 수 있다
  const deleteCountry = (name) => {
    // 삭제버튼을 누르면 //삭제해라
    //포함사지 않는거
    const unincludedCountries = countries.filter((country) => {
      return country.nation !== name;
    });
    setCountries(unincludedCountries);
  };

  return (
    <div className="main-container">
      <h1>2024 파리 올림픽</h1>
      <form className="input-form">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <div className="input-field">
              {/* htmlFor, id - label 클릭했을때 커서가 input창 안으로 가게 함 */}
              <label htmlFor="country">국가명 </label>
              <input
                id="country"
                type="text"
                onChange={nationInputHandler}
                value={nation}
              />
            </div>
            <div className="input-field">
              <label htmlFor="gold">금메달 </label>
              <input
                id="gold"
                type="number"
                onChange={goldInputHandler}
                value={gold}
              />
            </div>
            <div className="input-field">
              <label htmlFor="silver">은메달 </label>
              <input
                id="silver"
                type="number"
                onChange={silverInputHandler}
                value={silver}
              />
            </div>
            <div className="input-field">
              <label htmlFor="bronze">동메달 </label>
              <input
                id="bronze"
                type="number"
                onChange={bronzeInputHandler}
                value={bronze}
              />
            </div>

            <div className="button-grop">
              <button onClick={addCountry}>국가추가</button>
              <button onClick={editCountries}>업데이트</button>
            </div>
          </div>

          <div>
            <Mother
              //안전하 고유의 값을 쓰는게 좋음, 서버에서 데이터 가져올땐 서버에서 고유한 값을 줌
              key={crypto.randomUUID()}
              info={countries}
              deleteCountry={deleteCountry}
            />
            ;
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;

const Mother = (props) => {
  console.log(props);
  return (
    <>
      {/* //객체 그대로는 div에 찍을 수 없다. string num 이런 것만 들어갈 수 있다  */}
      {/* <div>{props.info}</div> */}
      {/* <table className="tale-wrapper">
        <thead>
          <tr>
            <th>국가명</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((props.info) => {
            return (
              <tr>
                <td>{props.info.nation}</td>
                <td>{props.info.gold}</td>
                <td>{props.info.silver}</td>
                <td>{props.info.bronze}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}

      {/* <button onClick={() => props.deleteCountry(props.info.nation)}>
        삭제
      </button> */}
    </>
  );
};
