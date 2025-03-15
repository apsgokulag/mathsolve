export const formatErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return 'An unknown error occurred';
  };