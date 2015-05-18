
$(document).ready(function(){
    $('#landingpage').css('height', getViewportHeight());
    $('.links').css('color','white');
    $('.navbar-collapse').addClass('off');
});


$('#selectBtn').on('click', function (){
    window.location.href = "http://leancamp.us1.list-manage2.com/subscribe?u=85c6ba2a410b1e10aefd30ebc&id=f0e722643f&MERGE2=".$('#selector').find(":selected").text();
});

$('#imprint').on('click', function () {
    hideAllModal();
    $('.modalImprint').removeClass('hidden');
    $('#myModal').modal('show');
});

$('#privacy').on('click', function () {
    hideAllModal();
    $('.modalPrivacy').removeClass('hidden');
    $('#myModal').modal('show');
});


/* ==============================================
    Functions
 =============================================== */

function getViewportHeight(){
    return $(window).height();
}


   /* ==============================================
  	Testimonial Slider
  	=============================================== */

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = 50;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
            $('.navbar-collapse').removeClass('off');
            $('.links').css('color','#393939');
            $('.logo').css('width','120px');
        } else {
            $('.navbar-collapse').addClass('off');
            $('.navbar-default').removeClass('on');
            $('.links').css('color','white');

        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });

$('#contactBtn').on('click', function () {
    if($('#lName').val().trim() !== ''){
        if($('#lEmail').val().trim() !== ''){
            if(validateEmail($('#lEmail').val().trim())){
                if($('#lSubject').val().trim() !== ''){
                    if($('#lMessage').val().trim() !==''){
                        sendEmail();
                    } else {
                        setWarning('lMessage');
                    }
                } else {
                    setWarning('lSubject');
                }
            } else {
                setWarning('lEmail');
            }
        } else {
            setWarning('lEmail');
        }
    } else {
        setWarning('lName');
    }
});

$('.form-control').focus(function(){
    resetWarning(this.id);
});

function resetWarning(id){
    var idnr = '#'+id;
    $(idnr).css('border','1px #ccc solid');
    $('.warning').text('');
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function sendEmail(){
    var msg = $('#contactForm').serialize();

    $.post( 'contact.php',msg, function( data ) {
        alert('bla');
        if(data == '1'){
            hideAllModal();
            $('.modalSuccess').html('<span style="text-align: center"><h3>Yay! We received your mail!</h3><p>We will contact you as soon as possible</p><p>Talk to you later!</p><br><p>Your Leancamp Team</p></span>');
            $('.modalSuccess').removeClass('hidden');
            $('#myModal').modal('show');
            $('#lNname').val('');
            $('#lSubject').val('');
            $('#lEmail').val('');
            $('#lMessage').val('');
        } else if (data == '0'){
            hideAllModal();
            $('.modalSuccess').html('<span style="text-align: center"><h3>Unfortunately there are some bugs. Please try again later!</h3></span>');
            $('.modalSuccess').removeClass('hidden');
            $('#myModal').modal('show');
        }
    });

}

function hideAllModal(){
    $('.modalImprint').addClass('hidden');
    $('.modalPrivacy').addClass('hidden');
    $('.modalSuccess').addClass('hidden');
}

function setWarning(id){
    var idnr = '#'+id;
    $(idnr).css('border','2px red solid');

    if(id == 'lName'){
        $('.warning').html('Whats your name?');
    } else if(id == 'lEmail'){
        $('.warning').html('Did you forget to put your right E-Mail address in?');
    } else if(id == 'lSubject'){
        $('.warning').html('Tell us why you write us');
    } else if (id == 'lMessage'){
        $('.warning').html('Write us a message! :-)');
    }
}
