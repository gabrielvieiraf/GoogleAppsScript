function getScriptURL() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function setPage(page) {
  var ps = PropertiesService.getUserProperties();
  ps.setProperty('PageTitle', page);
  return ps.getProperty('PageTitle');
}


// CRIAÇÃO DAS PÁGINAS HTML COM BASE NO NOME DADO PARA O ARQUIVO
// O SCRIPT ECEMPLO TÊM COMO PADRÃO O NOME "Planilha_01"
// CASO MUDE DE NOME O NOME DO ARQUIVO HTML, NÃO SE ESQUEÇA DE ALTERAR AQUI TAMBÉM :)

function doGet(e) {
  Logger.log(getScriptURL());
  Logger.log('query params: ' + Utilities.jsonStringify(e));
  if (e.queryString !== '') {
    switch (e.parameter.mode) {
      case 'Planilha_01':
        setPage('Planilha_01');
        return HtmlService
          .createTemplateFromFile('Planilha_01')
          .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
          .setTitle("Planilha 01");
        break;
      default:
        setPage('Planilha_01');
        return HtmlService
          .createTemplateFromFile('Planilha_01')
          .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
          .setTitle("Planilha 01");
        break;
    }
  } else {
    setPage('Planilha_01');
    return HtmlService
      .createTemplateFromFile('Planilha_01')
      .evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setTitle("Planilha 01");

  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function PesquisaDado() {

  var z = SpreadsheetApp.getActiveSpreadsheet();
  
  // PARTE EDITÁVEL
  
  var ws = z.getSheetByName('CADASTRO');
  
  //FIM DA PARTE EDITÁVEL
  
  var retorno = ws.getRange(1, 1, ws.getLastRow(), ws.getLastColumn()).getValues();
  
  var lista = [];
  var n_linhas = parseInt(ws.getLastRow())
  var n_colunas = parseInt(ws.getLastColumn()) - 1
  

  lista[0] = retorno[0][n_colunas];


  for (var i =1; i < n_linhas; i++){
  
      var string = retorno[i][n_colunas];
  
      lista[i] = '<input type="button" value="Editar" style="color: white;" onclick="window.open(' + "'" + string + "'" + ')" role="button" class="btn btn-primary">';
    
  }

  for (var i =0; i < n_linhas; i++){
  
    retorno[i][n_colunas] = lista[i];

  }

   // Cada novo elemento de retorno_2 será um novo array

   var retorno_2 = [];

   for (i=0;i<n_linhas;i++){

     retorno_2[i] = [];
   
   }
  
  
   // PARTE EDITÁVEL

   // Defina aqui as colunas que deseja colocar na tabela
   // Exemplo: A = 1, B = 2, C = 3
   // n_colunas + 1 será onde ficará os botões de atualizar, favor não alterar.

   var lista_colunas = [ 1, 2, 4, 6, 7, 9, n_colunas + 1];


  // FIM DA PARTE EDITÁVEL
  
  
  // Aqui criamos uma lista para auxiliar a tranferência de dados da planilha
     
  for (i= 0; i< n_linhas; i++){
    
    var lista_aux = [];

    for(j= 0; j< lista_colunas.length; j++){
      
      lista_aux[j] = retorno[i][parseInt(lista_colunas[j])-1].toString();

    }

    retorno_2[i] = lista_aux;

  }

  
  return retorno_2;

};

