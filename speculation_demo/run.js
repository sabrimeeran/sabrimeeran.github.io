const CHART = document.getElementById('lineChart');

const data = {
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)'
    }]
};

let lineChart = new Chart(CHART, {
    type: 'line',
    data: data
});


