class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.string :first_name
      t.string :last_name
      t.string :club_name
      t.string :phone_number
      t.string :contact_email
      t.string :description
      t.timestamps
    end
  end
end
