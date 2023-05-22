var myChart = echarts.init(document.getElementById('lineGraph'));
var myChart2 = echarts.init(document.getElementById('lineGraph2'));

function allowOnlyNumbers(inputElement) {
    inputElement.addEventListener('input', () => {
        const val = inputElement.value.replace(/[^0-9]/g, '').toLocaleString();
        const formattedInput = Number(val).toLocaleString();
        inputElement.value = formattedInput;
	    
    	if (val === '' || val === '0') {
          inputElement.value = '';
        }
    });
}

function formatNumberInput(inputElement) {
    inputElement.addEventListener('input', () => {
        let val = inputElement.value.replace(/[^0-9.]/g, '');
        
        const decimalIndex = val.indexOf('.');
        if (decimalIndex !== -1) {
            const integerPart = val.slice(0, decimalIndex);
            const limitedIntegerPart = integerPart.slice(0, 2);
            
            const decimalPart = val.slice(decimalIndex + 1);
            const limitedDecimalPart = decimalPart.slice(0, 2);
            
            val = `${limitedIntegerPart}.${limitedDecimalPart}`;
        } else {
            val = val.slice(0, 2);
        }
        
        inputElement.value = val;
    });
}


const setCellValue = (cell, value) =>{
    document.getElementById(cell).textContent = value;
}

// form elements
let totalValue;
const typeESOP = document.getElementById("ESOP");
const typeVSOP = document.getElementById("VSOP");
const customPoolSize = document.getElementById("custom-pool-size");
const shares = document.getElementById("shares");
const valuation = document.getElementById("valuation");
const jobLevel = document.getElementById("job-level");
const annualGrossSalary = document.getElementById("annual-gross-salary");
const customOfferSize = document.getElementById("custom-offer-size");
const vestingPeriod = document.getElementById("vesting-period");
const cliffPeriod = document.getElementById("cliff-period");
const calculatorMessage = document.getElementById("calculator-message");

const customValuation = document.getElementById("custom-valuation");
const dropdownValuationLabel = document.getElementById("dropdown-valuation-label");
const dropdownJobJevelJabel = document.getElementById("dropdown-job-level-label");

calculatorMessage.placeholder = placeholder= `Hey! 

We are thrilled to offer you a position in our team!

We would like to offer you a choice between three exciting compensation packages (salary and equity). The options have a 4 year vesting schedule with a 1 year cliff.

You can read more about equity compensation pros and cons at`

let typeValue = "ESOP";

let curMessage;

const defaultShares = 1000000;
const defaultValuation = 1000000;
const defaultJobLevel = 100;
const defaultAnnualGrossSalary = 60000;

$("input[name=type][value=" + "ESOP" + "]").prop('checked', true);
$("input[name=pool-size][value=" + 10 + "]").prop('checked', true);
$("input[name=offer-size][value=" + 20 + "]").prop('checked', true);

let graphOp1;
let graphOp2;
let graphOp3;

const cmsCulc11 = document.getElementById("cms-culc-1-1");
const cmsCulc12 = document.getElementById("cms-culc-1-2");
const cmsCulc13 = document.getElementById("cms-culc-1-3");
const cmsCulc21 = document.getElementById("cms-culc-2-1");
const cmsCulc22 = document.getElementById("cms-culc-2-2");
const cmsCulc23 = document.getElementById("cms-culc-2-3");
const cmsCulc31 = document.getElementById("cms-culc-3-1");
const cmsCulc32 = document.getElementById("cms-culc-3-2");
const cmsCulc33 = document.getElementById("cms-culc-3-3");
const cmsCulc41 = document.getElementById("cms-culc-4-1");
const cmsCulc42 = document.getElementById("cms-culc-4-2");
const cmsCulc43 = document.getElementById("cms-culc-4-3");
const cmsCulcM = document.getElementById("cms-culc-m");
const cmsGraphOp1 = document.getElementById("cms-graph-op-1");
const cmsGraphOp2 = document.getElementById("cms-graph-op-2");
const cmsGraphOp3 = document.getElementById("cms-graph-op-3");

