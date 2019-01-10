(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });
var notes_data = 0;
var ques_data = 0;
var prof_data = 0;
var options = {
  keys: ['title', 'des', 'uploaded'],
  threshold: 0.3
};
var options2 = {
  keys: ['name', 'res-area'],
  threshold: 0.3
};
var fuse_notes = new Fuse(notes_data, options);
var fuse_ques = new Fuse(ques_data, options);
var fuse_prof = new Fuse(prof_data, options2);


$.getJSON( "notes-data.json", function(data) {
    notes_data = data;
     fuse_notes = new Fuse(notes_data, options);
});
$.getJSON( "ques-data.json", function(data) {
    ques_data = data;
    fuse_ques = new Fuse(ques_data, options);
});
$.getJSON( "prof-data.json", function(data) {
    prof_data = data;
    fuse_prof = new Fuse(prof_data, options2);
});
$('#note-search').on('input',function(e){
    var res = fuse_notes.search($('#note-search').val());
    var ft = ""
    res.forEach(function(d){
        ft +='<div class="resume-item d-flex flex-column flex-md-row mb-5">\
            <div class="resume-content mr-auto">\
                <div class="subheading"><a href="' + d['link']+'" class="text-secondary">'+d['title']+'</a></div>\
              <p>'+d['des']+'<p>\
            </div>\
            <div class="resume-date text-md-right">\
              <span class="text-primary">'+d['uploaded']+'</span>\
            </div>\
          </div>'
    });
    $('#note-out').html(ft)
});
$('#ques-search').on('input',function(e){
    var res = fuse_ques.search($('#ques-search').val());
    var ft = ""
    res.forEach(function(d){
        ft +='<div class="resume-item d-flex flex-column flex-md-row mb-5">\
            <div class="resume-content mr-auto">\
                <div class="subheading"><a href="' + d['link']+'" class="text-secondary">'+d['title']+'</a></div>\
              <p>'+d['des']+'<p>\
            </div>\
            <div class="resume-date text-md-right">\
              <span class="text-primary">'+d['uploaded']+'</span>\
            </div>\
          </div>'
    });
    $('#ques-out').html(ft)
});
$('#prof-search').on('input',function(e){
    var res = fuse_prof.search($('#prof-search').val());
    var ft = ""
    res.forEach(function(d){
        ft +='<div class="resume-item d-flex flex-column flex-md-row mb-5">\
            <div class="resume-content mr-auto">\
                <div class="subheading"><a href="" class="text-secondary">'+d['name']+'</a></div>\
              <p>'+d['des']+'<p>\
            </div>\
            <div class="resume-date text-md-right">\
              <span class="text-primary">'+d['res-area']+'</span>\
            </div>\
          </div>'
    });
    $('#prof-out').html(ft)
});
//fuse.search('old');

})(jQuery); // End of use strict


