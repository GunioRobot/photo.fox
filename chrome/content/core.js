Components.utils.import("resource://gre/modules/JSON.jsm");

photoFox = function(value) {
  this.base_url = 'http://www.photosight.ru';
  this.value = Math.round(Math.random() * 100);
};

  photoFox.getInstance = function() {
	if( typeof( this.instance ) == "undefined" )
	  this.instance = new photoFox();
		
      return this.instance;	
  };
  
  photoFox.debug = function(aMsg) {
	setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);
  };

  photoFox.prototype.updateRepeatedly = function() {
	this.update();
	setTimeout("photoFox.getInstance.updateRepeatedly()", 10 * 60 * 1000);  
  };

  photoFox.prototype.setValue = function(value) {
    this.value = value;
  };  

  photoFox.prototype.processLeftClick = function(e)
  {
    if (e.button != 0) return;  
  
    if (photoFox.Auth.isLoggedIn())
      this.update();
    else
      photoFox.Auth.login();
  };
  
  photoFox.prototype.processClickOnMessages = function(event)
  { 
	this.setOption('unreadMessagesCount', "0");
	photoFox.Panel.update();
	this.loadPSPage(event, '/my/private_messages/');
  }
  
  photoFox.prototype.processClickOnFavouriteAuthorsPhotos = function(event)
  { 
	this.setOption('favouriteAuthorPhotoChanged', "0");
	photoFox.Panel.update();
	this.loadPSPage(event, '/my/favorite_authors/');
  }  

  photoFox.prototype.update = function()
  {		  
    document.getElementById("photo.fox-label").value = '...';

    var httpRequestUser = new XMLHttpRequest();
    if (httpRequestUser.overrideMimeType)
      httpRequestUser.overrideMimeType('text/xml');

    httpRequestUser.onreadystatechange = function() {
      photoFox.Dao.getUserInfo(httpRequestUser);
    };
    httpRequestUser.open('GET', photoFox.Dao.getUserInfoUri(), true);
    httpRequestUser.send(null);

    var httpRequestMsg = new XMLHttpRequest();
    if (httpRequestMsg.overrideMimeType)
      httpRequestMsg.overrideMimeType('text/xml');
    
    httpRequestMsg.onreadystatechange = function() {
      photoFox.Dao.getPrivateMessages(httpRequestMsg);
    };
    httpRequestMsg.open('GET', photoFox.Dao.getPrivateMessagesUri(), true);
    httpRequestMsg.send(null);  
    
    var httpRequestFavouriteAuthorsPhotos = new XMLHttpRequest();
    if (httpRequestFavouriteAuthorsPhotos.overrideMimeType)
    	httpRequestFavouriteAuthorsPhotos.overrideMimeType('text/xml');
    
    httpRequestFavouriteAuthorsPhotos.onreadystatechange = function() {
      photoFox.Dao.getFavouriteAuthorsPhotos(httpRequestFavouriteAuthorsPhotos);
    };
    httpRequestFavouriteAuthorsPhotos.open('GET', photoFox.Dao.getFavouriteAuthorsPhotosUri(), true);
    httpRequestFavouriteAuthorsPhotos.send(null);
  };
  
  photoFox.prototype.loadPage = function(event, url)
  {
    var browser = document.getElementById("content");
    if (event.button == 1) {
      var tab = browser.addTab(url);
      browser.selectedTab = tab;
    } else if (event.button == 0) {
      if (!event) {
        browser.loadURI(url);
        return;
      }
      var shift = event.shiftKey;
      var ctrl =  event.ctrlKey;
      if (ctrl) {
        var tab = browser.addTab(url);
        browser.selectedTab = tab;
      } else if (shift) {
        openDialog("chrome://browser/content/browser.xul", "_blank", "chrome,all,dialog=no", url);
      } else {
        browser.loadURI(url);
      }
    }
  };
  
  photoFox.prototype.loadPSPage = function(event, url)
  {
	this.loadPage(event, this.base_url + url);  
  };
  
  photoFox.prototype.loadProfile = function(event)
  {
    var id = this.getOption('id');

    if (!id) return;

    this.loadPSPage(event, '/users/' + id);
  };
	  
  photoFox.prototype._getOptionPath = function()
  {
	return Components.classes["@mozilla.org/preferences-service;1"]
	  .getService(Components.interfaces.nsIPrefService)
	  .getBranch("extensions.photo.fox.");
  };

  photoFox.prototype.setOption = function(name, value)
  {	
	return this._getOptionPath().setCharPref(name, value);	
  };
  
  photoFox.prototype.getOption = function(name)
  {
	return this._getOptionPath().getCharPref(name);	
  };
  
  photoFox.prototype.setUnicodeOption = function(name, value)
  {
	var container = {value: "" + value};	
	return this.setOption(name, JSON.toString(container));	
  };
  
  photoFox.prototype.getUnicodeOption = function(name)
  {
	var container = this.getOption(name);
	if('' == container)
	  return '';
	return JSON.fromString(container).value;
  };