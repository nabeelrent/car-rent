import axios from 'axios';

export const connectAPIViaPost = async (requestBody, contextPath,ContentType=false) => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL + contextPath;

        // for server
        // const { protocol, hostname, port } = window.location;
        // const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
        // const apiUrl = `${baseUrl}${contextPath.startsWith('/') ? contextPath : '/' + contextPath}`;
        
        const token = localStorage.getItem('access_token');

        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":ContentType ?'multipart/form-data':'application/json'

                

            },
        });

        return  response;
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;  // Re-throw the error to be caught in the .catch block
    }
}; 
