window.addEventListener('load',function(){
    var glider = new Glider(document.getElementById('glider-add'), {
      slidesToShow: 3,
      duration: .6,
      dots: '#add-dots',
      arrows: {
        prev: '#glider-prev-add',
        next: '#glider-next-add'
      }
    });
    
    document.getElementById('addSlide').addEventListener('click',function(){
      var ele = document.getElementById('add').cloneNode(true);
      ele.id = '';
      ele.querySelector('h1').textContent = glider.slides.length + 1;
      glider.addItem(ele);
      try{
        ga('send','event','Add/Remove Item', 'Add')
      } catch(ex){}
    });

    document.getElementById('removeSlide').addEventListener('click',function(){
      glider.removeItem(glider.slides.length - 1);
      try{
        ga('send','event','Add/Remove Item', 'Remove')
      } catch(ex){}
    });
  })
