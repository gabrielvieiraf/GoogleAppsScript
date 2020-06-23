function getGlobals(){
  var ss=SpreadsheetApp.getActive();
  var sh=ss.getSheetByName('Globals');
  var rg=sh.getRange(1,1,getGlobalHeight(),2);
  var vA=rg.getValues();
  var g={};
  for(var i=0;i<vA.length;i++){
    g[vA[i][0]]=vA[i][1];
  }
  return g;
}

function setGlobals(dfltObj){
  if(dfltObj){
    var ss=SpreadsheetApp.getActive();
    var sh=ss.getSheetByName('Globals');
    var rg=sh.getRange(1,1,getGlobalHeight(),2);
    var vA=rg.getValues();
    for(var i=0;i<vA.length;i++){
      vA[i][1]=dfltObj[vA[i][0]];
    }
    rg.setValues(vA);
  }
}

function getGlobal(key) {
  var rObj=getGlobals();
  if(rObj.hasOwnProperty(key)){
    return rObj[key];
  }else{
    throw(Utilities.formatString('JJE-SimpleUtilitiesScripts-Error: Globals does not contain a key named %s.',key));
  }  
}

function setGlobal(key,value){
  var curObj=getGlobals();
  curObj[key]=value;
  setGlobals(curObj);
}

function getGlobalHeight(){
  var ss=SpreadsheetApp.getActive();
  var sh=ss.getSheetByName('Globals');
  var rg=sh.getRange(1,1,sh.getMaxRows(),1);
  var vA=rg.getValues();
  for(var i=0;i<vA.length;i++){
    if(!vA[i][0]){
      break;
    }
  }
  return i;
}
/*
function foo(SN,Tipo) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var s = ss.getSheetByName(Tipo);
    var r = s.getRange(1,1,s.getLastRow(),8);
    var v = r.getValues();
    var searchTerm = SN;
    for(var i=v.length-1;i>=0;i--) {
        if(v[0,i].toString().indexOf(searchTerm) > -1) {
            
            Logger.log(v[0,i]);
        }
    }
};*/

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


  function CriaPesquisa (Coluna,Pesquisa,Flag,Range,Tipo){
  Logger.log("Esse é o tipo: %s",Tipo);
  var spreadsheet = SpreadsheetApp.getActive();
  var activitesheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   SpreadsheetApp.getActive().setActiveSheet(SpreadsheetApp.getActive().getSheetByName(Tipo), true);
  //Pagina.getActiveCell();
  spreadsheet.getRange(Range).activate();                                            //Range da pesquisa
  
  switch(Flag){
    case 0:
        spreadsheet.getActiveSheet().getFilter().remove(); //Caso haja filtro, ele seráretirado
    break;                                                          
    case 1:
      var criteria = SpreadsheetApp.newFilterCriteria()    //Cria criterio para pesquisa quando texto é igual ao colocado na variável Pesquisa 
      .whenTextContains(Pesquisa)                               
      .build()
     break;
   }
    
  spreadsheet.getRange(Range).activate();
  spreadsheet.getRange(Range).createFilter();            //Cria filtro no Range setado
   
  var criteria = SpreadsheetApp.newFilterCriteria()      //Cria criterio para pesquisa quando texto é igual ao colocado na variável Pesquisa
  .whenTextContains(Pesquisa)                                       
  .build();   
  spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(Coluna, criteria);
};

function onFailure(error) {
        var div = document.getElementById('output');
        div.innerHTML = "ERROR: " + error.message;
}

//Função que desativa filtro em determinado range
function DesativaFiltro(pagina,range) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(pagina), true);
  spreadsheet.getRange(range).activate();
  spreadsheet.getActiveSheet().getFilter().remove();
};
