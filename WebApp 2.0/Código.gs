function assignEditUrls() {

  
  // PARTE EDITÁVEL
  
  var form = FormApp.openByUrl('');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('');
  
  // FIM DA PARTE EDITÁVEL
  
  
  var data = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var urlCol = sheet.getLastColumn(); 

  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];
  

  for (var i = 0; i < responses.length; i++) {
    
    timestamps.push(responses[i].getTimestamp().setMilliseconds(0));

    urls.push(responses[i].getEditResponseUrl());

  }

  for (var j = 1; j < data.length; j++) {

    resultUrls.push([data[j][0]?urls[timestamps.indexOf(data[j][0].setMilliseconds(0))]:'']);
  }

  // COLOCA LINK EM TODAS AS ÚLTIMAS COLUNAS 
  sheet.getRange(2, urlCol, resultUrls.length, 1).setValues(resultUrls);  

}
