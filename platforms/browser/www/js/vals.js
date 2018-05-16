$(document).ready(function() {

  $('input').keypress(function (event) {
      var regex = new RegExp("^[-ñÑá-úÁ-Ú._#@a-zA-Z0-9 ]+$");
      var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
         event.preventDefault();
         return false;
      }
  });

  $('input').on('change', function (event) {
      var regex = new RegExp("^[-ñÑá-úÁ-Ú._#@a-zA-Z0-9 ]+$");
      
      if (!regex.test($(this).val())) {
      	$(this).val("");
         event.preventDefault();
         return false;
      }
  });
  $('.nameval').on('keyup', function (event) {
  	
      var regex = new RegExp("^[ñÑá-úÁ-Ú.a-zA-Z ]+$");
      
      if (!regex.test($(this).val())) {
      	$(this).val("");
         event.preventDefault();
         return false;
      }
  });
  $('.numval').on('keyup', function (event) {
  	
      var regex = new RegExp("^[0-9]+$");
      
      if (!regex.test($(this).val())) {
      	$(this).val("");
         event.preventDefault();
         return false;
      }
  });

});
