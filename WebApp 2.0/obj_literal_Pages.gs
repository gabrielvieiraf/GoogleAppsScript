/* 
   Google Apps Script:
   Páginas de Web App com Objeto literal
   Autor: Gabriel Vieira Flores
*/
function processaPagina(parametro, nome_pagina) {
    return HtmlService.createTemplateFromFile(parametro).evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle(nome_pagina)
}

function Paginas(pagina) {
  
  // Objeto Literal  
  const pg = {
    index: processaPagina(pagina, 'Página Inicial'),
    contato: processaPagina(pagina, 'Contato'),
    ajuda: processaPagina(pagina, 'Ajuda'),
    default: processaPagina(pagina, 'Página Inicial')
  }
  return pg[pagina] || pg.default
}

function doGet(e) {
    if (e.queryString !== '') {
        var parametro = e.parameter.mode
        return Paginas(parametro)
    }
    else {
        return processaPagina('index', 'Página Inicial')
    }
}
