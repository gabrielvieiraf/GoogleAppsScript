function BotaoHiperLink() {
  // Declarando página a ser acessada pelo botão da planilha
  var page = '<script>window.open("https://github.com/gabrielvieiraf");google.script.host.close()</script>';
  // Janela a ser aberta com uma pequena tela de carregamento. Você pode setar o tamanho em setWidth(tamanho _largura) e setHeigth (tamanho_altura)
  var interface = HtmlService.createHtmlOutput(page).setSandboxMode(HtmlService.SandboxMode.IFRAME).setWidth(300).setHeight(20);   
  SpreadsheetApp.getUi().showModalDialog(interface, 'Abrindo GitHub do Prof... ');
};
