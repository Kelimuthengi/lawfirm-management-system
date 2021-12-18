firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid)
    if(user) {
        document.getElementById("submitemployeebtn").onclick = () => {
            let name =  document.getElementById("name").value;
            let dob =  document.getElementById("dob").value;
            let department =  document.getElementById("department").value;
            let portifolio =  document.getElementById("portifolio").value;
            let qualification =  document.getElementById("qualification").value;
            let salary =  document.getElementById("salary").value;
            let nok =  document.getElementById("nok").value;
            let nokContact =  document.getElementById("nokContact").value;
            let contact =  document.getElementById("contact").value;
            let email =  document.getElementById("email").value;
            let employmentdate =  document.getElementById("employmentdate").value;
            let previousemployeer =  document.getElementById("previousemployeer").value;
            let experience =  document.getElementById("experience").value;
            let warning =  document.getElementById("warning").value;
            let UserType = document.getElementById("UserType").value;
            var password = document.getElementById("password").value;

            // upload a pic

            let rootRef = firebase.storage().ref();

            let pic = document.getElementById("passportPhoto").files[0];

            let uploadPic = rootRef.child("employeesPics/").child(pic.name).put(pic);

            // upload pic
            uploadPic.on('state_changed', (snapshot) => {
                let progress = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes))*100

                document.getElementById("progress").innerHTML = "Uploading..." + progress + "%";
                if( "Uploading..." + progress + "%" === "Uploading..." + "100%") {
                    document.getElementById("progress").style.display = "none"
                }
            },(error) => {
                console.log(error.message)
            },() => {
                uploadPic.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log("Get url at", downloadURL)


                    // CREATE A NEW EMPLOYEE ACCOUNT AND ADD TO USERS COLLECTION
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((userCredential) => {
                        let user = userCredential.user

                        firebase.firestore().collection("users").doc(user.uid).set({
                            employeeName:name,
                            employeeEmail:email,
                            employeeUserType:UserType,
                            employeeUserId:user.uid,
                            employeePhone:contact
                        }).then(() => {
                            
                   let employeeDocId = firebase.firestore().collection("employees").doc();
                   employeeDocId.set({
                    employeeName:name,
                    dateOfBirth:dob,
                    department:department,
                    portifolio:portifolio,
                    qualification:qualification,
                    salary:salary,
                    nextOfKin:nok,
                    nexOfKinContact:nokContact,
                    employeeContact:contact,
                    email:email,
                    employmentdate:employmentdate,
                    previousemployeer:previousemployeer,
                    experience:experience,
                    warning:warning,
                    employeeDocId:employeeDocId.id,
                    downloadURL:downloadURL,
                    employeeUserId:user.uid
                   })
                   .then(() => {
                       alert("Employee Added Successfully!")
                   })
                   .then(() => {
                       window.location.href = "addemployeehr.html"
                   }).catch((error) => {
                       alert(error);
                   })
                    }).catch((error) => {
                        console.log(error.message)
                    })
                    }).catch((error) => {
                        console.log(error.message)
                    })
                })
            })
        }
    }

    else {
        window.location.href = "signup.html"
    }
})