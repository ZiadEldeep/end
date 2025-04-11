// var swiper = new Swiper('.swiper', {
//   spaceBetween: 30,
//   slidesPerView: 5,
//   autoplay: {
//     delay: 0,
//   },
//   loop: true,
//   speed: 2000,
//   freeMode: true,
// });
// var swiperr = new Swiper('.swiperr', {
//   spaceBetween: 30,
//   slidesPerView: 5,
//   autoplay: {
//     delay: 0,
//     reverseDirection: true
//   },
//   loop: true,
//   speed: 2000,
//   freeMode: true,
// });

// var mySwiper = document.querySelector('.swiper').swiper;

// $('.swiper').on('mouseenter', function(e){
//   mySwiper.autoplay.stop();
// });
// $('.swiper').on('mouseleave', function(e){
//   mySwiper.autoplay.start()
// });

// $('.swiperr').on('mouseenter', function(e){
//   swiperr.autoplay.stop();
// });
// $('.swiperr').on('mouseleave', function(e){
//   swiperr.autoplay.start()
// });
document.addEventListener('DOMContentLoaded', function() {
    var smreBtnWrapper = document.querySelector('.smre-btn-wrapper');
    var smreBtn = document.querySelector('.smre-btn');
    var threeBody = document.querySelector('.three-body');

    smreBtnWrapper?.addEventListener('click', function() {
      smreBtn.style.display = 'none';
      threeBody.style.display = 'inline-block';
      smreBtnWrapper.style.cursor ='not-allowed';
      smreBtnWrapper.style.opacity ='.8';

      $.ajax({
        url: HomeURL + '/AjaxCenter/LoadmoreBlog',
        dataType: 'json',
        data: {
            page: $('#loadmore-blog-posts').attr("data-paged"),
            perpage: $('#loadmore-blog-posts').attr("data-number"),
        },
        type: 'POST',
        success: function(msg) {
            smreBtn.style.display = 'inline-block';
            threeBody.style.display = 'none';
            smreBtnWrapper.style.cursor ='pointer';
            smreBtnWrapper.style.opacity ='1';
            if(msg.notfound != undefined){
                $('#loadmore-blog-posts').remove();
            }
            $('#blogposts-loader-container').append(msg.output);
            $('#loadmore-blog-posts').attr("data-paged", msg.page);
        }
      });
    });

});

function _lazy_images() {
    if( $("[lazy-img]").length > 0 ) {
        $("[lazy-img]").each(function(index, el){
            if( ( $(window).scrollTop() + $(window).height() + 600 ) > $(el).offset().top && $(el).offset().top > 0 ) {
                $(el).attr("lazy-img-recieved", $(el).attr('lazy-img'));
                $(el).removeAttr("lazy-img");

                var tmpImg = new Image() ;
                tmpImg.onload = function(){
                    $(el).attr("src", $(el).attr("lazy-img-recieved")).fadeOut(0);
                    setTimeout(function(){
                        $(el).attr("src", $(el).attr("lazy-img-recieved")).fadeIn(100);
                        $(el).removeAttr("lazy-img");
                    }, 100);
                };
                tmpImg.src = $(el).attr("lazy-img-recieved");
            }
        });
    }
}
_lazy_images();

$(window).on("load", function(){
    $("body").addClass('-loaded');
});

$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });




$('#short-mode').change(function() {
    if ($(this).is(":checked")) {
        $('.text-wrapper-blog').addClass('text-wrapper-off');
        $('.text-wrapper-blog-short').removeClass('text-wrapper-off');
    } else {
        $('.text-wrapper-blog-short').addClass('text-wrapper-off');
        $('.text-wrapper-blog').removeClass('text-wrapper-off');
    }
});




var validationInputs = document.querySelectorAll(".validation-input");
var validationSubmitBtn = document.querySelector(".validation-submit-btn");

validationInputs.forEach(function(input) {
    input.addEventListener('input', function() {
        var isFormValid = true;
        validationInputs.forEach(function(v) {
            if (!v.value) {
                isFormValid = false;
            }
        })
        if (isFormValid) {
            validationSubmitBtn.removeAttribute('disabled')
        } else {
            validationSubmitBtn.setAttribute('disabled')
        }
    })
})

$(function() {
    var lastScrollTop = 0,
        delta = 15;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
            // downscroll code
            $("header").css("top", "-90px");


        } else {
            // upscroll code
            $("header").css("top", "0px");
        }
        lastScrollTop = st;
    });
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.6) {
        $(".clearSticky-left").addClass("offSticky-left");
    } else {
        $(".clearSticky-left").removeClass("offSticky-left");
    }
});




var className = "logo-inverted";
var scrollTrigger = 60;

window.onscroll = function() {
    // We add pageYOffset for compatibility with IE.
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        document.getElementsByTagName("header")[0].classList.add(className);
    } else {
        document.getElementsByTagName("header")[0].classList.remove(className);
    }
};

var className = "inverted";
var scrollTrigger = 60;

window.onscroll = function() {
    // We add pageYOffset for compatibility with IE.
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        document.getElementsByTagName("header")[0].classList.add(className);
    } else {
        document.getElementsByTagName("header")[0].classList.remove(className);
    }
};




const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-border')
        } else {
            entry.target.classList.remove('show-border')
        }
    });
});


const hiddenElements = document.querySelectorAll('.hidden-border');
hiddenElements.forEach((el) => observer.observe(el));

// ------------------------------- Border B NUM

const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('border-blue')
        }
    });
});


const hiddenElements4 = document.querySelectorAll('.border-temps');
hiddenElements4.forEach((el) => observer4.observe(el));


// -----------------------------------

// ------------------------------- Border NUM

const observer5 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('num-inside-p-showen')
        }
    });
});


const hiddenElements5 = document.querySelectorAll('.num-inside-p');
hiddenElements5.forEach((el) => observer5.observe(el));


// -----------------------------------


const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-border-one')
        }
    });
});


const hiddenElements1 = document.querySelectorAll('.hidden-border-one');
hiddenElements1.forEach((el) => observer1.observe(el));


const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-border-two')
        }
    });
});


const hiddenElements2 = document.querySelectorAll('.hidden-border-two');
hiddenElements2.forEach((el) => observer2.observe(el));


// main hidden show

const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-border-main')
        }
    });
});


const hiddenElements3 = document.querySelectorAll('.hidden-border-main');
hiddenElements3.forEach((el) => observer3.observe(el));

// main hidden show end

const swiperCheck = document.getElementsByClassName('swiper-pricing').length > 0;

if (swiperCheck) {
    var swiperPricing = new Swiper(".myswiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: true,
        breakpoints: {
            700: {
                slidesPerView: 3,
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
};



$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});

$("body").on("click", '.tabbed > [data-tab]', function() {
    $('.tabbed > [data-tab]').removeClass("active");
    $(this).addClass("active");

    $(".tab-container").removeClass('opened');
    $('.tab-container[data-tab="' + $(this).data("tab") + '"]').addClass('opened');
});

// Accordion //

$(document).ready(function() {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function() {
        $(this).removeClass('coll-back');
        if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp(300);
            $(this).removeClass('coll-back');
            $('.rmv-cls').removeClass('coll-back');
        }

        if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).removeClass('coll-back');
        } else {
            $(this).next(".accordion_body").slideDown(300);
            $(this).children(".plusminus").text('');
            $(this).toggleClass('coll-back');
            $(this).addClass('rmv-cls');
        }
    });
});



$(document).ready(function() {
    //toggle the component with class accordion_body
    $(".accordion_head_in").click(function() {
        $(this).removeClass('coll-back');
        if ($('.accordion_body_in').is(':visible')) {
            $(".accordion_body_in").slideUp(300);
            $(this).removeClass('coll-back');
            $('.rmv-cls').removeClass('coll-back');
        }

        if ($(this).next(".accordion_body_in").is(':visible')) {
            $(this).next(".accordion_body_in").slideUp(300);
            $(this).removeClass('coll-back');
        } else {
            $(this).next(".accordion_body_in").slideDown(300);
            $(this).children(".plusminus").text('');
            $(this).toggleClass('coll-back');
            $(this).addClass('rmv-cls');
        }
    });
});



const lock = document.querySelector(".fa-lock");
const lockopen = document.querySelector(".fa-lock-open");
const passwordField = document.querySelector("input[type=password]");

