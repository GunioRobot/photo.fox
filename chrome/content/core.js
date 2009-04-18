Components.utils.import("resource://gre/modules/JSON.jsm");

var photoFox = {};

photoFox.Core = {
  
  updateRepeatedly: function()
  {
    this.update();
    setTimeout("photoFox.Core.updateRepeatedly()", 10 * 60 * 1000);
  },

  init: function()
  {
    if(photoFox.Auth.isLoggedIn()) photoFox.Core.updateRepeatedly();
  },
  
  processLeftClick: function(e)
  {
    if (e.button != 0) return;  
  
    if (photoFox.Auth.isLoggedIn())
      this.update();
    else
      photoFox.Auth.login();
  },

  update: function()
  {
    document.getElementById("photo.fox-label").value = '...';

    var httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType)
      httpRequest.overrideMimeType('text/xml');

    httpRequest.onreadystatechange = function() { photoFox.Dao.getUserInfo(httpRequest); };
    httpRequest.open('GET', photoFox.Dao.getUserInfoUri(), true);
    httpRequest.send(null);

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() { photoFox.Dao.getPrivateMessages(httpRequest); };
    httpRequest.open('GET', photoFox.Dao.getPrivateMessagesUri(), true);
    httpRequest.send(null);  
  },
  
  loadPage: function(event, url)
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
  },
  
  loadProfile: function(event)
  {
    var id = photoFox.Options.get('id');

    if (!id) return;

    var url = 'http://www.photosight.ru/users/' + id;

    this.LoadPage(event, url);
  }

};