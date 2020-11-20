$('#loginForm').submit(function(){
	var email = $("#user").val();
	var pass = $('#contra').val();
	if($.trim(email).length>0 && $.trim(pass).lenth>0){
		$.ajax({
			type: "POST",
			url: "http://localhost/tesisL/sqlOP.php",
			data: { email, pass, op: '1l' },
			crossDomain: true,
			cache: false,
			beforeSend: function(){ $("#inicio").html('Conectando...');},
			success: function(data){
				if(data=="success"){
					localStorage.login="true";
					localStorage.email=email;
					window.location.href = "index.html";
				} else if (data=="failed"){
					alert("Error al entrar");
					$("#inicio").html('Inicio');
				}
			}
		});
	}
	return false;
}