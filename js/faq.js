$(document).ready(function(){
  let activeModalContent = '';

  function accordionHandler () {
    $(this).find("button[js-toggle='icon']").toggleClass('active')
    $(this).find("div[js-data='faqAnswer']").slideToggle()
  }

  const faqPanels = $("div[js-toggle='question']");
  faqPanels.each((_index, panel) => panel.addEventListener('click', accordionHandler))

  $("button[js-event='contactUs']").click(function () {
    $("div[js-view='modalOverlay']").show();
    $('body').css('overflow','hidden');
    $("div[js-view='contactUsModal']").slideDown();
    activeModalContent = 'contactUsModal';
  })
  
  $("button[js-event='applyToStart']").click(function () {
    $("div[js-view='modalOverlay']").show();
    $('body').css('overflow','hidden');
    activeModalContent = 'createYourInitiativeModal';
    $("div[js-view='createYourInitiativeModal']").slideDown();
  })

  $("button[js-event='closeModal']").click(function () {
    $(`div[js-view='${activeModalContent}']`).slideUp();
    $("div[js-view='modalOverlay']").hide();
    $('body').css('overflow','auto');
    activeModalContent = '';
  })
});
