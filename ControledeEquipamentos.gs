function InsereEquipamento() {
  var ss = SpreadsheetApp.getActive();
  var flag;
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var Celula = activitesheet.getRange(8, 5).getValue();
  var SN = activitesheet.getRange(9, 5).getValue();
  switch(Celula) {
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
  DesativaFiltro(flag);  
  CriaLinha('9',flag);
  Atualiza('A9:B9','B9','Menu!E06:E07');
  Atualiza('C9:G9','G9','Menu!E09:E13');
  ss.getRange('A09:G09').clearDataValidations();
  ss.getRange(flag +'!E9').setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(true).requireValueInRange(ss.getRange('Listas!$E$4:$E$6'), true).build());
  MensagemAtualizacao(flag,Celula);
  InsereFiltro(flag);
};

function Atualiza(SelecaoCelulas,ColunaFinal,SelecaoCopiadaPagina){
  SpreadsheetApp.getActive().getRange(SelecaoCelulas).activate();
  SpreadsheetApp.getActive().setCurrentCell(SpreadsheetApp.getActive().getRange(ColunaFinal));
  SpreadsheetApp.getActive().getRange(SelecaoCopiadaPagina).copyTo(SpreadsheetApp.getActive().getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, true);
  SpreadsheetApp.getActive().getActiveRangeList().setFontSize(11);
};

function CriaLinha(Linha,flag) {
  SpreadsheetApp.getActive().setActiveSheet(SpreadsheetApp.getActive().getSheetByName(flag), true);
  SpreadsheetApp.getActive().getRange(Linha + ':' + Linha).activate();
  SpreadsheetApp.getActive().getActiveSheet().insertRowsBefore(SpreadsheetApp.getActive().getActiveRange().getRow(), 1);
  SpreadsheetApp.getActive().getActiveRange().offset(0, 0, 1, SpreadsheetApp.getActive().getActiveRange().getNumColumns()).activate();
};

function MensagemAtualizacao(flag,Celula) {
  if (flag == 'Centrais')
    Browser.msgBox("Concluído","Central foi adicionada à Planilha",Browser.Buttons.OK);
  else
    Browser.msgBox('Concluído',Celula + " foi adicionado à Planilha",Browser.Buttons.OK);
};

  function CriaPesquisa (Coluna,Modelo,flag){
  var spreadsheet = SpreadsheetApp.getActive();
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ValorCelula = SpreadsheetApp.getActive().getRange('A1').getValue();
  var Pagina = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ValorCelula);
  var Limite = Pagina.getLastRow();
  var flag_ = 0;  
  Pagina.getActiveCell();
  spreadsheet.getRange('A8:G8').activate();
  switch(flag){
    case 0:
        spreadsheet.getActiveSheet().getFilter().remove();
    break;
    case 1:
      flag_ = 1;
    }
  spreadsheet.getRange('A8'+':'+ Limite).activate();
  spreadsheet.getRange('A8'+':'+ Limite).createFilter();
  spreadsheet.getRange('C8').activate();
  var criteria = SpreadsheetApp.newFilterCriteria()
  .whenTextEqualTo(Modelo)
  .build();   
    if(flag_ == 0) 
      spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(Coluna, criteria);
};

function PesquisaSN() {
  var SN = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(5, 4).getValue();
  CriaPesquisa(3,SN,0);
};

function RTH20() {
  CriaPesquisa(2,"RTH-20",0);
};

function RTH30() {
  CriaPesquisa(2,"RTH-30",0);
};

function total() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getActiveSheet().getFilter().removeColumnFilterCriteria(2);
  spreadsheet.getActiveSheet().getFilter().removeColumnFilterCriteria(3);
};

function DesativaFiltro(flag) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(flag), true);
  spreadsheet.getRange('A8:G8').activate();
  spreadsheet.getActiveSheet().getFilter().remove();
};

function InsereFiltro(flag) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(flag), true);
  CriaPesquisa(3,0,1);
};
