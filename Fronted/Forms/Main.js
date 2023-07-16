

const userList =document.getElementById('list');

const amount =document.getElementById('amount');

const description =document.getElementById('description');

const category =document.getElementById('category');

const form =document.getElementById('my-form');

const error =document.getElementById('error');

const buyPremium = document.getElementById('Premium');

const token = localStorage.getItem('token');

//buttons
const showLeaderBoard =document.getElementById('leader');

const premiumUser = document.getElementById('premiumUser');
const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
});



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



//premium User message
const showPremiumMessage =()=>{
    buyPremium.style.visibility='hidden';
    
    

    premiumUser.innerHTML ="You are Premium User";
}


// Onclick event on premium button
buyPremium.onclick= async(e)=>{

          
    const response = await axiosInstance.get('/purchase/premiummembership',{headers:{"authorization" : token}});
  


    var options = {
        
        "key": response.data.Key_id, // Enter the Key ID generated from the Dashboard
        "order_id": response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of 

        "handler":async function(response){

           const completeTransaction= await axiosInstance.post('/purchase/updateTransaction',{
                order_id:response.razorpay_order_id,
                payment_id:response.razorpay_payment_id

            },{headers:{"Authorization" : token}});

            alert('You Are Premium user now');

            showPremiumMessage();
            localStorage.setItem("token",completeTransaction.data.token)
            
        }

        
        }
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    

}


showLeaderBoard.onclick =async(e)=>{
    
}

form.addEventListener('submit',trackerdetails);

window.addEventListener('DOMContentLoaded',async()=>{


    const declareToken = parseJwt(token);

    if(declareToken.isPremiumUser){
       showPremiumMessage();
       showLeaderBoard.style.display = 'block';
      
    }
    else{
        showLeaderBoard.style.visibility = 'hidden'
    }
    console.log(token);
    const getdetails= await axiosInstance.get('/expense/getDetails',{ headers:{"authorization":token}});

    console.log(getdetails);
    for(let i=0;i<getdetails.data.length;i++){

        showOnScreen(getdetails.data[i]);
    }
    
})

async function trackerdetails(e){
    e.preventDefault();

    // if(amount.value==='' || description.value==='' || category.value===''){
        
    //     error.classList.add('error');

    //     error.innerHTML ="Please fill the fields";

    //     setTimeout(()=>error.remove(),4000);

    // }
    // else{
   
   
    const myobj={
        amount:amount.value,
        description:description.value,
        category:category.options[category.selectedIndex].value,
        userId:token
    
    }

        console.log(myobj);

        const obj=await axiosInstance.post('/expense/sentDetails',myobj,{ headers:{"Authorization":token}});

        showOnScreen(obj.data);
       

    amount.value='';
    description.value='';
    category.options='';
    }

function showOnScreen(myobj) {

    const li = document.createElement('li');

   

    const del = document.createElement('button');

    //edit button
    const edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    edit.classList.add('Add');


    //  Delete button
    del.innerHTML = 'Delete Products';
    // del.classList.add('');
    // del.style.margin='0px 6px';
    // del.style.padding='0px 6px';

  
    

    li.appendChild(document.createTextNode(`${myobj.amount},${myobj.description},${myobj.category}`));

    li.appendChild(edit);

    li.appendChild(del);

    userList.classList.add('ul')
    userList.appendChild(li);

    li.classList.add('list-item');

    del.onclick = async () => {

        await axiosInstance.post(`/expense/deleteDetails/${myobj.userId}`);

        userList.removeChild(li);
    }

    edit.onclick = async()=>{

        // await axiosInstance.post(`/editDetails/${myobj.id}`);

        userList.removeChild(li);

        amount.value=myobj.amount;
        description.value=myobj.description;

        category.options[category.selectedIndex].value= myobj.category;
    }



}