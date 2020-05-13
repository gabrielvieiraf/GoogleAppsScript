//Função que desativa filtro em determinado range
function DesativaFiltro(pagina,range) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(pagina), true);
  spreadsheet.getRange(range).activate();
  spreadsheet.getActiveSheet().getFilter().remove();
};
