// --------------------------------------------------------------------------------------------------
//
// Bling API no Google APPs Script 
//
// --------------------------------------------------------------------------------------------------

function ChamaAPI() {
  
  // Como toda API, o Bling API tem uma KEY de acesso, que eles chamam de apikey.
  // Como o próprio nome diz, essa é a chave que permite termos acesso à API.
  const apikey = "suaChave";

  // Chama a API Bling
  const response = UrlFetchApp.fetch("https://bling.com.br/Api/v2/produtos/json/&apikey=" + apikey );

  // Analisa resposta JSON
  const conteudo = response.getContentText();
  
  const obj = JSON.parse(conteudo);

  return obj['retorno']['produtos'];
}
