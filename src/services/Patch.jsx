import axios from 'axios';

export const connectAPIViaPatch = async (requestBody, contextPath, ContentType = false) => {
    try {
        const apiUrl = process.env.REACT_APP_API_URL + contextPath;

        // Retrieve the token from local storage
        const token = localStorage.getItem('access_token');

        // Make the PATCH request
        const response = await axios.patch(apiUrl, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": ContentType ? 'multipart/form-data' : 'application/json'
            },
        });

        return response;
    } catch (error) {
        console.error("Error in API PATCH call:", error);
        throw error;  // Re-throw the error to be caught in the .catch block
    }
};