option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['#1', '#2', '#3']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
	show: false,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Current value', '3x', '5x', '10x']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '#3',
            type: 'line',
            stack: 'Total',
            data: [graphOp3, graphOp3*3, graphOp3*5, graphOp3*10]
        },
        {
            name: '#2',
            type: 'line',
            stack: 'Total',
            data: [graphOp2, graphOp2*3, graphOp2*5, graphOp2*10]
        },
        {
            name: '#1',
            type: 'line',
            stack: 'Total',
            data: [graphOp1, graphOp1*3, graphOp1*5, graphOp1*10]
        }

    ],
    color: [
        '#FF8375',
        '#E159FF',
        '#674EFF'
    ]
}

//calculation for table and line graph
const calcData = () => {
    let locCustomPoolSize = customPoolSize.value.replace(/[^0-9.]/g, '')*1;
    const locShares = shares.value === '' ? 1000000 : shares.value.replace(/[^0-9.]/g, '')*1;
    let locValuation;
    let locJobLevel = jobLevel.value === '' ? 60 : jobLevel.value*1;
    let maxJobLevel = jobLevel.value === '' ? 0.80 : jobLevel.value*1;
    const locAnnualGrossSalary = annualGrossSalary.value === '' ? 6000 : annualGrossSalary.value.replace(/[^0-9.]/g, '')*1;
    const loccalCulatorMessage = calculatorMessage.value === '' ? `Hey!

We are thrilled to offer you a position in our team!

We would like to offer you a choice between three exciting compensation packages (salary and equity). The options have a 4 year vesting schedule with a 1 year cliff.

You can read more about equity compensation pros and cons at` : calculatorMessage.value;
	
    
    curMessage = loccalCulatorMessage;
	
if ( jobLevel.value === 'junior-1' ){
    	locJobLevel = 60;
    	maxJobLevel = 0.80;
}
	
if ( jobLevel.value === 'mid-level-1' ){
	locJobLevel = 70;
	maxJobLevel = 1;
}
	
if ( jobLevel.value === 'senior-1' ){
	locJobLevel = 85;
	maxJobLevel = 1.2;
}
	
if ( jobLevel.value === 'junior-2' ){
    	locJobLevel = 40;
    	maxJobLevel = 0.70;
}
	
if ( jobLevel.value === 'mid-level-2' ){
	locJobLevel = 50;
	maxJobLevel = 0.90;
}
	
if ( jobLevel.value === 'senior-2' ){
	locJobLevel = 65;
	maxJobLevel = 1.10;
}
	
if ( jobLevel.value === 'junior-3' ){
    	locJobLevel = 40;
    	maxJobLevel = 0.65;
}
	
if ( jobLevel.value === 'mid-level-3' ){
	locJobLevel = 50;
	maxJobLevel = 0.85;
}
	
if ( jobLevel.value === 'senior-3' ){
	locJobLevel = 65;
	maxJobLevel = 1.05;
}
	
    if (valuation.value === 'custom') {
    	locValuation = customValuation.value;
    	customValuation.style.display = 'block';
	locValuation = customValuation.value === '' ? 1500000 : customValuation.value.replace(/[^0-9.]/g, '')*1;
	    
    } else{
	customValuation.style.display = 'none';
    	customValuation.value = '';
	locValuation = valuation.value === '' ? 1000000 : valuation.value*1;
    }
    console.log(locValuation);
	
    if (valuation.value === ''){
	dropdownValuationLabel.style.color = '#90909D'; 
    }else{
	dropdownValuationLabel.style.color = '#1F1F2D'; 
    }
	
    if (jobLevel.value === ''){
	dropdownJobJevelJabel.style.color = '#90909D'; 
    }else{
	dropdownJobJevelJabel.style.color = '#1F1F2D'; 
    }
	
    locCustomPoolSize = locCustomPoolSize == '' ? 20 : locCustomPoolSize;

    const numberOfShares = locShares * locCustomPoolSize/100;
    const totalValueOfOption = ( locValuation / locShares ) * numberOfShares;
	
    const grossSalaryOp1 = locAnnualGrossSalary*0.9;
    const grossSalaryOp2 = locAnnualGrossSalary;
    const grossSalaryOp3 = locAnnualGrossSalary*1.1;
	
    const grossSalaryMonthlyOp1 = grossSalaryOp1/12;
    const grossSalaryMonthlyOp2 = grossSalaryOp2/12;
    const grossSalaryMonthlyOp3 = grossSalaryOp3/12;

    const companyOptions2 = ( locAnnualGrossSalary * locJobLevel / 100 ) / ( totalValueOfOption / numberOfShares )
    const companyOptions3 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*1.1 ) * 4 ) / ( totalValueOfOption / numberOfShares );
    const companyOptions1 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*0.9 ) * 4 ) / ( totalValueOfOption / numberOfShares );
	
    const EquityValueBasedOnSalary = ( locAnnualGrossSalary * locJobLevel ) / 100;
    const EquityBasedOnSalary = EquityValueBasedOnSalary / locValuation;
    locJobLevel = ( EquityBasedOnSalary * 100 ) < maxJobLevel ? ( EquityBasedOnSalary * 100 ) : maxJobLevel;
	
    const AnnualSalaryLossVal1 = grossSalaryOp2 - grossSalaryOp1;
    const AnnualSalaryLossVal3 = grossSalaryOp3 - grossSalaryOp2;
