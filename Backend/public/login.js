
const loginForm = document.getElementById('signInForm');

const email = document.getElementById('user_id');

const password = document.getElementById('password');

const forgotPassword = document.getElementById('fPAssword');

const form = document.getElementById('form');

const fEmail = document.getElementById('email');

console.log(forgotPassword);


const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
})

loginForm.addEventListener('submit',onLogin);

async function onLogin(e){
    
    e.preventDefault();
    try {
        let myobj={
            email:email.value,
            password:password.value,
        }

        const user = await axiosInstance.post('/user/login',myobj);

        //Check User Status for Login 

        console.log(user);
        if(user.status===200){
            alert('login sucessfully');
            localStorage.setItem('token',user.data.token);
            window.location.href='User.html';
        }
        
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

forgotPassword.onclick=()=>{

    window.location.href='Emailverfication.html'
}

