firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid)


    // .where("userId", " == ", user.uid)
    if(user) {


        firebase.firestore().collection("users").doc(user.uid).get().then((doc) => {
            
            let userType = doc.data().userType;

            if(userType != "admin") {
                window.location.href = "dashboard.html"
            }
        })

        firebase.firestore().collection("users")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let username = doc.data().name;
                        let userUid = doc.data().userId
        
                        // if(user.uid == userId1) {
                        //     console.log(username)
                        // }

                        // GET ALL APPOINTMENTS
                         firebase.firestore().collection("appointments")
                        .get().then((querySnapshot) => {
                            // console.log(querySnapshot)
                            let content = '';
                            querySnapshot.forEach((doc) => {
                        
                                let dateandtime = doc.data().date;
                                let caseType = doc.data().caseType;
                                let appointmentType = doc.data().appointment;
                                let userId = doc.data().userId;
                                let docId = doc.data().appointmentId;
                
                                
                                if(user.uid = userId && userUid == userId ) {
                                    content += ` <tr>`   
                                    content += `<td>${username}</td>`        
                                    content += `<td>${dateandtime}</td>`        
                                    content += `<td>${caseType}</td>`        
                                    content += `<td>${appointmentType}</td>`        
                                    content += `<td><button onclick="preferencePop(\`${docId}\`)" type="button"  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalpop">Set Preference</button></td>`        
                                    content += ` </tr>`   
                                }
                            
                            });
                
                            $("#admintable").append(content);
                        });
                        });
                    });


        window.preferencePop = function(value) {
            console.log(value);
            
        // PULL ALL DATA ON APPOINTMENTS
        firebase.firestore().collection("appointments").get()
        .then((querySnapshot) => {
            let content = '';

            querySnapshot.forEach((doc) => {
                let date = doc.data().date;
                let caseType = doc.data().caseType;
                let appointment = doc.data().appointment;
                let userId = doc.data().userId
                let status = doc.data().status
                let Assigned = doc.data().Assigned
                let docId = doc.data().appointmentId
                
                 // EDIT APPOINTMENTS
                if(docId === value) {
                document.getElementById("confirmappointment").value = status;
                document.getElementById("assignlawyer").value = Assigned;
                document.getElementById("adjusttime").value = date;
                }
                 

        document.getElementById("SaveChanges").onclick = () => {

            let statusCode = document.getElementById("confirmappointment").value;
            let assignlawyer = document.getElementById("assignlawyer").value;
            let adjusttime = document.getElementById("adjusttime").value;

            firebase.firestore().collection("appointments").doc(value)
            .update( {
                Assigned:assignlawyer,
                status:statusCode,
                date:adjusttime
            }).then(() => {
                alert("Updated Successfully!")
            })
            .then(() => {
                window.location.href = "admin.html"
            }).catch((error) => {
                console.log(error.message)
            })
        }
    
    });
        });
        }

       
    }

    else {
        window.location.href = "signup.html"
    }
})