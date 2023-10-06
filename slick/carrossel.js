
$('.add-remove').slick({
    slidesToShow: 3,
    slidesToScroll: 3
  });
  $('.js-add-slide').on('click', function() {
    slideIndex++;
    $('.add-remove').slick('slickAdd','<div><h3>' + slideIndex + '</h3></div>');
  });
  
  $('.js-remove-slide').on('click', function() {
    $('.add-remove').slick('slickRemove',slideIndex - 1);
    if (slideIndex !== 0){
      slideIndex--;
    }
  });
      