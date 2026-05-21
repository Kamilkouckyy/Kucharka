const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
 
export const getRecepty = async () => {
  const res = await fetch(`${API_URL}/recepty`);
  const data = await res.json();
  return data.data;
};
 
export const getRecept = async (id) => {
  const res = await fetch(`${API_URL}/recepty/${id}`);
  const data = await res.json();
  return data.data;
};
 
export const createRecept = async (recept) => {
  const res = await fetch(`${API_URL}/recepty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recept),
  });
  const data = await res.json();
  return data.data;
};
 
export const updateRecept = async (id, recept) => {
  const res = await fetch(`${API_URL}/recepty/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recept),
  });
  const data = await res.json();
  return data.data;
};
 
export const deleteRecept = async (id) => {
  await fetch(`${API_URL}/recepty/${id}`, { method: 'DELETE' });
};
 
export const hodnotitRecept = async (id, rating) => {
  const res = await fetch(`${API_URL}/recepty/${id}/hodnoceni`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  const data = await res.json();
  return data.data;
};
 
export const getSuroviny = async () => {
  const res = await fetch(`${API_URL}/suroviny`);
  const data = await res.json();
  return data.data;
};
 
export const createSurovina = async (surovina) => {
  const res = await fetch(`${API_URL}/suroviny`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(surovina),
  });
  const data = await res.json();
  return data.data;
};
 
export const deleteSurovina = async (id) => {
  await fetch(`${API_URL}/suroviny/${id}`, { method: 'DELETE' });
};
 