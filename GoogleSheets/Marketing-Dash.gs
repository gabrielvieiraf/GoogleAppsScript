function getMonitoringDays(currentYear, currentMonth) {
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const lastDay = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const monitoringDays = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, lastDay[currentMonth - 1]];
  return monitoringDays;
}

function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(sheetName);
}

function getBasePartnersData() {
  const sheet = getSheet('base_partners');
  const lastRow = sheet.getLastRow();
  return sheet.getRange(lastRow, 5, 1, 7).getValues()[0];
}

function getLastNonEmptyRow(sheet, column) {
  var values = sheet.getRange(1, column, sheet.getLastRow(), 1).getValues();
  var reverseValues = values.reverse();

  for (var i = 0; i < reverseValues.length; i++) {
    if (reverseValues[i][0] !== "") {
      var lastNonEmptyRow = sheet.getLastRow() - i;
      return lastNonEmptyRow;
    }
  }

  Logger.log("No non-empty rows found.");
  return null;
}

function getTestData() {
  const sheet = getSheet('coleta_auto_script_partner2');
  const lastRow = getLastNonEmptyRow(sheet, 6);
  const lastColumn = sheet.getLastColumn();
  return sheet.getRange(3, 1, lastRow, lastColumn).getValues().at(-3);
}

function getFunnelData(currentYear, currentMonthString) {
  const sheet = getSheet('projeção_funis');
  const lastRow = getLastNonEmptyRow(sheet, 4);
  const lastColumn = sheet.getLastColumn();
  const data = sheet.getRange(lastRow - 2, 3, 3, lastColumn - 2).getValues();
  const targetValue = `[${currentYear}] ${currentMonthString} - PARTNER`;
  const resultArray = data.find(row => row[0] === targetValue).slice(2);
  return resultArray || null;
}

function getDateInfo() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  return [currentYear, currentMonth, currentDay];
}

function setMonitoringData() {
  const [year, month, day] = getDateInfo();
  const devTest = true;

  const monitoringDays = getMonitoringDays(year, month);
  if (!monitoringDays.includes(day) && !devTest) {
    console.log(`Today (${formattedDate}) is not a monitoring day.`);
    return 0;
  }

  const formattedDate = `${day}/${month}/${year}`;
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const monthString = months[month - 1];

  const testSheet = getSheet('coleta_auto_script_partner2');

  const partnersData = getBasePartnersData();
  const funnelData = getFunnelData(year, monthString);
  const lastRowTestSheet = testSheet.getLastRow() + 1;

  const leadsGoal = parseFloat(funnelData[8]) || 0;
  const leadsFromAdveronix = parseFloat(partnersData[5]) || 0;
  const goalLeadsAdveronix = leadsFromAdveronix - parseFloat(funnelData[5]) || 0;
  const budgetInvested = parseFloat(partnersData[0]) || 0;
  const goalBudget = budgetInvested - parseFloat(funnelData[0]) || 0;
  const cplRatio = parseFloat((budgetInvested) / parseFloat(partnersData[5]), 2) || 0;
  const goalCpl = cplRatio - parseFloat(funnelData[6]) || 0;
  const range = partnersData[1] || 0;
  const goalRange = parseInt(range) - parseInt(funnelData[1]) || 0;
  const linkClicks = partnersData[2] || 0;
  const goalLinkClicks = parseInt(linkClicks) - parseInt(funnelData[2]) || 0;
  const avgCtr = partnersData[3] || 0;
  const remainingGoalCtr = parseInt(avgCtr) - parseInt(funnelData[3]) || 0;
  const avgCpc = parseFloat(budgetInvested) / parseInt(linkClicks) || 0;
  const remainingGoalCpc = avgCpc / parseInt(funnelData[4]) || 0;

  const columns = [
    'PARTNER',
    formattedDate,
    `[${year}] ${monthString}`,
    `[${year}] ${monthString} - PARTNER`, 
    leadsGoal, 
    leadsFromAdveronix, 
    goalLeadsAdveronix, 
    "", // lead active
    "", // goal lead active
    budgetInvested,
    goalBudget,
    cplRatio,
    goalCpl,
    range,
    goalRange, 
    linkClicks, 
    goalLinkClicks, 
    avgCtr, 
    remainingGoalCtr,
    avgCpc, 
    remainingGoalCpc 
  ];

  columns.forEach((value, col) => {
    const cell = testSheet.getRange(lastRowTestSheet, col + 1, 1, 1);

    if ((col + 1 >= 9 && col + 1 <= 13) || col + 1 >= 20) {
      const brazilNumberPattern = `${value}`.replace(".", ",");
      cell.setValue(brazilNumberPattern);
    } else {
      cell.setValue(value);
    }
  });
}
