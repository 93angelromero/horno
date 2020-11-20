if(localStorage.getItem("user")!=null){
  if(localStorage.getItem("tipo")=="adm"){
    $.mobile.navigate( "#menu", {transition:"pop" });
  }else if(localStorage.getItem("tipo")=="esc"){
    $.mobile.navigate( "#menuD", {transition:"pop" });
  } else {
    $.mobile.navigate( "#menuL", {transition:"pop" });
  }
}

//funcion inicio de sesión
function login(){
  var form = new FormData($("#loginForm")[0]);
  //form.append("regID",localStorage.getItem('registrationId'));
  $.ajax({
				type: "POST",
				url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
				data: form,
				crossDomain: true,
				cache: false,
				//beforeSend: function(){ $("#login").html('Connecting...');},
				success: function(data){
          $.mobile.loading( "hide" );

					if(data.toString()!=="0"){
						/*localStorage.login="true";
						localStorage.email=email;
						window.location.href = "index.html";*/
            var datos = data.toString().split(",");
            user = datos[0];
            usi = datos[1];
            per = datos[3];
            //$(".usern").text(user);
            localStorage.setItem("user",user);
            localStorage.setItem("usi",usi);
            if($("#tipoL").val()=="1"){
              localStorage.setItem("tipo","adm");
              $.mobile.navigate( "#menu", { transition : "slide",info: "info about the #foo hash" });
            }else if($("#tipoL").val()=="2"){
              localStorage.setItem("tipo","esc");
              $.mobile.navigate( "#menuD", { transition : "slide",info: "info about the #foo hash" });
            } else if($("#tipoL").val()=="3"){
              localStorage.setItem("tipo","lec");
              $.mobile.navigate( "#menuL", { transition : "slide",info: "info about the #foo hash" });
            }
					} else {
						/*alert("Login error");
						$("#login").html('Login');*/
            swal("Error","Usuario o contraseña incorrectos","error");
					}
				}, error: function(){
          $.mobile.loading( "hide");
          swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
        }
			});
  /*$.ajax({
     url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
     type: "POST",
     data: form,
     contentType: false,
     cache: false,
     processData:false,
     error: function(xhr, settings, exception){ swal("Error","Revisa tu conexión a internet.","error")},
     success: function(data){
       $.mobile.loading( "hide" );
       //$("#logac").prop("disabled",false);
       if(data.toString()!=="0"){
         var datos = data.toString().split(",");
         user = datos[0];
         usi = datos[1];
         per = datos[3];
         //$(".usern").text(user);
         localStorage.setItem("user",user);
         localStorage.setItem("usi",usi);
         if($("#tipoL").val()=="1"){
           localStorage.setItem("tipo","adm");
           $.mobile.navigate( "#menu", { transition : "slide",info: "info about the #foo hash" });
         }else if($("#tipoL").val()=="2"){
           localStorage.setItem("tipo","esc");
           $.mobile.navigate( "#menuD", { transition : "slide",info: "info about the #foo hash" });
         } else if($("#tipoL").val()=="3"){
           localStorage.setItem("tipo","lec");
           $.mobile.navigate( "#menuL", { transition : "slide",info: "info about the #foo hash" });
         }
       } else{
         swal("Error","Usuario o contraseña incorrectos","error");
       }
     },
     error: function(){
       $.mobile.loading( "hide");
       swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
     }
   });*/
}

//función agregar usuarios a BD
function updateD(){
  var form = new FormData($("#datosForm")[0]);
  //form.append("userm",localStorage.getItem("usi"));
  $.ajax({
    url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
    type: "POST",
    data: form,
    contentType: false,
    cache: false,
    processData:false,
    success: function(data){
      if(data.toString()=="0"){
        $("#datosForm").reset();
        swal("Listo","Tus datos han sido guardados.","success");
      } else {
        swal("Error","No se han podido guardar tus datos, revisa tu conexión e intentalo de nuevo","error");
      }
    },
    error: function(){
      swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
    }
  });
}

//función agregar estados a BD
function updateDD(){
  var form = new FormData($("#datosdForm")[0]);
  form.append("userm",localStorage.getItem("usi"));
  $.ajax({
    url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
    type: "POST",
    data: form,
    contentType: false,
    cache: false,
    processData:false,
    success: function(data){
      if(data.toString()=="0"){
        swal("Listo","Tus datos han sido modificados.","success");
      } else{
        //swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
        swal("Error",data.toString(),"error");
      }
    },
    error: function(){
      swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
    }
  });
}

