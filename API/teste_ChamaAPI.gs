function ChamaAPI() {
  
  // Chama a API Movidesk
  var response = UrlFetchApp.fetch("https://api.movidesk.com/public/v1/tickets?token=52ee6ca5-8639-422b-bafe-470013c11176&$select=id,type,origin,status");
  // Testa para ver se a informação foi adquirida. Para o exemplo acima, devemos obter o resultado: []
  Logger.log(response.getContentText());
}