if (lock) {
    lock.addEventListener("click", () => {
        lock.style.display = "none";
        lockopen.style.display = "block";

        passwordField.type = "text";
    });

    lockopen.addEventListener("click", () => {
        lockopen.style.display = "none";
        lock.style.display = "block";

        passwordField.type = "password";
    });
};



/* Generate Password */

let pass = document.getElementById("password");
let btn = document.getElementById("generate-btn");

function generatePass() {
    let chars =
        "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}?><";
    let passLength = 20;
    let password = "";

    for (let i = 0; i < passLength; i++)
        password += chars[Math.floor(Math.random() * chars.length)];

    return password;
}
if (btn) {
    btn.addEventListener("click", () => {
        pass.value = generatePass();
    });
};


// tab container //




// Range Slider
    var arbitraryValuesSlider = document.getElementById('values-slider');
    if (arbitraryValuesSlider) {
        var arbitraryValuesForSlider = team_seats_labels;

        var format = {
            to: function(value) {
                return arbitraryValuesForSlider[Math.round(value)];
            },
            from: function(value) {
                return arbitraryValuesForSlider.indexOf(value);
            }
        };

        var slider = noUiSlider.create(arbitraryValuesSlider, {
            // start values are parsed by 'format'
            start: ['1GB'],
            connect: [true, false],
            range: {
                min: 0,
                max: arbitraryValuesForSlider.length - 1
            },
            step: 1,
            tooltips: true,
            format: format,
        });

        arbitraryValuesSlider.noUiSlider.on('change', function(value) {
            var usersCount = value[0];
            $('.price-sec-container>ul>li[data-item]').each(function(index, price){
                var ItemEL = $(price);
                var ItemID = ItemEL.data("item");
                if( team_seats_data[usersCount][ItemID] != undefined ) {
                    var Data = team_seats_data[usersCount][ItemID];
                    if( ItemEL.find('.-dollar-sign').length > 0 ) {
                        ItemEL.find('.price-num .package-2-price-yearly').text( Data.seats_price_usd );
                    }else {
                        ItemEL.find('.price-num .package-2-price-yearly').text( Data.seats_price_egp );
                    }
                    ItemEL.find('a.OrderNow').attr( "href", Data.seats_payproglobal );
                    ItemEL.find('.-numofwords-unit > p').text( Data.seats_words );
                }
            });
        });

    };
// Range Slider End


// # Katteb Localization
function k__loc(text) {
    var return_text = text;
    $.each(footer_texts, function(index, el) {
        if (text == el.from) {
            return_text = el.to;
        }
    });
    return return_text;
}

// # Pad Number
function str_pad(str, max) {
    str = str.toString();
    return str.length < max ? str_pad("0" + str, max) : str;
}

