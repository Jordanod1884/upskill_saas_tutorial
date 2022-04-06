class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
  
  attr_accessor :stripe_card_token
  # If pro user passes validations (email, password, etc.)
  # then call Stripe and tell Stripe to set up subscription
  # upon charging the customers card.
  # Stripe responds back with customer data.
  # Store customer.id as the customer token and save the user.
  def save_with_subscription
    if valid?
      #Add plan: plan_id, and investigate further how to start customer subscription
      customer = Stripe::Customer.create(description: email, card: stripe_card_token)
      #self.stripe_customer_token = customer.
      subscription = Stripe::Subscription.create(
          customer: customer.id, 
          items: [{
            plan: 'price_1KlEAtLhkcNsxXPypnKTWcqy' # the plan or price ID from dashboard.stripe.com
          }]
        )
      save!
    end
  end
end
