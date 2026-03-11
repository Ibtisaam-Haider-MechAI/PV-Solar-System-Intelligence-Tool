function calculateSolar(){

    let load = Number(document.getElementById("load").value);
    let solarWatt = Number(document.getElementById("solar").value);
    let sunrisehours = Number(document.getElementById("sunrisehours").value);
    let Systemlosses = Number(document.getElementById("losses").value/100);
    let Factor = Number(document.getElementById("Factor").value);
    let Area = Number(document.getElementById("area").value);
    let InverterUse = document.getElementById("select").value;
    let Ambienttemperature = document.getElementById("Temperature").value;
    let BatteryHours = document.getElementById("Battery").value;


    let Efficiency = 1 - Systemlosses;

    let systemSize = (load/(sunrisehours * Efficiency)); //kW (for PV Actual Sizing)

    let ExpandedPV = systemSize * Factor; //kW (For Safety & future expand system)

    let monthlyload = (load * 30); //kWh/month 

    let Annualload = (monthlyload * 12); //kWh/Year

    let numberofPanels = Math.ceil(ExpandedPV * 1000 / solarWatt); // Multiply by 1000 to convert system KW To Watts (W)

    let dailyproduction = ExpandedPV * sunrisehours * Efficiency; // For one Solar Production

    let monthlyproduction = (ExpandedPV * sunrisehours * Efficiency) * 30; 

    let annualproduction = (monthlyproduction * 12); //kWh/Year 

    let TotalAreaRequired = Area * numberofPanels;
    
    let InverterInstalled = ExpandedPV * 1.5;  

    let CostperkW = 175000;
    let totalCost = ExpandedPV * CostperkW;

    let dailyloss = (Ambienttemperature - 25) * 0.0045; //Daily Loss If Ambient Temperature rises by 25C

    let dailyPowerloss = ExpandedPV * dailyloss;

    let monthlyloss = dailyloss * 30; //Monthly Loss If Ambient Temperature rises by 25C

    let monthlyPowerloss = ExpandedPV * monthlyloss;

    let annualloss = monthlyloss * 12; //Annual Loss If Ambient Temperature rises by 25C

    let annualPowerloss = ExpandedPV * annualloss; 

    let Batterypower = (BatteryHours * load) / 0.80; //kWh


    document.getElementById("result").innerHTML = `

    <br>
    <br>

        <h1 class="slide"><i class="fa-solid fa-clipboard-check"></i> Results </h1>

    <div class= "overall">

        <div class="daily">
        <h2><i class="fa-solid fa-sun" style="color:#000"></i><br> Daily </h2>
        <p><b> Consume Energy:</b> ${load} kWh/day </p>
        <p><b> Solar Panel Power:</b> ${systemSize.toFixed(2)} kW </p>
        <p><b> Expanded Solar Panel Power:</b> ${ExpandedPV} kW <p>
        <p><b> Number Of Panels:</b> ${numberofPanels} </p>
        <p><b> Estimated Daily Production:</b> ${dailyproduction.toFixed(2)} kWh/day </p>
        <p><b> Total Area Required: </b> ${TotalAreaRequired} m^2 </p>
        <p><b> Inverter Use: </b> ${InverterUse} </p>
        <p><b> Inverter Power Required: </b> ${InverterInstalled} kW</p>
        <p><b> Solar Panel Cost:</b> ${totalCost} -/ Rs. </p><br><br>

           <b style= "text-align: center; color: #fff; font-size: 20px;"> Power Decreases, If Ambient Temperature > 25C </b>

        <p><b> Solar Power Loss (If Ambient Temperature Increases):</b> ${dailyPowerloss} kW </p>

        </div> 


        <div class="monthly">
        <h2><i class="fa-solid fa-calendar-days" style="color:#000"></i><br> Monthly </h2>
        <p><b> Consume Energy:</b> ${monthlyload} kWh/month </p>
        <p><b> Estimated Monthly Production:</b> ${monthlyproduction} kWh/month </p><br><br>

            <b style= "text-align: center; color: #fff; font-size: 20px;"> Power Decreases, If Ambient Temperature > 25C </b>


        <p><b> Solar Power Loss (If Ambient Temperature Increases):</b> ${monthlyPowerloss} kW </p>
        </div>

        <div class="annual">
            <h2><i class="fa-solid fa-clock" style="color:#000"></i><br> Annual </h2>

            <p><b> Consume Energy:</b> ${Annualload} kWh/Year </p>
            <p><b> Estimated Annual Production:</b> ${annualproduction} kWh/Year </p>
                
                <b style= "text-align: center; color: #fff; font-size: 20px;"> Power Decreases, If Ambient Temperature > 25C </b>


        <p><b> Solar Power Loss (If Ambient Temperature Increases):</b> ${annualPowerloss} kW </p>

        </div>

        <div class="battery">
        <h2><i class="fa-solid fa-battery-full" style="color:#000"></i><br> Battery Plan </h2>
        <p><b> Battery Capacity Required:</b> ${Batterypower} kWh </p>

        </div>

    </div>


    <br>
    <br> 


        `;



let ctx1 = document.getElementById("solarChart").getContext("2d");

// Destroy previous chart (IMPORTANT)
if (window.solarChartInstance) {
    window.solarChartInstance.destroy();
}

window.solarChartInstance = new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Daily Load", "Solar Daily Production"],
        
        datasets: [{
            label: "Energy (kWh)/day",
            data: [load, dailyproduction],

            backgroundColor: [

                "#d9af54b2"
            ],

            borderColor: [

                "#000"
            ],

            borderWidth: 1,
            borderRadius: 8,
            barThickness: 110 

        }]

    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {

            title: {
                display: true,
                text: "Load vs Solar Production",

                font: {
                    size: 24,
                    weight: "bold"
                }

            },

            legend: {

                labels:{
                    color: "#82dc14ff",

                    font: {
                        size: 20,
                        weight: "550"
                    }
                }
            },


            tooltip: {

            backgroundColor: "#fff",
            titleColor: "#82dc14ff",
            bodyColor: "#474242ff",
            borderColor: "#000",
            borderWidth: 1

           }
        },

        scales: {

            y: {
                beginAtZero: true
            }
        }
    }
});




