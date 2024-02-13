// Version with formulas


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

function getAdsData() {
  const sheet = getSheet('base_integração_ads_sheets');
  const lastRow = sheet.getLastRow();
  return sheet.getRange(2, 1, lastRow, 16).getValues();
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

function getRowsInCurrentMonth(currentYear, currentMonth) {
  const sheet = getSheet('base_integração_ads_sheets');
  const lastRow = sheet.getLastRow();
  const dateColumnValues = sheet.getRange(2, 16, lastRow, 1).getValues();

  const matchingRows = [];

  for (let i = 0; i < dateColumnValues.length; i++) {
    const currentDate = new Date(dateColumnValues[i][0]);
    const rowMonth = currentDate.getMonth() + 1;
    const rowYear = currentDate.getFullYear();

    if (rowMonth === currentMonth && rowYear === currentYear) {
      matchingRows.push(i);
    }
  }

  return matchingRows;
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
  const [currentYear, currentMonth, currentDay] = getDateInfo();
  const formattedDay = `${currentDay}/${currentMonth}/${currentYear}`;
  const monthsString = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const currentMonthString = monthsString[currentMonth - 1];

  const monitoringDays = getMonitoringDays(currentYear, currentMonth);
  if (!monitoringDays.includes(currentDay)) {
    console.log(`Today (${formattedDay}) is not a monitoring day.`);
    return 0;
  }

  console.log(`Running monitoring - (${formattedDay})`);

  const testSheet = getSheet('coleta_auto_script_partner2');
  const adsData = getAdsData();
  const actualMonthRows = getRowsInCurrentMonth(currentYear, currentMonth);
  const result = actualMonthRows.map(i => (i >= 0 && i < adsData.length) ? adsData[i] : null);
  const adsDataFiltred = result.filter(row => row !== null);

  let sumAdsFiltred = new Array(adsDataFiltred[0].length).fill(0);

  adsDataFiltred.forEach(row => {
      row.forEach((element, i) => {
          if (typeof element === 'number') {
              sumAdsFiltred[i] += element;
          }
      });
  });

  sumAdsFiltred = sumAdsFiltred.filter(el => el !== 0);

  const lastRowTestSheet = testSheet.getLastRow() + 1;

  const columns = [
    'PARTNER',
    formattedDay,
    `[${currentYear}] ${currentMonthString}`,
    `[${currentYear}] ${currentMonthString} - PARTNER`,
    `=IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 11;  FALSE); " ")`,
     sumAdsFiltred[0],
    `=IFERROR(F${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 8; FALSE); 0); " ")`,
    "",
    "",
    parseFloat(sumAdsFiltred[2]),
    `=IFERROR(J${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 3; FALSE); 0); " ")`,
    `=IF(AND(J${lastRowTestSheet}<>""; F${lastRowTestSheet}<>""); J${lastRowTestSheet}/F${lastRowTestSheet}; "")`,
    `=IFERROR(L${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 9; FALSE); 0); " ")`,
    sumAdsFiltred[3],
    `=IFERROR(N${lastRowTestSheet} -  IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 4; FALSE); 0); " ")`,
    sumAdsFiltred[7],
    `=IFERROR(P${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 5; FALSE); 0); " ")`,
    sumAdsFiltred[9]/adsDataFiltred.length,
    `=IFERROR(R${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 6; FALSE); 0); " ")`,
    `=IF(AND(J${lastRowTestSheet}<>""; J${lastRowTestSheet}<>0; P${lastRowTestSheet}<>""; P${lastRowTestSheet}<>0); J${lastRowTestSheet}/P${lastRowTestSheet}; "")`,
    `=IFERROR(T${lastRowTestSheet} - IFERROR(VLOOKUP(D${lastRowTestSheet}; 'projeção_funis'!C:M; 7; FALSE); 0); " ")`,
  ];

    columns.forEach((col, index) => {
    testSheet.getRange(lastRowTestSheet, index + 1, 1, 1).setValue(col);
  });
}




