<!-- Android Viewport height fix-->
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.write('<meta name="viewport" content="width=device-width,height='+window.innerHeight+', initial-scale=1.0">');
}

$(window).load(function() {
document.getElementById('cyb-loader').style.display='none';
document.getElementById('cyb-animated-gif').style.backgroundImage="url(https://s3.eu-central-1.amazonaws.com/recruitmentwebsite/cyberark.gif?"+new Date().getTime()+")"; // specify the image path here -->
	 setTimeout(function() {
      document.getElementById('cyb-animated-gif').style.display='none';
    }, 6500);
	setTimeout(function() {
       navigator.vibrate(1000);
    }, 1950);

})
$(function() {
    var focusables = $('input');   
    focusables.keyup(function(e) {
        if (e.keyCode == 13) {
            var current = focusables.index(this);
			if(this.name =='email'){
			$('#cyb-submit').focus();
				submitClicked();
				return;
			}
			else{
			   next = focusables.eq(current+1).length ? focusables.eq(current+1) : focusables.eq(0);
			}
			 next.focus();
        }
    });
});

$('#cyb-welcome-page').click(function(){
	$.mobile.navigate('#cyb-registration-form');
});
$('.cyb-error').hide();
	
	
var submitClicked =function(event) {
	
	ga('send','event', 'submitClicked');
	var isValid = true;
	var emailInput=$(".cyb-user-email");
	var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var is_email=re.test(emailInput.val());
	$('.cyb-error').hide();
	if(is_email){
		removeErrorClass('.cyb-user-email');
	}
	else{
		isValid = false;
		addErrorClass('.cyb-user-email');
	}
	
	var first_name=$('.cyb-user-firstname').val();
	if(first_name){
		removeErrorClass('.cyb-user-firstname');
	}
	else{
	isValid = false;
		addErrorClass('.cyb-user-firstname');
	}
	
	var last_name=$('.cyb-user-lastname').val();
	if(last_name){
		removeErrorClass('.cyb-user-lastname');
	}
	else{
		isValid = false;
		addErrorClass('.cyb-user-lastname');
	}
	
	if(!isValid){
		$('.cyb-error').text("*Please fill in all  fields");
		$('.cyb-error').show();
	}
	else{
		
		var candidate = {};
		candidate['firstName']= $('.cyb-user-firstname').val();
		candidate['lastName']= $('.cyb-user-lastname').val();
		candidate['email']= $('.cyb-user-email').val();
		
		$("#cyb-loader").css('display','block');
		$.ajax({
			url: "http://54.82.120.46:8080/api/candidate",
			type: "POST",
			crossDomain: true,
			data: JSON.stringify(candidate),
			contentType:"application/json",
			dataType: "json",
			success:function(result){
				if(result.status==='error'){
					$('.cyb-error').text(result.message);
					$('.cyb-error').show();
					addErrorClass('.cyb-user-firstname');
					addErrorClass('.cyb-user-lastname');
					addErrorClass('.cyb-user-email');
				}
				else{
					ga('send','event', 'submitSuccess');
					$('#cyb-code').text(result.message);
					$.mobile.navigate('#cyb-visit-us');
				}
				$("#cyb-loader").css('display','none');
				
			},
			error:function(xhr,status,error){
					$("#cyb-loader").css('display','none');
					$('.cyb-error').text(error);
					$('.cyb-error').show();
					addErrorClass('.cyb-user-firstname');
					addErrorClass('.cyb-user-lastname');
					addErrorClass('.cyb-user-email');
			}
		});
	}
};

function addErrorClass(objectClass){
	$(objectClass).parent().addClass("input-error-line");
	$(objectClass).addClass("input-error-text");
}

function removeErrorClass(objectClass){
	$(objectClass).parent().removeClass("input-error-line");
	$(objectClass).removeClass("input-error-text");
	
}

$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
	$('body').css('overflow','hidden');
	$('html').css('overflow','hidden');
	$('.cyb-logo').width('23vw');
	$('.cyb-logo').height('9vh');
	$('.cyb-main-avatar').css("margin-left","68%");
	$('.cyb-main-avatar').width('42vw');
	$('.cyb-main-avatar').height('40vh');
	$('.cyb-regvatar').width('69vw');
	$('.cyb-regvatar').height('33vh');
	$('.cyb-regvatar').css("margin-bottom","10%");
	$('.cyb-regvatar').css("margin-left","15%");
	$('cyb-woman-avatar').width('40vw');
	$('cyb-woman-avatar').height('46vh');
  }
  else // Landscape
  {
	$('body').css('overflow','visible');
	$('html').css('overflow','visible');
	$('.cyb-logo').width('15vw');
	$('.cyb-logo').height('9vh');
	$('.cyb-main-avatar').width('32vw');
	$('.cyb-main-avatar').height('40vh');
	$('.cyb-main-avatar').css("margin-left","75%");
	$('.cyb-regvatar').width('33vw');
	$('.cyb-regvatar').height('69vh');
	$('.cyb-regvatar').css('margin-left','33%');
	$('.cyb-regvatar').css('margin-bottom','15%');
	$('.cyb-woman-avatar').width('30vw');
	$('.cyb-woman-avatar').height('50vh');
	$('.cyb-woman-avatar').css('margin-left','35%');
	
  }
});

