const login = {
    user: "jpwf",
    pass: "cl912222"
        }

function authenticated(){
    setTimeout(() => {
        window.location="/root"
    }, 1000);
}

function invasor(){
    setTimeout(() =>{
        window.location="/blocked"
        }, 1000)
}



button = document.getElementById("sendb")


    
button.addEventListener("click" ,(req,res) => {
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("pass").value;
    if(usuario==login.user && senha==login.pass){
        authenticated()
    }else{
        invasor()
    }
    
})