function _katteb_initialize() {
    if( $(".-katteb-unlimited-deal > .-katteb-unlimited-deal-body > .-katteb-unlimited-deal-body-plans").data('initiated') != 'yes' ) {
        $(".-katteb-unlimited-deal > .-katteb-unlimited-deal-body > .-katteb-unlimited-deal-body-plans > .-katteb-unlimited-deal-body-plans-item.-selected").trigger("click");
        $(".-katteb-unlimited-deal > .-katteb-unlimited-deal-body > .-katteb-unlimited-deal-body-plans").data('initiated', 'yes');
    }

    if( $('[selectkit-ui]').length > 0 ) {
    	$('[selectkit-ui]').selectpicker();
    }
    
    // # Team Seats
    // # Team Seats Scroll
    var arbitraryValuesSlider = document.getElementById('values-slider');
    if (arbitraryValuesSlider && $('#values-slider').length > 0 && $('#values-slider.noUi-target').length == 0) {
        var arbitraryValuesForSlider = team_seats_labels;

        var format = {
            to: function(value) {
                return arbitraryValuesForSlider[Math.round(value)];
            },
            from: function(value) {
                return arbitraryValuesForSlider.indexOf(value);
            }
        };

        var slider = noUiSlider.create(arbitraryValuesSlider, {
            // start values are parsed by 'format'
            start: ['1GB'],
            connect: [true, false],
            range: {
                min: 0,
                max: arbitraryValuesForSlider.length - 1
            },
            step: 1,
            tooltips: true,
            format: format,
        });

        arbitraryValuesSlider.noUiSlider.on('change', function(value) {
            var usersCount = value[0];
            $('userpayments-items > priceitem[data-item-id]').each(function(index, price){
                var ItemEL = $(price);
                var ItemID = ItemEL.data("item-id");
                if( team_seats_data[usersCount][ItemID] != undefined ) {
                    $('.-subscripe-payment-methods').html('');
                    $('userpayments-items > priceitem.checked').removeClass('checked');

                    var Data = team_seats_data[usersCount][ItemID];
                    if( ItemEL.hasClass('dollar-price') ) {
                        ItemEL.find('price-element-val').text( Data.seats_price_usd );
                    }else {
                        ItemEL.find('price-element-val').text( Data.seats_price_egp );
                    }

                    var ItemURL = ItemEL.attr('data-context').replace('PAYPROURL', Data.seats_payproglobal);
                    ItemEL.data( "item", ItemURL );
                    ItemEL.attr( "data-item", ItemURL );
                    ItemEL.find('priceitem-inner > strong').text( Data.seats_words_singular );
                }
            });
        });

    };

    // # Team Seats Handlers Staff
    // # Scroll Handlers
    $('.-group-team-container > .-group-team-container-form > .-group-team-container-form-scrolled').unbind("scroll");
    var LastScrollposition = 0;
    $('.-group-team-container > .-group-team-container-form > .-group-team-container-form-scrolled').on("scroll", function(){
        var st = $(this).scrollTop();
        if( st > LastScrollposition ) {
            $('.-group-team-container-form-overlay').addClass('-invisible');
        }else {
            $('.-group-team-container-form-overlay').removeClass('-invisible');
        }
        LastScrollposition = st;
    });

    // # Features Animation
    if( $('.-group-team-container > .-group-team-container-features').not('.-start').length > 0 ) {
        setTimeout(function(){
            $('.-group-team-container > .-group-team-container-features').addClass('-start');
        }, 200);
    }

    // # Willclick
    if( $('[willclick]').length > 0 && $('.-instant-form-popup').length == 0 ) {
        $('[willclick]').trigger('click');
        $('[willclick]').removeAttr('willclick');
    }

    // # Autoclick
    if( $('[autoclick]').length > 0 ) {
        $('[autoclick]').trigger('click');
        $('[autoclick]').removeAttr('autoclick');
    }

    if( $('generate-phase-root-body-tab').length > 0 ) {
        _fields_interaction( $('generate-phase-root-body-tab').closest('.-templatefields-form-root') );
    }

    // # Scroll to end
    if( $('ul.-chat-container-messages > li:last-child').length > 0 && $('ul.-chat-container-messages').attr("scrolled") != 'yes' ) {
    $('ul.-chat-container-messages').attr("scrolled", 'yes');
    document.querySelector('ul.-chat-container-messages > li:last-child').scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
    }

    // # Countdowns
    var x = [];
    $('[countdown]').not('.-triggered').each(function(index, countdown__elem){
        $(countdown__elem).addClass('-triggered');
        var countDownDate = new Date($(countdown__elem).data("time")).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var CountdownItem = '<div class="Hours" data-tooltip="' + k__loc('Hours') + '">';
            CountdownItem += '<strong>'+str_pad(hours, 2)+'</strong>';
        CountdownItem += '</div>';
        CountdownItem += '<span>:</span>';
        CountdownItem += '<div class="Minutes" data-tooltip="' + k__loc('Minutes') + '">';
            CountdownItem += '<strong>'+str_pad(minutes, 2)+'</strong>';
        CountdownItem += '</div>';
        CountdownItem += '<span>:</span>';
        CountdownItem += '<div class="Seconds" data-tooltip="' + k__loc('Seconds') + '">';
            CountdownItem += '<strong>'+str_pad(seconds, 2)+'</strong>';
        CountdownItem += '</div>';
        $(countdown__elem).html(CountdownItem);

        if (distance < 0) {
            clearInterval(x[index]);
            if( $(countdown__elem).closest('.-imagine-renewal-date').length > 0 ) {
                $(countdown__elem).closest('.-imagine-renewal-date').remove();
            }else {
                $(countdown__elem).remove();
            }
        }
        x[index] = setInterval(function() {
            var countDownDate = new Date($(countdown__elem).data("time")).getTime();
            var now = new Date().getTime();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var CountdownItem = '<div class="Hours"'+((hours > 0) ? '' : ' ended')+' data-tooltip="' + k__loc('Hours') + '">';
                CountdownItem += '<strong>'+str_pad(hours, 2)+'</strong>';
            CountdownItem += '</div>';
            CountdownItem += '<span>:</span>';
            CountdownItem += '<div class="Minutes" data-tooltip="' + k__loc('Minutes') + '">';
                CountdownItem += '<strong>'+str_pad(minutes, 2)+'</strong>';
            CountdownItem += '</div>';
            CountdownItem += '<span>:</span>';
            CountdownItem += '<div class="Seconds" data-tooltip="' + k__loc('Seconds') + '">';
                CountdownItem += '<strong>'+str_pad(seconds, 2)+'</strong>';
            CountdownItem += '</div>';
            $(countdown__elem).html(CountdownItem);

            if (distance < 0) {
                clearInterval(x[index]);
                if( $(countdown__elem).closest('.-imagine-renewal-date').length > 0 ) {
                    $(countdown__elem).closest('.-imagine-renewal-date').remove();
                }else {
                    $(countdown__elem).remove();
                }
            }
        }, 1000);
    });

    // # Affiliate Last 30 days
    if( $('#affiliate-last30days .canvasjs-chart-container').length == 0 && $('#affiliate-last30days').length > 0 ) {
        $.ajax({
            url: HomeURL+'/AjaxCenter/AffiliateManagement/Last30days/',
            dataType: 'json',
            type: 'POST',
            data: {"user":Currentuser_ID, 'AC_APIKEY' : AC_APIKEY},
            success: function(msg) {
                var clicks = [];
                var commissions = [];
                $.each(msg.clicks, function(key, value){
                    clicks.push({label: value["label"], y:Number(value["y"])})
                });
                $.each(msg.commissions, function(key, value){
                    commissions.push({label: value["label"], y:Number(value["y"])})
                });

                Last30daysChart = new CanvasJS.Chart("affiliate-last30days", {
                    animationEnabled: true,
                    axisX: {
                        reversed: (CurrentDirection == 'rtl') ? true : false,
                    },
                    toolTip: {
                        shared: true,
                        reversed: true
                    },
                    legend: {
                        fontFamily: "Tajawal",
                        cursor: "pointer",
                        itemclick: function (e) {
                            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                e.dataSeries.visible = false;
                            } else {
                                e.dataSeries.visible = true;
                            }
                
                            e.chart.render();
                        },
                        verticalAlign: "top"
                    },
                    backgroundColor: "#ffffff",
                    axisY: {
                        labelFontSize: 20,
                        labelFontColor: "dimGrey",
                    },
                    exportEnabled: true,
                        zoomEnabled: true,
                        toolbar: {
                        itemBackgroundColor: "#d3d3d3", //Change it to "red"
                        itemBackgroundColorOnHover: "#3e3e3e",
                        buttonBorderColor: "#3e3e3e"
                    },
                    panEnabled: true,
                    data: [{
                        type: "column",
                        name: k__loc('النقرات'),
                        color: clicksColor,
                        showInLegend: "true",
                        dataPoints: clicks
                    }, {
                        type: "column",
                        name: k__loc('الاشتراكات'),
                        color: commissionsColor,
                        showInLegend: "true",
                        dataPoints: commissions
                    }]
                });

                Last30daysChart.render();
                
            }
        });
    }
    if( $('#affiliate-last30days-user .canvasjs-chart-container').length == 0 && $('#affiliate-last30days-user').length > 0 ) {
        $.ajax({
            url: HomeURL+'/AjaxCenter/AffiliateManagement/Last30days/',
            dataType: 'json',
            type: 'POST',
            data: {"user":Currentuser_ID, "u":$('#affiliate-last30days-user').attr("user"), 'AC_APIKEY' : AC_APIKEY},
            success: function(msg) {
                var clicks = [];
                var commissions = [];
                $.each(msg.clicks, function(key, value){
                    clicks.push({label: value["label"], y:Number(value["y"])})
                });
                $.each(msg.commissions, function(key, value){
                    commissions.push({label: value["label"], y:Number(value["y"])})
                });

                Last30daysChart = new CanvasJS.Chart("affiliate-last30days-user", {
                    animationEnabled: true,
                    axisX: {
                        reversed: (CurrentDirection == 'rtl') ? true : false,
                    },
                    toolTip: {
                        shared: true,
                        reversed: true
                    },
                    legend: {
                        fontFamily: "Tajawal",
                        cursor: "pointer",
                        itemclick: function (e) {
                            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                e.dataSeries.visible = false;
                            } else {
                                e.dataSeries.visible = true;
                            }
                
                            e.chart.render();
                        },
                        verticalAlign: "top"
                    },
                    backgroundColor: "#ffffff",
                    axisY: {
                        labelFontSize: 20,
                        labelFontColor: "dimGrey",
                    },
                    exportEnabled: true,
                        zoomEnabled: true,
                        toolbar: {
                        itemBackgroundColor: "#d3d3d3", //Change it to "red"
                        itemBackgroundColorOnHover: "#3e3e3e",
                        buttonBorderColor: "#3e3e3e"
                    },
                    panEnabled: true,
                    data: [{
                        type: "column",
                        name: k__loc('النقرات'),
                        color: clicksColor,
                        showInLegend: "true",
                        dataPoints: clicks
                    }, {
                        type: "column",
                        name: k__loc('الاشتراكات'),
                        color: commissionsColor,
                        showInLegend: "true",
                        dataPoints: commissions
                    }]
                });

                Last30daysChart.render();
                
            }
        });
    }

    // # Overview Chart
    if( $('#affiliate-overviewchart .canvasjs-chart-container').length == 0 && $('#affiliate-overviewchart').length > 0 ) {
        $.ajax({
            url: HomeURL+'/AjaxCenter/AffiliateManagement/OverviewChart/',
            dataType: 'json',
            type: 'POST',
            data: {"user":Currentuser_ID, 'AC_APIKEY' : AC_APIKEY, "u":$('#affiliate-overviewchart').data("user")},
            success: function(msg) {
                OverviewChart = new CanvasJS.Chart("affiliate-overviewchart", {
                    theme: "light2",
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: false,
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            {
                                y: msg.clicks,
                                label: k__loc('النقرات'),
                                color: clicksColor,
                            },
                            {
                                y: msg.commissions,
                                label: k__loc('الاشتراكات'),
                                color: commissionsColor,
                            },
                        ]
                    }]
                });
                OverviewChart.render();
                
            }
        });
    }
    if( $('#affiliate-overviewchart-user .canvasjs-chart-container').length == 0 && $('#affiliate-overviewchart-user').length > 0 ) {
        $.ajax({
            url: HomeURL+'/AjaxCenter/AffiliateManagement/OverviewChart/',
            dataType: 'json',
            type: 'POST',
            data: {"user":Currentuser_ID, 'AC_APIKEY' : AC_APIKEY, "u":$('#affiliate-overviewchart-user').attr("user")},
            success: function(msg) {
                OverviewChart = new CanvasJS.Chart("affiliate-overviewchart-user", {
                    theme: "light2",
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: false,
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            {
                                y: msg.clicks,
                                label: k__loc('النقرات'),
                                color: clicksColor,
                            },
                            {
                                y: msg.commissions,
                                label: k__loc('الاشتراكات'),
                                color: commissionsColor,
                            },
                        ]
                    }]
                });
                OverviewChart.render();
                
            }
        });
    }

    // # Sidebar
    if( $('form#-generate-form.-sidebar-opened .-dashboard-editor-aigenerate-sidebar').length > 0 ) {
        $('body').addClass("-sidebaris-visible");
    } else {
        $('body').removeClass("-sidebaris-visible");
    }

    // # Quick Generate Templates
    if( $('.-instant-form-popup .-templatefields-form-root > .-templatefields-form-footer > generate-button').length > 0 ) {
        _fields_interaction( $('.-instant-form-popup .-templatefields-form-root') );
    }

    // # Instant Popup Overflow Checker
    if( $('.-instant-form-popup > .-instant-form-popup-inner').outerHeight() >= ($(window).height() - 50) ) {
        $('.-instant-form-popup > .-instant-form-popup-inner').addClass('-overflow-init');
    }else {
        $('.-instant-form-popup > .-instant-form-popup-inner').removeClass('-overflow-init');
    }
    setTimeout(function(){
        if( $('.-instant-form-popup > .-instant-form-popup-inner').outerHeight() >= ($(window).height() - 50) ) {
            $('.-instant-form-popup > .-instant-form-popup-inner').addClass('-overflow-init');
        } else {
            $('.-instant-form-popup > .-instant-form-popup-inner').removeClass('-overflow-init');
        }
    }, 500);


    // # Powerups Tabs
    if( $('powerups-popup-tabs > ul > li.-selected').length == 0 && $('powerups-popup-tabsbody > powerups-popup-tabsbody-item.-selected').length == 0 ) {
        $('powerups-popup-tabs > ul > li:first-child').trigger("click");
    }

    // # Katteb Loader
    $('.-katteb-loader').addClass('-loaded');
    setTimeout(function(){
    $('.-katteb-loader').remove();
    }, 300);

    // # Body Scroll Behavior
    if( $('imagine-start-generating.-show').length > 0 || $('live-article-writer').length > 0 ) {
    $('body').addClass("-writing-article-live");
    }else {
    $('body').removeClass("-writing-article-live");
    }

    // # Websites Export
    // # Blogger
    if( window.location.hash.indexOf('&') > -1 ) {
        var access_token = window.location.hash.split('&')[1].split('=');
        if( '0' in access_token ) {
            access_token = access_token[0];
            var token = window.location.hash.split('&')[1].split('=')[1];
            
            // When document is ready check if there is a url with access token param
                if (access_token == 'access_token') {
                    if (localStorage.getItem('title').length > 0) {
                        _postToBlogger(token, localStorage.getItem("website-id"), localStorage.getItem("title"), localStorage.getItem("content"));

                        setTimeout(function(){
                            window.location.assign( localStorage.getItem('redirected') );
                        }, 1000);
                    }
                }
        }
    }

    // # WordPress RestAPI
    // # Status Trigger
    if( $('select#export-behavior').length > 0 ) {
        $('select#export-behavior').trigger('change');
    }

    // # Categories Parser
    $(".-categories-loader").each(function(index, element){
        if( $(element).find('svg').length > 0 && !$(element).hasClass("-parsing") ) {
            $(element).addClass("-parsing");
            $.ajax({
                url: $(element).data('restapi-url') + '?' + makeid(10),
                dataType: 'json',
                success: function(msg){
                    var Categories = '';
                    $.each(msg, function(index, item){
                        Categories += '<label checkboxkit for="category_' + index + '">';
                            Categories += '<input type="hidden" name="categories_list[' + item.name + ']" value="' + item.id + '" />';
                            Categories += '<input type="checkbox" id="category_' + index + '" name="categories[' + item.name + ']" value="' + item.id + '" />';
                            Categories += '<i class="fa fa-check"></i>';
                            Categories += '<span>' + item.name + '</span>';
                        Categories += '</label>';
                    });
                    $(element).html(Categories);
                },
                error: function() {
                    $(element).html('<div class="alert alert-danger"><i class="fa fa-times"></i> ' + k__loc("Sorry, Couldn't fetch categories.") + '</div>');
                }
            });
        }
    });
}

