const login = {
    user: "jpwf",
    pass: "cl912222"
}




button = document.getElementById("sendb")


button.addEventListener("click" ,function(){
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("pass").value;
    if(usuario==login.user && senha==login.pass){
        home()
    }
})



