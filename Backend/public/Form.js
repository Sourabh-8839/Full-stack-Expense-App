const signupform = document.getElementById('form');

const uName = document.getElementById('user_id');

const email = document.getElementById('email');

const password = document.getElementById('password');

const msg = document.getElementById('msg');

// const axiosInstance = axios.create({
//     baseURL:'http://3.110.85.129:4000'
// })

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

signupform.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  try {
    e.preventDefault();
    let myobj = {
      Name: uName.value,
      email: email.value,
      password: password.value,
    };

    const user = await axiosInstance.post('/user/signup', myobj);

    console.log(user);

    window.location.href = 'SignIn.html';
  } catch (error) {
    // console.log(error.response.data.msg);

    msg.classList.add('msg');
    msg.innerHTML = error.response.data.msg;
  }
}