var onloadCallback = function() {
    grecaptcha.render('xrecaptcha', {
        'sitekey': '6LeaesQpAAAAAB31FosdXdTQaQMuzNiKBRJ8sQ-V',
        'size': 'invisible'
    });
};
// onloadCallback();

// Subject Line Generator Form Submission
_katteb_initialize();
var AIFolderURL = HomeURL.replace('/' + CurrentLanguage, '') + 'ai';
var SVGLoader = '<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform> </path> </svg>';

async function _live_article_credible_writer(isNew) {
  // Now that the DocumentID is ready, send the claims-credible request
  let correctionsData = $("form.-form-factual-writer button[type='submit']").data("corrections");
  let corrections = correctionsData ? JSON.parse(correctionsData) : [];
  
    try {
        const response = await $.ajax({
            url: AIFolderURL + "/factify/claims-credible.php",
            type: "POST",
            data:
                "content-from=" + $("#content").val() +
                "&isNew=" + isNew +
                "&CurrentLanguage=" + CurrentLanguage +
                "&user=" + Currentuser_ID +
                "&AC_APIKEY=" + AC_APIKEY +
                "&facts=" + JSON.stringify(corrections) +
                "&widget-enabled=true",
            dataType: "json"
        });

        // Handle the response from claims-credible.php
        if (response.error) {
            $.each(instant_popups, function (key, data) {
                if (
                key == response.error &&
                $('.-instant-form-popup[data-form="' + data.form + '"]')
                    .length == 0
                ) {
                var Popup =
                    '<div class="-instant-form-popup -loading -model-' +
                    data.model +
                    '" data-form="' +
                    data.form +
                    '">';
                Popup += '<div class="-instant-form-popup-inner">';
                Popup += '<div class="-instant-form-popup-container">';
                Popup += data.output;
                if (response.additionalHTML != undefined) {
                    if (
                    Popup.indexOf(
                        "<additional-elements></additional-elements>"
                    ) > -1
                    ) {
                    Popup = Popup.replace(
                        "<additional-elements></additional-elements>",
                        response.additionalHTML
                    );
                    } else {
                    Popup += response.additionalHTML;
                    }
                }
                Popup += "</div>";
                Popup += "</div>";
                Popup += "</div>";
                $(".-instant-form-popup").remove();
                $(".-katteb-outer").append(Popup);
                setTimeout(function () {
                    $(
                    '.-instant-form-popup[data-form="' + data.form + '"]'
                    ).addClass("-visible");
                    $('.-instant-form-popup[data-form="' + data.form + '"]')
                    .find(".-instant-form-popup-container")
                    .addClass("-show");
                }, 10);
                }
            });
        } else {
            $(".-factual-writer-section-container-editor > svg").remove();
            $("#content").val(response.contentTo);
            $(".-credible-factcheck-claims").removeClass('d-none');
            $("form.-form-factual-writer button[type='submit']").attr("disabled", false);
            $(".-factual-writer-progress").hide();
            $(".-form-factual-writer .-factual-writer-progress svg").remove();
            $("#content").removeAttr("readonly");
            $("#content").removeAttr("disabled");
        }
    } catch (error) {
        console.error("AJAX request failed:", error);
    }
}
var SitesLoadingMore = false;
$("body").on("submit", ".-instant-ajax-form", function () {
  var ThisForm = $(this);
  ThisForm.css("opacity", ".5").css("pointer-events", "none");
  AjaxRequest("instant-ajax-form", {
    url: HomeURL + "AjaxCenter/InstantForm",
    type: "POST",
    data:
      ThisForm.serialize() +
      "&submit=true&user=" +
      Currentuser_ID +
      "&location_href=" +
      location.href +
      "&form=" +
      $(this).data("form"),
    dataType: "json",
      success: function (msg) {
      if (msg.error != undefined) {
        $.each(instant_popups, function (key, data) {
          if (
            key == msg.error &&
            $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0
          ) {
            var Popup =
              '<div class="-instant-form-popup -loading -model-' +
              data.model +
              '" data-form="' +
              data.form +
              '">';
            Popup += '<div class="-instant-form-popup-inner">';
            Popup += '<div class="-instant-form-popup-container">';
            Popup += data.output;
            if (msg.additionalHTML != undefined) {
              if (
                Popup.indexOf("<additional-elements></additional-elements>") >
                -1
              ) {
                Popup = Popup.replace(
                  "<additional-elements></additional-elements>",
                  msg.additionalHTML
                );
              } else {
                Popup += msg.additionalHTML;
              }
            }
            Popup += "</div>";
            Popup += "</div>";
            Popup += "</div>";
            $(".-instant-form-popup").remove();
            $(".-katteb-outer").append(Popup);
            setTimeout(function () {
              $('.-instant-form-popup[data-form="' + data.form + '"]').addClass(
                "-visible"
              );
              $('.-instant-form-popup[data-form="' + data.form + '"]')
                .find(".-instant-form-popup-container")
                .addClass("-show");

              _katteb_initialize();
            }, 10);
          }
        });
      } else if (msg.success != undefined) {
        if (msg.behavior != undefined) {
          if (msg.behavior == "in-links-popover") {
            if ($(".-editor-flexible-widget").length > 0) {
              AjaxRequest("inlinking", {
                url: HomeURL + "AjaxCenter/InstantForm",
                type: "POST",
                data: {
                  user: Currentuser_ID,
                  form: "in-links/popover/" + Currentuser_ID,
                },
                dataType: "json",
                success: function (msg) {
                  ThisForm.closest(".-instant-form-popup").remove();

                  $(".-editor-flexible-widget").html(msg.output);
                  $(".-inlinking-popover-container-body-form > input")
                    .val($(".inlinking-replacement").text())
                    .focus();
                },
              });
            } else {
              ThisForm.closest(".-instant-form-popup").remove();
            }
          } else if (msg.behavior == "snippets") {
            if ($(".-snippets-container-notfound").length > 0) {
              var ItemForm = $(".-snippets-container-notfound").closest("form");

              $(".-katteb-root").append(
                '<a href="#" id="BackPopstateURL" class="-instant-form" model="3" form="' +
                  ItemForm.data("form") +
                  '" style="display:none;"></a>'
              );
              ItemForm.closest(".-instant-form-popup").remove();
              $("#BackPopstateURL").trigger("click");
            } else if ($(".-submit-chat-behavior").length > 0) {
              var ItemForm = $(".-submit-chat-behavior");

              $(".-katteb-root").append(
                '<a href="#" id="BackPopstateURL" class="-instant-form" model="3" form="' +
                  ItemForm.data("form") +
                  '" style="display:none;"></a>'
              );
              ItemForm.closest(".-instant-form-popup").remove();
              $("#BackPopstateURL").trigger("click");
            } else {
              ThisForm.closest(".-instant-form-popup").remove();
            }
          }
        } else if (msg.redirect_uri != undefined) {
            window.location.replace(msg.redirect_uri);
        } else {
          $("#BackPopstateURL").remove();
          if (msg.url != undefined) {
            if (msg.url == false) {
              ThisForm.closest(".-instant-form-popup").remove();
            } else {
              $(".-katteb-root").append(
                '<a href="' +
                  msg.url +
                  '" id="BackPopstateURL" style="display:none;"></a>'
              );
            }
          } else {
            $(".-katteb-root").append(
              '<a href="' +
                location.href +
                '" id="BackPopstateURL" style="display:none;"></a>'
            );
          }
          //
          $("#BackPopstateURL").trigger("click");
        }
      } else {
        ThisForm.css("opacity", "1").css("pointer-events", "inherit");
        ThisForm.closest(".-instant-form-popup")
          .find(".-instant-form-popup-inner")
          .animate({ scrollTop: 0 }, "smooth");
        ThisForm.closest(".-instant-form-popup")
          .find(".-instant-form-popup-container")
            .html(msg.output);
      }
      var popupSetupAutoKatteb = $(
        '.-instant-form-popup[data-form="bulk-articles/setup-auto-katteb/"] .-instant-form-popup-inner'
      );
      if (popupSetupAutoKatteb.length > 0) {        
        var popupSetupAutoKattebForm = $(
          '.-instant-ajax-form[data-form="bulk-articles/setup-auto-katteb/"]'
        );
        popupSetupAutoKatteb.on("scroll", function () {
          if (
            popupSetupAutoKatteb.scrollTop() + popupSetupAutoKatteb.height() >
            popupSetupAutoKattebForm.height()
          ) {
            if (SitesLoadingMore == false && $("#setup-auto-katteb-paged").length > 0) {
              $(".-editprofile-input-addmore").before(
                '<div class="-loadmore-row">' + SVGLoader + "</div>"
              );
              var paged = $("#setup-auto-katteb-paged").val();
              $("#setup-auto-katteb-paged").remove();
              SitesLoadingMore = true;
              AjaxRequest("instant-ajax-form", {
                url: HomeURL + "AjaxCenter/InstantForm",
                type: "POST",
                data:
                  "post_status=" + 
                  $("#setup-auto-katteb-status").val() +
                  "&paged=" + 
                  paged +
                  "&submit=true&user=" +
                  Currentuser_ID +
                  "&location_href=" +
                  location.href +
                  "&form=" +
                  $("#setup-auto-katteb-form").val(),
                dataType: "json",
                success: function (msg) {
                  $(".-editprofile-input-addmore").before(msg.output);
                  $(".-loadmore-row").remove();
                  SitesLoadingMore = false;
                },
              });
            }
          }
        });
      }
      
      if ($(".-connected-successfully").length > 0) {
        if (
          $('.-instant-form-popup[data-form*="websites/export/"]').length > 0
        ) {
          $(".-connected-successfully")
            .closest(".-instant-form-popup")
            .remove();
          $('.-instant-form-popup[data-form*="websites/export/"]').each(
            function (index, element) {
              AjaxRequest($(element).data("form"), {
                url: HomeURL + "AjaxCenter/InstantForm",
                type: "POST",
                data:
                  "user=" +
                  Currentuser_ID +
                  "&location_href=" +
                  location.href +
                  "&form=" +
                  $(element).data("form"),
                dataType: "json",
                success: function (msg) {
                  $(element)
                    .find(".-instant-form-popup-container")
                    .html(msg.output);
                },
              });
            }
          );
        }
      }
    },
  });
  return false;
});
$("body").on("submit", "form.-form-factual-writer", async function (e) {
    let fact = 0;
    let factPercentage;
    e.preventDefault();
    try {
        const claimsResponse = await AjaxRequestPromise("factify-claims", {
          url: AIFolderURL + "/factify/claims.php",
          type: "POST",
          data:
            "text=" +
            $("#content").val() +
            "&CurrentLanguage=" +
            CurrentLanguage +
            "&user=" +
            Currentuser_ID +
            "&AC_APIKEY=" +
            AC_APIKEY,
          dataType: "json",
        });
        if (claimsResponse.error) {
            claimsResponse.error = "no-quota" ? "no-quota-factual-writer" : claimsResponse.error;
            $.each(instant_popups, function (key, data) {
                if( key == claimsResponse.error && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
                    var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
                        Popup += '<div class="-instant-form-popup-inner">';
                            Popup += '<div class="-instant-form-popup-container">';
                                Popup += data.output;
                            Popup += '</div>';
                        Popup += '</div>';
                    Popup += '</div>';
                    $(".-instant-form-popup").remove();
                    if ($(".-katteb-outer").length == 0) {
                        $("body").append("<div class='-katteb-outer'></div>");
                    }
                    $(".-katteb-outer").append(Popup);
                    setTimeout(function() {
                        $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
                        $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
                        _katteb_initialize();
                        $(".btn-reset").click();
                    }, 10);
                }
            });
        } else { 
            $(".-credible-factcheck-claims").addClass('d-none');
            $(".-factual-writer-progress").show();
            $(".-form-factual-writer .-factual-writer-progress svg").remove();
            $(".-form-factual-writer .-factual-writer-progress .loader-overlay").append(SVGLoader);
            $("form.-form-factual-writer button[type='submit']").attr("disabled", true);
            $("#content").attr("readonly", "readonly");
            $("#content").attr("disabled", "disabled");
            $("form.-form-factual-writer button[type='submit']").data("corrections", "");

            $(".-credible-factcheck-claims .-claims-list").html('');
            claimsResponse.claims.forEach((claim, index) => {
              $(".-credible-factcheck-claims .-claims-list").append(`<li>
                <div class="-claim-item-content">
                  <p>${claim}</p>
                </div>
                <div class="-claim-item-tools">
                  <div class="-claim-item-results"></div>
                </div>
              </li>`);
            });
            for (let i = 0; i < claimsResponse.claims.length; i++) {
              const claimText = claimsResponse.claims[i];
              const ClaimItem = $(".-credible-factcheck-claims .-claims-list > li").eq(i);
              try {
                ClaimItem.find(".-claim-item-results").html(SVGLoader);
        
                const prepareResponse = await AjaxRequestPromise("factify-prepare", {
                  url: AIFolderURL + "/factify/prepare.php",
                  type: "POST",
                  data: {
                    text: claimText,
                    CurrentLanguage: CurrentLanguage,
                    user: Currentuser_ID,
                    AC_APIKEY: AC_APIKEY,
                  },
                  dataType: "json",
                });
        
                ClaimItem.data("query", prepareResponse.query);
                ClaimItem.data("results", prepareResponse.results);
        
                // Send request to "factify-query" using the response from "factify-prepare"
                const queryResponse = await AjaxRequestPromise("factify-query", {
                  url: AIFolderURL + "/factify/check.php",
                  type: "POST",
                  data: {
                    text: claimText,
                    query: prepareResponse.query,
                    results: prepareResponse.results,
                    CurrentLanguage: CurrentLanguage,
                    user: Currentuser_ID,
                    AC_APIKEY: AC_APIKEY,
                  },
                  dataType: "json",
                });
        
                if (queryResponse.statement == 'yes') {
                  fact++;
                } else if (queryResponse.statement == 'no') {
                  let corrections = $("form.-form-factual-writer button[type='submit']").data("corrections");
                  if (corrections) {
                    corrections = JSON.parse(corrections);
                  } else {
                    corrections = [];
                  }
                  if (Array.isArray(queryResponse.facts)) {
                    corrections = corrections.concat(queryResponse.facts);
                  }
                  $("form.-form-factual-writer button[type='submit']").data("corrections", JSON.stringify(corrections));
                }
                ClaimItem.find('.-claim-item-results').html(queryResponse.output);
                factPercentage = Math.round(((fact / claimsResponse.claims.length) * 100));
                if (factPercentage <= 50) {
                  circleColor = "red";
                } else if (factPercentage <= 70) {
                  circleColor = "orange";
                } else if (factPercentage <= 90) {
                  circleColor = "dark-green";
                } else {
                  circleColor = "light-green";
                }
                $(".-fact-score .fact-chart .circular-chart").removeClass("red orange dark-green light-green").addClass(circleColor);
                $(".-fact-score .fact-chart .circular-chart .circle").css("stroke-dasharray", `${factPercentage}, 100`);
                $(".-fact-score .fact-chart .circular-chart .percentage").html(`${factPercentage}%`);
                var Percentage = (((i+1 )/ claimsResponse.claims.length) * 100).toFixed(0);
                $(".-form-factual-writer .-factual-writer-progress .loader-overlay span").text(Percentage + "%");
              } catch (claimError) {
                console.error("Error processing claim:", claimError);
              }
            }
            _live_article_credible_writer("yes");
        }
    }  catch (error) {
        console.error("Error initiating claim processing:", error);
    }

    // grecaptcha.execute($("form.-form-factual-writer button[type='submit']").data("sitekey"), { action: 'submit' })
    // .then(function(token){
    // Serialize form data
    // var formData = form.serialize();

    // Append reCAPTCHA token to form data
        // formData += "&token=" + token;
        // formData += "&ui=" + Currentuser_ID;
        // formData += "&AC_APIKEY=" + AC_APIKEY;
        
        // $.ajax({
        //     url: AIFolderURL + '/subject-line-generator-ajax.php',
        //     type: "POST",
        //     data: formData,
        //     success: function (msg) {
        //         if (msg.error != undefined) {
        //             if (msg.error == "no-quota") {
        //                 $.each(instant_popups, function(key, data){
        //                     if( key == 'no-quota' && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
        //                         var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
        //                             Popup += '<div class="-instant-form-popup-inner">';
        //                                 Popup += '<div class="-instant-form-popup-container">';
        //                                     Popup += data.output;
        //                                 Popup += '</div>';
        //                             Popup += '</div>';
        //                         Popup += '</div>';
        //                         $(".-instant-form-popup").remove();
        //                         if ($(".-katteb-outer").length == 0) {
        //                             $("body").append("<div class='-katteb-outer'></div>");
        //                         }
        //                         $(".-katteb-outer").append(Popup);
        //                         setTimeout(function() {
        //                             $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
        //                             $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
        //                             _katteb_initialize();
        //                             $(".btn-reset").click();
        //                         }, 10);
        //                     }
        //                 });
        //             } else {
        //                 alert(msg.error);
        //             }
        //         } else {
        //             if ($(".-suggested-subject-lines-div").data("display-type") == "lines") {
        //                 var dataArr = (msg.output).split("\n");
        //                 var content = "<ul>";
        //                 dataArr.forEach(element => {
        //                     if (element != '') {
        //                         content += `<li><span data-copy>${element}</span><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button></li>`;
        //                     }
        //                 });
        //                 content += "</ul>";
        //             } else {
        //                 var content = `<div data-copy>${msg.output}</div><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button>`;
        //             }
        //             $(".-suggested-subject-lines-div").html(content);
        //         }
        //     },
        //     complete: function() {
        //         $("form.-form-subject-line-generator button[type='submit']").attr("disabled", false);
        //     }
        // });
    // });
});
$("body").on("submit", "form.-form-keyword-search", function(e){
    e.preventDefault();
    $(".-suggested-subject-lines-keyword-search").html(SVGLoader);
    $("form.-form-keyword-search button[type='submit']").attr("disabled", true);
    let form = $(this);

    grecaptcha.execute($("form.-form-keyword-search button[type='submit']").data("sitekey"), { action: 'submit' })
    .then(function(token){
    // Serialize form data
    var formData = form.serialize();

    // Append reCAPTCHA token to form data
        formData += "&token=" + token;
        formData += "&ui=" + Currentuser_ID;
        formData += "&AC_APIKEY=" + AC_APIKEY;
        
        $.ajax({
            url: AIFolderURL + '/keyword-search.php',
            type: "POST",
            data: formData,
            success: function (msg) {
                if (msg.error != undefined) {
                    if (msg.error == "no-quota") {
                        $.each(instant_popups, function(key, data){
                            if( key == 'no-quota' && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
                                var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
                                    Popup += '<div class="-instant-form-popup-inner">';
                                        Popup += '<div class="-instant-form-popup-container">';
                                            Popup += data.output;
                                        Popup += '</div>';
                                    Popup += '</div>';
                                Popup += '</div>';
                                $(".-instant-form-popup").remove();
                                if ($(".-katteb-outer").length == 0) {
                                    $("body").append("<div class='-katteb-outer'></div>");
                                }
                                $(".-katteb-outer").append(Popup);
                                setTimeout(function() {
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
                                    _katteb_initialize();
                                    $(".btn-reset").click();
                                }, 10);
                            }
                        });
                    } else {
                        alert(msg.error);
                    }
                } else {
                    var content = "<ul>";
                    content += `<li><span data-copy>${k__loc('Title') + ': ' + msg.title}</span><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button></li>`;
                    content += `<li><span data-copy>${k__loc('Description') + ': ' + msg.description}</span><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button></li>`;
                    content += "</ul>";
                    $(".-suggested-subject-lines-keyword-search").html(content);
                }
            },
            complete: function() {
                $("form.-form-keyword-search button[type='submit']").attr("disabled", false);
            }
        });
    });
});
document.querySelector('#input_text_1[type="file"]')?.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the first file
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            $(".file-upload-box").addClass("uploaded-image");
            $(".file-upload-input").attr("disabled", true);
            const span = document.createElement('span');
            span.classList.add("-close-image");
            span.innerHTML = '<i class="fa-solid fa-times"></i>';

            span.addEventListener('click', function () {
                $(".file-upload-box").removeClass("uploaded-image");
                $(".file-upload-box span").remove();
                $(".file-upload-box img").remove();
                $(".file-upload-input").removeAttr("disabled");
            });

            document.querySelector(".file-upload-box").appendChild(span);

            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add("image-preview");
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.alt = 'Preview';

            document.querySelector(".file-upload-box").appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});
