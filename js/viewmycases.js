firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid)

    if(user) {

        let queryString = decodeURIComponent(window.location.search);

        let receivedId = queryString.substring(1);
        
        firebase.firestore().collection("users").doc(receivedId).get()
        .then((doc) => {
            let username = doc.data().name;
            console.log(username)
        })

            
        firebase.firestore().collection("clientscases").where("clientsCaseId", "==", receivedId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                let caseNum = doc.data().caseNum;
                let plaintorrespond = doc.data().plaintorrespond
                let timeStamp = doc.data().timeStamp
                let date = timeStamp.toDate().toDateString();
                let assinedLawyer = doc.data().assinedLawyer
                let userId = doc.data().userId
                let clientsCaseId = doc.data().clientsCaseId;
                let caseDesc = doc.data().caseDesc;
                console.log(caseDesc);


                document.getElementById("datesubmitted").innerHTML = date;
                // document.getElementById("lawyer").innerHTML = assinedLawyer;
                // document.getElementById("casetype").innerHTML = 
                document.getElementById("casedesc").innerHTML = caseDesc;
                document.getElementById("name").innerHTML = username
            })
       
        })

    }

    else {
        window.location.href = "signup.html"
    }
})