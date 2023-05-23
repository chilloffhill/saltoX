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

console.log('typeESOP' + typeESOP);
console.log('typeVSOP' + typeVSOP);

console.log('typeESOP value' + typeESOP.value);
console.log('typeVSOP value' + typeVSOP.value);

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

const cmsGrossSalaryOp1 = document.getElementById("cms-gross-salary-op-1");
const cmsGrossSalaryOp2 = document.getElementById("cms-gross-salary-op-2");
const cmsGrossSalaryOp3 = document.getElementById("cms-gross-salary-op-3");

const cmsGrossSalaryMonthlyOp1 = document.getElementById("cms-gross-salary-monthly-op-1");
const cmsGrossSalaryMonthlyOp2 = document.getElementById("cms-gross-salary-monthly-op-2");
const cmsGrossSalaryMonthlyOp3 = document.getElementById("cms-gross-salary-monthly-op-3");

const cmsCompanyOptionsOp1 = document.getElementById("cms-company-options-op-1");
const cmsCompanyOptionsOp2 = document.getElementById("cms-company-options-op-2");
const cmsCompanyOptionsOp3 = document.getElementById("cms-company-options-op-3");

const cmsShareCapitalOp1 = document.getElementById("cms-share-capital-op-1");
const cmsShareCapitalOp2 = document.getElementById("cms-share-capital-op-2");
const cmsShareCapitalOp3 = document.getElementById("cms-share-capital-op-3");

const cmsCulcM = document.getElementById("cms-culc-m");

const cmsGraphOp1 = document.getElementById("cms-graph-op-1");
const cmsGraphOp4 = document.getElementById("cms-graph-op-3");
const cmsGraphOp3 = document.getElementById("cms-graph-op-2");

const cmsTotalCompensationYEOp1 = document.getElementById("cms-total-compensation-y-e-op-1");
const cmsTotalCompensationYEOp2 = document.getElementById("cms-total-compensation-y-e-op-2");
const cmsTotalCompensationYEOp3 = document.getElementById("cms-total-compensation-y-e-op-3");

const cmsTotalCompensationWEOp1 = document.getElementById("cms-total-compensation-w-e-op-1");
const cmsTotalCompensationWEOp2 = document.getElementById("cms-total-compensation-w-e-op-2");
const cmsTotalCompensationWEOp3 = document.getElementById("cms-total-compensation-w-e-op-3");

const cmsValueOfOptionsOp1 = document.getElementById("cms-value-of-options-op-1");
const cmsValueOfOptionsOp2 = document.getElementById("cms-value-of-options-op-2");
const cmsValueOfOptionsOp3 = document.getElementById("cms-value-of-options-op-3");

const calcTableLowError = document.getElementById("calc-table-low-error");

const checkboxError = document.getElementById("checkbox-error");

