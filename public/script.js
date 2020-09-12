$(document).ready(()=>{
     $("#sign-btn").submit((e)=>{
       e.preventDefault();
       if(!numValidation()){
           return;
       }

    $("#number_page").fadeIn(5000).removeClass("active");
    
    $(".loader").css('display','block');
    $(".loader").fadeOut(1000, function() {
        $("#otp-page").addClass("active");
        $(".loader").css('display','none');        
    });
     
 
    })


const  numValidation=()=>{
          let pattern=/^[0-9]{10}$/
          let inputField=$("#inputfield").val();
          if(!inputField.match(pattern)){
                $(".err-msg").first().css("visibility","visible");
                $("fieldset").css("borderColor","red");
             return false;
          }
          else{
              return true;
          }
}



//--------------------------OTP page js------------------//
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
        console.log(next + "select")
    $(next).select();
    } 
    }
    });
    });
   

$('#submitOtpForm').submit((e)=>{
    e.preventDefault();
    let checkOtpField=/^[0-9]{4}$/;
    let digit1=$("#digit-1").val();
    let digit2=$("#digit-2").val();
    let digit3=$("#digit-3").val();
    let digit4=$("#digit-4").val();
    let otp=digit1+digit2+digit3+digit4;
    console.log(otp);
    if(!otp.match(checkOtpField)){
        $(".err-msg").last().css("visibility","visible");
        return;
    }
    window.location.href="/success";

})

// //For changing the number
$("#changeNumber").click(()=>{

// $("#number_page").addClass("active");
// $("#otp-page").removeClass("active");

$("#otp-page").fadeIn(500).removeClass("active");
    
$(".loader").css('display','block');
$(".loader").fadeOut(1000, function() {
    $("#number_page").addClass("active");
    $(".loader").css('display','none');        
});
})





})




