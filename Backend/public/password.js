const email = document.getElementById('email');

const form = document.getElementById('form');

// const axiosInstance = axios.create({
//     baseURL:'http://3.110.85.129/:4000'
// })

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

form.addEventListener('submit', changePassword);

async function changePassword(e) {
  e.preventDefault();

  console.log(email.value);
  const ans = await axiosInstance.post('/password/forgotpassword', {
    email: email.value,
  });

  email.value = '';

  window.location.href = 'SignIn.html';
}
