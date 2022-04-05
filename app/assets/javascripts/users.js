/* global $, Stripe */
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
    
    //Collect credit card info.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Send card info to Stripe.
    Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear,
    }, stripeResponseHandler);
    });
    
    
    //Stripe will return card token.
    //Inject card token as hidden field into form.
    //Submit form to our Rails app.

});