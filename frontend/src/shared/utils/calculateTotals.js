export const calculateTotals = (rows) => {
  return {
    calories: rows.reduce((s, m) => s + (m.calories || 0), 0),
    proteins: rows.reduce((s, m) => s + (m.proteins || 0), 0),
    fats: rows.reduce((s, m) => s + (m.fats || 0), 0),
    carbs: rows.reduce((s, m) => s + (m.carbohydrates || 0), 0),
  };
};