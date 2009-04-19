photoFox.Panel = {
  
  print: function(label, tooltip)
  {
    document.getElementById("photo.fox-label").value = label;
    document.getElementById("photo.fox-label").tooltipText = tooltip;
  },

  printError: function(message)
  {	
    this.print('Алярма! ' + message);
  },

  update: function()
  {  
	var core = photoFox.getInstance();
    
	if('' != core.getOption('nick'))
      photoFox.Panel.drawMainLabel();    
    
    if('' != core.getOption('unreadMessagesCount'))   
      photoFox.Panel.drawMessages(core.getOption('unreadMessagesCount'));
  },  
  
  reset: function()
  {
	this.print('Фото.Fox', 'Тыцните, чтобы войти');
	photoFox.Panel.drawMessages(0);
  },
  
  drawMainLabel: function()
  {
	var core = photoFox.getInstance();
	
	var tooltip = 
	  "За повышение: " + core.getOption('statusVotesUp')
	  + "\nЗа сохранение: " + core.getOption('statusVotesConfirmed')
	  + "\nЗа понижения: " + core.getOption('statusVotesDown')
	  + "\n"
	  + "\nЖдут ваших фото: " + core.getOption('waitPhotos')
	  + "\nЖдут ваших комментариев: " + core.getOption('waitComments');
	
	photoFox.Panel.print(core.getOption('nick'), tooltip);
  },
  
  drawMessages: function(messages_count)
  {
	var label = document.getElementById("photo.fox-label-messages");
	var image = document.getElementById("photo.fox-image-messages");
	
	var is_hidden = (0 == messages_count);
	
	label.value = messages_count;	
	label.hidden = is_hidden;
	image.hidden = is_hidden;
  },
};
