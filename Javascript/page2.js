function calculateFinal(){

    let YearlyUnits = Number(document.getElementById("year").value);
    let SolarWatts =Number(document.getElementById("watt").value);
    let Sunhours = Number(document.getElementById("sun").value);
    let Efficiency =Number(document.getElementById("efficiency").value);
    let value = document.getElementById("solarType").value;
    let Sustain= Number(document.getElementById("Reduction").value);




    let MonthlyUnits = YearlyUnits / 12;
    let dailyUnits = MonthlyUnits / 30;

    let systemSize = dailyUnits / (Sunhours * Efficiency); // kW/day Solar Power   ....  Required Capacity
    let SafetyFactor = 1.75;
    let ExpandedPV = systemSize * SafetyFactor;  // kW/day with factor of Safety





    // After calculating the Actual Size of PV, calculate the no. of panels according to Solar Watts. Inversely Proportional to Solar Watts.
    // It depends on you, which capacity Watts (W) you select. The higher Capacity (W), the low no. of panels required. 

    let numberofPanels = (ExpandedPV * 1000) / SolarWatts;


    // Now, we will find the inverter Size which is 1.5-times the Actual Size(Expanded PV). Used for future extended Plan.

    let InverterSize = (ExpandedPV * 1.5);  // kW 


    // Cost Required for Solar Panel according to its Actual Size(Expnded PV);

    let CostperkW = 175000;
    let SolarPanelCost = ExpandedPV * CostperkW; 

    let InverterCost = 140000;           
    let StructureCost = 60000;
    let netmetering = 65000;
    let laborCost = 40000;


    // Total Cost Required To Install On-Grid Solar System

    let PVSystemCost = (SolarPanelCost + InverterCost + StructureCost + netmetering + laborCost);



    // After suggesting system size & Actual Size (ExpandedPV) according to daily load, we see how much energy production rate per day which varies according to sun rise hours (hrs).

    let dailyproduction = ExpandedPV * Sunhours ; //kWh for one day ..... How much it generates Energy?

    let monthlyproduction = dailyproduction * 30; //kWh for one month ..... How much it generates Energy?

    let yearlyproduction = monthlyproduction * 12; //kWh for one month ..... How much it generates Energy?



    // After all these, we decide which type of Solar System should be used for that. It totally Depends on customer.

    // 1. On-Grid Solar System
    // 1. Off-Grid Solar System
    // 1. Hybrid Solar System





    // Now, find the Payback Period according to Government Tarriff Rate & @ NEPRA 

    let TarriffRate = 40; // Per Unit Rate Supply from Government

    let sellunit = 20; // Sell Per Unit @ NEPRA





    // Find the net-metering, how much this system saves your money per year

    let ExcessUnits = (yearlyproduction - YearlyUnits);  // Excess Units Produce/Year 

    let savemoney = (YearlyUnits * TarriffRate); // 1- Find the money save, which you pay before Solar System Installed 

    let soldRate = (ExcessUnits * sellunit);     // 2- Find the money save, which you sell excess units to Government 

    let totalsave = (savemoney + soldRate);      // Total save money, sum of government not pay & sell units to government 


    // Now, find the Actual Payback Period

    let paybackperiod = (PVSystemCost / totalsave); // Gives the total payback period

    // Now, find the rate on investment (ROI) per Year

    let ROI = (1 / paybackperiod) * 100;           // Gives the return percent on your initial (fixed) cost




    // Sustainable Environment to reduce carbon-dioxide emission by replacing the commercial trend to generate electricity (kWh)

    let Reduce = (yearlyproduction * Sustain); // Gives the reduction of Carbon dioxide annually

    let MoreReduce = (Reduce * 25); // Reduced carbon dioxide emiision for 25-years



    document.getElementById("final").innerHTML = `


    <h1><i class="fa-solid fa-bolt" style="color:orange"></i> On-Grid Solar System</h1>


    <h2><i class="fa-solid fa-calendar-check"></i> Units Consume vs Solar Sizing</h2>


    <div class= "compare">

    <h2 style="color:blue; padding: 25px 0px"> Units Consme Data </h2>

    <div class="sizing">
    
    <p><b> Yearly Units Consume: </b> ${YearlyUnits} kWh/Year </p>
    <p><b> Monthly Units Consume: </b> ${MonthlyUnits} kWh/month </p>
    <p><b> Daily Units Consume: </b> ${dailyUnits} kWh/day </p>

    <p><b> Solar System Size:</b> ${systemSize} kW </p>
    <p><b> Expanded Solar Power:</b> ${ExpandedPV} kW </p>
    <p><b> Number of Panels Required: </b> ${numberofPanels} </p>

    <p><b> Inverter Size Required: </b> ${InverterSize} kW </p>

    <h2 style="color:blue; padding: 25px 0px"> Energy Production Data </h2>


    <p><b> Daily Energy Production: </b> ${dailyproduction} kWh/day </p>
    <p><b> Monthly Energy Production: </b> ${monthlyproduction} kWh/month </p>
    <p><b> Yearly Energy Production: </b> ${yearlyproduction} kWh/year </p>

    </div>

    <div class="sizing">

    <p><b> Excess Units Produced:</b>   ${ExcessUnits} kWh / Year </p>

    </div>

    <h2 style="color:blue; padding: 25px 0px"><i class="fa-solid fa-tree fa-flip" style="color: green"></i> Environmental Sustainability Impact </h2>

    <div class="reduction">

    <p><b> Reduced Carbon Dioxide Emission Annually: </b>${Reduce} kg </p> 
    <p><b> 25-Year Reduced Carbon Dioxide Emission:</b>${MoreReduce} kg</p> 

    </div>

    </div>
    
    `;


    document.getElementById("more").innerHTML = `

    <h2><b><i class="fa-solid fa-clock"></i> Payback Period & ROI </b></h2>

        <div class="total">

        <p><b> <i class="fa-solid fa-solar-panel fa-bounce"></i> Type of Solar System:</b> ${value} </p>

        <p><b> Solar Panel Cost: </b> ${SolarPanelCost} Rs. </p>

        <p><b> Inverter String(On-Grid) Cost:</b> ${InverterCost}  </p>

        <p><b> Structure & Frame Cost:</b> ${StructureCost}  </p>

        <p><b> On-Grid Net Metering Cost:</b> ${netmetering}  </p>
        
        <p><b> Total Labor Cost:</b> ${laborCost}  </p>

        <p><b> Total Cost Required:</b> ${PVSystemCost} Rs. <b>(On-Grid Solar System)</b> </p>

        </div>

        <div class="total">

        <p><b> How much you pay bill before Solar Installation: </b> ${savemoney} Rs./Year </p>

        <p><b> How much you Earn from WAPDA by selling excess units produce: </b> ${soldRate} Rs./Year </p>

        <p><b> Total Save Money (On-Grid):</b> ${totalsave} Rs./Year </p>


        </div>

        <div class="total">

        <p><b> Payback Period: </b> ${paybackperiod} Year  </p>

        <p><b> Return On Investment: </b> ${ROI} % / Year  </p>

        </div>

        <div class="total">

        <p><b> Clear Results:</b> This ${systemSize} kW generates annually energy ${yearlyproduction} kWh/year, which covers almost  ${(dailyUnits / dailyproduction) * 100} % of house-hold appliances & excess energy export to grid for net-metering and covers initial investment gradually. </p>  

        </div>

    
    `;


}






