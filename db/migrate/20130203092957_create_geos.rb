class CreateGeos < ActiveRecord::Migration
  def change
    create_table :geos do |t|
      t.string :lat
      t.string :lon

      t.timestamps
    end
  end
end
