
function scrollTo(id){
    var tag = $("a[name='"+ id +"']");
    $('html,body').animate({scrollTop: tag.offset().top}, 'slow');
}

$('#goto_up, #navmenu_goto_up').click(function() { $('html, body').animate({ scrollTop: 0 }, 500); });
$("#goto_pictures, #navmenu_goto_pictures").click(function() { scrollTo('section_pictures'); });
$(".goto_contact").click(function() { scrollTo('section_contact'); });

$(document).ready(function() {
    var $window = $(window);

    function checkWidth() {
        $("div[class^='ref']").each(function(i) {
        if ($(this).attr('class').length == 4) {
            $(this).children().hide();

            $(this).mouseenter(function() {
                $(this).children().fadeIn().css("display", "table");
            }).mouseleave(function() {
                $(this).children().fadeOut();
            });
        }
        });   
    }

    checkWidth();
    $(window).resize(checkWidth);
});

function throttle(func, timeFrame) {
    var lastTime = 0;
    return function(...args) {
        var now = new Date().getTime();
        if (now - lastTime >= timeFrame) {
            func(...args);
            lastTime = now;
        }
    };
}

// get the theme color on load so we can revert to this
const ogColor = document.querySelector('meta[name="theme-color"]')?.getAttribute('content');
// find all tags that have `data-scroll as a property`
const targets = document.querySelectorAll('[data-scroll-theme]')

// handle scroll event
const handleScroll = throttle(() => {
    // are any targets at the top of the window?
    const isTop = Array.from(targets).map((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.y > 1) return null;
        return { target, rect }
    }).filter(Boolean).sort((a, b) => b.rect.y - a.rect.y)[0]
    // if we found an element at the top of the document then
    if (isTop) {
        // set theme color meta tag to the background color of div
        const color = window.getComputedStyle(isTop.target).getPropertyValue('background-color')
        if (color) {
            // find the theme color meta tag and set the attribute to it
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
        }
    } else if (ogColor) {
        // set theme color meta tag to original
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ogColor);
    }
    // run every 10ms
}, 10)

document.addEventListener('scroll', handleScroll, { passive: true })
