firebase.auth().onAuthStateChanged((user) => {
    
    if(user) {

        document.getElementById("submitcase").onclick = () => {
            document.getElementById("submitcase").style.display = "none"
            document.getElementById("submitting").style.display = "block"
            let casetype = document.getElementById("casetype").value;
            let plaintiff = document.getElementById("plaintiff");
            let respondent = document.getElementById("respondent");
            let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

            if(plaintiff.checked == true) {
                var plaintorrespond = "plaintiff"
            } else if(respondent.checked == true) {
                var plaintorrespond = "respondent"
            } else {
                alert("Empty input field")
            }

            let caseDesc = document.getElementById("casedesc").value;

            // upoload a file
            // create a rootstorageRef;

            let storageRef = firebase.storage().ref();

            // getting file from html
            let file = document.getElementById("fileinput").files[0];

            if(file == "") {
                alert("Please select file")
            }
            // console.log(file.name)

            // create a root ref to the file
            let uploadFile = storageRef.child("clientsfiles/").child(file.name).put(file);

            // Uploading the file
            uploadFile.on('state_changed', (snapshot) => {
                var progress = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes))*100;

                document.getElementById("progressbar").innerHTML = progress + "%";

                if(progress + "%" == "100%") {
                    document.getElementById("progressbar").style.display = "none"
                }
            },(error) => {
                // handling error
                // console.log(error)
                // console.log("Your upload is unsuccesful please try again")
            },() => {
                uploadFile.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log("File available at", downloadURL);

                    // Create a clientscase collection
           let clientsCase =  firebase.firestore().collection("clientscases").doc();
           clientsCase.set({
            casetype:casetype,
            plaintorrespond:plaintorrespond,
            caseDesc:caseDesc,
            userId:user.uid,
            clientsCaseId:clientsCase.id,
            docURL:downloadURL,
            timeStamp:timeStamp,
            assinedLawyer:" To be Assigned",
            caseNum: "to be assigned"
           }).then(() => {
            alert("Case submitted succesfully")
           }).then(() => {
               window.location.href = "submit.html"
           }).then(() => {
            firebase.firestore().collection("notifications").doc()
            .set({
             notificationType: "newcase",
             notificationFor: "admin",
             userId:user.uid,
             timeStamp:timeStamp
            }).catch((error) => {
                console.log(error);
            })
              
           }).then(() => {
            window.location.href = "mycases.html"
           })
           .catch((error) => {
               console.log(error)
            document.getElementById("submitcase").style.display = "block"
            document.getElementById("submitting").style.display = "none"
           })
            });
            });    
        };
    }
    else {
        window.location.href = "signup.html"
    };
});