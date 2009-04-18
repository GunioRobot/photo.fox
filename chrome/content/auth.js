photoFox.Auth = {
  login: function()
  {
    photoFox.Dao.parsePageForUserLoginAndKey();
    photoFox.Core.init();
  }, 
  
  logout: function()
  {
    photoFox.Options.set('info-uri', '');
    photoFox.Options.set('login', '');
    photoFox.Options.set('key', '');
    photoFox.Options.set('id', '');

    photoFox.Panel.print('Фото.сайт', 'Щелкните, чтобы настроить.');
  },

  isLoggedIn: function()
  {
    return ('' != photoFox.Options.get('login'));
  },
  
};
