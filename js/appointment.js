firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        
        // console.log(user.uid);

        document.getElementById("submitbtn").onclick = () => {
            let date = document.getElementById("dateandtime").value;
            let caseType = document.getElementById("selectcasetype").value;
            let physicalVisit = document.getElementById("Physicalvisit");
            let VideoCall = document.getElementById("VideoCall");
            let phoneCall = document.getElementById("phoneCall");
            let ConferenceCall = document.getElementById("ConferenceCall");
            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());


            if(physicalVisit.checked == true) {
                var appointment = "Physical visit"
            }

            if(VideoCall.checked == true) {
                var appointment = "Video Call"
            }

            if(phoneCall.checked == true) {
                var appointment = "phone Call"
            }

            if(ConferenceCall.checked == true) {
                var appointment = "Physical visit"
            }

            let appointmentdescription = document.getElementById("appointmentdescription").value;

            let appointmentId = firebase.firestore().collection("appointments").doc();
            appointmentId.set( {
                date:date,
                caseType:caseType,
                appointment:appointment,
                appointmentdescription:appointmentdescription,
                userId:user.uid,
                appointmentId:appointmentId.id,
                status: "pending",
                Assigned: "none",
                timeStamp:timeStamp
            }).then(() => {
                alert("appointment made succesfully")
            }).then(() => {
                firebase.firestore().collection("notifications").doc().set({
                    userId:user.uid,
                    date:date,
                    notificationFor: "admin",
                    notificationType: "appointment",
                    timeStamp:timeStamp
                }).then(() => {
                    window.location.href = "appointment.html"
                }).catch((error) => {
                    console.log(error)
                })
            })

        }
    }

    else {
        window.location.href = "signup.html"
    }
})