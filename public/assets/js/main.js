(function () {
  // Logic to disable the save button until all required fileds are entered

  $("form input").keyup(function () {
    var empty = false;
    $("form input").each(function () {
      if ($(this).val() == "") {
        empty = true;
      }
    });

    if (empty) {
      $("#submit").attr("disabled", "disabled");
    } else {
      $("#submit").removeAttr("disabled");
    }
  });
  //Above logic end

  $(".card").on("click", function (e) {
    var $_target = $(e.currentTarget);
    var $_panelBody = $_target.find(".collapse");
    if ($_panelBody) {
      $_panelBody.collapse("toggle");
    }
  });
})();