console.log('AnnualSalaryLossVal1: ' + AnnualSalaryLossVal1)
console.log('AnnualSalaryLossVal3: ' + AnnualSalaryLossVal3)
	
    const AnnualSalaryLoss1 = AnnualSalaryLossVal1 / locValuation;
    const AnnualSalaryLoss3 = - ( AnnualSalaryLossVal3 / locValuation );
console.log('AnnualSalaryLoss1: ' + AnnualSalaryLoss1)
console.log('AnnualSalaryLoss3: ' + AnnualSalaryLoss3)

    const totalAnnualComp2 = locAnnualGrossSalary + ( ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4 )
    const totalAnnualComp1 = locAnnualGrossSalary*0.9 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*0.9 ) * 4 ) / 4 )
    const totalAnnualComp3 = locAnnualGrossSalary*1.1 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*1.1 ) * 4 ) / 4 )
    
    const shareCapitalOp1 = locJobLevel + AnnualSalaryLoss1;
    const shareCapitalOp2 = locJobLevel;
    const shareCapitalOp3 = locJobLevel + AnnualSalaryLoss3;
	
    const valueOfOptions1 = shareCapitalOp1 * locValuation;
    const valueOfOptions2 = shareCapitalOp2 * locValuation;
    const valueOfOptions3 = shareCapitalOp3 * locValuation;

    setCellValue("gross-salary-op-1", '€' + Math.round(grossSalaryOp1));
    setCellValue("gross-salary-op-2", '€' + Math.round(grossSalaryOp2));
    setCellValue("gross-salary-op-3", '€' + Math.round(grossSalaryOp3));
	
    setCellValue("gross-salary-monthly-op-1", '€' + Math.round(grossSalaryMonthlyOp1));
    setCellValue("gross-salary-monthly-op-2", '€' + Math.round(grossSalaryMonthlyOp2));
    setCellValue("gross-salary-monthly-op-3", '€' + Math.round(grossSalaryMonthlyOp3));

    setCellValue("company-options-op-1", Math.round(companyOptions1));
    setCellValue("company-options-op-2", Math.round(companyOptions2));
    setCellValue("company-options-op-3", Math.round(companyOptions3));

    setCellValue("value-of-options-op-1", '€' + Math.round(valueOfOptions1));
    setCellValue("value-of-options-op-2", '€' + Math.round(valueOfOptions2));
    setCellValue("value-of-options-op-3", '€' + Math.round(valueOfOptions3));
    
    setCellValue("share-capital-op-1", shareCapitalOp1.toFixed(2) + '%');
    setCellValue("share-capital-op-2", shareCapitalOp2.toFixed(2) + '%');
    setCellValue("share-capital-op-3", shareCapitalOp3.toFixed(2) + '%');
    
    setCellValue("t-2-gross-salary-op-1", '€' + Math.round(locAnnualGrossSalary*0.9));
    setCellValue("t-2-gross-salary-op-2", '€' + Math.round(locAnnualGrossSalary));
    setCellValue("t-2-gross-salary-op-3", '€' + Math.round(locAnnualGrossSalary*1.1));

    setCellValue("t-2-company-options-op-1", Math.round(companyOptions1));
    setCellValue("t-2-company-options-op-2", Math.round(companyOptions2));
    setCellValue("t-2-company-options-op-3", Math.round(companyOptions3));

    setCellValue("t-2-value-of-options-op-1", '€' + Math.round(valueOfOptions1));
    setCellValue("t-2-value-of-options-op-2", '€' + Math.round(valueOfOptions2));
    setCellValue("t-2-value-of-options-op-3", '€' + Math.round(valueOfOptions3));

    setCellValue("t-2-share-capital-op-1", shareCapitalOp1.toFixed(2) + '%');
    setCellValue("t-2-share-capital-op-2", shareCapitalOp2.toFixed(2) + '%');
    setCellValue("t-2-share-capital-op-3", shareCapitalOp3.toFixed(2) + '%');
    
    cmsCulc11.value = '€' + Math.round(locAnnualGrossSalary*0.9);
    cmsCulc12.value = '€' + Math.round(locAnnualGrossSalary);
    cmsCulc13.value = '€' + Math.round(locAnnualGrossSalary*1.1);
    
    cmsCulc21.value = Math.round(companyOptions1)
    cmsCulc22.value = Math.round(companyOptions2)
    cmsCulc23.value = Math.round(companyOptions3)
    
    cmsCulc31.value = '€' + Math.round(valueOfOptions1)
    cmsCulc32.value = '€' + Math.round(valueOfOptions2)
    cmsCulc33.value = '€' + Math.round(valueOfOptions3)
    
    cmsCulc41.value = shareCapitalOp1.toFixed(2) + '%';
    cmsCulc42.value = shareCapitalOp2.toFixed(2) + '%';
    cmsCulc43.value = shareCapitalOp3.toFixed(2) + '%';
    
    cmsCulcM.value = loccalCulatorMessage;
    
    graphOp1 = Math.round(valueOfOptions1*4);
    graphOp2 = Math.round(valueOfOptions2*4);
    graphOp3 = Math.round(valueOfOptions3*4);
    
    cmsGraphOp1.value = graphOp1;
    cmsGraphOp2.value = graphOp2;
    cmsGraphOp3.value = graphOp3;
    
    setCellValue("message-text", loccalCulatorMessage);

    option.series = [
        {
            name: '#3',
            type: 'line',
            stack: 'Total',
            data: [graphOp3, graphOp3*3, graphOp3*5, graphOp3*10]
        },
        {
            name: '#2',
            type: 'line',
            stack: 'Total',
            data: [graphOp2, graphOp2*3, graphOp2*5, graphOp2*10]
        },
        {
            name: '#1',
            type: 'line',
            stack: 'Total',
            data: [graphOp1, graphOp1*3, graphOp1*5, graphOp1*10]
        }
    ]
    myChart.setOption(option, true);
    myChart2.setOption(option, true);
}

