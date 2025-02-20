import axios from 'axios';

export const connectAPIViaGet = async (contextPath) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL + contextPath;
    
    // for server
    // const { protocol, hostname, port } = window.location;
    // const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    // const apiUrl = `${baseUrl}${contextPath.startsWith('/') ? contextPath : '/' + contextPath}`;
    
    const token = localStorage.getItem('access_token');
    
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
