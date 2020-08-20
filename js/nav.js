$(document).ready(function(){
  $(".js-menuToggle").click(function(){
    $(".mobileNavOverlay").toggle()
    
    $(".mobileNavWrapper").animate({
      width: 'toggle'
    })
  });
});