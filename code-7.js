var myChart = echarts.init(document.getElementById('lineGraph'));
var myChart2 = echarts.init(document.getElementById('lineGraph2'));

function allowOnlyNumbers(inputElement) {
    inputElement.addEventListener('input', () => {
        inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    });
}

const setCellValue = (cell, value) =>{
    document.getElementById(cell).textContent = value;
}

// form elements
let totalValue;
const typeESOP = document.getElementById("ESOP");
const typeVSOP = document.getElementById("VSOP");
const typeRSU = document.getElementById("RSU");
const checkbox10 = document.getElementById("poolSize10");
const checkbox15 = document.getElementById("poolSize15");
const checkbox20 = document.getElementById("poolSizeCustome");
const customPoolSize = document.getElementById("custom-pool-size");
const shares = document.getElementById("shares");
const valuation = document.getElementById("valuation");
const jobLevel = document.getElementById("job-level");
const annualGrossSalary = document.getElementById("annual-gross-salary");
const offerSize20 = document.getElementById("offer-size-20");
const offerSize30 = document.getElementById("offer-size-30");
const offerSizeCustom = document.getElementById("offer-size-custom");
const customOfferSize = document.getElementById("custom-offer-size");
const vestingPeriod = document.getElementById("vesting-period");
const cliffPeriod = document.getElementById("cliff-period");
const calculatorMessage = document.getElementById("calculator-message");

let typeValue = "ESOP";
let poolSizeValue = 10;
let offerSizeValue = 20;

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
        '#3FC05B',
        '#593EFF',
        '#6705E3'
    ]
}

