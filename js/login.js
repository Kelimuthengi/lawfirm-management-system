document.getElementById("loginbtn").onclick = () => {

    
    document.getElementById("loggingin").style.display = "block"
    document.getElementById("loginbtn").style.display = "none"

   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

   firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential) => {
       let user = userCredential.user;
    console.log(user.uid)
        firebase.firestore().collection("users").doc(user.uid).get()
        .then((doc) => {

            if(doc.exists) {
                
            let userType = doc.data().userType;

            // console.log(userType)
            if(userType != "user") {
                window.location.href = "dashboard.html"
            }
            else {
                window.location.href = "/admin/admin.html"
            }

            } 
            else {
                console.log("no such document")
            }

        })
   }).catch((error) => {
     
    alert(error)
    document.getElementById("loggingin").style.display = "none"
    document.getElementById("loginbtn").style.display = "block"
   })
}

