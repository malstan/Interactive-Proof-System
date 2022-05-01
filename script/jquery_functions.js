// handling tabs
$(document).ready(function () {
  $("#tutorial").show();
  $("*[data-tab='#tutorial']").addClass("activeTab");

  $(".tabs-js li").on("click", function () {
    var idOfPane = $(this).attr("data-tab");

    $(idOfPane).fadeIn().siblings().hide();

    $(this).addClass("activeTab").siblings().removeClass("activeTab");
  });
});