//form elements update events
typeESOP.onchange = function () {
    typeValue = "ESOP";
    calcData();
};

typeVSOP.onchange = function () {
    typeValue = "VSOP";
    calcData();
};

customPoolSize.addEventListener("input", () => {
    if (!isNaN(customPoolSize.value.replace(/[^0-9.]/g, '')*1)) {
        calcData();
    }
});

shares.addEventListener("input", () => {
    if (!isNaN(shares.value.replace(/[^0-9.]/g, '')*1)) {
	if ( shares.value !== 0 ){
			calcData();
		}
    }
});

valuation.onchange = function () {
    calcData();
};

customValuation.addEventListener("input", () => {
    if (!isNaN(customValuation.value.replace(/[^0-9.]/g, '')*1)) {
	if ( customValuation.value !== 0 ){
		calcData();
	}
    }
});

jobLevel.onchange = function () {
    calcData();
};

annualGrossSalary.addEventListener("input", () => {
    if (!isNaN(annualGrossSalary.value.replace(/[^0-9.]/g, '')*1)) {
	if ( annualGrossSalary.value !== 0 ){
		calcData();
	}
    }
});

vestingPeriod.onchange = function () {
    calcData();
};

cliffPeriod.onchange = function () {
    calcData();
};

calculatorMessage.addEventListener("input", () => {
    calcData();
});

allowOnlyNumbers(shares);
allowOnlyNumbers(annualGrossSalary);
formatNumberInput(customPoolSize);
allowOnlyNumbers(customValuation);
calcData();