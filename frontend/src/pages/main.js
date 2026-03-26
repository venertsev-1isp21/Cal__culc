import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import notepadImg from "../assets/notepad.png";
import foodDefault from "../assets/notebook.png";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchQuery } from "../store/slices/uiSlice";
import { fetchMeals, addMeal, removeMeal } from "../store/slices/mealsSlice";

const API = "http://127.0.0.1:8000/api";

const Main = () => {
  const token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toISOString().split('T')[0]; // ✅ Сначала объявляем
  const searchQuery = useAppSelector(state => state.ui.searchQuery);
  const { mealsByDate, loading: mealsLoading } = useAppSelector(state => state.meals);
  const rows = mealsByDate[formattedDate] || [];

  const [searchResults, setSearchResults] = useState([]);
  const [newAmount, setNewAmount] = useState("");
  const [selectedFood, setSelectedFood] = useState({
    id: null,
    name: "",
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    photo: ""
  });

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // =============================
  // HELPERS
  // =============================
  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  // =============================
  // USER INFO QUERY
  // =============================
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axios.get(`${API}/user_info/`, authHeader);
      return res.data;
    }
  });

  // =============================
  // LOAD MEALS FOR SELECTED DATE
  // =============================
  useEffect(() => {
    if (token) {
      dispatch(fetchMeals({ date: formattedDate, token }));
    }
  }, [formattedDate, token, dispatch]);

  // =============================
  // TOTALS
  // =============================
  const totalCalories = rows.reduce((s, m) => s + (m.calories || 0), 0);
  const totalProteins = rows.reduce((s, m) => s + (m.proteins || 0), 0);
  const totalFats = rows.reduce((s, m) => s + (m.fats || 0), 0);
  const totalCarbs = rows.reduce((s, m) => s + (m.carbohydrates || 0), 0);

  const caloriePercentage = userInfo?.calorie_norm
    ? Math.round((totalCalories / userInfo.calorie_norm) * 100)
    : 0;

  // =============================
  // SEARCH FOOD
  // =============================
  const handleSearchChange = async (e) => {
    const q = e.target.value;
    dispatch(setSearchQuery(q));

    setSelectedFood({ id: null, name: "", calories: 0, proteins: 0, fats: 0, carbohydrates: 0, photo: "" });

    if (!q) return setSearchResults([]);

    const res = await axios.get(`${API}/foods/?q=${q}`, authHeader);
    setSearchResults(res.data);
  };

  const handleSelectFood = (food) => {
    setSelectedFood({ ...food, photo: food.photo || foodDefault });
    setSearchResults([]);
  };

  const handleAddMeal = () => {
    if (!selectedFood.id || !newAmount) return;
    dispatch(addMeal({
      food: selectedFood.id,
      amount: parseInt(newAmount),
      date: formattedDate,
      token
    }));

    setNewAmount("");
    setSelectedFood({ id: null, name: "", calories: 0, proteins: 0, fats: 0, carbohydrates: 0, photo: "" });
    dispatch(setSearchQuery(""));
  };

  const handleDeleteMeal = (id) => {
    dispatch(removeMeal({ id, date: formattedDate, token }));
  };

  if (mealsLoading) return <div>Загрузка...</div>;

  return (
    <div className="Mroot">
      {/* LEFT PANEL */}
      <div className="Mleft_per_box">
        <p>Percentage of goal completed</p>
        <div className="Mper_circle">
          <h1 className="Mper_text_big">{caloriePercentage}%</h1>
          <p className="Mper_text">From {userInfo?.calorie_norm}</p>
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
          <h1 className="home_title">Welcome</h1>
          <Link className="Mprofile_zone" to="/profile">
            <div className="Mprofile_name">{userInfo?.username}</div>
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

            {searchResults.length > 0 && (
              <div className="Mfood_list_src">
                {searchResults.map((f) => (
                  <p key={f.id} className="search_contant" onClick={() => handleSelectFood(f)}>
                    {f.name}
                  </p>
                ))}
              </div>
            )}

            <div className="Madd_food_box">
              <div className="Mfood_pic_big_box">
                <p className="Mfood_name">{selectedFood.name || "Choose food"}</p>
                <img className="Mpic_food" src={selectedFood.photo || foodDefault} alt="" />
              </div>
              <div className="Madd_food_right_box">
                <p>Enter quantity:</p>
                <input
                  className="Menter_foob_gram"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
                <div className="Madd_food_button" onClick={handleAddMeal}>Add</div>
              </div>
            </div>
          </div>

          {/* RIGHT NOTES */}
          <div className="Mright_right_box">
            <div className="notepad" style={{ backgroundImage: `url(${notepadImg})` }}>
              <h2 className="notebook-title">Already eaten</h2>
              <table className="data-table">
                <tbody className="Mtable_body">
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td className="Mtable_food_name">{row.food_name}</td>
                      <td className="Mtable_food_weight">{row.amount}g</td>
                      <td>
                        <button className="Delete_button" onClick={() => handleDeleteMeal(row.id)}>🗑️</button>
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