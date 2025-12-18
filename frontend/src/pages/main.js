import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import notepadImg from "../assets/notepad.png";
import foodDefault from "../assets/notebook.png";

const Main = () => {
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // текущая дата
  const [newAmount, setNewAmount] = useState("");
  const [userInfo, setUserInfo] = useState({ username: "", calorie_norm: 0 });

  // TOTAL KБЖУ
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // SELECTED FOOD
  const [selectedFood, setSelectedFood] = useState({
    id: null,
    name: "",
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    photo: ""
  });

  const token = localStorage.getItem("access_token");

  // DATE
  const formatDate = (date) => date.toISOString().split('T')[0];

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // =============================
  // LOGOUT
  // =============================
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      const response = await axios.post("http://127.0.0.1:8000/api/api/token/refresh/", { refresh });
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } catch {
      handleLogout();
    }
  };

  const fetchUserData = async () => {
    try {
      let access = token;
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user_info/", {
          headers: { Authorization: `Bearer ${access}` }
        });
        setUserInfo(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          access = await refreshToken();
          const res = await axios.get("http://127.0.0.1:8000/api/user_info/", {
            headers: { Authorization: `Bearer ${access}` }
          });
          setUserInfo(res.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // LOAD MEALS + TOTAL KБЖУ
  // =============================
  const fetchMeals = async () => {
    try {
      let access = token;
      const formattedDate = formatDate(selectedDate);
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/meals/?date=${formattedDate}`, {
          headers: { Authorization: `Bearer ${access}` }
        });
        setRows(res.data);

        // расчет БЖУ
        const totalCals = res.data.reduce((s, m) => s + (m.calories || 0), 0);
        const totalProt = res.data.reduce((s, m) => s + (m.proteins || 0), 0);
        const totalFat  = res.data.reduce((s, m) => s + (m.fats || 0), 0);
        const totalCarb = res.data.reduce((s, m) => s + (m.carbohydrates || 0), 0);

        setTotalCalories(totalCals);
        setTotalProteins(totalProt);
        setTotalFats(totalFat);
        setTotalCarbs(totalCarb);

      } catch (err) {
        if (err.response?.status === 401) {
          access = await refreshToken();
          fetchMeals();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchMeals();
  }, []);

  useEffect(() => {
    fetchMeals(); // обновляем список при смене даты
  }, [selectedDate]);

  // =============================
  // SEARCH FOOD
  // =============================
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    setSelectedFood({ id: null, name: "", calories: 0, proteins: 0, fats: 0, carbohydrates: 0, photo: "" });

    if (!query) return setSearchResults([]);

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/foods/?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // SELECT FOOD
  // =============================
  const handleSelectFood = (food) => {
    setSelectedFood({
      id: food.id,
      name: food.name,
      calories: food.calories,
      proteins: food.proteins,
      fats: food.fats,
      carbohydrates: food.carbohydrates,
      photo: food.photo || foodDefault
    });
    setSearchResults([]);
  };
  // =============================
  // DELETE FOOD
  // =============================
  const recalcTotals = (meals) => {
    const totalCals = meals.reduce((s, m) => s + (m.calories || 0), 0);
    const totalProt = meals.reduce((s, m) => s + (m.proteins || 0), 0);
    const totalFat  = meals.reduce((s, m) => s + (m.fats || 0), 0);
    const totalCarb = meals.reduce((s, m) => s + (m.carbohydrates || 0), 0);

    setTotalCalories(totalCals);
    setTotalProteins(totalProt);
    setTotalFats(totalFat);
    setTotalCarbs(totalCarb);
  };

  // =============================
  // ADD MEAL
  // =============================
  const addRow = async () => {
  if (!selectedFood.name) return alert("Выберите продукт");
  if (!newAmount || isNaN(newAmount)) return alert("Введите корректное количество");

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/meals/",
      {
        food: selectedFood.id,
        amount: parseInt(newAmount),
        date: formatDate(selectedDate)  // <-- передаём выбранную дату
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNewAmount("");
    setSelectedFood({
      name: "",
      calories: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      photo: ""
    });
    setSearchQuery("");

    fetchMeals(); // обновляем список еды
  } catch (err) {
    console.error(err);
    alert("Ошибка добавления продукта");
  }
};


  const caloriePercentage = userInfo.calorie_norm
    ? Math.round((totalCalories / userInfo.calorie_norm) * 100)
    : 0;

  return (
    <div className="Mroot">
      {/* LEFT PANEL */}
      <div className="Mleft_per_box">
        <p>Percentage of goal completed</p>

        <div className="Mper_circle">
          <h1 className="Mper_text_big">{caloriePercentage}%</h1>
          <p className="Mper_text">From {userInfo.calorie_norm}</p>
        </div>

        <p>Keep up the good work! 😁</p>

        <div className="Mbox_params">
          <div className="Mleaft_param_pox"><div>Calories:</div><div>{totalCalories}</div></div>
          <div className="Mleaft_param_pox"><div>Proteins:</div><div>{totalProteins}</div></div>
          <div className="Mleaft_param_pox"><div>Fats:</div><div>{totalFats}</div></div>
          <div className="Mleaft_param_pox"><div>Carbohydrates:</div><div>{totalCarbs}</div></div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="Mright_big_box">

        <div className="Mheader">
          <div className="Mlogout_zone" onClick={handleLogout}>
            <div className="Mlogout_button">↪</div>
            <p className="Mlogout_text">Log out</p>
          </div>

          <h1 className="home_title" >Welcome</h1>

          <Link className="Mprofile_zone" to="/profile">
            <div className="Mprofile_name">{userInfo.username}</div>
            <div className="Mprofile_button">👤</div>
          </Link>
        </div>

        <div className="Mright_box">

          {/* LEFT AREA */}
          <div className="Mright_left_box">

            <div className="Mdate_n_search">

              <div className="Mdate">
                <div className="Mdate_button" onClick={() => changeDate(-1)}>┃◀</div>
                <p>{selectedDate.toDateString()}</p>
                <div className="Mdate_button" onClick={() => changeDate(1)}>▶┃</div>
              </div>

              <div className="Msearch">
                <input
                  className="Msearch_left"
                  placeholder="Search food"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="Msearch_right">🔍︎</div>
              </div>

            </div>

            {/* FOOD SELECTED BOX */}
            {searchResults.length > 0 && (
              <div className="Mfood_list_src">
                {searchResults.map((f, idx) => (
                  <p className="search_contant" key={idx} onClick={() => handleSelectFood(f)}>{f.name}<br/></p> 
                ))}
              </div>
            )}

            <div className="Madd_food_box">
              <div className="Mfood_pic_big_box">
                <p className="Mfood_name">{selectedFood.name || "Choose food"}</p>
                <img
                  className="Mpic_food"
                  src={selectedFood.photo || foodDefault}
                  alt="Извините, изображения нет"
                />
              </div>

              <div className="Madd_food_right_box">
                <p className="Mfood_right_box_text">Enter quantity:</p>
                <input
                  className="Menter_foob_gram"
                  placeholder="Amount (grams)"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
                <div className="Madd_food_button" onClick={addRow}>
                  Add
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT NOTES */}
          <div className="Mright_right_box">
            <div className="notepad" style={{ backgroundImage: `url(${notepadImg})` }}>
              <h2 className="notebook-title">Already eaten</h2>

              <table className="data-table">
                <tbody className="Mtable_body">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="Mtable_food_name">{row.food_name}</td>
                      <td className="Mtable_food_weight">{row.amount}g</td>
                      <td className="Mtable_food_radio">
                        <button
                          onClick={async () => {
                            try {
                              await axios.delete(`http://127.0.0.1:8000/api/meals/${row.id}/`, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              const newRows = rows.filter(r => r.id !== row.id);
                              setRows(newRows);
                              recalcTotals(newRows); // обновляем суммарные калории и БЖУ
                            } catch (err) {
                              console.error(err);
                              alert("Ошибка удаления продукта");
                            }
                          }}
                          className="Delete_button"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Main;
