function getPageData()
{
  var s='';
  s+='<input type="button" class="btn_pesquisar" value="Controle de Equipamentos" onClick="getUrl(\'?mode=Controle\');" />';
  s+='<input type="button" class="btn_pesquisar" value="Dashboard" onClick="getUrl(\'?mode=Dashboard\');" />';
  s+='<input type="button" class="btn_pesquisar" value="Ajuda" onClick="getUrl(\'?mode=Ajuda\');" />';
  var rObj={menu:s,title:getPage()};
  Logger.log(rObj);
  return rObj;
}

function setPage(page) {
  var ps=PropertiesService.getUserProperties();
  ps.setProperty('PageTitle', page);
  return ps.getProperty('PageTitle');
}

function initPage() {
  var ps=PropertiesService.getUserProperties();
  ps.setProperty('PageTitle','');
  return ps.getProperty('PageTitle');
}

function getPage() {
  var ps=PropertiesService.getUserProperties();
  var pt=ps.getProperty('PageTitle');
  return pt;
}
