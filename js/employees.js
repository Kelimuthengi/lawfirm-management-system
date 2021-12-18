firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid)

    if(user) {
    //    GET ALL EMPLOYEES
    firebase.firestore().collection("employees").get()
    .then((querySnapshot) => {
        let content = '';
        querySnapshot.forEach((doc) => {
            let employeeName = doc.data().employeeName;
            let department = doc.data().department;
            let employeeContact = doc.data().employeeContact;
            let employeeUserId = doc.data().employeeUserId;
            let employeeUserType = doc.data().employeeUserType;
            let employeeDocId = doc.data().employeeDocId


        //  if()
          content += `<tr>`  
          content += `<td>${employeeName}</td>`      
          content += ` <td>${department}</td>`     
          content += `<td>${employeeUserType}</td>`      
          content += `<td>${employeeContact}</td>`      
          content += `<td><button onclick="popmodal(\`${employeeDocId}\`)" data-bs-target="#employeemodal" data-bs-toggle="modal" class="btn btn-success">VIEW MORE</button></td>`      
          content += `</tr>`  
        });

        $("#employees").append(content);
    });


    window.popmodal = (value) => {
        // console.log(value)
        
        firebase.firestore().collection("employees").doc(value)
        .get().then((doc) => {
            if(doc.exists) {
            let employeeName = doc.data().employeeName;
            let dateOfBirth = doc.data().dateOfBirth;
            let downloadURL = doc.data().downloadURL;
            let email = doc.data().email;
            let nextOfKin = doc.data().nextOfKin;
            let nexOfKinContact = doc.data().nexOfKinContact;
            let qualification = doc.data().qualification;
            let portifolio = doc.data().portifolio;
            let warning = doc.data().warning;
            let previousemployeer = doc.data().previousemployeer;
            let experience = doc.data().experience
            let employeeDocId = doc.data().employeeDocId
            
            if(employeeDocId === value) {
            document.getElementById("image").src = downloadURL
            document.getElementById("modalname").innerHTML = employeeName;
            document.getElementById("dob").innerHTML = dateOfBirth
            document.getElementById("email").innerHTML = email
            document.getElementById("qualification").innerHTML = qualification
            document.getElementById("porti").innerHTML = portifolio
            document.getElementById("warning").innerHTML = warning
            document.getElementById("experience").innerHTML = experience
            document.getElementById("previousemp").innerHTML = previousemployeer
            document.getElementById("nok").innerHTML = nextOfKin
            document.getElementById("nokCont").innerHTML = nexOfKinContact
            document.getElementById("cardimg").src = downloadURL
            }
            
            }

            else {
                alert("No such document!")
            }
        })
    }


    }

    else {
        window.location.href = "signup.html"
    }
})