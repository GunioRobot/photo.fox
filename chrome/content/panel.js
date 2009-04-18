photoFox.Panel = {
  
  print: function(label, tooltip)
  {
    document.getElementById("photo.fox-label").value = label;
    document.getElementById("photo.fox-label").tooltipText = tooltip;
  },

  printError: function(message)
  {
    this.print(':-(', message);
  },

  update: function()
  {
    var info = photoFox.Options.get('info-user');
    if('' == info)
      return;
    info = JSON.fromString(info);
    
    var messages_info = photoFox.Options.get('info-messages');
    if('' == messages_info)
      return;
    messages_info = JSON.fromString(messages_info);
  
    var label = info.nick + ' [' + info.st_up + '/' + info.st_confirmed + '/' + info.st_down + ']';
    label += '[' + info.fav_authors + '/' + info.fav_commenters + ']['+ messages_info.count +']';
  
    tooltip = "Имя пользователя [голоса за поднятие статуса / голоса за сохранение статуса / голоса за понижение статуса][ждут фото / ждут комментариев][количество новых сообщений]";
    tooltip += ". Щелкните, чтобы обновить.";  
    
    this.print(label, tooltip);
  },
};
