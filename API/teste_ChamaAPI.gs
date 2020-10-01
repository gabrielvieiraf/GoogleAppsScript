// --------------------------------------------------------------------------------------------------
//
// Movidesk API no Google APP Script 
//
// --------------------------------------------------------------------------------------------------

function ChamaAPI() {
  
  // Como toda API, o Movidesk API tem uma KEY de acesso, que eles chamam de tokenAPI.
  // Como o próprio nome diz, essa é a chave que permite termos acesso à API.
  
  var token = ""; //Chave exemplo para teste
  
  // Chama a API Movidesk 
  var response = UrlFetchApp.fetch("https://api.movidesk.com/public/v1/tickets?token=" + token + "&$select=id,type,origin,status");
  
  // Analisa resposta JSON
  var conteudo = response.getContentText();
  
  Logger.log(conteudo);
  
  var obj = JSON.parse(conteudo, function (key, value) {
  if (key == "status") {
    Logger.log("O status é = " + value);
  } else if (key == "origin")
  {
   Logger.log("A origin é = " + value);
  }
}); 
  
}
