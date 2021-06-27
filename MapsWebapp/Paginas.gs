function processaPagina(parametro, nome_pagina) {
    return HtmlService.createTemplateFromFile(parametro).evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .setTitle(nome_pagina).setFaviconUrl("https://user-images.githubusercontent.com/48156370/122850284-56c39700-d2e3-11eb-8b1e-4107756c0bfc.png");
}

function doGet(e) {
    if (e.queryString !== '') {
        var parametro = e.parameter.mode;
        switch (parametro) {
            case 'Dashboard':
                return processaPagina(parametro, 'Dashboard');
                break;
            case 'Database':
                return processaPagina(parametro, 'Database');
                break;
            case 'Operators':
                return processaPagina(parametro, 'Operators');
                break;
            case 'Availability':
                return processaPagina(parametro, 'Availability');
                break; 
            case 'Building_Report':
                return processaPagina(parametro, 'Building Report');
                break;
            case 'Lead_Introduction':
                return processaPagina(parametro, 'Lead Introduction');
                break;
            case 'Deals':
                return processaPagina(parametro, 'Deals');
                break;
            case 'Billing':
                return processaPagina(parametro, 'Billing');
                break;
            case 'Users':
                return processaPagina(parametro, 'Users');
                break;
            default:
                return processaPagina('Dashboard', 'Dashboard');
                break;
        }
    } 
    else {
        return processaPagina('Dashboard', 'Dashboard');
    }
}
