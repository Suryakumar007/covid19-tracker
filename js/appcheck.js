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

        var ctx = document.getElementById('myChart').getContext("2d");

        var redgradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        redgradientStroke.addColorStop(0, 'red');
        redgradientStroke.addColorStop(1, 'orange');

        var greengradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        greengradientStroke.addColorStop(0, 'green');
        greengradientStroke.addColorStop(1, '#54f542');

        var greygradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        greygradientStroke.addColorStop(0, 'grey');
        greygradientStroke.addColorStop(1, 'white');

        var myChart=new Chart(ctx,{
            type:'line',
            data:{
                labels:Inddates,
                datasets:[
                    
                    {
                        data:Inddeceased,
                        label:"Deceased",
                        borderColor: greygradientStroke,
                        pointBorderColor: greygradientStroke,
                        pointBackgroundColor: greygradientStroke,
                        pointHoverBackgroundColor: greygradientStroke,
                        pointHoverBorderColor: greygradientStroke,
                        pointBorderWidth: 5,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor:"grey",
                        borderWidth: 4
                    },       
                    
                    {
                        data:Indrecovered,
                        label: "Recovered",
                        borderColor: greengradientStroke,
                        pointBorderColor: greengradientStroke,
                        pointBackgroundColor: greengradientStroke,
                        pointHoverBackgroundColor: greengradientStroke,
                        pointHoverBorderColor: greengradientStroke,
                        pointBorderWidth: 5,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor: "#138207",
                        borderWidth: 4
                    }, 
                    {
                        data:Indpositive,
                        label: "Positive",
                        borderColor: redgradientStroke,
                        pointBorderColor: redgradientStroke,
                        pointBackgroundColor: redgradientStroke,
                        pointHoverBackgroundColor: redgradientStroke,
                        pointHoverBorderColor: redgradientStroke,
                        pointBorderWidth: 3,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 3,
                        fill: true,
                        backgroundColor: "rgba(244, 144, 128, 0.8)",
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
        console.log(TNjson.states_daily.length);
    
        
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
        
        var ctx = document.getElementById('myChart').getContext("2d");

        var redgradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        redgradientStroke.addColorStop(0, 'red');
        redgradientStroke.addColorStop(1, 'orange');

        var greengradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        greengradientStroke.addColorStop(0, 'green');
        greengradientStroke.addColorStop(1, '#54f542');

        var greygradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        greygradientStroke.addColorStop(0, 'grey');
        greygradientStroke.addColorStop(1, 'white');

        var myChart=new Chart(ctx,{
        type:'line',
        data:{
            labels:tndates,
            datasets:[
                
                {
                    data:tndeceased,
                    label:"Deceased",
                    borderColor: greygradientStroke,
                    pointBorderColor: greygradientStroke,
                    pointBackgroundColor: greygradientStroke,
                    pointHoverBackgroundColor: greygradientStroke,
                    pointHoverBorderColor: greygradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor:'grey',
                    borderWidth: 4
                },       
                
                {
                    data:tnrecovered,
                    label: "Recovered",
                    borderColor: greengradientStroke,
                    pointBorderColor: greengradientStroke,
                    pointBackgroundColor: greengradientStroke,
                    pointHoverBackgroundColor: greengradientStroke,
                    pointHoverBorderColor: greengradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: "#138207",
                    borderWidth: 4
                }, 
                {
                    data:tnpositive,
                    label: "Positive",
                    borderColor: redgradientStroke,
                    pointBorderColor: redgradientStroke,
                    pointBackgroundColor: redgradientStroke,
                    pointHoverBackgroundColor: redgradientStroke,
                    pointHoverBorderColor: redgradientStroke,
                    pointBorderWidth: 3,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: "rgba(244, 144, 128, 0.8)",
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