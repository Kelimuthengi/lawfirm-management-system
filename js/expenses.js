firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    january = 0;
    february = 0;
    march = 0;
    april = 0;
    may = 0;
    june = 0;
    july = 0;
    november = 0;
    // console.log(user.uid)
    firebase
      .firestore()
      .collection("fianceandexpenses")
      .get()
      .then((querySnapshot) => {
        let content = "";
        querySnapshot.forEach((doc) => {
          let date = doc.data().date;

          let splitdate = date.split("-");
          let month = splitdate[1];

          let amountSpent = doc.data().amountSpent;
          let expenseType = doc.data().expenseType;
          let description = doc.data().description;
          let docId = doc.data().submitFinanceId;

          // console.log(month)
          if (month == 01) {
            january += parseInt(amountSpent);
          }

          if (month == 02) {
            february += parseInt(amountSpent);
          }

          if (month == 03) {
            march += parseInt(amountSpent);
          }

          if (month == 04) {
            april += parseInt(amountSpent);
          }

          if (month == 05) {
            may += parseInt(amountSpent);
          }

          if (month == 11) {
            november += parseInt(amountSpent);
          }
          content += ` <tr>`;
          content += `<td>${date}</td>`;
          content += ` <td>${amountSpent}</td>`;
          content += `<td>${expenseType}</td>`;
          content += `<td>${description}</td>`;
          content += `</tr>`;
        });
        // GRAPHICAL DATA
        const labels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "November",
        ];

        const data = {
          labels: labels,
          datasets: [
            {
              label: "EXPENSES OVER MONTH",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: [january, february, march, april, may, november],
            },
          ],
        };

        const config = {
          type: "line",
          data: data,
          options: {},
        };

        // === include 'setup' then 'config' above ===
        // RENDERING THE GRAPH
        const myChart = new Chart(document.getElementById("Chart"), config);

        $("#expenses").append(content);
      });

    january = 0;
    february = 0;
    march = 0;
    april = 0;
    may = 0;
    june = 0;
    july = 0;
    november = 0;
    // PULL ALL INCOME
    firebase
      .firestore()
      .collection("fianceandexpenses")
      .get()
      .then((querySnapshot) => {
        let content = "";
        querySnapshot.forEach((doc) => {
          let incomeDate = doc.data().incomeDate;
          // console.log(incomeDate)
          let splitdate = incomeDate.split("-");
          console.log(splitdate);
          let month = splitdate[1];
          // console.log(month)
          let incomeamount = doc.data().incomeamount;
          console.log(incomeamount);
          let incomefrom = doc.data().incomefrom;
          let paymentmethod = doc.data().paymentmethod;
          let docId = doc.data().submitFinanceId;

          content += ` <tr>`;
          content += ` <td>${incomeDate}</td>`;
          content += `<td>${incomeamount}</td>`;
          content += `<td>${incomefrom}</td>`;
          content += `<td>${paymentmethod}</td>`;
          content += ` </tr>`;

          if (month == 01) {
            january += parseInt(incomeamount);
          }

          if (month == 02) {
            february += parseInt(incomeamount);
          }

          if (month == 03) {
            march += parseInt(incomeamount);
          }

          if (month == 04) {
            april += parseInt(incomeamount);
          }

          if (month == 05) {
            may += parseInt(incomeamount);
          }

          if (month == 11) {
            november += parseInt(incomeamount);
          }
        });
        $("#income").append(content);

        // GRAPHICAL DATA
        const labels = ["January", "February", "March", "April", "May", "June"];

        const data = {
          labels: labels,
          datasets: [
            {
              label: "INCOME OVER MONTH",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: [january, february, march, april, may, november],
            },
          ],
        };

        const config = {
          type: "line",
          data: data,
          options: {},
        };

        // === include 'setup' then 'config' above ===
        // RENDERING THE GRAPH
        const myChart = new Chart(document.getElementById("myChart"), config);
      });
  } else {
    window.location.href = "signup.html";
  }
});
