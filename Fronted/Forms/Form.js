
const signupform =document.getElementById('form');



const uName = document.getElementById('user_id');

const email = document.getElementById('email');

const password = document.getElementById('password');

const msg = document.getElementById('msg');

const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
})

signupform.addEventListener('submit',onSubmit);

async function onSubmit(e){

    try {
        e.preventDefault();
        let myobj={
            Name:uName.value,
            email:email.value,
            password:password.value,
        }
    
        const user= await axiosInstance.post('/user/signup',myobj);
        
        window.location.href ="SingIn.html"

    } catch (error) {
        msg.classList.add('msg');
        msg.innerHTML=error.message;
        console.log(error);
    }
   

}