//calculation for table and line graph
const calcData = () => {
    let locCustomPoolSize = poolSizeValue === 'custom' ? customPoolSize.value*1 : poolSizeValue*1;
    const locShares = shares.value === '' ? 1000000 : shares.value*1;
    const locValuation = valuation.value === '' ? 1000000 : valuation.value*1;
    const locJobLevel = jobLevel.value === '' ? 60 : jobLevel.value*1;
    const locAnnualGrossSalary = annualGrossSalary.value === '' ? 60000 : annualGrossSalary.value*1;
    const locCustomOfferSize = customOfferSize.value === '' ? 40 : customOfferSize.value*1;

    locCustomPoolSize = locCustomPoolSize == '' ? 20 : locCustomPoolSize;

    const numberOfShares = locShares * locCustomPoolSize/100;
    const totalValueOfOption = ( locValuation / locShares ) * numberOfShares;

    const companyOptions2 = ( locAnnualGrossSalary * locJobLevel / 100 ) / ( totalValueOfOption / numberOfShares )
    const companyOptions3 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*1.1 ) * 4 ) / ( totalValueOfOption / numberOfShares );
    const companyOptions1 = ( ( ( locAnnualGrossSalary + ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4) - locAnnualGrossSalary*0.9 ) * 4 ) / ( totalValueOfOption / numberOfShares );

    const totalAnnualComp2 = locAnnualGrossSalary + ( ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4 )
    const totalAnnualComp1 = locAnnualGrossSalary*0.9 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*0.9 ) * 4 ) / 4 )
    const totalAnnualComp3 = locAnnualGrossSalary*1.1 + ( ( ( totalAnnualComp2 - locAnnualGrossSalary*1.1 ) * 4 ) / 4 )

    const valueOfOptions1 = totalAnnualComp2 - locAnnualGrossSalary*0.9;
    const valueOfOptions2 = ( companyOptions2 * ( totalValueOfOption / numberOfShares ) ) / 4
    const valueOfOptions3 = totalAnnualComp2 - locAnnualGrossSalary*1.1;

    setCellValue("gross-salary-op-1", '€' + Math.round(locAnnualGrossSalary*0.9));
    setCellValue("gross-salary-op-2", '€' + Math.round(locAnnualGrossSalary));
    setCellValue("gross-salary-op-3", '€' + Math.round(locAnnualGrossSalary*1.1));

    setCellValue("company-options-op-1", Math.round(companyOptions1));
    setCellValue("company-options-op-2", Math.round(companyOptions2));
    setCellValue("company-options-op-3", Math.round(companyOptions3));

    setCellValue("value-of-options-op-1", Math.round(valueOfOptions1));
    setCellValue("value-of-options-op-2", Math.round(valueOfOptions2));
    setCellValue("value-of-options-op-3", Math.round(valueOfOptions3));

    setCellValue("total-annual-comp-op-1", '€' + Math.round(totalAnnualComp1));
    setCellValue("total-annual-comp-op-2", '€' + Math.round(totalAnnualComp2));
    setCellValue("total-annual-comp-op-3", '€' + Math.round(totalAnnualComp3));
    
    setCellValue("t-2-gross-salary-op-1", '€' + Math.round(locAnnualGrossSalary*0.9));
    setCellValue("t-2-gross-salary-op-2", '€' + Math.round(locAnnualGrossSalary));
    setCellValue("t-2-gross-salary-op-3", '€' + Math.round(locAnnualGrossSalary*1.1));

    setCellValue("t-2-company-options-op-1", Math.round(companyOptions1));
    setCellValue("t-2-company-options-op-2", Math.round(companyOptions2));
    setCellValue("t-2-company-options-op-3", Math.round(companyOptions3));

    setCellValue("t-2-value-of-options-op-1", Math.round(valueOfOptions1));
    setCellValue("t-2-value-of-options-op-2", Math.round(valueOfOptions2));
    setCellValue("t-2-value-of-options-op-3", Math.round(valueOfOptions3));

    setCellValue("t-2-total-annual-comp-op-1", '€' + Math.round(totalAnnualComp1));
    setCellValue("t-2-total-annual-comp-op-2", '€' + Math.round(totalAnnualComp2));
    setCellValue("t-2-total-annual-comp-op-3", '€' + Math.round(totalAnnualComp3));
    
    cmsCulc11.value = '€' + Math.round(locAnnualGrossSalary*0.9);
    cmsCulc12.value = '€' + Math.round(locAnnualGrossSalary);
    cmsCulc13.value = '€' + Math.round(locAnnualGrossSalary*1.1);
    
    cmsCulc21.value = Math.round(companyOptions1)
    cmsCulc22.value = Math.round(companyOptions2)
    cmsCulc23.value = Math.round(companyOptions3)
    
    cmsCulc31.value = Math.round(valueOfOptions1)
    cmsCulc32.value = Math.round(valueOfOptions2)
    cmsCulc33.value = Math.round(valueOfOptions3)
    
    cmsCulc41.value = '€' + Math.round(totalAnnualComp1);
    cmsCulc42.value = '€' + Math.round(locAnnualGrossSalary)
    cmsCulc43.value = '€' + Math.round(locAnnualGrossSalary*1.1)
    
    cmsCulcM.value = calculatorMessage.value;
    
    graphOp1 = Math.round(valueOfOptions1*4);
    graphOp2 = Math.round(valueOfOptions2*4);
    graphOp3 = Math.round(valueOfOptions3*4);
    
    cmsGraphOp1.value = graphOp1;
    cmsGraphOp2.value = graphOp2;
    cmsGraphOp3.value = graphOp3;
    
    console.log(cmsGraphOp3.value);
    
    setCellValue("message-text", calculatorMessage.value);

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

typeRSU.onchange = function () {
    typeValue = "RSU";
    calcData();
};

checkbox10.onchange = function () {
    poolSizeValue = 10
    calcData();
    customPoolSize.style.display = 'none';
};

checkbox15.onchange = function () {
    poolSizeValue = 15
    calcData();
    customPoolSize.style.display = 'none';
};

checkbox20.onchange = function () {
    poolSizeValue = "custom";
    calcData();
    customPoolSize.style.display = 'block';
};

customPoolSize.addEventListener("input", () => {
    if (!isNaN(customPoolSize.value)) {
        calcData();
    }
});

shares.addEventListener("input", () => {
    if (!isNaN(shares.value)) {
        calcData();
    }
});

valuation.onchange = function () {
    calcData();
};

jobLevel.onchange = function () {
    calcData();
};

annualGrossSalary.addEventListener("input", () => {
    if (!isNaN(annualGrossSalary.value)) {
        calcData();
    }
});

offerSize20.onchange = function () {
    offerSizeValue = 20
    calcData();
    customOfferSize.style.display = 'none';
};

offerSize30.onchange = function () {
    offerSizeValue = 30
    calcData();
    customOfferSize.style.display = 'none';
};

offerSizeCustom.onchange = function () {
    offerSizeValue = "custom";
    calcData();
    customOfferSize.style.display = 'block';
};

customOfferSize.addEventListener("input", () => {
    if (!isNaN(customOfferSize.value)) {
        calcData();
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
allowOnlyNumbers(customPoolSize);
calcData();