//función subir archivo a Estados
function subirAE(){
  var form = new FormData($("#archivoeForm")[0]);
  //form.append("userm",localStorage.getItem("usi"));
  $.ajax({
    url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
    type: "POST",
    data: form,
    contentType: false,
    cache: false,
    processData:false,
    success: function(data){
      if(data.toString()=="0"){
        swal("Listo","Tu archivo ha sido subido con éxito.","success");
      } else{
        //swal("Error","No se han podido modificar tus datos, revisa tu conexión e intentalo de nuevo","error");
        swal("Error",data.toString(),"error");
      }
    },
    error: function(){
      swal("Error","Actualmente tu dispositivo no cuenta con una conexión a internet","error");
    }
  });
}

$(document).ready(function(){
  $("#modalP").iziModal({
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    onOpened: function(modal) {

    	getHP(citap,fechap);
        $.ajax({
        	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {citap:citap},
	        success: function(data){
	        	var jobj = jQuery.parseJSON(data);
	        	modal.stopLoading();
	        	$(".doctN").text(jobj[0][2]);
	        	$(".doctM").text(jobj[0][5]);
	        	$(".doctPh").text(jobj[0][4]);
	        	$(".cdate").text(jobj[0][0]);
	        	$(".hdate").text(jobj[0][1]);
	        	$(".citaI").css("background-image", "url("+jobj[0][3]+")");
	        },
	        error: function(){
	        	modal.stopLoading();
	        	$('#modalP').iziModal('close');
	        }
        })

    },
    onClosed: function() {
        //console.log('onClosed');
    }
});
$("#modalD").iziModal({
		 group: 'grupo1',
    history: false,
    overlayClose: false,
    width: 600,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutDown',
    onOpened: function(modal) {
        $.ajax({
        	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {citad:citap},
	        success: function(data){
	        	var jobj = jQuery.parseJSON(data);
	        	modal.stopLoading();
	        	$(".doctN").text(jobj[0][2]);
	        	$(".doctM").text(jobj[0][5]);
	        	$(".doctPh").text(jobj[0][4]);
	        	$(".cdate").text(jobj[0][0]);
	        	$(".hdate").text(jobj[0][1]);
	        	$(".citaI").css("background-image", "url("+jobj[0][3]+")");
	        },
	        error: function(){
	        	modal.stopLoading();
	        	$('#modalD').iziModal('close');
	        }
        })

    },
    onClosed: function() {
        //console.log('onClosed');
    }
});

$("#modalP, #modalD").on('click', 'header a', function(event) {
    event.preventDefault();
    var $this = $(this);
    var index = $this.index();
    $this.addClass('active').siblings('a').removeClass('active');

    var $sections = $this.closest('div').find('.sections');
    var $currentSection = $this.closest("div").find("section").eq(index);
    //var $nextSection = $this.closest("div").find("section").eq(index).siblings('section');

    $sections.css('height', $currentSection.innerHeight());

    function changeHeight(){
        $this.closest("div").find("section").eq(index).fadeIn().siblings('section').fadeOut(100);
    }

    if( $currentSection.innerHeight() > $sections.innerHeight() ){
        changeHeight();
    } else {
        setTimeout(function() {
            changeHeight();
        }, 150);
    }

    if( $this.index() === 0 ){
        $("#modalP .iziModal-content .icon-close").css('background', '#ddd');
    } else {
        $("#modalP .iziModal-content .icon-close").attr('style', '');
    }
});
    document.addEventListener("backbutton", function(e){


           if($.mobile.activePage.is('#inicio')||$.mobile.activePage.is('#land')){

           }
           else {
               navigator.app.backHistory()
          }
         }, false);

      $( '#recentA' ).on( 'pagebeforeshow',function(event){


         getScheduleP();

      });
      $( '#important_d' ).on( 'pagebeforeshow',function(event){


         getIDa();

      });
     $( '#calendar_p' ).on( 'pagebeforeshow',function(event){


         getSchedule();

      });
      $( '#agenda' ).on( 'pagebeforeshow',function(event){


         getAgenda();

      });
      $( '#verE' ).on( 'pageshow',function(event){


         getPD();

      });
      $( '#profileD' ).on( 'pageshow',function(event){


         getPD();
         getED();
      });
      $( '#patient_list' ).on( 'pagebeforeshow',function(event){


        getPac();

      });
         //paymentList();

         //inicio de sesiones
         $('#loginForm').submit(function(e){
           e.preventDefault();
           html = $(this).jqmData( "html" ) || "";
           var form = new FormData($("#loginForm")[0]);
           $.mobile.loading( "show", {
             text: "Verificando",
             textVisible: true,
             theme: "b",
             textonly: false,
             html: html
           });
           login();
           //form.append("regID",localStorage.getItem('registrationId'));
         });

         //agregar Usuarios
         $("#datosForm").submit(function(e){
           e.preventDefault();
           if(validaP()){
             swal({
               title: "¿Estás seguro que tus datos son correctos?",
               text: "",
               type: "info",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Aceptar",
               showLoaderOnConfirm: true,
               closeOnConfirm: false,
               cancelButtonText: "Cancelar",
             },
             function(isConfirm){
                 if(isConfirm){
                    updateD();
                 }
             });
           }
         });

         //validación de campos
         function validaP(){
             if($('#nombreU').val()==''){
                 swal("Error","El nombre no puede estar vacío.","error");
             } else if($('#mailU').val()==''){
                 swal("Error","El correo no puede estar vacío.","error");
             } else if($('#telU').val()==''){
                 swal("Error","El telefono no puede estar vacío.","error");
             } else{
                 return true;
             }
         }

         //Mostrar datos de los usuarios en Base de Datos
         $("#usersL").click(function(e){
           e.preventDefault();
         	html = $(this).jqmData( "html" ) || "";
           $.mobile.loading( "show", {
             text: "Cargando Lista",
             textVisible: true,
             theme: "b",
             textonly: false,
             html: html
           });
       	  $.ajax({
             url: "https://www.icone-solutions.com/tesisL/sqlOP.php",
          	  type: "POST",
         	  data: {users:1},
          	  success: function(data){
               $("#usersUl").empty();
            		var users = jQuery.parseJSON(data);
            		for(var i=0;users.length;i++){
                 $("#usersUl").append(' <li><a class="showD" data-doct="'+docts[i][3]+'">'+
                 '<span class="dname">'+docts[i][0]+'</span>'+
                 '<span class="scp">'+docts[i][1]+'</span>'+
                 '<span class="scp">Permiso'+docts[i][2]+'</span>'+
                 '</a>'+
                 '</li>')
            		}
        	      if ($("#usersUl").hasClass('ui-listview')) {
                 $("#usersUl").listview('refresh');
               }
        	      $.mobile.loading( "hide");
        	      $.mobile.navigate( "#verU", {transition:"slide" });
             }
        	  });
         });

         //modificar usuarios


         //agregar estados a BD
         $("#datosdForm").submit(function(e){
           e.preventDefault();
           if(validac()){
             swal({
               title: "¿Estás seguro que tus datos son correctos?",
               text: "",
               type: "info",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Aceptar",
               showLoaderOnConfirm: true,
               closeOnConfirm: false,
               cancelButtonText: "Cancelar",
             },
             function(isConfirm){
               if(isConfirm){
                 updateDD();
               }
             });
           }
         });

         //agregar archivos de estados a BD
         $('#archivoeForm').submit(funtion(e){
           e.preventDefault();
           swal({
             title: "¿Estás seguro que quieres subir este archivo?",
             text: "",
             type: "info",
             showCancelButton: true,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "Aceptar",
             showLoaderOnConfirm: true,
             closeOnConfirm: false,
             cancelButtonText: "Cancelar",
           }, function(isConfirm){
             if(isConfirm){
               subirAE();
             }
           });
         });

   $('#repForm').submit(function(e){
     e.preventDefault();
     if($(".chooseDT").val()!=""){
 		var check = $("#timePs").val();
 		var doct = $(".doctM").val();
 		$.ajax({
 			url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {checkds:check,docd:doct},
	        success:function(data){
	        	if(data.toString()=="0"){
	        		reSchedule();
	        	}else{
	        		swal("Error",data.toString(),"error");
	        	}

	        },
	        error:function(){

	        	swal("Error","Revisa tu conexión de internet.","error");
	        }
 		})

 	}else{
 		swal("Elige una fecha para continuar","","info");
 	}


  });


         $("#payForm").submit(function(e){
         	e.preventDefault();

         	swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
	        	if($('#cPay').is(":visible")) {
	        	var exd = $("#expdate").val().split("/");
                var month =  exd[0];
                var year =  exd[1];
                $("#month").val(month);
                $("#year").val(year);
 	            checkC();
 	           }else{
 	        	paynt();
 	           }
            }
         });
         });


    $("#CIP").click(function(){
       $("#fotoP").click();
    });
    $("#CID").click(function(){
       $("#fotoD").click();
    });
    $("#elabi").click(function(){
       $("#elab").click();
    });
    $("#radioi").click(function(){
       $("#radiograf").click();
    });
    $("#recei").click(function(){
       $("#recetaf").click();
    });
    $("#fotoP").change(function(){
        readURL(this);
    });
    $("#fotoD").change(function(){
        readURL(this);
    });

   $("#regForm").submit(function(e){
    	e.preventDefault();
    	 var empty = $(this).find("input").filter(function() {

        return this.value === "";

    });
    if(empty.length==0){
	    if($("#pass1").val()==$("#pass2").val()){
	    swal({
          title: "¿Estás seguro que tus datos son correctos?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         register("#regForm");
            }
         });
        }else{
        	swal("Error","Las contraseñas no coinciden","error");
        }
       }else{
       	swal("Error","Debes completar todos los campos","error");
       }
   });

    function validac(){
    	if($('#tempE').val()==""){
           swal("Error","El campo temperatura no puede estar vacío.","error");
       	} else if($('#luzE').val()==""){
           swal("Error","El campo luz no puede estar vacío.","error");
       	} else if($('#serv1E').val()==""){
           swal("Error","El campo servo 1 no puede estar vacío","error");
       	} else if($('#serv2E').val()==""){
           swal("Error","El campo servo 2 no puede estar vacío","error");
       	} else if($('#serv3E').val()==""){
           swal("Error","El campo servo 3 no puede estar vacío","error");
       	} else if($('#vent1').val()==""){
           swal("Error","El campo ventilador no puede estar vacío","error");
       	} else if($('#corrE').val()==""){
           swal("Error","El campo corriente no puede estar vacío","error");
       	} else if($('#voltE').val()==""){
           swal("Error","El campo voltaje no puede estar vacío","error");
       	} else if($('#sptempE').val()==""){
           swal("Error","El campo S. P. Temperatura no puede estar vacío","error");
       	} else if($('#spluzE').val()==""){
           swal("Error","El campo S. P. Luz no puede estar vacío","error");
       	} else{
           return true;
       	}
    }

    $("#datoscForm").submit(function(e){
    	e.preventDefault();

            swal({
              title: "¿Estás seguro que tus datos son correctos?",
              text: "",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Aceptar",
              showLoaderOnConfirm: true,
              closeOnConfirm: false,
              cancelButtonText: "Cancelar",
            },
            function(isConfirm){
                    if(isConfirm){
                     updateCD();
                }
             });

   	});

    $("#datoseForm").submit(function(e){
    	e.preventDefault();
        swal({
            title: "¿Estás seguro que tus datos son correctos?",
            text: "",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            showLoaderOnConfirm: true,
            closeOnConfirm: false,
            cancelButtonText: "Cancelar",
        },
        function(isConfirm){
            if(isConfirm){
                updateDE();
            }
        });
    });
    $(".cancelAp").click(function(e){
 	swal({
          title: "¿Estás seguro que deseas cancelar tu cita?",
          text: "",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Aceptar",
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          cancelButtonText: "Cancelar",
        },
        function(isConfirm){
	        if(isConfirm){
 	         cancelC(citap);
            }
         });
 });

 var datosp= Array();

 $("#edit").click(function(){
 	if($(this).hasClass("ui-icon-edit")){
 	$(this).removeClass("ui-icon-edit");
 	$(this).addClass("ui-icon-delete");
 	$('#accForm input[type=text],#accForm textarea').css("background-color","#fff");
 	$('#accForm input[type=text],#accForm textarea').prop('readonly', false);
 	$('#joba').selectmenu('enable');
 	$("#saveD").css("visibility","visible");
 	}else{
 	$(this).addClass("ui-icon-edit");
 	$(this).removeClass("ui-icon-delete");
 	$('#accForm input[type=text],#accForm textarea').css("background-color","transparent");
 	$('#accForm input[type=text],#accForm textarea').prop('readonly', true);
 	$('#joba').selectmenu('disable');

 	$("#nombrea").val(datosp[1]);
		$("#compa").val(datosp[2]);
		$("#addressa").val(datosp[3]);
		$("#statea").val(datosp[4]);
		$("#citya").val(datosp[5]);
		$("#paisa").val(datosp[6]);
		$("#telefonoa").val(datosp[8]);
		$("#cellpa").val(datosp[9]);
		$("#joba").val(datosp[10]);
		$("#saveD").css("visibility","hidden");
 	}
 	$('#joba').selectmenu('refresh', true);

 });




