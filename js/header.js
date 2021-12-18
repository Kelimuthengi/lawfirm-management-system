firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log(user.uid)
        document.getElementById("notificationcontainer").onclick = () => {

            if(document.getElementById("notificationarea").classList.contains("notificationarea")) {
                document.getElementById("notificationarea").style.display = "none"
                document.getElementById("notificationarea").style.transition = "all .5s" 
                    // alert('clicked');
        
                document.getElementById("notificationarea").classList.remove("notificationarea")
            }
            else {
                document.getElementById("notificationarea").style.display = "block"
                document.getElementById("notificationarea").style.transition = "all .5s"
                // alert('add')
        
                document.getElementById("notificationarea").classList.add("notificationarea")
            }
        
        }
        
        firebase.firestore().collection("users")
        .where("userType", "==", "user")
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let userId1 = doc.data().userId;
                // console.log(userId)
                let username = doc.data().name;
                let userType = doc.data().userType
        
        
                firebase.firestore().collection("notifications")
                .where("notificationFor", "==", "admin")
                
                .get().then((querySnapshot) => {
                    let content = "";
                    querySnapshot.forEach((doc) => {
        
                        // console.log('You have',querySnapshot.size);
                        let userId = doc.data().userId;
                        console.log(userId)
                        console.log(user.uid)
                        let date = doc.data().date;
                        // let notificationFor = doc.data().notificationFor;
                        let notificationType = doc.data().notificationType
                        document.getElementById("adminnum").innerHTML = querySnapshot.size
        
        
                        if(userId1 == user.uid && notificationType == "appointment") {
                           
                        content += `<div class="d-flex thenotification">`  
                        content += `<div>`        
                        content += `  <p style="margin: 0;">${date}</p>`          
                        content += `<h6>You have a new appointment from ${username}</h6>`            
                        content += ` </div>`       
                        content += ` </div>`   
                        }

                        if(userId1 == user.uid && notificationType == "newcase") {
                           
                            content += `<div class="d-flex thenotification">`  
                            content += `<div>`        
                            content += `  <p style="margin: 0;">${date}</p>`          
                            content += `<h6>You have a new case from ${username}</h6>`            
                            content += ` </div>`       
                            content += ` </div>`   
                            }
                    });
        
                    $("#notificationarea").append(content)
                });
            });
        });
    }

    else {

    }
})

