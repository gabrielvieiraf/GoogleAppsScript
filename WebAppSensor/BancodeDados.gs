function PesquisaDado(Tipo) {
  
  
  var ss = SpreadsheetApp.openById("Insira seu id aqui");
  var z = SpreadsheetApp.getActiveSpreadsheet();
  var ws= z.getSheetByName(Tipo);
  /*
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName(Tipo);
  */
  return ws.getRange(9,1,ws.getLastRow()-9,8).getValues();
};
