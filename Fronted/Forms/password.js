
const email =document.getElementById('email');

const form = document.getElementById('form');

const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
})


form.addEventListener('submit',
async (e)=>{
    e.preventDefault();


    console.log(email.value);
   const ans= await axiosInstance.post('password/forgotpassword',{email:email.value});

   email.value = '';

   window.location.href = 'SignIn.html';
   

}
)