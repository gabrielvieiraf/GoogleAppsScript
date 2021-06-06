
// Menu customizado
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Menu Customizado')
      .addItem('Chame a função numero 01','Funcao01')
      .addItem('Chame a função numero 02','Funcao02')
      .addToUi();
}

function Funcao01() {
   //Faz algo aqui
}

function Funcao02() {
   //Faz algo aqui também
}
