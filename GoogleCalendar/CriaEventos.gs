function CriaEvento(titulo, dataInicio, dataFim) {
  var nomeCalendario = 'Teste';
  var eventCal = CalendarApp.getCalendarsByName(nomeCalendario)[0];
  var dataInicio = new Date(dataInicio);
  var dataFim = new Date(dataFim);
  
  var descricao = 'Essa será a descrição do seu evento';
  var local = 'Aqui ficará o local da reunião';
  var convidados = 'aqui ficará os e-mails dos convidados separados por vírgula';
  
   eventCal.createEvent(titulo, dataInicio, dataFim, {
      location: local,
      description: descricao,
      guests: convidados
    })  
}  
