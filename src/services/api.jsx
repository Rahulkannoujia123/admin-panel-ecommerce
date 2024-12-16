const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  return response.json();
};