const cl=console.log;

const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");
const AddBtn=document.getElementById("AddBtn");
const updateBtn=document.getElementById("updateBtn");


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const snackbar=(title,icon)=>{
    Swal.fire({
        title:title,
        icon:icon,
        timer:4000,
        confirmButtonColor:"#00ff00",
    })
}




let stdArr=[
    {
        fname:"pavan",
        lname:"shidole",
        email:"ps@gmail.com",
        contact:123456789,
        stdId:"120",
    }
]


const onEdit=(ele)=>{
    let editId=ele.closest("tr").id;

    localStorage.setItem("editId",editId);

    let getObj=stdArr.find(std=> std.stdId===editId);
   
    fnameControl.value=getObj.fname;
    lnameControl.value=getObj.lname;
    emailControl.value=getObj.email;
    contactControl.value=getObj.contact;


    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    cl(getObj);
    cl(editId);
}

const onRemove=(ele)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let removeId=ele.closest("tr").id;

            let getIndex=stdArr.findIndex(std=>std.stdId===removeId);
            stdArr.splice(getIndex,1);
        
            ele.closest("tr").remove();

            snackbar("this stdInfo remove is successfully!","success");

            onMessage();
            
           
        }

        localStorage.setItem("stdArr",JSON.stringify(stdArr));
      });

       

    cl(stdArr);
}

const onMessage=()=>{
    if(stdArr.length ===0){
        info.classList.remove("d-none");
        card.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        card.classList.remove("d-none");
    }
}

onMessage();


const tempArr=(arr)=>{
    let result=arr.map((std,i)=>{
        return `<tr id="${std.stdId}">
                    <td>${i+1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td><i class="fa-solid fa-pen-to-square editBtn text-primary" onclick="onEdit(this)"></i></td>
                    <td><i class="fa-solid fa-trash removeBtn text-danger" onclick="onRemove(this)"></i></td>

                </tr>`
    }).join("");

    stdContainer.innerHTML=result;

    console.log(result);
}

if(localStorage.getItem("stdArr")){
    stdArr=JSON.parse(localStorage.getItem("stdArr"));
}

if(stdArr.length > 0){
    tempArr(stdArr);
}


// const onMessage=()=>{
//     if(stdArr.length ===0){
//         info.classList.remove("d-none");
//         card.classList.add("d-none");
//     }
// }

// onMessage();


const onStdForm=(ele)=>{
    ele.preventDefault();

    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:uuid(),
    }

    stdArr.push(stdObj)

    

    let tr=document.createElement("tr");
    tr.id=stdObj.stdId;

    tr.innerHTML=`
                    <td>${stdArr.length}</td>
                    <td>${stdObj.fname}</td>
                    <td>${stdObj.lname}</td>
                    <td>${stdObj.email}</td>
                    <td>${stdObj.contact}</td>
                    <td><i class="fa-solid fa-pen-to-square editBtn text-primary" onclick="onEdit(this)"></i></td>
                    <td><i class="fa-solid fa-trash removeBtn text-danger" onclick="onRemove(this)"></i></td>
    
    `

    stdContainer.append(tr);

    localStorage.setItem("stdArr",JSON.stringify(stdArr));

    snackbar("this " + stdObj.fname + " " +  stdObj.lname + " is added is successfully!", "success");

    onMessage();

    ele.target.reset();
    
    
}


const onUpdateBtn=()=>{
    let updateId=localStorage.getItem("editId");
     
    
    
    let updateObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:updateId,
    }

    let getIndex=stdArr.findIndex(std=>std.stdId===updateId);

    stdArr.splice(getIndex,1,updateObj);


    let child=[...document.getElementById(updateId).children];


   child[0].innerHTML=`${stdArr.length}`;
   child[1].innerHTML=`${updateObj.fname}`;
   child[2].innerHTML=`${updateObj.lname}`;
   child[3].innerHTML=`${updateObj.email}`;
   child[4].innerHTML=`${updateObj.contact}`;

   localStorage.setItem("stdArr", JSON.stringify(stdArr));


   stdForm.reset();
    

   snackbar(`this  ${updateObj.fname} stdInfo update is successfully!!`, `success`);
   
    
}



stdForm.addEventListener("submit", onStdForm);
updateBtn.addEventListener("click", onUpdateBtn);











