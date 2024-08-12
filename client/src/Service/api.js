import axios from 'axios';

const URL = 'http://localhost:4000/user';

const signUpUser = async (data) => {
  try {
    const response = await axios.post(`${URL}/signup`, data);

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);

    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export { loginUser, signUpUser };
