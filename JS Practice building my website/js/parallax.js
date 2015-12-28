$(document).ready(function(){
    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        });
    });

    $('#home .btn' ).click(function() {
        scroll_to('#about');
    });


    $('#about .btn' ).click(function() {
        scroll_to('#home');
    });

    function scroll_to(div){
        $('html, body').animate({
            scrollTop: $(div).offset().top
        },1000);
    }

});
