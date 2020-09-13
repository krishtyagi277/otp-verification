
$(document).ready(()=>{

     let phoneNumber = "";

    //----------------Sign In Form submit Js--------------------------//
     $("#sign-btn").submit((e)=>{
       e.preventDefault();
       if(!numValidation()){
           return;
       }

      phoneNumber=$("#inputfield").val();
      
      $.post("http://localhost:4000/generateotp",{phoneNumber},(result)=>{
                localStorage.setItem("data",JSON.stringify(result));
      })

    $("#number_page").fadeIn(5000).removeClass("active");
    $(".loader").css('display','block');
    $(".loader").fadeOut(1000, function() {
        $("#otp-page").addClass("active");
        $(".loader").css('display','none');        
    });
    })

//-------- Validate phone number ------ //
const  numValidation=()=>{
          let pattern=/^[0-9]{10}$/
          let inputField=$("#inputfield").val();
          if(!inputField.match(pattern)){
                $(".err-msg").first().css("visibility","visible");
                $("fieldset").css("borderColor","red");
                setTimeout(function(){
                    $(".err-msg").first().css("visibility","hidden");
                    $("fieldset").css("borderColor","#ffe4ad");
                }, 5000);
             return false;
          }
          else{
            $("#showNumber").text(inputField);
              return true;
          }
}



//-------------------------------OTP page input fields js---------------------------------//
$('.digit-group').find('input').each(function() {
    $(this).attr('maxlength', 1);
    $(this).on('keyup', function(e) {
    var parent = $($(this).parent());
 

    if(e.keyCode === 8 || e.keyCode === 37) {
    var prev = parent.find('input#' + $(this).data('previous'));
    if(prev.length) {
    $(prev).select();
    }

    } 
    else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
      
        var next = parent.find('input#' + $(this).data('next'));
    
    if(next.length) {
    $(next).select();
    } 
    }
    });
    });
   
//--------------------Otp validation and submission----------------
$('#submitOtpForm').submit((e)=>{
    e.preventDefault();
    let checkOtpField=/^[0-9]{4}$/;
    let digit1=$("#digit-1").val();
    let digit2=$("#digit-2").val();
    let digit3=$("#digit-3").val();
    let digit4=$("#digit-4").val();
    let otp=digit1+digit2+digit3+digit4;
    if(!otp.match(checkOtpField)){
        $(".err-msg").last().css("visibility","visible");
        $(".err-msg").last().html("! Please Enter Valid OTP")
        warningBorder();
        return;
    }
    // get data from local storage
    let data = JSON.parse(localStorage.getItem("data"));
    if(data.otp==otp){// success
        $("#otp-page").removeClass("active");
        $(".loader").css('display','block');

        $(".loader").fadeOut(1000, function() {
         setCookie("username",data.phoneNumber,"10")
         window.location.href="/success";
        $(".loader").css('display','none');
    });
    }
    else{// failiure
        $(".err-msg").last().css("visibility","visible");
        $(".err-msg").last().html("! Invalid OTP")
        warningBorder();
        return;
    }
})

const warningBorder = ()=>{
    $("#digit-1").css("border", "1px solid red");
    $("#digit-2").css("border", "1px solid red");
    $("#digit-3").css("border", "1px solid red");
    $("#digit-4").css("border", "1px solid red");
    setTimeout(function(){
                    $(".err-msg").last().css("visibility","hidden");
                    $("#digit-1").css("border", "1px solid #99AAAB");
                    $("#digit-2").css("border", "1px solid #99AAAB");
                    $("#digit-3").css("border", "1px solid #99AAAB");
                    $("#digit-4").css("border", "1px solid #99AAAB");
                }, 5000);
}


// --------------------For changing the number------------------//
$("#changeNumber").click(()=>{
$("#otp-page").fadeIn(500).removeClass("active");
    
$(".loader").css('display','block');
$(".loader").fadeOut(1000, function() {
    $("#number_page").addClass("active");
    $(".loader").css('display','none');        
});
})

//----------------Function for cookie---------------------//
const setCookie = (cname, cvalue, exdays) =>{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/success";
    }

})




