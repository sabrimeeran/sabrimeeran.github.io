
var dates = []; // on x-axis
var prices = []; // on y-axis

datesAtIntervals(1, 2021, 1, 2022, 1);

function datesAtIntervals(monthInterval, startYear, startMonth, finalYear, finalMonth) {
    var currentYear = startYear;
    var currentMonth = startMonth;
    var monthFormat = '';

    if (startYear > finalYear) {
        return;
    } else if (startMonth > finalMonth) {
        return;
    }
    for (i = 0; i < 20; i++) {

        monthFormat = (currentMonth + 1).toString()
        if (monthFormat.length == 1) {
            monthFormat = '0' + monthFormat;
        }
        var dateString = monthFormat + '/01/' + currentYear

        if (currentMonth == 11) { // months are indexed starting 0
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }

    }



}

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [FED_BTC_DATA[0].DATE, FED_BTC_DATA[1].DATE],
        datasets: [{
            data: [FED_BTC_DATA[0].CBBTCUSD, FED_BTC_DATA[1].CBBTCUSD],
            label: "Price",
            borderColor: "#3e95cd",
            fill: false
        }
        ] // how do we just show, e.g. 20 values, of interest using pure JS? // Dates on x-axis?
    },
    options: {
        title: {
            display: true,
            text: 'Bitcoin price'
        }
    }
});