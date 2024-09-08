class CreateBooks < ActiveRecord::Migration[7.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :image
      t.integer :rating

      t.timestamps
    end
  end
end