calcTableLowError.style.display = "none";
calcTableLowError.style.opacity = "0";

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
	const locAnnualGrossSalary = annualGrossSalary.value === '' ? 60000 : annualGrossSalary.value.replace(/[^0-9.]/g, '')*1;
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

	let grossSalaryOp1 = locAnnualGrossSalary*0.9;
	let grossSalaryOp2 = locAnnualGrossSalary;
	let grossSalaryOp3 = locAnnualGrossSalary*1.1;

	let grossSalaryMonthlyOp1 = grossSalaryOp1/12;
	let grossSalaryMonthlyOp2 = grossSalaryOp2/12;
	let grossSalaryMonthlyOp3 = grossSalaryOp3/12;

	let companyOptions2 = ( locAnnualGrossSalary * locJobLevel / 100 ) / ( totalValueOfOption / numberOfShares )
	let companyOptions3 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*1.1 ) * 4 ) / ( totalValueOfOption / numberOfShares );
	let companyOptions1 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*0.9 ) * 4 ) / ( totalValueOfOption / numberOfShares );

	const EquityValueBasedOnSalary = ( locAnnualGrossSalary * locJobLevel ) / 100;
	const EquityBasedOnSalary = EquityValueBasedOnSalary / locValuation;
	locJobLevel = ( EquityBasedOnSalary * 100 ) < maxJobLevel ? ( EquityBasedOnSalary * 100 ) : maxJobLevel;

	const AnnualSalaryLossVal1 = grossSalaryOp2 - grossSalaryOp1;
	const AnnualSalaryLossVal3 = grossSalaryOp3 - grossSalaryOp2;

	const AnnualSalaryLoss1 = ( AnnualSalaryLossVal1 / locValuation ) *100;
	const AnnualSalaryLoss3 = - ( AnnualSalaryLossVal3 / locValuation ) *100;

	const totalAnnualComp2 = locAnnualGrossSalary + ( ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4 )
	const totalAnnualComp1 = locAnnualGrossSalary*0.9 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*0.9 ) * 4 ) / 4 )
	const totalAnnualComp3 = locAnnualGrossSalary*1.1 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*1.1 ) * 4 ) / 4 )

	const shareCapitalOp1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? ( locJobLevel + AnnualSalaryLoss1 ) : locJobLevel;
	const shareCapitalOp2 = locJobLevel;
	const shareCapitalOp3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? ( locJobLevel + AnnualSalaryLoss3 ) : locJobLevel;

	let valueOfOptions1 = ( shareCapitalOp1 * locValuation ) / 100;
	let valueOfOptions2 = ( shareCapitalOp2 * locValuation ) / 100;
	let valueOfOptions3 = ( shareCapitalOp3 * locValuation ) / 100;

	const divideEquityValueIntoOp1 = valueOfOptions1 / ( vestingPeriod.value * 1 );
	const divideEquityValueIntoOp2 = valueOfOptions2 / ( vestingPeriod.value * 1 );
	const divideEquityValueIntoOp3 = valueOfOptions3 / ( vestingPeriod.value * 1 );

	let totalCompensationYEOp1 = grossSalaryOp1 + divideEquityValueIntoOp1;
	let totalCompensationYEOp2 = grossSalaryOp2 + divideEquityValueIntoOp2;
	let totalCompensationYEOp3 = grossSalaryOp3 + divideEquityValueIntoOp3;

	let totalCompensationWEOp1 = grossSalaryOp1 + valueOfOptions1;
	let totalCompensationWEOp2 = grossSalaryOp2 + valueOfOptions2;
	let totalCompensationWEOp3 = grossSalaryOp3 + valueOfOptions3;
	
	// check

	grossSalaryOp1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? grossSalaryOp1 : grossSalaryOp2;
	grossSalaryOp3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? grossSalaryOp3 : grossSalaryOp2;

	grossSalaryMonthlyOp1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? grossSalaryMonthlyOp1 : grossSalaryMonthlyOp2;
	grossSalaryMonthlyOp3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? grossSalaryMonthlyOp3 : grossSalaryMonthlyOp2;

	companyOptions1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? companyOptions1 : companyOptions2;
	companyOptions3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? companyOptions3 : companyOptions2;

	totalCompensationYEOp1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? totalCompensationYEOp1 : totalCompensationYEOp2;
	totalCompensationYEOp3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? totalCompensationYEOp3 : totalCompensationYEOp2;

	totalCompensationWEOp1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? totalCompensationWEOp1 : totalCompensationWEOp2;
	totalCompensationWEOp3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? totalCompensationWEOp3 : totalCompensationWEOp2;

	valueOfOptions1 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? valueOfOptions1 : valueOfOptions2;
	valueOfOptions3 = ( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ) ? valueOfOptions3 : valueOfOptions2;

	// set table

	setCellValue("gross-salary-op-1", '€' + Math.round(grossSalaryOp1));
	setCellValue("gross-salary-op-2", '€' + Math.round(grossSalaryOp2));
	setCellValue("gross-salary-op-3", '€' + Math.round(grossSalaryOp3));

	setCellValue("company-options-op-1", Math.round(companyOptions1));
	setCellValue("company-options-op-2", Math.round(companyOptions2));
	setCellValue("company-options-op-3", Math.round(companyOptions3));

	setCellValue("value-of-options-op-1", '€' + Math.round(valueOfOptions1));
	setCellValue("value-of-options-op-2", '€' + Math.round(valueOfOptions2));
	setCellValue("value-of-options-op-3", '€' + Math.round(valueOfOptions3));

	setCellValue("share-capital-op-1", shareCapitalOp1.toFixed(2) + '%');
	setCellValue("share-capital-op-2", shareCapitalOp2.toFixed(2) + '%');
	setCellValue("share-capital-op-3", shareCapitalOp3.toFixed(2) + '%');

	setCellValue("total-compensation-w-e-op-1", '€' + Math.round(totalCompensationWEOp1));
	setCellValue("total-compensation-w-e-op-2", '€' + Math.round(totalCompensationWEOp2));
	setCellValue("total-compensation-w-e-op-3", '€' + Math.round(totalCompensationWEOp3));

	// preview

	setCellValue("t-2-gross-salary-op-1", '€' + Math.round(grossSalaryOp1));
	setCellValue("t-2-gross-salary-op-2", '€' + Math.round(grossSalaryOp2));
	setCellValue("t-2-gross-salary-op-3", '€' + Math.round(grossSalaryOp3));

	setCellValue("t-2-company-options-op-1", Math.round(companyOptions1));
	setCellValue("t-2-company-options-op-2", Math.round(companyOptions2));
	setCellValue("t-2-company-options-op-3", Math.round(companyOptions3));

	setCellValue("t-2-value-of-options-op-1", '€' + Math.round(valueOfOptions1));
	setCellValue("t-2-value-of-options-op-2", '€' + Math.round(valueOfOptions2));
	setCellValue("t-2-value-of-options-op-3", '€' + Math.round(valueOfOptions3));

	setCellValue("t-2-share-capital-op-1", shareCapitalOp1.toFixed(2) + '%');
	setCellValue("t-2-share-capital-op-2", shareCapitalOp2.toFixed(2) + '%');
	setCellValue("t-2-share-capital-op-3", shareCapitalOp3.toFixed(2) + '%');

	setCellValue("t-2-total-compensation-w-e-op-1", '€' + Math.round(totalCompensationWEOp1));
	setCellValue("t-2-total-compensation-w-e-op-2", '€' + Math.round(totalCompensationWEOp2));
	setCellValue("t-2-total-compensation-w-e-op-3", '€' + Math.round(totalCompensationWEOp3));

	// cms

	cmsGrossSalaryOp1.value = '€' + Math.round(grossSalaryOp1)
	cmsGrossSalaryOp2.value = '€' + Math.round(grossSalaryOp2)
	cmsGrossSalaryOp3.value = '€' + Math.round(grossSalaryOp3)

	cmsGrossSalaryMonthlyOp1.value = '€' + Math.round(grossSalaryMonthlyOp1)
	cmsGrossSalaryMonthlyOp2.value = '€' + Math.round(grossSalaryMonthlyOp2)
	cmsGrossSalaryMonthlyOp3.value = '€' + Math.round(grossSalaryMonthlyOp3)

	cmsCompanyOptionsOp1.value = Math.round(companyOptions1)
	cmsCompanyOptionsOp2.value = Math.round(companyOptions2)
	cmsCompanyOptionsOp3.value = Math.round(companyOptions3)

	cmsShareCapitalOp1.value = shareCapitalOp1.toFixed(2) + '%'
	cmsShareCapitalOp2.value = shareCapitalOp2.toFixed(2) + '%'
	cmsShareCapitalOp3.value = shareCapitalOp3.toFixed(2) + '%'

	cmsCulcM.value = loccalCulatorMessage;

	cmsGraphOp1.value = Math.round(valueOfOptions1)
	cmsGraphOp4.value = Math.round(valueOfOptions2)
	cmsGraphOp3.value = Math.round(valueOfOptions3)

	cmsTotalCompensationYEOp1.value = '€' + Math.round(totalCompensationYEOp1)
	cmsTotalCompensationYEOp2.value = '€' + Math.round(totalCompensationYEOp2)
	cmsTotalCompensationYEOp3.value = '€' + Math.round(totalCompensationYEOp3)

	cmsTotalCompensationWEOp1.value = '€' + Math.round(totalCompensationWEOp1)
	cmsTotalCompensationWEOp2.value = '€' + Math.round(totalCompensationWEOp2)
	cmsTotalCompensationWEOp3.value = '€' + Math.round(totalCompensationWEOp3)

	cmsValueOfOptionsOp1.value = '€' + Math.round(valueOfOptions1)
	cmsValueOfOptionsOp2.value = '€' + Math.round(valueOfOptions2)
	cmsValueOfOptionsOp3.value = '€' + Math.round(valueOfOptions3)

	setCellValue("message-text", loccalCulatorMessage);

	graphVal1 = Math.round(valueOfOptions1)
	graphVal2 = Math.round(valueOfOptions2)
	graphVal3 = Math.round(valueOfOptions3)

	if( ( locJobLevel + AnnualSalaryLoss3 ) >= 0 ){
	calcTableLowError.style.display = "none";
	calcTableLowError.style.opacity = "0";
	}else{
	calcTableLowError.style.display = "block";
	calcTableLowError.style.opacity = "1";
	}

	option.series = [
	{
	    name: '#3',
	    type: 'line',
	    stack: 'Total',
	    data: [graphVal3, graphVal3*3, graphVal3*5, graphVal3*10]
	},
	{
	    name: '#2',
	    type: 'line',
	    stack: 'Total',
	    data: [graphVal2, graphVal2*3, graphVal2*5, graphVal2*10]
	},
	{
	    name: '#1',
	    type: 'line',
	    stack: 'Total',
	    data: [graphVal1, graphVal1*3, graphVal1*5, graphVal1*10]
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
