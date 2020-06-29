function getPhoneType(){
  var height = window.innerHeight;//|| document.documentElement.clientWidth || document.body.clientWidth;
  if (height > 700) {
    phoneType = "isOk";
  } else {
    phoneType = "notOk";
  }
  return phoneType;
}
$(document).ready(function (e) {
  var phoneType = getPhoneType();
  console.log("phoneType:", phoneType);
  if(phoneType !== 'isOk'){
    $('#play_area').addClass('play_area_notok')
    $('#play_choice').addClass('play_choice_notok')
    $('#play_menu').addClass('play_menu_notok')
  }
})