$("body").on("submit", "form.-form-writing-tools-widget", function(e){
    e.preventDefault();
    $(".-writing-tools-widget-results-container").show();
    $(".-writing-tools-widget-results").html(SVGLoader);
    $("form.-form-writing-tools-widget button[type='submit']").attr("disabled", true);
    let form = $(this);

    grecaptcha.execute($("form.-form-writing-tools-widget button[type='submit']").data("sitekey"), { action: 'submit' })
    .then(function(token){
        var formData = new FormData();
        var serializedData = form.serialize(); 
        // Append serialized data to FormData
        serializedData.split('&').forEach(function(pair) {
            var [key, value] = pair.split('=');
            formData.append(decodeURIComponent(key), decodeURIComponent(value));
        });
        formData.append('token', token);
        formData.append('ui', Currentuser_ID);
        formData.append('AC_APIKEY', AC_APIKEY);
        // Append the file if it exists
        var fileInput = $("#input_text_1")[0];
        if (fileInput.type === 'file' && fileInput.files.length > 0) {
            formData.append('image', fileInput.files[0]);
        }
        $.ajax({
            url: AIFolderURL + '/writing-tools-ai.php',
            type: "POST",
            data: formData,
            processData: false,
            contentType: false, // Let the browser set the content type
            success: function (msg) {
                if (msg.error != undefined) {
                    if (msg.error == "no-quota") {
                        $.each(instant_popups, function(key, data){
                            if( key == 'no-quota' && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
                                var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
                                    Popup += '<div class="-instant-form-popup-inner">';
                                        Popup += '<div class="-instant-form-popup-container">';
                                            Popup += data.output;
                                        Popup += '</div>';
                                    Popup += '</div>';
                                Popup += '</div>';
                                $(".-instant-form-popup").remove();
                                if ($(".-katteb-outer").length == 0) {
                                    $("body").append("<div class='-katteb-outer'></div>");
                                }
                                $(".-katteb-outer").append(Popup);
                                setTimeout(function() {
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
                                    _katteb_initialize();
                                    $(".btn-reset").click();
                                }, 10);
                            }
                        });
                    } else {
                        alert(msg.error);
                    }
                } else {
                    $(".-writing-tools-widget-results").html(msg.output);
                }
            },
            complete: function() {
                $("form.-form-writing-tools-widget button[type='submit']").attr("disabled", false);
            }
        });
    });
});

