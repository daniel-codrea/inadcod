'use strict';

var stickyNavTop = $('#home').height()*0.7;
$(window).scroll(function(){
  var scrollTop = $(window).scrollTop();
  if (scrollTop > stickyNavTop) {
    $('.header').addClass('sticky-header');
  } else {
    $('.header').removeClass('sticky-header');
  }
  if (scrollTop === 0) {
    $('.nav li').removeClass('active');
  }
});

var currentDate = new Date();
$('#currentYear').html((currentDate).getFullYear());

$(function() {
    $('a[href*=#]:not([href=#], .noJumpLink)').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                return false;
            }
        }
    });
  $('.nav a').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).parent().addClass('active');
  });
});

//set animation timing
var animationDelay = 2500,
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000; 

function switchWord($oldWord, $newWord) {
  $oldWord.removeClass('is-visible').addClass('is-hidden');
  $newWord.removeClass('is-hidden').addClass('is-visible');
}

function takeNext($word) {
  return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function hideWord($word) {
  var nextWord = takeNext($word);
  $word.parents('.cd-words-wrapper').removeClass('is-loading');
  switchWord($word, nextWord);
  setTimeout(function(){ hideWord(nextWord); }, barAnimationDelay);
  setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading'); }, barWaiting);
}

function animateHeadline($headlines) {
  var duration = animationDelay;
  $headlines.each(function(){
    var headline = $(this);
    duration = barAnimationDelay;
    setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading'); }, barWaiting);

    //trigger animation
    setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ); }, duration);
  });
}

function initHeadline() {
  //initialise headline animation
  animateHeadline($('.cd-headline'));
}

initHeadline();

$('#myCarousel').carousel({
  interval:   4000
});

// validate contact form
$(function() {
    $('#contactForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'come on, you have a name don\'t you?',
                minlength: 'your name must consist of at least 2 characters'
            },
            email: {
                required: 'no email, no message'
            },
            message: {
                required: 'um...yea, you have to write something to send this form.',
                minlength: 'thats all? really?'
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:'POST',
                data: $(form).serialize(),
                url:'../send_mail.php',
                success: function() {
                    $('#contactForm :input').attr('disabled', 'disabled');
                    $('#contactForm').fadeTo( 'slow', 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contactForm').fadeTo( 'slow', 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
});

