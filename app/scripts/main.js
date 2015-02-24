'use strict';

var stickyNavTop = $('#home').height()*0.7;
$(window).scroll(function(){
  var scrollTop = $(window).scrollTop();
  if (scrollTop > stickyNavTop) {
    $('.header').addClass('sticky-header');
  } else {
    $('.header').removeClass('sticky-header');
  }
});

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
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
});

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

//set animation timing
var animationDelay = 2500;
//loading bar effect
var barAnimationDelay = 3800;
var barWaiting = barAnimationDelay - 3000; //3000 is the duration of the transition on the loading bar - set in the scss/css file

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