$("body").on("submit", "form.-form-subject-line-generator", function(e){
    e.preventDefault();
    $(".-suggested-subject-lines-div").html(SVGLoader);
    $("form.-form-subject-line-generator button[type='submit']").attr("disabled", true);
    let form = $(this);

    grecaptcha.execute($("form.-form-subject-line-generator button[type='submit']").data("sitekey"), { action: 'submit' })
    .then(function(token){
    // Serialize form data
    var formData = form.serialize();

    // Append reCAPTCHA token to form data
        formData += "&token=" + token;
        formData += "&ui=" + Currentuser_ID;
        formData += "&AC_APIKEY=" + AC_APIKEY;
        
        $.ajax({
            url: AIFolderURL + '/subject-line-generator-ajax.php',
            type: "POST",
            data: formData,
            success: function (msg) {
                if (msg.error != undefined) {
                    if (msg.error == "no-quota") {
                        $.each(instant_popups, function(key, data){
                            if( key == 'no-quota' && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
                                var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
                                    Popup += '<div class="-instant-form-popup-inner">';
                                        Popup += '<div class="-instant-form-popup-container">';
                                            Popup += data.output;
                                        Popup += '</div>';
                                    Popup += '</div>';
                                Popup += '</div>';
                                $(".-instant-form-popup").remove();
                                if ($(".-katteb-outer").length == 0) {
                                    $("body").append("<div class='-katteb-outer'></div>");
                                }
                                $(".-katteb-outer").append(Popup);
                                setTimeout(function() {
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
                                    $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
                                    _katteb_initialize();
                                    $(".btn-reset").click();
                                }, 10);
                            }
                        });
                    } else {
                        alert(msg.error);
                    }
                } else {
                    if ($(".-suggested-subject-lines-div").data("display-type") == "lines") {
                        var dataArr = (msg.output).split("\n");
                        var content = "<ul>";
                        dataArr.forEach(element => {
                            if (element != '') {
                                content += `<li><span data-copy>${element}</span><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button></li>`;
                            }
                        });
                        content += "</ul>";
                    } else {
                        var content = `<div data-copy>${msg.output}</div><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button>`;
                    }
                    $(".-suggested-subject-lines-div").html(content);
                }
            },
            complete: function() {
                $("form.-form-subject-line-generator button[type='submit']").attr("disabled", false);
            }
        });
    });
});

