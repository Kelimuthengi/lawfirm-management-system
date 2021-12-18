document.getElementById("signupbtn").onclick = () => {
    document.getElementById("signingup").style.display = "block"
    document.getElementById("signupbtn").style.display = "none"
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user

        // Create a users collection

        firebase.firestore().collection("users").doc(user.uid)
        .set({
            name:name,
            number:number,
            email:email,
            userId:user.uid,
            userType: "user"
        }).then(() => {
            window.location.href = "login.html"
        }).catch((error) => {
            
            alert(error.message)
        })
    }).then(() => {

    }).catch((error) => {
        document.getElementById("signingup").style.display = "none"
        document.getElementById("signupbtn").style.display = "block"
        alert(error.message)
    })
}