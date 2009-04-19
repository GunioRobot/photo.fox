photoFox.Panel = {
  
  print: function(label, tooltip)
  {
    document.getElementById("photo.fox-label").value = label;
    document.getElementById("photo.fox-label").tooltipText = tooltip;
  },

  printError: function(message, tooltip)
  {
    this.print('Алярма! ' + message, tooltip);
  },

  update: function()
  {  
	var core = photoFox.getInstance();
    
	var nick = core.getOption('nick'); 
	if('' == nick) return;	
    this.print(nick, "Ласково надавите, чтобы обновить");
    
    if('' == core.getOption('unreadMessagesCount')) return;   
    photoFox.Panel.drawMessages(core.getOption('unreadMessagesCount'));
  },  
  
  reset: function()
  {
	this.print('Фото.Fox', 'Тыцните, чтобы войти');
	photoFox.Panel.drawMessages(0);
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
