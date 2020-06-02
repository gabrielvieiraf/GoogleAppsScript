function doGet(request) {
  var tmp = HtmlService.createTemplateFromFile('Pagina')
  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function userClicked(obs,data,Status,Ocorrencia,SN,Tipo,Entrada) {
  ss = SpreadSheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1GY2HlzFlrYbWdDa7Kw-AjCVfJx3j5es869WufdvphJU/edit?usp=sharing")
  Logger.log("No dia: " + data + " O equipamento: " + SN + " Apresentou a ocorrência: " + Ocorrencia );
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function InsereEquipamento(Entrada,Modelo,Tipo,SN,Ocorrencia,Status,data,obs) {
  var ss = SpreadsheetApp.getActive();
  var flag;
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  switch(Tipo) {
    case 'Transmissor':
      flag = 'Transmissores';
    break;
    case 'Central':
      flag = 'Centrais';
    break;
    case 'Repetidor':
      flag = 'Repetidores';
    break;
    case 'Gateway':
      flag = 'Gateways';
    break;
    case 'Mobile':
      flag = 'Mobiles';
    break;
  };
  var ws=  ss.getSheetByName(flag);
  ws.appendRow([Entrada,Modelo,SN,Ocorrencia,Status,data,obs])
};
