export const fetchMainData = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/main/') 
  // ← URL не меняю, подставь свой если другой

  if (!response.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  return response.json()
}
