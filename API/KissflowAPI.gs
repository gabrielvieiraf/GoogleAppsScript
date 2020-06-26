function doPost(e){
    try{
    	var jsonString = e.postData.getDataAsString();
    	setLog(jsonString);
    	var jsonData = JSON.parse(jsonString);
      
    	//Designando ID do JSON para um ID Variável  
    	var id = jsonData["Id"];
    	//Designando etapa do processo do JSON para uma variável processStep
    	var processStep = jsonData["Process Step"];    
    	// Printa Passos do processo
    	setLog(processStep,e)
        /* Não utilizamos essa função 
    	updateSheetParent(jsonData);
        */
    	// Chama função 
    	updateSheetLineItems(jsonData);  
    }catch(e){   	 	
    	setLog("Exception occured="+JSON.stringify(e),e);  
    }
} 
/*  Pode vir a ser necessário
// Para Atualizar conteúdo do Parent
function updateSheetParent(jsonData) {  
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];  
    var item = jsonData["Responsavel"];  
    var rowList = [];  
    rowList.push(jsonData["Solicitante"])  
    sheet.appendRow(rowList);
}
*/

//Para Atualizar na Planilha em uma linha 

function updateSheetLineItems(jsonData){ 	
  // Como estamos utilizando a aplicação vinculada à planilha, basta dizer que desejamos utilizá-la: 
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[1];       
    	var rowList = [];    
    	rowList.push(jsonData["Solicitante"],jsonData["Motivo_da_solicitacao"],jsonData["Cliente"],
                     jsonData["Numero_da_Proposta"],jsonData["Previsao_para_instalacao"],
                     jsonData["Total_de_Central"],jsonData["Total_de_Repetidor"],
                     jsonData["Total_de_Sensor_Frio_40_a_125C"],jsonData["Total_de_Sensor_Ambiente_55_a_35"],
                     jsonData["Total_de_Sensor_Ambiente_e_Umida"],jsonData["Total_de_Sensor_Ultra_Frio_100_a"],
                     jsonData["Total_de_Sensor_Criogenia_200_a_"],jsonData["O_Cliente_possui_uma_rede_com_ou"],
                     jsonData["Endereco_completo_rua_n_bairro_c"],jsonData["Setor_do_responsavel_principal"],
                     jsonData["Email_do_responsavel_principal"],jsonData["Telefone_do_responsavel_principa"],
                     jsonData["Survey"],jsonData["Treinamento"],jsonData["Todos_os_equipamentos_sao_padroe"],
                     jsonData["Qual_o_endereco_ou_enderecos_de_"])    
    	sheet.appendRow(rowList);  

}

function setLog(message,e){
    // Crie um documento do Google e forneça o URL do documento abaixo para imprimir os logs de erro do script, se desejar, ou você pode usar o Logger.log ("Imprimir log" + e)
    var doc = DocumentApp.openById("14gvRdrgUdCV5nvK_0_hOVVxlKxulhJ9ZAWS2CEZsXdY");
    doc.getBody().appendParagraph(JSON.stringify(message));
    Logger.log("Log Kissflow" + e)
}
