
const form =document.getElementById('form');

const uName = document.getElementById('user_id');

const email = document.getElementById('email');

const password = document.getElementById('password');

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
})

form.addEventListener('submit',onSubmit);

async function onSubmit(e){

    e.preventDefault();

 
    const myobj={
        Name:uName.value,
        email:email.value,
        password:password.value,
    }

    console.log(myobj);

     await axiosInstance.post('/user/signup',myobj);

        uName.value='';
        email.value='';
        password.value='';

}
