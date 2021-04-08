new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        #labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
            data: FED_BTC_DATA,
            label: "Bitcoin",
            borderColor: "#3e95cd",
            fill: false
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Bitcoin price'
        }
    }
});