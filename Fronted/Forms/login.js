
const loginForm = document.getElementById('signInForm');

const email = document.getElementById('user_id');

const password = document.getElementById('password');

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

        console.log(myobj);
        const user = await axiosInstance.post('/user/login',myobj);

        //Check User Status for Login 
        if(user.status===200){
            alert('login sucessfully')
        }
        
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}