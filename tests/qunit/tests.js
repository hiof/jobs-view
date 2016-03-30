$(function() {

  QUnit.module("Test the jobs component");

  if ($q('#test-jobs').length) {

    $q('#test-jobs').load(function() {
      $ = window.frames[0].jQuery;
      var iFrame = $("test-jobs");
      test('Check if page is loaded', function(assert) {
        // On start this is visible
        assert.ok($('#content h1').length);
      });

      test('Check if the first job is closed', function(assert){
        assert.ok($('#content table tbody tr.footable-detail-show').length === 0);
      });

    });
  }

});
