document.addEventListener('DOMContentLoaded',function()
{
    const req= new XMLHttpRequest();
    req.open('GET','https://api.covid19india.org/data.json',true);
    req.send();
    req.onload=function(){
        const json=JSON.parse(req.responseText);
        //console.log(json.statewise[3].confirmed);
        document.getElementById('positive').innerHTML=json.statewise[3].confirmed;
        document.getElementById('recovered').innerHTML=json.statewise[3].recovered;
        document.getElementById('deceased').innerHTML=json.statewise[3].deaths;
        document.getElementById('updatedtime').innerHTML="Updated as of "+json.statewise[3].lastupdatedtime;
    }

    loadTNChart();
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
            Indpositive.push(IndJson.cases_time_series[i].totalconfirmed);
            Indrecovered.push(IndJson.cases_time_series[i].totalrecovered);
            Inddeceased.push(IndJson.cases_time_series[i].totaldeceased);
            Inddates.push(IndJson.cases_time_series[i].date.substring(0,6));
        }

        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }

        var ctx = document.getElementById('myChart').getContext("2d");



        window.myChart=new Chart(ctx,{
            type:'line',
            data:{
                labels:Inddates,
                datasets:[
                    
                    {
                        data:Inddeceased,
                        label:"Deceased",
                        borderColor: 'grey',
                        pointBorderColor: 'grey',
                        pointBackgroundColor: 'grey',
                        pointHoverBackgroundColor: 'grey',
                        pointHoverBorderColor: 'grey',
                        pointBorderWidth: 5,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: false,
                        backgroundColor:"grey",
                        borderWidth: 4
                    },       
                    
                    {
                        data:Indrecovered,
                        label: "Recovered",
                        borderColor: "#138207",
                        pointBorderColor: "#138207",
                        pointBackgroundColor: "#138207",
                        pointHoverBackgroundColor: "#138207",
                        pointHoverBorderColor: "#138207",
                        pointBorderWidth: 5,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: false,
                        backgroundColor: "#138207",
                        borderWidth: 4
                    }, 
                    {
                        data:Indpositive,
                        label: "Positive",
                        borderColor: 'red',
                        pointBorderColor: 'red',
                        pointBackgroundColor: 'red',
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderColor: 'red',
                        pointBorderWidth: 3,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: false,
                        backgroundColor: "#FF1744",
                        borderWidth: 4
                    },             
                
                ]
                
            },
            options:{
                maintainAspectRatio:false,
                responsive:true,
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
    
        
        for(var i=1;i<tnpositive.length;i++)
        {
            tnpositive[i]=parseInt(tnpositive[i-1]) + parseInt(tnpositive[i]);
            tnrecovered[i]=parseInt(tnrecovered[i-1]) + parseInt(tnrecovered[i]);
            tndeceased[i]=parseInt(tndeceased[i-1]) + parseInt(tndeceased[i]);
        }

        console.log(tnpositive);
        console.log(tnrecovered);
        console.log(tndeceased);
        console.log(tndates);

        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        
        var ctx = document.getElementById('myChart').getContext("2d");

        window.myChart=new Chart(ctx,{
        type:'line',
        data:{
            labels:tndates,
            datasets:[
                
                {
                    data:tndeceased,
                    label:"Deceased",
                    borderColor: 'grey',
                    pointBorderColor: 'grey',
                    pointBackgroundColor: 'grey',
                    pointHoverBackgroundColor: 'grey',
                    pointHoverBorderColor: 'grey',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    backgroundColor:'grey',
                    borderWidth: 4
                },       
                
                {
                    data:tnrecovered,
                    label: "Recovered",
                    borderColor: "#138207",
                    pointBorderColor:"#138207",
                    pointBackgroundColor: "#138207",
                    pointHoverBackgroundColor: "#138207",
                    pointHoverBorderColor: "#138207",
                    pointBorderWidth: 3,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    backgroundColor: "#138207",
                    borderWidth: 4
                }, 
                {
                    data:tnpositive,
                    label: "Positive",
                    borderColor: 'red',
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
                    pointHoverBackgroundColor: 'red',
                    pointHoverBorderColor: 'red',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false ,
                    backgroundColor: "#FF1744",
                    borderWidth: 4
                },             
            
            ]
            
        },
        options:{
            maintainAspectRatio:false,
            responsive:true,
            animation: {
                easing: "easeInQuart"
            }
        }


    })

    }
}

function loadTN(){
    console.log("Got it");
    const req= new XMLHttpRequest();
    req.open('GET','https://api.covid19india.org/data.json',true);
    req.send();
    req.onload=function(){
        const json=JSON.parse(req.responseText);
        //console.log(json.statewise[3].confirmed);
        document.getElementById('positive').innerHTML=json.statewise[3].confirmed;
        document.getElementById('recovered').innerHTML=json.statewise[3].recovered;
        document.getElementById('deceased').innerHTML=json.statewise[3].deaths;
        document.getElementById('updatedtime').innerHTML="Updated as of "+json.statewise[3].lastupdatedtime;
        document.getElementById('updatedEntity').innerHTML="COVID-19 - TN";
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
        console.log(json.statewise[0].confirmed);
        document.getElementById('positive').innerHTML=json.statewise[0].confirmed;
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