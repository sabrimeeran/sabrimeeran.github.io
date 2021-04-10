var dates = [];
var prices = [];
var revenues = [];

function dataAtIntervals(monthInterval, startYear, startMonth, finalYear, finalMonth) {
    dates = []; // on x-axis
    prices = []; // on y-axis
    var currentYear = startYear;
    var currentMonth = startMonth;
    var monthFormat = '';

    if (startYear > finalYear) {
        return;
    } else if (startMonth > finalMonth && startYear == finalYear) {
        return;
    }
    while(!(currentYear >= finalYear && currentMonth > finalMonth)) {

        monthFormat = (currentMonth + 1).toString()
        if (monthFormat.length == 1) {
            monthFormat = '0' + monthFormat;
        }
        var dateString = '01/' + monthFormat + '/' + currentYear;
        dates.push(dateString);
        var ID = FED_BTC_DATA.findIndex(element => element.DATE == dateString)
        if (ID == -1) {
            return;
        }
        if (FED_BTC_DATA[ID].CBBTCUSD == ".") {
            prices.push('0');  // no data - assume worst case scenario
        } else {
            prices.push(FED_BTC_DATA[ID].CBBTCUSD);
        }

        if (currentMonth + monthInterval > 11) { 
            currentYear += Math.floor((currentMonth + monthInterval) / 12);
            currentMonth = (currentMonth + monthInterval) % 12;

        } else {
            currentMonth += monthInterval;
        }
    }
}

function revenuesAtIntervals(startPurchase, salePct) {
    revenues = [0]
    var quantity = (startPurchase / prices[0]);
    for (i = 1; i < prices.length; i++) {
        var salesRev = (salePct / 100) * quantity * prices[i]
        revenues[revenues.length] = revenues[revenues.length - 1] + salesRev
        quantity = quantity - (salePct/100 * quantity)
    }
    var salesRev = quantity * prices[prices.length - 1]
    revenues[revenues.length - 1] = revenues[revenues.length - 1] + salesRev
}

var lineChart = ""

dataAtIntervals(1, 2019, 0, 2021, 3);
revenuesAtIntervals(100, 3);
runChart();

document.getElementById("run-button").onclick = function () {
    var _startMonth = document.getElementById("start-month").value;
    var _finalMonth = document.getElementById("final-month").value;

    var _monthInterval = document.getElementById("month-interval").value
    var _startPurchase = document.getElementById("start-purchase").value
    var _salePct = document.getElementById("sale-pct").value

    dataAtIntervals(parseFloat(_monthInterval), parseFloat(_startMonth.substring(0, 4)), parseFloat(_startMonth.substring(5, 7))-1, parseFloat(_finalMonth.substring(0, 4)), parseFloat(_finalMonth.substring(5, 7))-1);
    revenuesAtIntervals(parseFloat(_startPurchase), parseFloat(_salePct));

    lineChart.destroy();
    runChart();
};

function runChart() {
    lineChart = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                data: revenues,
                label: "Revenues",
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
}