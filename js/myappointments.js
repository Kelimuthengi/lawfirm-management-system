firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid);
    if(user) {


        firebase.firestore().collection("users").doc(user.uid).get()
        .then((doc) => {
            let name = doc.data().name
            document.getElementById("username").innerHTML = name
        })

        // FIREBASE EVENT LISTNERS
  
        let appointmentRef = firebase.firestore().collection("appointments")
        .where("Assigned","==","none");
        appointmentRef.onSnapshot((querySnapshot) => {

            
            // set div to have empty data
            $("#myappointments").html('');

           
            pullData()
            var audio = new Audio('/audio/audio1.mp3');
            audio.play();

            
        });

    
        // pullData()

        function pullData() {
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
                    if(user.uid == userId) {
                       content += `<tr class="text-light">` 
                       content += `<td>${date}</td>`     
                       content += `<td>${caseType}</td>`     
                       content += `<td>${appointment}</td>`     
                       content += `<td>${status}</td>`     
                       content += `<td>${Assigned}</td>`     
                       content += `<td><button class="btn btn-danger">CANCEL</button></td>`     
                       content += `</tr>`     
                    }
    
                })
    
                $("#myappointments").append(content);
            });
        }
        
   

    }

    else {
        window.location.href = "signup.html"
    }
})