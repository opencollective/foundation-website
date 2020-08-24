$(document).ready(function(){
  function accordionHandler () {
    $(this).find("button[js-toggle='icon']").toggleClass('active')
    $(this).find("div[js-data='faqAnswer']").slideToggle()
  }

  const faqPanels = $("div[js-toggle='question']");
  faqPanels.each((_index, panel) => panel.addEventListener('click', accordionHandler))
});
