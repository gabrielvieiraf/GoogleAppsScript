
function getScriptURL(qs) {
  var url = ScriptApp.getService().getUrl();
  return url + qs ;
}

function doGet(e) 
{
  Logger.log('query params: ' + Utilities.jsonStringify(e));
  if(e.queryString !=='')
  {  
    switch(e.parameter.mode)
    {
      case 'Pagina':
        setPage('Controle');    
        return HtmlService
        .createTemplateFromFile('Controle')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Controle de Equipamentos"); 
        break;  
      case 'Dashboard':
        setPage('Dashboard');        
        return HtmlService
        .createTemplateFromFile('Dashboard')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Dashboard");
       break;
      case 'Ajuda':
        setPage('Ajuda');        
        return HtmlService
        .createTemplateFromFile('Ajuda')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Ajuda");
       break;  
      case 'Baterias':
        setPage('Baterias');        
        return HtmlService
        .createTemplateFromFile('Baterias')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Baterias");
       break;  
      case 'Sondas':
         setPage('Sondas');
         return HtmlService
        .createTemplateFromFile('Sondas')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Sondas");
       break;
         case 'teste':
         setPage('teste');
         return HtmlService
        .createTemplateFromFile('teste')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("teste");
       break;
      default:
        setPage('Pagina');
        return HtmlService
        .createTemplateFromFile('Pagina')
        .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle("Pagina");
       break;
    }
   }
  
    else
  {
    setPage('Pagina');
    return HtmlService
    .createTemplateFromFile('Pagina')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle("Pagina");
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
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