$("body").on("submit", "form.-ai-assistant-box", function(e){
    e.preventDefault();
    if( $("form.-ai-assistant-box button[type='submit']").data('original') == undefined || $("form.-ai-assistant-box button[type='submit']").data('original') == '' ) {
        $("form.-ai-assistant-box button[type='submit']").data('original', $("form.-ai-assistant-box button[type='submit']").html());
    }
    $("form.-ai-assistant-box button[type='submit']").attr("disabled", true);

    let form = $(this);
    grecaptcha.execute($("form.-ai-assistant-box button[type='submit']").data("sitekey"), { action: 'submit' }).then(function (token) {
        // Serialize form data
            var formData = form.serialize();

        // Append reCAPTCHA token to form data
            formData += "&token=" + token;
            formData += "&ui=" + Currentuser_ID;
            formData += "&AC_APIKEY=" + AC_APIKEY;
            
            $('.-ai-assistant-box-generated').html(SVGLoader).show();
            $.ajax({
                url: AIFolderURL + '/widgets/ai-assistant.php',
                type: "POST",
                data: formData,
                success: function (msg) {
                    if (msg.error != undefined) {
                        if (msg.error == "no-quota") {
                            $.each(instant_popups, function(key, data){
                                if( key == 'premium-feature-tool' && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
                                    var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
                                        Popup += '<div class="-instant-form-popup-inner">';
                                            Popup += '<div class="-instant-form-popup-container">';
                                                Popup += data.output;
                                            Popup += '</div>';
                                        Popup += '</div>';
                                    Popup += '</div>';
                                    $(".-instant-form-popup").remove();
                                    if ($(".-katteb-outer").length == 0) {
                                        $("body").append("<div class='-katteb-outer'></div>");
                                    }
                                    $(".-katteb-outer").append(Popup);
                                    setTimeout(function() {
                                        $('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
                                        $('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
                                        _katteb_initialize();
                                        $(".btn-reset").click();
                                    }, 10);
                                }
                            });
                        } else {
                            alert(msg.error);
                        }
                    } else {
                        $('.-ai-assistant-box-generated').html(msg.output);
                        /*if ($(".-suggested-subject-lines-div").data("display-type") == "lines") {
                            var dataArr = (msg.output).split("\n");
                            var content = "<ul>";
                            dataArr.forEach(element => {
                                if (element != '') {
                                    content += `<li><span data-copy>${element}</span><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button></li>`;
                                }
                            });
                            content += "</ul>";
                        } else {
                            var content = `<div data-copy>${msg.output}</div><button class="-btn-copy" title="copy"><i class="fa-regular fa-copy"></i></button>`;
                        }
                        $(".-suggested-subject-lines-div").html(content);*/
                    }
                },
                complete: function() {
                    $("form.-ai-assistant-box button[type='submit']").attr("disabled", false);
                    $("form.-ai-assistant-box button[type='submit']").html($("form.-ai-assistant-box button[type='submit']").data('original'));
                }
            });
    });
});

$("body").on("click", ".-btn-copy", async function () {
    let $this = $(this);
    let markdownElement = $this.parent().find("[data-copy]");
    // try {
    //     await navigator.clipboard.writeText(text);
            // $this.hide();
            // $this.before('<span class="copied"><i class="fa-solid fa-check"></i></span>');
            // setTimeout(() => {
            //     $this.parent().find(".copied").remove();
            //     $this.show();
            // }, 3500);
    // } catch (err) {
    //     console.error('Failed to copy: ', err);
    // }
    const doc = document;
    const text = doc.querySelector("[data-copy]");
    let range;
    let selection;

    if( doc.body.createTextRange ) {

        range = doc.body.createTextRange();
        range.moveToElement( text );
        range.select();

    } else if ( window.getSelection ) {

        selection = window.getSelection();

        range = doc.createRange();
        range.selectNodeContents( text );

        selection.removeAllRanges();
        selection.addRange( range );

    }

    document.execCommand( 'copy' );
    window.getSelection().removeAllRanges();
    
    $this.hide();
    $this.before('<span class="copied"><i class="fa-solid fa-check"></i></span>');
    setTimeout(() => {
        $this.parent().find(".copied").remove();
        $this.show();
    }, 3500);
});

$("body").on("click", ".-writing-tools-widget-results-header .-btn-close", function () {
    $(".-writing-tools-widget-results-container").hide();
    $(".-writing-tools-widget-results-container .-writing-tools-widget-results").html('');
});
// Subject Line Generator Form Reset
$("body").on("click", ".btn-reset:not(.btn-keyword-search-reset)", function () {
    $(".-form-subject-line-generator input, .-form-subject-line-generator select").val('');
    $(".-suggested-subject-lines-div").html("<p class='empty-text'>—</p>");
});
$("body").on("click", ".btn-keyword-search-reset", function () {
    $(".-keyword-search-container input").val('');
    $(".-suggested-subject-lines-keyword-search").html("<p class='empty-text'>—</p>");
});

// # Ajax Handler
var AjaxRequestHandlerXHR = false;
var AjaxHandlerLastDataAjax = '';
var AjaxHandlerLastURL = false;
var RetryInterval;
var SelectboxTimeout;
function AjaxRequest(hookID, data) {
    if( AjaxHandlerLastURL == data.url ) {
        if( AjaxRequestHandlerXHR != false ) {
            if( data.data != undefined ) {
                if( AjaxHandlerLastDataAjax == hookID ) {
                    AjaxRequestHandlerXHR.abort();
                }
            }else {
                AjaxRequestHandlerXHR.abort();
            }
        }
    }
    data.error = function (jqXHR, exception) {
    }
    AjaxHandlerLastURL = data.url;
    AjaxHandlerLastDataAjax = hookID;
    AjaxRequestHandlerXHR = $.ajax(data).done(function(){
        AjaxHandlerLastURL = false;

        clearInterval(RetryInterval);
        AjaxRequestHandlerXHR = false;
        _katteb_initialize();
    });
    return true;
}
// Helper function for making Ajax requests with promises
function AjaxRequestPromise(hookID, data) {
    return new Promise((resolve, reject) => {
      AjaxRequest(hookID, {
        ...data,
        success: resolve,
        error: reject,
      });
    });
  }

// # -instant-form
$("body").on("click", '.-instant-form', function() {
	var ThisEL = $(this);
	if( ThisEL.is('.-dashboard-editor-aigenerate-button.-image') ) {
		var SelectionElement = DocumentEditor.selection.element();
		var SelectionElementSelected = $(SelectionElement);
		if( SelectionElementSelected.is("focused-text-offset") || SelectionElementSelected.is("inlinking-replacement") || SelectionElementSelected.is("plagiarism-element") || SelectionElementSelected.is(".snippet-shortcut") || SelectionElementSelected.is("proofreading-word") || SelectionElementSelected.is("shortcut-maybe-ends-here") || SelectionElementSelected.is("shortcut-maybe-starts-here") ) {
			SelectionElementSelected = SelectionElementSelected.parent();
		}
		if( SelectionElementSelected.parent().is("p") ) {
			SelectionElementSelected = SelectionElementSelected.parent();
		}
		if( SelectionElementSelected.is('.fr-element') ) {
			SelectionElementSelected = SelectionElementSelected.find(' > *:last-child');
		}

		$('.-will-prepend-image').removeClass('-will-prepend-image');
		SelectionElementSelected.addClass('-will-prepend-image');
	}
	if (!ThisEL.hasClass('disabled')) {
		$('.-columns-header-userarea > .-columns-header-userarea-avatar').removeClass("-open");
		$('quickaction').removeClass("-open");

		var Model = 1;
		if (ThisEL.attr("model") != undefined) Model = ThisEL.attr("model");
		var Popup = '<div class="-instant-form-popup -loading -model-' + Model + '" data-form="' + ThisEL.attr('form') + '">';
			Popup += '<div class="-instant-form-popup-inner">';
				Popup += '<div class="-instant-form-popup-loader">' + SVGLoader + '</div>';
				Popup += '<div class="-instant-form-popup-container">';
				Popup += '</div>';
			Popup += '</div>';
		Popup += '</div>';
		$(".-katteb-outer").append(Popup);
		setTimeout(function() {
			$('.-instant-form-popup[data-form="' + ThisEL.attr('form') + '"]').addClass('-visible');
		}, 10);

		$('.-websites-manager').removeClass('-open');
		$(".-katteb-drawer").removeClass("-focused");
		if( ThisEL.attr("form").indexOf('/preferences') > -1 ) {
			$(".-katteb-outer").attr('seen-preferences', 1);
		}
		var SendingData = { "user": Currentuser_ID, "form": ThisEL.attr('form') };
		if( ThisEL.data('append-value1') != undefined ) {
			SendingData.append1 = ThisEL.data('append-value1');
		}
		if( ThisEL.data('append-value2') != undefined ) {
			SendingData.append2 = ThisEL.data('append-value2');
		}
		AjaxRequest('instant-form', {
			url: HomeURL + 'AjaxCenter/InstantForm',
			type: "POST",
			data: SendingData,
			dataType: 'json',
			success: function(msg) {
				if( msg.error != undefined ) {
	                ThisEL.closest('.-instant-form-popup').remove();
					$.each(instant_popups, function(key, data){
						if( key == msg.error && $('.-instant-form-popup[data-form="' + data.form + '"]').length == 0 ) {
							var Popup = '<div class="-instant-form-popup -loading -model-' + data.model + '" data-form="' + data.form + '">';
								Popup += '<div class="-instant-form-popup-inner">';
									Popup += '<div class="-instant-form-popup-container">';
										Popup += data.output;
									Popup += '</div>';
								Popup += '</div>';
							Popup += '</div>';
							$(".-instant-form-popup").remove();
							$(".-katteb-outer").append(Popup);
							setTimeout(function() {
								$('.-instant-form-popup[data-form="' + data.form + '"]').addClass('-visible');
								$('.-instant-form-popup[data-form="' + data.form + '"]').find(".-instant-form-popup-container").addClass('-show');
							}, 10);
						}
					});
				}else {
					$('.-instant-form-popup-loader').remove();
					$('.-instant-form-popup[data-form="' + ThisEL.attr('form') + '"] > svg').fadeOut(200);
					$('.-instant-form-popup[data-form="' + ThisEL.attr('form') + '"]').removeClass('-loading');

					$('.-instant-form-popup[data-form="' + ThisEL.attr('form') + '"]').find(".-instant-form-popup-container").html(msg.output);
					$('.-instant-form-popup[data-form="' + ThisEL.attr('form') + '"]').find(".-instant-form-popup-container").addClass('-show');
				}
			},
		});
	}
	return false;
});

$(document).on('mouseup', ".-instant-form-popup", function(e) {
	var ThisPopup = $(this);
	var dropdown = ThisPopup.find('.-instant-form-popup-inner');
	if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
		if( ThisPopup.find('.-instant-form-popup-inner').length > 0 ) {
			if (ThisPopup.find('.-instant-form-popup .-instant-footer-submit  button').length == 0 && ThisPopup.find('.-instant-form-popup.-loading').length == 0) {
				if (AjaxRequestHandlerXHR != false) {
					AjaxRequestHandlerXHR.abort();
				}
				ThisPopup.remove();
				_katteb_initialize();
			} else if (ThisPopup.find('.-instant-form-popup.-loading').length === 0) {
				if (AjaxRequestHandlerXHR != false) {
					AjaxRequestHandlerXHR.abort();
				}
				ThisPopup.remove();
				_katteb_initialize();
			}
		}
	};
});

// # Unlimited Plan
$("body").on("click", ".-katteb-unlimited-deal > .-katteb-unlimited-deal-body > .-katteb-unlimited-deal-body-plans > .-katteb-unlimited-deal-body-plans-item", function() {
    var Button = $(".-katteb-unlimited-deal > .-katteb-unlimited-deal-body .-katteb-unlimited-deal-body-countdown > a.-button-ui");
    $(".-katteb-unlimited-deal > .-katteb-unlimited-deal-body > .-katteb-unlimited-deal-body-plans > .-katteb-unlimited-deal-body-plans-item").removeClass("-selected");
    $(this).addClass("-selected");
    if (Button.length > 0) {
        let ButtonDataFormPath;
        if (Button.attr("form").includes("katteb-unlimited-deal/signup/")) {
            ButtonDataFormPath = "katteb-unlimited-deal/signup/";
        } else {
            ButtonDataFormPath = "katteb-unlimited-deal/purchase/";
        }
        Button.attr("form", ButtonDataFormPath + $(this).data("period"));
    }

    if( $('.-katteb-unlimited-deal-body-plans').data('treatment') == 'paypro' ) {
        Button.removeAttr('form').removeClass('-instant-form');
        Button.attr("href", $(this).data('url'));
    }
});

function _rich_copyToClip(str) {
  function listener(e) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", $(str).text());
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
};

$("body").on("click", ".-ai-assistant-box-generated > .-generate-item-section .-generate-item-section-copy-button", async function () {
    var ThisButton = $(this);
    $('.-copying-content').removeClass('-copying-content');
    ThisButton.closest('.-generate-item-section').find('.-generate-item-section-content').addClass('-copying-content');
    
    _rich_copyToClip(document.querySelector('.-copying-content').innerHTML);
    ThisButton.addClass('-copied');

	setTimeout(function(){
		ThisButton.removeClass('-copied');
	}, 1000);

	e.preventDefault();
	return false;
});