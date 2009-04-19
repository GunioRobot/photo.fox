photoFox.Auth = {
  login: function()
  {
    var info = photoFox.Dao.parsePageForUserLoginAndKey();
    
    if('undefined' == typeof(info))
      return photoFox.Panel.printError('Вы уверены, что находитесь на своей странице фотосайта?')
            
    var core = photoFox.getInstance();
    core.setOption('login', info.login);
    core.setOption('key', info.key);
    core.update();
  }, 
  
  logout: function()
  {
	var core = photoFox.getInstance();
	core.setOption('id', '');
	core.setOption('key', '');
	core.setOption('login', '');
	core.setUnicodeOption('nick', '');
	core.setOption('status', '');
	
	core.setOption('statusVotesUp', '');
	core.setOption('statusVotesDown', '');
	core.setOption('statusVotesConfirmed', '');
	
	core.setOption('waitPhotos', '');
	core.setOption('waitComments', '');
	
	core.setOption('lastFavouriteAuthorPhotoCtime', '');
	core.setOption('favouriteAuthorPhotoChanged', '0');
	
	core.setOption('unreadMessagesCount', '');
	
    photoFox.Panel.reset();
  },

  isLoggedIn: function()
  {
    return ('' != photoFox.getInstance().getOption('login'));
  },
  
};
