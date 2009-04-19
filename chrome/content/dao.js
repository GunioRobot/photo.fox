photoFox.Dao = {
  
  getLoginAndKeyFromUri: function(uri)
  {
    var url_parts = uri.split('?');
    if(url_parts.length<1) return false;
  	url_parts = url_parts[1];
  
  	url_parts = url_parts.split('&');
  	if(url_parts.length<1) return false;
  
  	var result = {};
  
  	for(var i=0;i<url_parts.length;i++) {
  	  var option = url_parts[i].split('=');
  
      if('u' == option[0])
  	    result['login'] = option[1];
  	  else if('k' == option[0])
  	    result['key'] = option[1];
  
  	}
  	
  	if(undefined == result.key || undefined == result.login)
	    return false;
	  else
	    return result;

	  return result;
  },
  
  parsePageForUserLoginAndKey: function()
  {
    var links = content.document.getElementsByTagName('link');
    var links_count = links.length;

    if(!links_count)
    {
      photoFox.Panel.printError('Не могу найти RSS-ок');
      return;
    }
  
    var info;
    for(var i = 0; i < links.length; i++)  {
      var uri = links[i].attributes.getNamedItem('href').value;
      if(!uri) continue;
      info = photoFox.Dao.getLoginAndKeyFromUri(uri);
      if(info)
        return info;
    }    
    return false;
  },
  
  getUriByAction: function(action)
  {
    var uri = 'http://www.photosight.ru/notifier/'+action;
    //var uri = 'file:///home/korchasa/.mozilla/firefox-3.0/az9wu9fw.development/extensions/photo.fox@korchasa/tests/'+action+'.xml';
    uri += '?u=' + photoFox.getInstance().getOption('login');
    uri += '&k=' + photoFox.getInstance().getOption('key');
    return uri;
  },

  getUserInfoUri: function()
  {
    return this.getUriByAction('member');
  },

  getPrivateMessagesUri: function()
  {
    return this.getUriByAction('private_messages');
  },  
  
  getFavouriteAuthorsPhotosUri: function()
  {
    return this.getUriByAction('favourite_authors_photos');
  },

  getUserInfo: function(httpRequest)
  {
	if (httpRequest.readyState != 4) return;    
	if (httpRequest.status != 200) return;
	  
	var xmlDoc;	      
	try {      
	  xmlDoc = httpRequest.responseXML;    
	} catch (e) {
	  photoFox.Panel.printError('Отсутствует связь с фотосайтом');
	  throw e;
	}
	
	//alert(httpRequest.responseText);
	    
	var tags = xmlDoc.getElementsByTagName('psmember');
	
	if(0 == tags.length)
	  return;
	
	var attrs = tags.item(0).attributes;		
	
	var core = photoFox.getInstance();
	
	core.setOption('id', attrs.getNamedItem('id').value);
	core.setOption('status', attrs.getNamedItem('status').value);		
	core.setOption('nick', attrs.getNamedItem('nick').value);
	
	core.setOption('statusVotesUp', attrs.getNamedItem('status_votes_up').value);
	core.setOption('statusVotesDown', attrs.getNamedItem('status_votes_down').value);
	core.setOption('statusVotesConfirmed', attrs.getNamedItem('status_votes_confirmed').value);
	
	core.setOption('waitPhotos', attrs.getNamedItem('favourited_authors').value);
	core.setOption('waitComments', attrs.getNamedItem('favourited_commenters').value);
	  
	photoFox.Panel.update();
  },

  getPrivateMessages: function(httpRequest)
  {
    if (httpRequest.readyState != 4) return;
    if (httpRequest.status != 200) return;
  
    var xmlDoc;    
    try {    
      xmlDoc = httpRequest.responseXML;    
    } catch (e) {
      photoFox.Panel.printError('Отсутствует связь с фотосайтом, либо задан неверный путь к данным.');    
      throw e;
    }
    
    var messages_count = xmlDoc.getElementsByTagName('psprivate_message').length;
      
    photoFox.getInstance().setOption('unreadMessagesCount', messages_count);
    
    photoFox.Panel.update();
  },
  
  getFavouriteAuthorsPhotos: function(httpRequest)
  {
    if (httpRequest.readyState != 4) return;
    if (httpRequest.status != 200) return;
  
    var xmlDoc;    
    try {    
      xmlDoc = httpRequest.responseXML;    
    } catch (e) {
      photoFox.Panel.printError('Отсутствует связь с фотосайтом, либо задан неверный путь к данным.');    
      throw e;
    }
    
    var core = photoFox.getInstance();
    
    var top_photo_ctime = xmlDoc.getElementsByTagName('pubDate').item(0).textContent;    
    var old_top_photo_ctime = core.getOption('lastFavouriteAuthorPhotoCtime');
        
    if(top_photo_ctime != old_top_photo_ctime) {
      core.setOption('lastFavouriteAuthorPhotoCtime', top_photo_ctime);
      core.setOption('favouriteAuthorPhotoChanged', "1");
    }
    
    photoFox.Panel.update();
  },
  
};