function CriaListaDependente() {
  var ss = SpreadsheetApp.getActive();
  var PaginaValidacao = 'Página1';                             //Indica a Página onde os ítens chave estão em validação. 
  var PaginaLista = 'Página1';                                 //Indica a Página em que a Lista para validação está.
  var CelulaAbsolutoValidacao = '$E$1';                        //Célula onde a Validacao dos itens em RangeLista foi feita.             (Absoluto $)
  var RangeAbsolutoLista = '$F$1:$F$35';                       //Aqui são definidos os itens chave, dos quais a lista ficará dependente (Absoluto $)
  var ColunaInicialLista = 'G';                                //Aqui são definidas as colunas Iniciais e Finais da Lista que ficará dependente.
  var ColunaFinalLista = 'J';
  var Aspas = '"';                                             //Criado devido à maneira com que a concatenação de palavras e variáveis é feita. 
  var CelulaListaDependente = 'A1';                            //Define a Célula onde a lista dependente ficará. Lembre-se de colocá-la em uma coluna livre, para que não ocorra erros por sobreposição de dados.
  ss.getRange(CelulaListaDependente).activate();
  ss.getCurrentCell().setValue('=TRANSPOSE(INDIRECT( ' + Aspas + ColunaInicialLista + Aspas + ' & MATCH(' + PaginaValidacao + '!'+ CelulaAbsolutoValidacao + ';' + PaginaLista +'!' + RangeAbsolutoLista +';0) & ' + Aspas + ':' + ColunaFinalLista +Aspas +' & MATCH(' + PaginaValidacao + '!' + CelulaAbsolutoValidacao +';' + PaginaValidacao + '!' + RangeAbsolutoLista +';0)))');
};

function CriaValidacao() {
  var ss = SpreadsheetApp.getActive();
  var CelulaValidacao = 'D1';                                 //Indica Célula onde a Validação ficará.
  var RangeListaDependente = 'A1:A';                          //Range onde a Validação de dados pegara a lista dependente
  var RangeAbsoluto = '$A$1:$A';                              //Range onde a Validação de dados pegara a lista dependente (Absoluto $)
  var Pagina = 'Página1';                                     //Indica Página onde a Validação ficará
  ss.getRange(RangeListaDependente).activate();
  ss.getRange(CelulaValidacao).setDataValidation(SpreadsheetApp.newDataValidation()   //Cria Validação
  .setAllowInvalid(true)
  .requireValueInRange(spreadsheet.getRange('\''+ Pagina +'\'!' + RangeAbsoluto + ''), true)
  .build());
};
