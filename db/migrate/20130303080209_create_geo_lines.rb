class CreateGeoLines < ActiveRecord::Migration
  def change
    create_table :geo_lines do |t|
      t.string :name
      t.integer :delay
      t.timestamps
    end
  end
end
