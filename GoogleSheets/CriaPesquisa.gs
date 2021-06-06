/*
Exemplo de uso do filtro:
 O primeiro argumento da função será a coluna em que você deseja pesquisar 
 O segundo será o que você deseja pesquisar na coluna. Lembre-se de colocar o texto entre aspas
 Exemplo: "Insira seu texto" 
 Por padrão, foi definido que um rangem que já contenha um filtro será flag = 1
 E um sem filtro será flag = 0
 Por último, você colocará o range de sua pesquisa. Um truque que você pode usar para fazer 
 seu range até a última linha, é colocar o endereço da célula depois do " : " sem o número
 Exemplo: 
 function Botao(){
    CriaPesquisa(1,"Arroz",1,"A8:B");
};
*/

  function CriaPesquisa (Coluna,Pesquisa,Flag,Range){
  var spreadsheet = SpreadsheetApp.getActive();
  var ValorCelula = SpreadsheetApp.getActive().getRange('A1').getValue();            //Nome da página estará escrito na célula A1
  var Pagina = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ValorCelula); 
  Pagina.getActiveCell();
  spreadsheet.getRange(Range).activate();                                            //Range da pesquisa
  
  switch(Flag){
    case 0:
        spreadsheet.getActiveSheet().getFilter().remove(); //Caso haja filtro, ele seráretirado
    break;                                                          
    case 1:
      var criteria = SpreadsheetApp.newFilterCriteria()    //Cria criterio para pesquisa quando texto é igual ao colocado na variável Pesquisa 
      .whenTextEqualTo(Pesquisa)                               
      .build()
     break;
   }
    
  spreadsheet.getRange(Range).activate();
  spreadsheet.getRange(Range).createFilter();            //Cria filtro no Range setado
  var criteria = SpreadsheetApp.newFilterCriteria()      //Cria criterio para pesquisa quando texto é igual ao colocado na variável Pesquisa
  .whenTextEqualTo(Pesquisa)                                       
  .build();   
  spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(Coluna, criteria);
};