async function generateOnGridReport() {

    // 1. Load Excel template
    const response = await fetch("PV Solar System Excel Template.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });


    // 2. Access Sheets
    const inputSheet = workbook.Sheets["Inputs"];
    const techSheet = workbook.Sheets["Technical"];
    const finSheet = workbook.Sheets["Financial"];
    const envSheet = workbook.Sheets["Environmental"];
    const feasSheet = workbook.Sheets["Feasible"];
    const scorSheet = workbook.Sheets["Scoring"];
    const testSheet = workbook.Sheets["Testing"];




//    3. Get your calculated results from software
//    let InverterSize = (ExpandedPV * 1.5);  // kW
//    let Sunvalue = Sunhours;
//    let systemSize = ExpandedPV;
//    let annualGeneration = yearlyproduction;
//    let panels = numberofPanels;
//    let inverter = InverterSize;


let Sunhours = Number(document.getElementById("sun").value);

let YearlyUnits = Number(document.getElementById("year").value);

let Efficiency = Number(document.getElementById("efficiency").value);

let SolarWatts = Number(document.getElementById("watt").value);

let Sustain= Number(document.getElementById("Reduction").value);





let dailyUnits = (YearlyUnits / (12 * 30));

let systemSize = dailyUnits / (Sunhours * Efficiency);

let ExpandedPV = (systemSize * 1.75);

let dailyproduction = (ExpandedPV * Sunhours);

let monthlyproduction = (dailyproduction * 30);

let yearlyproduction = (monthlyproduction * 12);

let numberofPanels = (ExpandedPV * 1000) / SolarWatts;

let InverterSize = (ExpandedPV * 1.5);


let Reduce = (yearlyproduction * Sustain); // Gives the reduction of Carbon dioxide annually

let MoreReduce = (Reduce * 25); // Reduced carbon dioxide emiision for 25-years




    let Sunvalue = Sunhours;

    let annualUnits = YearlyUnits; // kWh/year
    let annualGeneration = yearlyproduction; // kWh/year
    let SolarSize = SolarWatts; // Watts (W)
    let panels = numberofPanels;  

    let inverter = InverterSize; // kW
    let ExcessUnits = (yearlyproduction - YearlyUnits); // kWh/Year


    let green = Reduce;
    let moregreen = MoreReduce;
     

    // Save Money Data (Rs.)

    let TarriffRate = 40; // Rs./Unit
    let SellRate = 20; // Rs./Unit

    let savemoney = (YearlyUnits * TarriffRate); // Rs.

    let soldRate = (ExcessUnits * SellRate);     // Rs.


    let totalsave = (savemoney + soldRate); // Rs.


    // PVSystem Cost Estimation
    let CostperkW = 175000; //Rs.
    let SolarPanelCost = (ExpandedPV * CostperkW); // Rs.
    let InverterCost = 140000; // Rs.
    let StructureCost = 60000;
    let netmetering = 65000;
    let laborCost = 40000;

    let systemCost = (SolarPanelCost + InverterCost + StructureCost + netmetering + laborCost); // Rs.


    let savings = totalsave; // Rs.

    let paybackperiod = (systemCost / savings); // Years

    let payback = paybackperiod; // Years 

    let ROI = (1 / payback) * 100;

    let profit = ROI; // %/Year



    // Environmental Impact

    let absorb = 21; // 1 Tree Absorbs 21kg Carbon Dioxide per year





    // Then, after PV Solar system that reduced the Carbon Dioxide Emission how many trees will implant & save.

    let implant = (green / absorb); // Tells that how many trees will implant/year




    // Feasible Status

    let r = 0.1; // Discount rate compare to bank "Benchmark" rate of return per year.

    let OMCost = (savings/10);  // Operating & Maintenance Cost required for system per year

    let Cashflow = (savings - OMCost);

    let NPV = (Cashflow / (1+r)^32) - systemCost; // It gives net present value of solar system for its entire life span = 32 years




    // Internal Rate Of Return


    // systemCost = (Cashflow / (1+r)^32)

    // systemCost*(1+r)^32 = Cashflow

    // (1+r)^32 = Cashflow/systemCost

    // 1+r = (Cashflow/systemCost)^(1/32)

    // r = (Cashflow/systemCost)^(1/32) - 1 //gives actual internal rate of return

    let IRR = (Cashflow/systemCost)^(1/32) - 1; // Gives actual rate of return of the system




    // LCOE (To Check, how much our solar system charge to generate 1 Units) & compare with Tarriff Grid Rate

    let Lifetimeenergygeneration = (annualGeneration * 32); // Life Time Units generated by solar system (For 32 Years)

    let LCOE = (systemCost/Lifetimeenergygeneration);  // How much it costs to generate 1 Unit (1 kWh)


    // Environmental Monetization

    let carboncredit = 2800; // Carbon dioxide reduction price per Ton

    let carbonannually = (green/1000) * carboncredit; // Gives annually carbon credit price

    let Totalcarbon = (carbonannually * 25); // Gives Life Time carbon credit price


    // Scoring Index



    let coverage = (dailyUnits / dailyproduction) * 100;  // Gives total coverage (%) daiy by solar system


    let ScoringIndex = (green + moregreen + coverage + LCOE)

    // Testing & Scoring

    // "Pick 1 Case, then manually solve the case & cross-check with the software results. It give actual results as software gives. Check 2 sections:"

    // 1. Physical Module
    // 2. Economic Module

    

    


    // 4. Write values into Excel cells

    // INPUT

    inputSheet["D9"].v = Sunvalue;
    inputSheet["D5"].v = annualUnits;
    inputSheet["D11"].v = systemSize;
    inputSheet["D12"].v = SolarSize;
    


    // TECHNICAL

    techSheet["E5"].v = annualGeneration;
   techSheet["E8"].v = panels;
    techSheet["E9"].v = inverter;
    techSheet["E14"].v = green;
    techSheet["E15"].v = moregreen;

    // FINANCIAL

    finSheet["D10"].v = systemCost;
    finSheet["G7"].v = savings;
   finSheet["G8"].v = payback;
    finSheet["G9"].v = profit;

    //ENVIRONMENTAL

    envSheet["B5"].v = green;
    envSheet["B6"].v = moregreen;
    envSheet["B8"].v = implant;

    // Feasible

    feasSheet["B7"].v = r;
    feasSheet["B8"].v = savings;
    feasSheet["B9"].v = OMCost;
    feasSheet["B10"].v = systemCost;
    feasSheet["B11"].v = Cashflow;
    feasSheet["B12"].v = NPV;
    feasSheet["B21"].v = IRR;
    feasSheet["B31"].v = LCOE;
    feasSheet["B43"].v = carboncredit;
    feasSheet["B46"].v = carbonannually;
    feasSheet["B49"].v = Totalcarbon;

    // Scoring

    scorSheet["D6"].v = green;
    scorSheet["D7"].v = moregreen;
    scorSheet["D8"].v = coverage;
    scorSheet["D9"].v = LCOE;
    scorSheet["C11"].v = ScoringIndex;

    // Testing

    

    testSheet["B11"].v = Sunvalue;
    testSheet["B13"].v = systemSize;
    testSheet["B14"].v = SolarSize;
    testSheet["F9"].v = systemCost;
    testSheet["F10"].v = Cashflow;
    testSheet["F11"].v = NPV;
    testSheet["F15"].v = LCOE;
    testSheet["F16"].v = payback;
    testSheet["F17"].v = profit;





    // 5. Download updated file
    XLSX.writeFile(workbook,  "SunEnergy Value Results.xlsx");
}










function calculatetypes(){

    let YearlyUnits = Number(document.getElementById("offyear").value); // kWh/year
    let Sunhours = Number(document.getElementById("offhours").value);   // hrs.
    let SolarWatts = Number(document.getElementById("offWatts").value);  // Which capacity of solar have?
    


    let Efficiency = 0.80; // Total System efficiency due to some losses
    let SafetyFactor = 1.75; // For Safety in the system


    let MonthlyUnits = YearlyUnits / 12; // kWh/month
    let DailyUnits = MonthlyUnits / 30;  // kWh/day

    let systemSize = DailyUnits/(Sunhours * Efficiency); // kW (Toatl system required for that)
    let ExpandedPV = systemSize * SafetyFactor;          // kW (Actual Size Required)

    let numberofPanels = (ExpandedPV * 1000) / SolarWatts; // How many Panels Required for this panel size?

    let InverterSize = ExpandedPV * 1.5;  // kWh

    let dailyproduction = ExpandedPV * Sunhours;         // kWh (System Energy Production Daily)
    let monthlyproduction = dailyproduction * 30;        // kWh (System Energy Production Monthly)
    let yearlyproduction = monthlyproduction * 12;       // kWh (System Energy Production Yearly)


    let ExcessUnits = (yearlyproduction - YearlyUnits) // How much excess units produced in a year
    
    let yearlystore = ExcessUnits * 0.90; // Store Units, Some units waste due to internal losses in system (charge controller) 

    let monthlystore = yearlystore / 12; // monthly store units in a battery

    let dailystore = monthlyproduction / 30; // daily store units in a battery

    let Days = dailystore / DailyUnits; // Gives the battery BackUp without Sun


    // Now; coming towards the battery capacity required for the system

    let BackUpDays = Number(document.getElementById("offdays").value); // Battery run without sun

    

    let RequiredEnergy = DailyUnits * BackUpDays;   // kWh Gives maximum energy

    let DoD = 0.90;                 // Depth of discharge Efficiency (Usable Energy)

    let Volatage = 48;              // Battery Voltage = 48V

    let AdjustEnergy = RequiredEnergy / (DoD * Efficiency); // Gives real-time energy

    let BatteryCapacity = (AdjustEnergy * 1000) / Volatage; // Ah Gives Battery Capacity

    let StoredEnergy = (BatteryCapacity * Volatage) / 1000; // How much stored Energy

    let ActualStore = StoredEnergy / DoD; // Usable Energy (DoD = 80%)
    

    // Now; Find the Total Cost of Off-Grid Solar System

    let CostperkW = 175000;
    let PanelCost = ExpandedPV * CostperkW; // Gives the SolarPanel Cost according to its actual size

    let battery = 250000;

    let inverter = 200000;

    let structure = 60000;

    let labor = 50000;


    let totalCost = (PanelCost + battery + inverter + structure + labor);

    // Now; Find the Payback & ROI of Off-Grid Solar System

    let TarriffRate = 40; // Government imposed rupees per unit to consumers

    let savemoney = (YearlyUnits * TarriffRate); // Save the bill money after you install the off-grid solar system

    let paybackperiod = (totalCost / savemoney); // Tells how much years required to cover initial investment on OFF-Grid system

    let ROI = (1 / paybackperiod) * 100; // How much percent each year will cover initial investment for OFF-Grid system




    document.getElementById("types").innerHTML = `


    <div class="off" style="position:absolute; top: 319%; left: 50%">


<h1><i class="fa-solid fa-bolt" style="color:orange"></i> OFF-Grid Solar System</h1>

<h2><i class="fa-solid fa-calendar-check"></i> Units Consume vs Solar Sizing </h2>
 

<div class="total">

<h2 style="color:blue; padding: 25px 0px"> Units Consme Data </h2>

<p><b> Yearly Units Consume:</b>${YearlyUnits} kWh</p>
<p><b> Monthly Units Consume:</b>${MonthlyUnits} kWh</p>
<p><b> Daily Units Consume:</b>${DailyUnits} kWh</p>
<p><b> System Size:</b>${systemSize} kW</p>
<p><b> Actual Solar Size Required:</b>${ExpandedPV} kW</p>
<p><b> Number of Panels Required:</b>${numberofPanels}</p>
<p><b> Inverter Size Required:</b>${InverterSize} kW</p>


<h2 style="color:blue; padding: 25px 0px"> Energy Production Data </h2>

<p><b> Daily Energy Production:</b>${dailyproduction} kWh</p>
<p><b> Monthly Energy Production:</b>${monthlyproduction} kWh</p>
<p><b> Yearly Energy Production:</b>${yearlyproduction} kWh</p>


<h2 style="color:blue; padding: 25px 0px"> How Much Units Store in Battery? </h2>

<p><b> Excess Units Produce:</b> ${ExcessUnits} kWh/Year</p>
<p><b> Store Units Battery:</b> ${dailystore} kWh/Daily <b> Depens on excess units produce a day </b></p>      
<p><b> Store Units Battery:</b> ${monthlystore} kWh/Monthly </p>
<p><b> Store Units Battery:</b> ${yearlystore} kWh/Year </p>

<p><b> BackUp Days Without Sun:</b> ${Days} days <b> Used direct Method to find backup days </b></p> 



</div>

<div class="total">

<h2><i class="fa-solid fa-battery-half"></i> Battery Capacity (Ah) </h2>


<p><b> Battery Voltage:</b> ${Volatage} V</p>
<p><b> Required Battery Enery:</b> ${RequiredEnergy} kWh/day</p> 
<p><b> Actual Battery Enery:</b> ${AdjustEnergy} kWh/day</p>
<p><b> Battery Capacity:</b> ${BatteryCapacity} Ah/day</p>
<p><b> Battery Stored Energy:</b> ${ActualStore} kWh/day <b> Depends on the above input backup days </b></p> 

<p><b> Conclusion:</b>Required <b> ${BatteryCapacity}Ah </b> Battery to run home appliances in desired <b>${BackUpDays}</b>days. </p>



</div>


<div class="total">

<h2><i class="fa-solid fa-clock"></i> Payback Period & ROI </h2>

<p><b> Battery Cost:</b> ${battery} Rs.</p>
<p><b> Inverter Cost:</b> ${inverter} Rs.</p>
<p><b> Structure & Frame Cost:</b> ${structure} Rs.</p>
<p><b> Labor Cost:</b> ${labor} Rs.</p>

<p><b> Total Cost Required:</b> ${totalCost} Rs. </p>

<p><b> Total Save Money (OFF-Grid):</b> ${savemoney} Rs. </p>

</div> 

<div class="total">

<p><b> Payback Period:</b> ${paybackperiod} Years </p>
<p><b> Return On Investment:</b> ${ROI} % / Year </p>


</div>

</div>


`;


}

function calculatehybrid(){

    let YearlyUnits = Number(document.getElementById("hybridyear").value);
    let Sunhours = Number(document.getElementById("hybridhours").value);
    let SolarWatts = Number(document.getElementById("hybridWatts").value);
    let Nightload = Number(document.getElementById("hybridnight").value);


    let MonthlyUnits = YearlyUnits / 12; // KWh/month Gives the monthly units consumed

    let DailyUnits = MonthlyUnits / 30; // kWh/day Gives the daily units consumed

    let DayUnits = DailyUnits - Nightload; // kWh/day Gives day-time units consume


    // let systemSize = DailyUnits / (Sunhours * Efficiency); // kW Tells Entire Solar System Size Required

    // let ExpandedPV = systemSize * SafetyFactor;            // kW Tells Required system size without consider Battery Charging

    // In Hybrid Solar System: Solar Size/Solar Array increases Significantly; 

    // The Energy Flows in 3 ways:

    // 1. Solar ____ Home Appliances (During Day-Time)
    // 2. Solar ____ Battery Charging (For BackUp Night-Time)
    // 3. Solar ____ Export Units to Grid (Excess units Produce)







    // Now, moving towards the battery Charging Requirements

    let Volatage = 48; // Voltage Supply to Battery

    let DoD = 0.90;             // Discharge stored Efficiency
    let Efficiency = 0.80;      // Solar system Efficiency

    let RequiredEnergy = (DailyUnits - DayUnits); // kWh = Night-Time Units Consumed

    let AdjustEnergy = RequiredEnergy / (DoD * Efficiency); // kWh (Gives actual battery charge with impact of discharge depth stored efficiency)

    let BatteryCapacity = (AdjustEnergy * 1000) / Volatage; // Ah (Gives the Battery Stored Energy in Ah)


    let StoredEnergy = (BatteryCapacity * Volatage) / 1000; // kWh/day (How much Battery Stored Energy per day?)

    let dailystore = StoredEnergy / DoD; // kWh Usable Store Units

    let monthlystore = dailystore * 30; // kWh/month (How much Battery Stored Energy per month?)

    let yearlystore = monthlystore * 12; // kWh/year (How much Battery Stored Energy per year?)




    
    let TotalRequiredEnergy = DayUnits + AdjustEnergy; // kWh Gives Solar Production Energy without sunhours

    let SolarSize = TotalRequiredEnergy / (Sunhours * Efficiency);  // kW Gives Actual Solar Size

    let numberofPanels = (SolarSize * 1000) / SolarWatts; // Gives number of Panels Required

    let InverterSize = SolarSize * 1.5; // Gives inverter Size for hybrid solar system


    let dailyproduction = SolarSize * Sunhours; // kWh/day
    let monthlyproduction = dailyproduction * 30; // kWh/month
    let yearlyproduction = monthlyproduction * 12; // kWh/year


    


    // Hybrid System, make the system economically friendly, so some units export to grid

    let exportunits = dailyproduction - TotalRequiredEnergy; // KWh/day (Gives the export units to grid)

    let TarriffRate = 40; // Government imposed 40rs. per Unit

    let dailypay = DailyUnits * TarriffRate; // Rs. (How much you pay before hybrid-mode)
    
    let annualpay = dailypay * 365; // Yearly Import units from grid before hybrid installation



    let exportrate = 20; // Export Units @ 20Rs./unit

    let dailysave = exportunits * exportrate;  // Rs. You earn by selling units

    let annualsave = dailysave * 365; // Yearly Export units to grid

    let netmetering = (annualpay + annualsave); // Rs. (Gives annually save money after installing hybrid system)

    let TotalSystemCost = 2000000;

    let paybackperiod = (TotalSystemCost / netmetering); // Gives how much years required to recover initial investment

    let ROI = (1 / paybackperiod) * 100; // Gives specific percent how much it covers initial investment




    document.getElementById("hybrid").innerHTML = `



    <div class="hybrid">

    <h1><i class="fa-solid fa-bolt style="color:orange"></i> Hybrid Solar System </h1>

    <h2><i class="fa-solid fa-calculator"></i> Units Consume vs Solar Sizing </h2>

    <div class="total">

    <h2 style="color:blue; padding: 25px 0px"> Units Consume Data </h2>  

    <p><b> Yearly Units Consumed:</b> ${YearlyUnits} kWh/Year</p>
    <p><b> Monthly Units Consumed:</b> ${MonthlyUnits} kWh/Year</p>
    <p><b> Daily Units Consumed:</b> ${DailyUnits} kWh/Year</p>




    <p><b> Number of Panels Required:</b> ${numberofPanels}  </p>

    <p><b> Night Time Units Consumed:</b> ${Nightload} kWh/day </p>

    <p><b> Solar Size Required:</b> ${SolarSize} kW </p>

    <p><b> Inverter Size Required:</b> ${InverterSize}  kW  </p>

    

    </div>


    <div class="total">

    <h2 style="color:blue; padding: 25px 0px"> Energy Production Data   </h2>

    <p><b> Daily Energy Production:</b> ${dailyproduction}  kWh/day </p>
    <p><b> Monthly Energy Production:</b> ${monthlyproduction}  kWh/month </p>
    <p><b> Yearly Energy Production:</b> ${yearlyproduction}  kWh/year </p>


    </div>


    <div class="total">

    <h2 style="color:blue; padding: 25px 0px"> How much units Battery Stored? </h2>

    <p><b> Daily Units Store:</b> ${dailystore} kWh/day </p>
    <p><b> Monthly Units Store:</b> ${monthlystore} kWh/month </p>
    <p><b> Yearly Units Store:</b> ${yearlystore} kWh/year </p>


    </div>



    <div class="total">

    <h2><i class="fa-solid fa-battery-full"></i> Battery Capacity  </h2>

    <p><b> Voltage Supplied to Battery:</b> ${Volatage} V</p>

    <p><b> Battery Stored Energy:</b> ${AdjustEnergy} kWh/day </p>

    <p><b> Battery Capacity: </b> ${BatteryCapacity} Ah/day </p>

    <p><b> Day Time Units Consumed: </b> ${DayUnits} kWh/day </p>

    <p><b> Solar Energy Required:</b> ${TotalRequiredEnergy} kWh/day </p>


    </div>

    <div class="total">

    <h2><i class="fa-solid fa-clock"></i> Payback Period & ROI </h2>

    <p><b> Excess units: </b> ${exportunits} units/day Export to Grid  </p>


    <p><b> Tarriff Unit Rate: </b> ${TarriffRate} Rs./unit </p>
    <p><b> Annual Cost Save:</b> ${annualpay}  Rs./year  </p>

    <p><b> Sell Unit Rate: </b> ${exportrate} Rs./unit </p>
    <p><b> Annual Earn Money:</b> ${annualsave} Rs./year </p>

    <p><b> Total Save Money:</b> ${netmetering} Rs./year  </p>
    <p><b> Hybrid System Cost:</b> ${TotalSystemCost} Rs./year  </p>


    <p><b> Payback Period:</b> ${paybackperiod} Years </p>
    <p><b> Return On investment:</b> ${ROI} % / Year </p>


    </div>




    </div>
    
    
    
    `;



}




 
