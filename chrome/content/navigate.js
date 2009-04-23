photoFox.Navigate = {
		
  getElByPath: function(xpath)
  {
	return content.document.evaluate(
      xpath,
	  content.document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  },
  
  onClick: function(event) {
	  
	if(!event.ctrlKey)
	  return;
	  
	if(-1 == content.document.location.href.search(/photosight.ru/))
      return;
	
    var link = null;
	switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
	{
      case 0x25:
        link = photoFox.Navigate.getElByPath("//div[@class='pager']/a[@class='prev']");
        break;
	  case 0x27:
		link = photoFox.Navigate.getElByPath("//div[@class='pager']/a[@class='next']");
        break;
      case 0x26:
		link = photoFox.Navigate.getElByPath("//div[@class='pager']/a[@class='first']");
		break;
	  case 0x28:
		link = photoFox.Navigate.getElByPath("//div[@class='pager']/a[@class='last']");
		break;
	}
	
	if(link && link.href)
      content.document.location.href = link.href;
  }			
}