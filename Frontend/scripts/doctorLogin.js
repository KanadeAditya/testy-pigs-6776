
import baseUrl from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }

    console.log(usersDetail)

    fetch(`${baseUrl}admin/login`, {
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
                        window.open("home.html")
                      }
                })

                localStorage.setItem("token",res.acessToken)
                localStorage.setItem("userName",res.name)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.msg
                })
            }
        })
})