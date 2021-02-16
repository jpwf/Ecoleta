const login = {
    user: "jpwf",
    pass: "12345",
    key: 4321
        }

function authenticated(){
    setTimeout(() => {
        window.location="/root"
    }, 500);
}

function skey(){
    
}

function invasor(){
    setTimeout(() =>{
        window.location="/blocked"
        }, 500)
}



button = document.getElementById("sendb")


    
button.addEventListener("click" ,function(){
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("pass").value;
    if(usuario==login.user && senha==login.pass){
        skey = prompt("Chave secreta :")
        if(skey==login.key){
            confirm(`Bem vindo "${login.user}"`)
            authenticated()
        }else{
            document.write("Invasor")
            invasor()
        }
        
    }else{
        invasor()
    }
    
})



