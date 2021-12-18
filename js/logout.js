firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid)
    if(user) {

    document.getElementById("logout").onclick = () => {
        firebase.auth().signOut().then(() => {
            window.location.href = "signup.html"
        }).catch((error) => {
            console.log(error)
        })
    }
        
    }

    else{
    alert("You're Logged out")
    window.location.href = "signup.html"
    }
});