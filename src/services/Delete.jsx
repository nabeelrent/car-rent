import axios from 'axios';

export const connectAPIViaDelete = async (contextPath, data = {}, useParams = false) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL + contextPath;
    const token = localStorage.getItem('access_token');

    // Prepare headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // If useParams is true, send the data as query params
    const config = {
      headers,
      ...(useParams ? { params: data } : { data }),  // If using params, send data as query params
    };

    // Send DELETE request
    const response = await axios.delete(apiUrl, config);

    return response;
  } catch (error) {
    console.error("Error deleting data:", error);
    return error;
  }
};
