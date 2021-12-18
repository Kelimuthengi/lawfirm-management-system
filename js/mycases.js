firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid)

    if(user) {
        // Pull all cases   .where("userId", " == ", user.uid)
        firebase.firestore().collection("clientscases")
        .get().then((querySnapshot) => {
            let content = '';

            querySnapshot.forEach((doc) => {

                let caseNum = doc.data().caseNum;
                let plaintorrespond = doc.data().plaintorrespond
                let timeStamp = doc.data().timeStamp
                let date = timeStamp.toDate().toDateString();
                let assinedLawyer = doc.data().assinedLawyer
                let userId = doc.data().userId
                let clientsCaseId = doc.data().clientsCaseId;
                console.log(plaintorrespond)

                let viewMore  = "viewmycases.html" + "?" + clientsCaseId
                if(user.uid == userId) {
                content += `<tr>` 
               content +=  `<td>${caseNum}</td>`  
               content +=  `<td>${plaintorrespond}</td>`   
               content +=  `<td>${date}</td>`   
               content +=  ` <td>${assinedLawyer}</td>`  
               content +=  `<td><button class="btn btn-warning">WITHDRAW</button></td>`   
               content +=  `<td><a href="${viewMore}" class="btn btn-success">VIEWCASE</a></td>`   
               content +=  `</tr>` 
                }

            });

            $("#mycases").append(content);
        });
    }

    else {
        window.location.href = "signup.html"
    }
})