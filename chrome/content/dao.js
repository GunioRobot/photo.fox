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
      photoFox.Panel.printError('Алярма! Не могу найти RSS-ок!');
      return;
    }
  
    var info;
    for(var i = 0; i < links.length; i++)  {
      var uri = links[i].attributes.getNamedItem('href').value;
      if(!uri) continue;
      info = photoFox.Dao.getLoginAndKeyFromUri(uri);
      if(info) {
        photoFox.Options.set('login', info.login);
        photoFox.Options.set('key', info.key);
        photoFox.Core.update();
        return;
      }
    }
  
    photoFox.Panel.printError('Алярма! RSS-ки не те!');
  },
  
  getUriByAction: function(action)
  {
    var uri = 'http://www.photosight.ru/notifier/'+action;
    //var uri = 'file:///home/korchasa/.mozilla/firefox-3.0/az9wu9fw.development/extensions/photo.fox@korchasa/tests/'+action+'.xml';
    uri += '?u=' + photoFox.Options.get('login');
    uri += '&k=' + photoFox.Options.get('key');
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

  getUserInfo: function(httpRequest)
  {
    if (httpRequest.readyState != 4) return;    
    //if (httpRequest.status != 200) return;
  
    var xmlDoc;
      
    try {      
      xmlDoc = httpRequest.responseXML;    
    } catch (e) {
      photoFox.Panel.printError('Отсутствует связь с фотосайтом, либо задан неверный путь к данным.');
    }
    
    var infoEl = xmlDoc.getElementsByTagName('psmember').item(0);
  
    var id = infoEl.attributes.getNamedItem('id').value;
  
    photoFox.Options.set('id', id);
  
    var info = {};
  
    info.status = infoEl.attributes.getNamedItem('status_name').value;
    info.nick = infoEl.attributes.getNamedItem('nick').value;
    info.st_up = infoEl.attributes.getNamedItem('status_votes_up').value;
    info.st_down = infoEl.attributes.getNamedItem('status_votes_down').value;
    info.st_confirmed = infoEl.attributes.getNamedItem('status_votes_confirmed').value;
    info.fav_authors = infoEl.attributes.getNamedItem('favourited_authors').value;
    info.fav_commenters = infoEl.attributes.getNamedItem('favourited_commenters').value;
  
    photoFox.Options.set('info-user', JSON.toString(info));
  
    photoFox.Panel.update();    
  },

  getPrivateMessages: function(httpRequest)
  {
    if (httpRequest.readyState != 4) return;    
    //if (httpRequest.status != 200) return;
  
    var xmlDoc;
    
    try {    
      xmlDoc = httpRequest.responseXML;    
    } catch (e) {
      photoFox.Panel.printError('Отсутствует связь с фотосайтом, либо задан неверный путь к данным.');    
      throw e;
    }
    
    var messages_count = xmlDoc.getElementsByTagName('psprivate_message').length;  
    
    var message_info = {};
     
    message_info.count = messages_count;
  
    photoFox.Options.set('info-messages', JSON.toString(message_info));
    
    photoFox.Panel.update();
  }
  
};