/**
 * Enviando e-mails pelo Google Apps Script
Email através do google planilhas:

Exemplo:   
           A        |         B
____________________|____________________
1| Endr. de E-mail  |     Mensagem
_|__________________|____________________
2| email@gmail.com  |  mensagem teste
_|__________________|____________________
3| email2@gmail.com | mensagem teste 2
_|__________________|____________________

*/

function enviaEmails() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const linhaInicio = 2; // Linha de inicio da lista de e-mails
  const numLinhas = 2;
  
  //  A2:B3
  const dataRange = sheet.getRange(linhaInicio 1, numLinhas, 2);
  
  // Pegando valores que estão no range
  const dado = dataRange.getValues();
  
  for (var i in dado) {
    var linha = dado[i];
    var enderecoEmail = linha[0]; // Primeira Coluna
    var mensagem = linha[1]; // Segunda Coluna
    var assunto = 'Enviando e-mails através de planilhas';
    MailApp.sendEmail(enderecoEmail, assunto, mensagem);
  }
}
