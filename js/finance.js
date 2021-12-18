firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        document.getElementById("submitfinance").onclick = () => {
            let incomeamount = document.getElementById("incomeamount").value;
            let incomeDate = document.getElementById("incomeDate").value;
            let incomefrom = document.getElementById("incomefrom").value;
            let incomeDesc = document.getElementById("incomeDesc").value;
            let paymentMethod = document.getElementById("paymentMethod").value;
            let amountSpent = document.getElementById("amountSpent").value;
            let date = document.getElementById("date").value;
            let expenseType = document.getElementById("expenseType").value;
            let description = document.getElementById("description").value;
            let paymentmethod = document.getElementById("paymentmethod").value;

            let submitFinanceId = firebase.firestore().collection("fianceandexpenses").doc()
            submitFinanceId.set({
                incomeamount:incomeamount,
                incomeDate:incomeDate,
                incomefrom:incomefrom,
                incomeDesc:incomeDesc,
                paymentMethod:paymentMethod,
                amountSpent:amountSpent,
                date:date,
                expenseType:expenseType,
                description:description,
                paymentmethod:paymentmethod,
                submitFinanceId:submitFinanceId.id
            }).then(() => {
                alert("Operation done successfully")
            }).then(() => {
                window.location.href = "finance.html"
            }).catch((error) => {
                alert(error)
            })
        }
    }
    else {
        window.location.href = "signup.html"
    }
})