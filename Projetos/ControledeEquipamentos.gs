/*
  Gabriel Vieira Flores
  Planilha de Controle de Equipamentos
  Sensorweb 2020
*/

//Função que Botão chama ao ser pressionado para adicionar equipamento na planilha
function InsereEquipamento() {
  var ss = SpreadsheetApp.getActive();
  var flag;                                             //Nossa flag é utilizada para saber em qual página devemos trabalhar
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var Celula = activitesheet.getRange(8, 5).getValue(); //Verifica valor da Célula em qual página devemos enviar os dados
  var SN = activitesheet.getRange(9, 5).getValue();     //Verifica valor do Serial Number
  
  //Seta flag para mandar dados às páginas desejadas
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
  
  DesativaFiltro(flag);  //Chama função que desativa o filtro presente na página inticada por "flag" para inserir um novo dado
  CriaLinha('9',flag);   //Cria uma nova linha na posição 9 na página cuja flag foi setada
  Atualiza('A9:B9','B9','Menu!E06:E07'); //Funções que atualizam a Página
  Atualiza('C9:G9','G9','Menu!E09:E13');
  ss.getRange('A09:G09').clearDataValidations(); //Limpa validação condicional
  ss.getRange(flag +'!E9').setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(true).requireValueInRange(ss.getRange('Listas!$E$4:$E$6'), true).build()); // Recria Validação condicional
  MensagemAtualizacao(flag,Celula); //Chama função para mensagem de conclusão de uma gravação
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

//Função para mensagem de conclusão de uma gravação
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

//Funções para botões da planilha
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

//Função que desativa filtro
function DesativaFiltro(flag) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(flag), true);
  spreadsheet.getRange('A8:G8').activate();
  spreadsheet.getActiveSheet().getFilter().remove();
};

//Função que insere o filtro novamente
function InsereFiltro(flag) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(flag), true);
  CriaPesquisa(3,0,1);
};
