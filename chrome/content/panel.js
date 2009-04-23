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
	if(!photoFox.Auth.isLoggedIn())
	{
	  photoFox.Panel.reset();
	  return;
	}
	
	var core = photoFox.getInstance();
    
	if('' != core.getOption('nick'))
      photoFox.Panel.drawMainLabel();    
    
    if('' != core.getOption('unreadMessagesCount'))   
      photoFox.Panel.drawMessages(core.getOption('unreadMessagesCount'));
       
    if('' != core.getOption('favouriteAuthorPhotosCount'))   
      photoFox.Panel.drawFavouriteAuthors(core.getOption('favouriteAuthorPhotosCount'));
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
      "Голоса за статус:"
	  + "\n  повышение - " + core.getOption('statusVotesUp')
	  + "\n  сохранение - " + core.getOption('statusVotesConfirmed')
	  + "\n  понижение - " + core.getOption('statusVotesDown')
	  + "\n"
	  + "\nЖдут:"
	  + "\n  фото - " + core.getOption('waitPhotos')
	  + "\n  комментариев - " + core.getOption('waitComments');
	
	photoFox.Panel.print(core.getUnicodeOption('nick'), tooltip);
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
  
  drawFavouriteAuthors: function(photos_count)
  {
	var label = document.getElementById("photo.fox-label-favourites");
	var image = document.getElementById("photo.fox-image-favourites");	
	
	photoFox.debug("count in panel: " + photoFox.getInstance().getOption('favouriteAuthorPhotosCount'));
	
	var is_hidden = (0 == photos_count);
	
	photoFox.debug("show photo count: " + is_hidden);
	
	label.value = photos_count;	
	label.hidden = is_hidden;
	image.hidden = is_hidden;
  },
};
