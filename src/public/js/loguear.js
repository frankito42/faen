document.getElementById("loginForm").addEventListener("submit",async (e)=>{
    e.preventDefault()
    let form=new FormData(document.getElementById("loginForm"))
    form=Object.fromEntries(form)
    await fetch(`/loguear`,{
        method:"POST",
        headers:{
            'content-Type':'application/json'
        },     
        body:JSON.stringify(form), 
    })
    .then(response => response.json())
    .then(async (data)=>{
        console.log(data)
        if(data=="mal"){
            document.getElementById("loginForm").reset()
            $("#error").modal("show")
        }else{
            localStorage.setItem("user", JSON.stringify(data));
           /*  localStorage.getItem("user"); */
            /* console.log(localStorage.getItem("user")) */
            location.href="/admin"

        }
    });
})
