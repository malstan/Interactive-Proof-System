$(document).ready(function () {
  $("#info").show();
  $("*[data-tab='#info']").addClass("activeTab");

  $(".tabs-js li").on("click", function () {
    var idOfPane = $(this).attr("data-tab");

    $(idOfPane).show().siblings().hide();

    $(this).addClass("activeTab").siblings().removeClass("activeTab");
  });
});
