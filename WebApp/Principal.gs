//Função para rodar a Página
function doGet(request) {
  var tmp = HtmlService.createTemplateFromFile('Pagina')
  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
//função que permite a inclusão do Javascript.html e Estilos.html
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

//Função que insere dados na planilha
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
  //Basicamente, cada tipo de equipamento tem a sua própria página. Assim, flag serve para setar qual Página os dados serão inseridos.
  var ws=  ss.getSheetByName(flag);
  ws.appendRow([Entrada,Modelo,SN,Ocorrencia,Status,data,obs])
};
