

const userList =document.getElementById('userList');

const amount =document.getElementById('amount');

const description =document.getElementById('description');

const category =document.getElementById('category');

const form =document.getElementById('my-form');

const error =document.getElementById('error');

const buyPremium = document.getElementById('PremiumButton');

const token = localStorage.getItem('token');

const LeaderBoard = document.getElementById('ShowLeaderBoard');

const Logout = document.getElementById('Logout');

// const message = document.getElementById('message');

//buttons

LeaderBoard.onclick=()=>{
    console.log('hello');
    showLeaderBoard();
}

Logout.onclick=()=>{
    alert("Are you want to Logout");
    window.location.href = 'SignIn.html'
}

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
    LeaderBoard.style.display='inline';
    
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
            // showLeaderBoard();
            
        }

        
        }
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    

}




form.addEventListener('submit',trackerdetails);

window.addEventListener('DOMContentLoaded',async()=>{


    const declareToken = parseJwt(token);

    if(declareToken.isPremiumUser){
       showPremiumMessage();
      
    }
    
 
    const getdetails= await axiosInstance.get('/expense/getDetails',{ headers:{"authorization":token}});

    
    for(let i=0;i<getdetails.data.length;i++){

        showOnScreen(getdetails.data[i]);
    }
    
})

async function trackerdetails(e){
    e.preventDefault();

   
   
    const myobj={
        amount:amount.value,
        description:description.value,
        category:category.options[category.selectedIndex].value,
        userId:token
    
    }

        console.log(myobj);

        const obj=await axiosInstance.post('/expense/sentDetails',myobj,{ headers:{"Authorization":token}});

        showOnScreen(myobj);
       

    amount.value='';
    description.value='';
    category.options='';
    }

function showOnScreen(myobj) {

    const li = document.createElement('li');

   const div = document.createElement('div');

    const del = document.createElement('button');

    div.classList.add('buttons-container')

    //edit button
    const edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    
    //  Delete button
    del.innerHTML = 'Delete';
    
    div.appendChild(edit);
    div.appendChild(del);
   
    li.appendChild(document.createTextNode(`${myobj.amount}  ${myobj.description}   ${myobj.category}`));

    li.appendChild(div);

   
    userList.appendChild(li);



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


async function showLeaderBoard(){

        const token = localStorage.getItem('token');
        const res=await axiosInstance.get('/premium/showLeaderboard',{headers:{"authorization":token}});

        const leaderboard = document.getElementById('LeaderBoard');

        console.log(res);

        console.log(leaderboard);
        
        // leaderboard.innerHTML="<h1>LeaderBoard</h1>";
        res.data.forEach(userDetails=> {
            const li = document.createElement('li');
            const span = document.createElement('span');
            leaderboard.classList.add('userExpense');
            span.classList.add('pAmount')

            span.appendChild(document.createTextNode(`${userDetails.total_cost}`));
            li.appendChild(document.createTextNode(`${userDetails.Name}`));
            li.appendChild(span);

            leaderboard.appendChild(li);
        
       
    });
   
    

}