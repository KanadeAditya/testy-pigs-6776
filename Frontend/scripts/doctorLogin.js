
import {baseUrl} from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }

    console.log(usersDetail)

    fetch(`${baseUrl}doctors/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg=="login successful") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        window.open("doctorPage.html")
                      }
                })

                localStorage.setItem("token",res.acessToken)
                localStorage.setItem("refreshToken",res.refToken)
                localStorage.setItem("userName",res.name)
                localStorage.setItem("petmate",JSON.stringify({userId:res.userID,role:res.role,name:res.name,status:true }))
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.msg
                })
            }
        })
})

let doc=document.getElementById("doclogin")
doc.addEventListener("click",(e)=>{
    window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/check?type=login`
     
})
 