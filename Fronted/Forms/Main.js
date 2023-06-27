

const userList =document.getElementById('list');

const amount =document.getElementById('amount');

const description =document.getElementById('description');

const category =document.getElementById('category');

const form =document.getElementById('my-form');

const error =document.getElementById('error');

const axiosInstance = axios.create({
    baseURL:'http://localhost:4000'
})

const token = localStorage.getItem('token');

form.addEventListener('submit',trackerdetails);

window.addEventListener('DOMContentLoaded',async()=>{

   

    const getdetails= await axiosInstance.get('/expense/getDetails',{ headers:{"Authorization":token}});

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