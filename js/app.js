document.addEventListener('DOMContentLoaded',function()
{
    loadTN();
    loadCountdown();
}
);

$(document).ready(function () {
    $('.nav li').click(function(e) {

        $('.nav li').removeClass('active');

        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        $('.navbar-collapse').collapse('hide');
    });
});

function loadCountdown()
{

    var countDownDate = new Date("May 3, 2020 06:00:00").getTime();

    var x = setInterval(function() 
    {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("Contdowndays").innerHTML = days + " days and</br>" + hours + "h : "
        + minutes + "m : " + seconds + "s";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("Contdowndays").innerHTML = "EXPIRED";
        }
        }, 1000);

}

function loadIndChart()
{

    const IndTimeSeries = new XMLHttpRequest();
    IndTimeSeries.open('GET','https://api.covid19india.org/data.json',true);
    IndTimeSeries.send();
    IndTimeSeries.onload=function(){
        const IndJson=JSON.parse(IndTimeSeries.responseText);
        console.log(IndJson.cases_time_series);

        const Indpositive=[];
        const Indrecovered =[];
        const Inddeceased=[];
        const Inddates=[];

        for(var i in IndJson.cases_time_series)
        {
            if(parseInt(IndJson.cases_time_series[i].totalconfirmed)>6)
            {

                Indpositive.push(IndJson.cases_time_series[i].dailyconfirmed);
                Indrecovered.push(IndJson.cases_time_series[i].dailyrecovered);
                Inddeceased.push(IndJson.cases_time_series[i].dailydeceased);
                Inddates.push(IndJson.cases_time_series[i].date.substring(0,6));

            }
            
        }

        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }

        var ctx = document.getElementById('myChart').getContext("2d");



        window.myChart=new Chart(ctx,{
            type:'bar',
            data:{
                labels:Inddates,
                datasets:[
                    
                    {
                        data:Indpositive,
                        label: "Confirmed",
                        fill: true,
                        backgroundColor: "#c2185b",
                    },       
                    
                    {
                        data:Indrecovered,
                        label: "Recovered",
                        fill: true,
                        backgroundColor: "#4fc3f7",
                    }, 

                    {
                        data:Inddeceased,
                        label:"Deceased",
                        fill: true,
                        backgroundColor:"#ff1744",
                    },                     
                
                ]
                
            },
            options:{
                maintainAspectRatio:false,
                responsive:true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                          drawOnChartArea: false
                      }
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },            
                animation: {
                    easing: "easeInQuart"
                }
            }

        }

    )
    }
}

function loadTNChart()
{

    const TNTimeSeries = new XMLHttpRequest();
    TNTimeSeries.open('GET','https://api.covid19india.org/states_daily.json',true);
    TNTimeSeries.send();
    TNTimeSeries.onload=function()
    {
        const TNjson=JSON.parse(TNTimeSeries.responseText);
        console.log("Gotten Data");
        console.log(TNjson.states_daily[0]);
        const tnpositive=[];
        const tnrecovered =[];
        const tndeceased=[];
        const tndates=[];

        for(var i in TNjson.states_daily)
        {
            if(TNjson.states_daily[i].status == "Confirmed")   
            {    
                tnpositive.push(TNjson.states_daily[i].tn); 
                tndates.push(TNjson.states_daily[i].date.substring(0,6));
            }
            if(TNjson.states_daily[i].status == "Recovered")   
            {    
                tnrecovered.push(TNjson.states_daily[i].tn);  
            }
            if(TNjson.states_daily[i].status == "Deceased")   
            {    
                tndeceased.push(TNjson.states_daily[i].tn);  
            }
            
        }
    

        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        
        var ctx = document.getElementById('myChart').getContext("2d");

        window.myChart=new Chart(ctx,{
        type:'bar',
        data:{
            labels:tndates,
            datasets:[
                
                {
                    data:tnpositive,
                    label: "Confirmed Cases",
                    fill: true,
                    backgroundColor: "#c2185b",
                },         
                   
                
                {
                    data:tnrecovered,
                    label: "Recovered",
                    fill: true,
                    backgroundColor: "#4fc3f7",
                },  
                
                {
                    data:tndeceased,
                    label:"Deceased",
                    fill: true,
                    backgroundColor:"#ff1744",
                },      
            
            ]
            
        },
        options:{
            maintainAspectRatio:false,
            responsive:true,
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    stacked: true,
                    
                }]
            },            
            animation: {
                easing: "easeInQuart"
            }
        }


    })

    }
}

function loadTN(){
    const req= new XMLHttpRequest();
    req.open('GET','https://api.covid19india.org/data.json',true);
    req.send();
    req.onload=function(){
        const json=JSON.parse(req.responseText);
        var tempConfirmed,tempRecovered,tempDeceased,tempDate,tempActive;

        for(var i in json.statewise)
        {
            if(json.statewise[i].statecode=="TN")
            {
                tempConfirmed=json.statewise[i].confirmed;
                tempActive=json.statewise[i].active;
                tempRecovered=json.statewise[i].recovered;
                tempDeceased=json.statewise[i].deaths;
                tempDate=json.statewise[i].lastupdatedtime;

            }
        }
        document.getElementById('positive').innerHTML=tempConfirmed;
        document.getElementById('active').innerHTML=tempActive;
        document.getElementById('recovered').innerHTML=tempRecovered;
        document.getElementById('deceased').innerHTML=tempDeceased;
        document.getElementById('updatedtime').innerHTML="Updated as of "+tempDate;
    }

    loadTNChart();
}

function loadInd(){
    //console.log("Got it");
    const req= new XMLHttpRequest();
    req.open('GET','https://api.covid19india.org/data.json',true);
    req.send();
    req.onload=function(){
        const json=JSON.parse(req.responseText);
        document.getElementById('positive').innerHTML=json.statewise[0].confirmed;
        document.getElementById('active').innerHTML=json.statewise[0].active;
        document.getElementById('recovered').innerHTML=json.statewise[0].recovered;
        document.getElementById('deceased').innerHTML=json.statewise[0].deaths;
        document.getElementById('updatedtime').innerHTML="Updated as of "+json.statewise[0].lastupdatedtime;
        document.getElementById('updatedEntity').innerHTML="COVID-19 - INDIA";

        loadIndChart();
    }
}

document.addEventListener('DOMContentLoaded',function()
{

    const chk = document.getElementById('chk');

    chk.addEventListener('change', () => {
        document.body.classList.toggle('light');
    });
});