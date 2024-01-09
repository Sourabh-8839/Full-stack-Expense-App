const loginForm = document.getElementById('signInForm');

const email = document.getElementById('user_id');

const password = document.getElementById('password');

const forgotPassword = document.getElementById('fPAssword');

const form = document.getElementById('form');

const fEmail = document.getElementById('email');

const msg = document.getElementById('msg');

console.log(forgotPassword);

// const axiosInstance = axios.create({
//     baseURL:'http://3.110.85.129/:4000'
// })

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

loginForm.addEventListener('submit', onLogin);

async function onLogin(e) {
  e.preventDefault();
  try {
    let myobj = {
      email: email.value,
      password: password.value,
    };

    const user = await axiosInstance.post('/user/login', myobj);

    //Check User Status for Login

    console.log(user);
    if (user.status === 200) {
      alert('login sucessfully');
      localStorage.setItem('token', user.data.token);
      window.location.href = 'User.html';
    }
  } catch (error) {
    msg.classList.add('msg');
    msg.innerHTML = error.response.data.msg;

    setTimeout(() => {
      msg.innerHTML = '';
    }, 5000);
  }
}

forgotPassword.onclick = () => {
  window.location.href = 'Emailverfication.html';
};
