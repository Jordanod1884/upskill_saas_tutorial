/* global $, Stripe,  */
//Document ready.
$(document).on('turbolinks:load', function(){
        var theForm = $('pro_form');
        var submityBtn = $('#form-submit-btn');
        
        //Set Stripe public key.
        Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
        
        //When user clicks form submit 
        submityBtn.click(function(event){
        //prevent default submission button.
        event.preventDefault();
        submityBtn.val("Processing").prop('disabled',true);
        
        //Collect credit card info.
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        //Use Stripe JS library to check for card errors
        var error = false;
        
        //Validate card number
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert("The credit card number appears to be invalid")
        }
        
        //Validate card number
        if(!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert("The CVC number appears to be invalid")
        }
        
        //Validate card number
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
            error = true;
            alert("The expiration date appears to be invalid")
        }
        
        if(error){
        //If there are card errors, dont send to stripe
        submityBtn.prop('disabled', false).val("Sign Up")
        }else{
            
            //Send card info to Stripe.
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear,
            }, stripeResponseHandler); 
        }
            
        return false;
    });
    
    //Stripe will return card token.
    function stripeResponseHandler(status, response){
        //Get token from response
        var token = response.id;
        
        //Inject card token as hidden field into form.
        theForm.append($('<input type = "hidden" name="user[stripe_card_token]">').val(token) );
        
        //Submit form to our Rails app.
        theForm.get(0).submit();
    }

});