$(".close").click(function(){
   	       localStorage.clear();
   	       $.mobile.navigate( "#inicio", {transition:"pop", info: "info about the #foo hash" });
   });

var thisMonth = moment().format('YYYY-MM');




   var saturday;
   var weekend;
   var sunday;
   var allowed;
   var disabledt;
   var todaytp;
   $("#doctUl, #map_canvas").on("click",".showD",function(e){
   	e.preventDefault();
   	var d = $(this).data("doct");
   		html = $(this).jqmData( "html" ) || "";
 	$.mobile.loading( "show", {
            text: "Cargando Info",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
    });
    var idug =localStorage.getItem("usi");
 	$.ajax({
	url: "http://www.icone-solutions.com/doct/sqlOP.php",
	type: "POST",
	data: {doctor:d, idug:idug},
	success: function(data){

		var docts = jQuery.parseJSON(data);
		$("#doctP").val(docts[0][0]);
		$("#imgd").css("background-image", "url('http://www.icone-solutions.com/doct/images/"+docts[0][4]+"')");
		$("#a-imgd").css("background-image", "url('http://www.icone-solutions.com/doct/images/"+docts[0][4]+"')");
		$("#sdname").text(docts[0][1]);
		$("#a-sdname").text(docts[0][1]);
		$("#spec").text(docts[0][2]);
		$("#a-spec").text(docts[0][2]);
		$("#a-price").text("Consulta: $"+docts[0][3]);
		$("#p-price").text("$"+docts[0][3]);
		$("#totsf").val(parseFloat(docts[0][3]));
		$("#location").text(docts[0][5]);
		$("#lv,#sat,#dom").empty();
		$("#lv").append("Lun-Vie "+docts[0][6]);
		$("#sat").append("Sábados "+docts[0][7]);
		$("#dom").append("Domingos "+docts[0][8]);

		$("#totU").text(docts[0][13])
		weekend = docts[0][9];
		saturday = docts[0][10];
		sunday = docts[0][11];
		allowed = docts[0][12];
		var d = new Date();
			 var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 0!

    var yyyy = d.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }

    todaytp = yyyy+'-'+mm+'-'+dd;
		if(allowed.length==0){

			disabledt = [todaytp];
			dd = '0'+(d.getDate()+1);
			todaytp = yyyy+'-'+mm+'-'+dd;

		}else{
			disabledt = [];
		}
		$.mobile.loading( "hide");

		$.mobile.navigate( "#doctor_show", {transition:"slidedown" });
	}
	});
 });



 $('#np').click(function(e) {
 	e.preventDefault();
 	html = $(this).jqmData( "html" ) || "";
 	        $.mobile.loading( "show", {
            text: "Verificando",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
            });
 	if($(".chooseDT").val()!=""){
 		var check = $(".chooseDT").val();
 		var doct = $("#doctP").val();
 		$.ajax({
 			url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {checkd:check,docd:doct},
	        success:function(data){
	        	$.mobile.loading( "hide");
	        	if(data.toString()=="1"){
	        		$.mobile.navigate( "#payment", {transition:"slidedown" });
	        	}else{
	        		swal("Ups!",data.toString(),"error");
	        	}
	        },
	        error:function(){
	        	$.mobile.loading( "hide");
	        	swal("Error","Revisa tu conexión de internet.","error");
	        }
 		})

 	}else{
 		swal("Elige una fecha para continuar","","info");
 	}
 });
 jQuery.datetimepicker.setLocale('es');
 $( '#chooseD' ).on( 'pageshow',function(event){
 	var disabled = [];
    var allowedt=[];
 	if(weekend[0]=="Cerrado"){
 		disabled.push(1);
 		disabled.push(2);
 		disabled.push(3);
 		disabled.push(4);
 		disabled.push(5);
 	}
 	if(saturday[0]=="Cerrado"){
 		disabled.push(6);
 	}
 	if(sunday[0]=="Cerrado"){
 		disabled.push(0);
 	}
     $('#default_datetimepicker').datetimepicker({
 	   formatDate:'Y-m-d',
 	   formatTime:'H:i',
 	   defaultTime: "9:00",
 	   disabledWeekDays: disabled,
 	   allowTimes: allowed,
 	   minDate: todaytp,
 	   startDate: todaytp,
 	   onSelectDate:function(ct,$i){
 	   	var d = new Date(ct);
 	   		html = $(this).jqmData( "html" ) || "";
 	        $.mobile.loading( "show", {
            text: "Cargando Horarios",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: html
            });
 	   	var now = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
 	   	$.ajax({
 	   		url: "http://www.icone-solutions.com/doct/sqlOP.php",
	        type: "POST",
	        data: {sdate:now, cd: 1},
	        success: function(data){
	        	$.mobile.loading("hide");
	        	allowed= jQuery.parseJSON(data);

	        	$i.datetimepicker('setOptions', { allowTimes:allowed});

	        },
	        error: function(){
	        	swal("Error","No se ha podido conectar al servidor, revisa tu conexión","error");
	        }
 	   	})


       }
      });
   });
});
