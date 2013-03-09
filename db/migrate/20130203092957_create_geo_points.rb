class CreateGeoPoints < ActiveRecord::Migration
  def change
    create_table :geo_points do |t|
      t.string :lat
      t.string :lon
      t.integer :geo_line_id

      t.timestamps
    end
  end
end
