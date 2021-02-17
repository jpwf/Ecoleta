const logins = {
    users:{
        user1:{
            name:"jpwf",
            passw: 12345
        },
        user2:{
            name:"guest",
            passw:0987
        }
        
    },
    keys:{
        jpwf:4321,
        user2:7890
    }  
        }

var user1 = logins.users.user1.name
var pass1 = parseInt(logins.users.user1.passw)
var key1 = parseInt(logins.keys.jpwf)
var card1 = false

var user2 = logins.users.user2.name
var pass2 = parseInt(logins.users.user2.passw)
var key2 = parseInt(logins.keys.user2)
var card2 = false

function authenticated(){
    setTimeout(() => {
        window.location="/root"
    }, 500);
}

function skey(){
    
}

function invasor(){
    document.write("invasor")
    setTimeout(() =>{
        window.location="/blocked"
        }, 500)
}



button = document.getElementById("sendb")


    
button.addEventListener("click" ,function(){
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("pass").value;
    if(usuario==user1 && senha==pass1 || usuario==user2 && senha==pass2){
        
        skey = prompt("Chave secreta :")
        if(skey==key1){
            confirm(`Bem vindo "${user1}"`)
            card1 = true
            authenticated()
        }
    }
    
    
})



