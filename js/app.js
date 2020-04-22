document.addEventListener("DOMContentLoaded", function(){
    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: ["20 Mar","21 Mar","22 Mar","23 Mar","24 Mar","25 Mar",
          "26 Mar","27 Mar","28 Mar","29 Mar","30 Mar","31 Mar","01 Apr"],
          datasets: [{ 
              data: [3,3,7,9,15,23,26,35,42,50,67,124,234],
              label: "Positive",
              borderColor: "red",
              fill: false
            }, { 
              data: [0,1,1,1,1,1,1,1,2,2,4,5,5],
              label: "Recovered",
              borderColor: "green",
              fill: false
            }, { 
              data: [0,0,0,0,0,1,1,1,1,1,1,1,1],
              label: "Deceased",
              borderColor: "blue",
              fill: false
            }
          ]
        },
        options: {
          maintainAspectRatio:false,
          responsive:true,
          title: {
            display: true
          },
          scales: {
                          xAxes: [{
                              display: true,
                              scaleLabel: {
                                  display: true,
                                  labelString: 'Date ---->'
                              }
                          }],
                          yAxes: [{
                              display: true,
                              scaleLabel: {
                                  display: true,
                                  labelString: 'Number of Persons--->'
                              },
                              ticks: {
                                  min: 0,
                                  max: 240,
      
                                  // forces step size to be 5 units
                                  stepSize: 5
                              }
                          }]
                      }
        }
      });
});