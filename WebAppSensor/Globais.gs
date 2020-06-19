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
