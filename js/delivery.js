firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid)

    if(user) {

        // PULL ALL THE CLIENTS

        firebase.firestore().collection("users").where("userType","==","user")
        .get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let name = doc.data().name
                let userId = doc.data().userId

                content += ` <option value="${userId}">${name}</option>`
                
            });

            $("#clientslist").append(content);

        });



        

             // Generate random Num
        
             var confCode = (Math.floor(Math.random()*1000));

             var newCode = "WKL" + confCode + "MSA"
     
     
             document.getElementById("deliver").onclick = () => {
     
                let riderName =  document.getElementById("rider").value;
                let ridersphone = document.getElementById("ridersphone").value;
                let ridersvehicleReg = document.getElementById("ridersvehicle").value;
                let clientsId = document.getElementById("clientslist").value;
                let documentNo = document.getElementById("documentNo").value;
                let timeStamp = firebase.firestore.Timestamp.fromDate(new Date())
     
                let deliveryId = firebase.firestore().collection("deliveries").doc();
                deliveryId.set({
                    riderName:riderName,
                    ridersphone:ridersphone,
                    ridersvehicleReg:ridersvehicleReg,
                    clientsId:clientsId,
                    documentNo:documentNo,
                    deliveryId:deliveryId.id,
                    receiverId:clientsId,
                    timeStamp:timeStamp,
                    recieverCode:newCode,
                }).then(() => {
                    alert("Done succesfully")
                }).then(() => {


                    firebase.firestore().collection("notifications").doc().set({
                        notificationType: "delivery",
                        notificationFor: "user",
                        timeStamp:timeStamp,
                        clientsId:clientsId,
                    }).then(() => {
                        alert("Done deal")
                    })
                })
                .then(() => {
                    window.location.href = "delivery.html"
                })
                .catch((error) => {
                    console.log(error)
                })
             }

       
    }
    else {
        window.location.href = "signup.html"
    }
})


