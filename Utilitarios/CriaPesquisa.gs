  function CriaPesquisa (Coluna,Pesquisa,flag){
  var spreadsheet = SpreadsheetApp.getActive();
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ValorCelula = SpreadsheetApp.getActive().getRange('A1').getValue();            //Nome da página estará escrito na célula A1
  var Pagina = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ValorCelula);    
  var Limite = Pagina.getLastRow();
  var flag_ = 0;                                                                     //flag interna que será usada para condição 
  Pagina.getActiveCell();
  spreadsheet.getRange('A8:G8').activate();                                          //Range da pesquisa
  
  switch(flag){
    case 0:
        spreadsheet.getActiveSheet().getFilter().remove();          //Como essa função é usada para uma pesquisa em um range que contém,
    break;                                                          //filtro, o removeremos primeiramente
    case 1:
      flag_ = 1;
    }
  spreadsheet.getRange('A8'+':'+ Limite).activate();
  spreadsheet.getRange('A8'+':'+ Limite).createFilter();           //Cria filtro entre A8 e Limite
  var criteria = SpreadsheetApp.newFilterCriteria()                //Cria filtro para pesquisa quando texto é igual ao colocado na variável
  .whenTextEqualTo(Pesquisa)                                       //Pesquisa
  .build();   
    if(flag_ == 0) 
      spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(Coluna, criteria);
};
