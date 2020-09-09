$(document).ready(function(){
  let activeModalContent = '';

  // Mobile menu toggle
  $(".js-menuToggle").click(handleMobileMenuToggle);

  //Handle on scroll
  $(window).scroll(handleWindowScroll)

  // Accordion 
  const faqPanels = $("div[js-toggle='question']");
  faqPanels.each((_index, panel) => panel.addEventListener('click', accordionHandler))

  // Open contact us  modal
  $("button[js-event='contactUs']").click(handleOpenContactUsModal)
  
  // Open create initiative modal
  $("button[js-event='applyToStart']").click(handleCreateInitiativeModal)

  // Close modal
  $("button[js-event='closeModal']").click(handleCloseModal)

  // Handle contact us form submission
  $("form[js-event='contactUsForm']").submit(handleContactUsForm)

  // Handle contact us form submission
  $("form[js-event='createInitiativeForm']").submit(handleCreateInitiativeForm) 
  
  // Handle contact us form submission
  $("form[js-event='newsletterForm']").submit(handleNewsletterForm)

  function accordionHandler () {
    $(this).find("button[js-toggle='icon']").toggleClass('active')
    $(this).siblings("div[js-data='faqAnswer']").slideToggle('fast')
    $(this).toggleClass('removeQuestionWrapperBorder')
  }

  function handleOpenContactUsModal () {
    $("div[js-view='modalOverlay']").show();
    $('html').css('overflow','hidden');
    $("div[js-view='contactUsModal']").slideDown();
    activeModalContent = 'contactUsModal';
  }

  function handleCreateInitiativeModal () {
    $("div[js-view='modalOverlay']").show();
    $('html').css('overflow','hidden');
    activeModalContent = 'createYourInitiativeModal';
    $("div[js-view='createYourInitiativeModal']").slideDown();
  }

  function handleCloseModal () {
    $(`div[js-view='${activeModalContent}']`).slideUp();
    $("div[js-view='modalOverlay']").hide();
    $('html').css('overflow','auto');
    activeModalContent = '';
  }

  function handleMobileMenuToggle () {
    $(".mobileNavOverlay").toggle()
    
    $(".mobileNavWrapper").animate({
      width: 'toggle'
    })
  }

  function handleWindowScroll() {
    const scrollTop = $(document).scrollTop();
    if (scrollTop > 55) {
      $("header").addClass('fadeHeader')
      $("header").addClass('stickyHeader')
    } else {
      $("header").removeClass('fadeHeader')
      $("header").removeClass('stickyHeader')
    }

    $("section[js-view='mainSection']").each((_index, section) => {
      const domRect = $(section)[0].getBoundingClientRect();
      const id = $(section).attr('id');
      if (domRect.top <= 77 && domRect.bottom > 77) {
        $(`a[js-link='${id}']`).addClass('active')
      } else {
        $(`a[js-link='${id}']`).removeClass('active')
      }
    })
  }

  function handleContactUsForm (event) {
    event.preventDefault();
    const name = $(this).find("input[name='name']").val()
    const email = $(this).find("input[name='email']").val()
    const message = $(this).find("textarea[name='message']").val()

    if (!(name && email && message)) {
      alert('All fields required');
      return;
    }

    $(this).find(".sendButton").prop('disabled', true);
    const request = new Request(`/api/contact`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, email, message })
    })

    fetch(request).then(response => {
      $(this).find(".sendButton").prop('disabled', false);
      if (response.status === 200) {
        // Render the thank you Modal
        $("div[js-view='contactUsModal']").hide();
        activeModalContent = '';
        $(this).trigger("reset");
        $("div[js-view='thankYouModal']").show();
        activeModalContent = 'thankYouModal';
      } else {
        $(this).find('.modalFormErrorFeedback').text("An error occur while sending your message, please try again.")
        $(this).find('.modalFormErrorFeedback').css('display', 'block')
      }
    }).catch(error => {
      console.error(error);
    });
  }

  function handleCreateInitiativeForm (event) {
    event.preventDefault();
    const name = $(this).find("input[name='name']").val();
    const slug = $(this).find("input[name='slug']").val();
    const email = $(this).find("input[name='email']").val();
    const mission = $(this).find("textarea[name='mission']").val()

    if (!$(this).find("input[js-checkbox='termsOfService']").is(":checked")) {
      alert("Pleas check you agree to our Terms of service");
      return;
    }

    $(this).find(".sendButton").prop('disabled', true);
    const request = new Request(`/api/initiative`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, email, slug, mission })
    })

    fetch(request).then(response => {
      $(this).find(".sendButton").prop('disabled', false);
      if (response.status === 200) {
        // Render the thank you Modal
        $("div[js-view='createYourInitiativeModal']").hide();
        activeModalContent = '';
        $(this).trigger("reset");
        $("div[js-view='thankYouModal']").show();
        activeModalContent = 'thankYouModal';
      } else {
        $(this).find('.modalFormErrorFeedback').text("An error occur while creating your initiative, please try again.")
        $(this).find('.modalFormErrorFeedback').css('display', 'block')
      }
    }).catch(error => {
      console.error(error);
    });
  }

  function handleNewsletterForm (event) {
    event.preventDefault();
    const email = $(this).find("input[name='email']").val();
    $(this).find(".subscribeButton").prop('disabled', true);
    const request = new Request(`/api/newsletter`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email })
    });

    fetch(request).then(response => {
      if (response.status === 200) {
        $(this).find('.subscriptionFeedback').text("Successful! Thank you for subscribing.")
        $(this).find('.subscriptionFeedback').addClass('success')
        $(this).find(".subscribeButton").prop('disabled', false);
        $(this).trigger("reset");
        setTimeout(() => $(this).find('.subscriptionFeedback').removeClass('success'), 2000)
      } else {
        $(this).find('.subscriptionFeedback').text("An error occur while subscribing, please try again.")
        $(this).find('.subscriptionFeedback').addClass('error')
        $(this).find(".subscribeButton").prop('disabled', false);
      }
    }).catch(error => {
      console.error(error);
    });
  }
});

