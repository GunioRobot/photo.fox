photoFox.Options = {
  
  getPath :function()
  {
    return Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("extensions.photo.fox.");
  },

  set: function(name, value)
  {
    return this.getPath().setCharPref(name, value);
  },
  
  get: function(name)
  {
    return this.getPath().getCharPref(name);
  },
  
};
