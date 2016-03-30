(function(Hiof, undefined) {

  // Functions
  Hiof.getJobs = function(lang) {
    //var data;
    if (typeof lang === 'undefined') {
      lang = 'no';
    }
    const type = $('#jobs-list').attr('data-jobs-type');
    let settings = {
      lang: lang,
      type: type
    }
    //console.log(settings);
    $.ajax({
      url: 'http://hiof.no/api/v1/jobs/',
      method: 'GET',
      async: true,
      dataType: 'json',
      data: settings,
      success: function(data) {
        //console.log(data);
        Hiof.appendJobs(data);
      },
      error: function(data) {}

    });
  };


  Hiof.appendJobs = function(data) {
    var ln = $('html').attr('lang');
    var uiText;

    Hiof.view.getData({url: "/assets/js/data/i18n.json"}, this).success(function(lndata) {
      //console.log(lndata[ln].jobs);
      uiText = lndata[ln].jobs;
      //return data;

      // Add i18n to view
      data.view = {};
      data.view.title = uiText.title;
      data.view.deadline = uiText.deadline;
      data.view.description = uiText.description;
      data.view.readmore = uiText.readmore;



      var templateSource = Hiof.Templates['jobs/jobs'],
      markup = templateSource(data);

      $('#jobs-list').append(markup);
      $('#jobs-list table').footable({
        breakpoints: {
          phone: 640,
          tablet: 899,
          desktop: 900
        }
      });
      if ($('#jobs-available').length) {
        Hiof.statusJobs(ln);
      }


    });
    //var uiText = Hiof.options.i18n[ln].jobs;
    //debug(data);


  };
  Hiof.statusJobs = function(ln) {
    if (ln === 'en') {
      $.ajax({
        url: 'http://hiof.no/api/v1/jobs/',
        method: 'GET',
        async: true,
        dataType: 'json',
        data: {
          lang: "no"
        },
        success: function(data) {
          $('#jobs-available-nb .badge').text(data.jobs.length);
        },
        error: function(data) {}

      });

    } else {
      //debug("test");
      $.ajax({
        url: 'http://hiof.no/api/v1/jobs/',
        method: 'GET',
        async: true,
        dataType: 'json',
        data: {
          lang: 'en'
        },
        success: function(data) {
          $('#jobs-available-en .badge').text(data.jobs.length);
        },
        error: function(data) {}

      });
    }
  };


  // On document load
  $(function() {
    if ($('#jobs-list').length) {
      Hiof.getJobs();
      $('.footable-loaded').trigger('footable_expand_first_row');
    }
    if ($('#jobs-list-en').length) {
      Hiof.getJobs('en');
    }
  });


  // Expose functions to the window
  //window.Hiof.jobs = getJobs;

})(window.Hiof = window.Hiof || {});