let ctx2 = document.getElementById("monthlyChart").getContext("2d");

// Destroy previous chart (IMPORTANT)
if (window.monthlyChartInstance) {
    window.monthlyChartInstance.destroy();
}

window.monthlyChartInstance = new Chart (ctx2, {

    type: "bar",
    data: {
        labels: ["Monthly Load", "Solar Monthly Production"],

    datasets: [{
        label: "Energy (KWh)/month",
        data: [monthlyload, monthlyproduction],

        backgroundColor: [

            "#d9af54b2"
        ],

        borderColor: [
            "#000"
        ],

        borderWidth: 1,
        borderRadius: 8,
        barThickness: 110

    }]

    },


    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {

            title: {

            display: true,
            text: "Monthly Load vs Solar Monthly Production",

            font: {
                size: 24,
                weight: "bold",
            }
        },

            legend: {

            labels: {

                color: "#82dc14ff",

                font: {
                    size: 20,
                    weight: "bold",
                }

            }

        },

        tooltip: {

            backgroundColor: "#fff",
            titleColor: "#82dc14ff",
            bodyColor: "#474242ff",
            borderColor: "#000",
            borderWidth: 1

        }

        },

        scales: {

            y: {
                beginAtZero: true
            }
        }
    }
});


document.getElementById("info").innerHTML = `


        <h4 style="text-align: center; color: #82dc14ff; font-size: 24px"><i class="fas fa-calendar-days" style="color: #000; padding-right:12px"></i> All the future plans and roadmap are here with detailed information: </h4>

    <div class="deep" style="margin: 25px 0px; text-align:center">

        <select onchange="go(this.value)" style="padding: 14px; font-size: 16px; font-weight: light; background: #42da1c; color: #fff">

        <option value=""> -- Select -- </option>
        <option value="page1.html"> Plan Solar System Installation </option>
        <option value="page2.html"> View Payback Period </option>
        <option value="page3.html"> View ROI </option>

        </select>

    </div>


`;


}


// 3️⃣ Utility functions (HERE 👇)

function downloadChart() {
    let canvas = document.getElementById("solarChart");

    if (!canvas) {
        alert("Chart not available yet!");
        return;
    }

    let link = document.createElement("a");
    link.download = "solar-daily.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}


function downloadMonthly() {
    let canvas= document.getElementById("monthlyChart");

    if (!canvas){
        alert("Chart Available not yet!")
        return;
    }

    let link = document.createElement("a");
    link.download = "solar-monthly.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}


function go(page){

        if (page) window.location.href = page;


}





