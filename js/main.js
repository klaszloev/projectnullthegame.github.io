function scrollTo(id){
    var tag = $("a[name='"+ id +"']");
    $('html,body').animate({scrollTop: tag.offset().top}, 'slow');
}

$('#goto_up, #navmenu_goto_up').click(function() { $('html, body').animate({ scrollTop: 0 }, 500); });
$("#goto_pictures, #navmenu_goto_pictures").click(function() { scrollTo('section_pictures'); });
$(".goto_contact").click(function() { scrollTo('section_contact'); });
