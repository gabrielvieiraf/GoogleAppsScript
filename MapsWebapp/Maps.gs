function getList(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const locationSheet = ss.getSheetByName('Data para Upload do Website (Draft)')
  const lastRow = locationSheet.getLastRow() - 1;
  const locations = locationSheet.getRange(2, 22, lastRow, 2).getValues();
  const buildings = locationSheet.getRange(2, 8, lastRow, 1).getValues()
  return [locations, buildings];
}

function getAddress(address){
  const response = Maps.newGeocoder().reverseGeocode(address);
  const returnArray = [];
  for (var i = 0; i<response.results.length; i++){
    var result = response.results[i];
    Logger.log('%s: %s, %s', result.formatted_address, result.geometry.location.lat, result.geometry.location.lag);
    returnArray.push([result.geometry.location.lat,result.geometry.location.lng]);
    return returnArray;
  }
}

//Média  long/lat
function middleMap(filter) {
  var listCoord = getList()[0];
  const buildings = getList()[1]
  var count = 0;
  var lat = 0;
  var lon = 0;

  for (var i = 0; i < listCoord.length; i++){
    count += 1;
    lat += listCoord[i][0];
    lon += listCoord[i][1];
  }
  
  lat /= count;
  Logger.log(lat);
  lon /= count;
  Logger.log(lon);
  Logger.log(count);

  return [listCoord,[lat,lon],buildings];
}

function createMap() {

  const listCoord = getList();
  const coord = middleMap(listCoord)
  var map = Maps.newStaticMap().setCenter(coord[0], coord[1]);

  for (marker in listCoord){
      map.addMarker(marker[0], marker[1]);
  }

}
