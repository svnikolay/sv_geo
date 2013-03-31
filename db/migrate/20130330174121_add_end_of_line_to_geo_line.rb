class AddEndOfLineToGeoLine < ActiveRecord::Migration
  def change
    add_column :geo_lines, :end_of_line, :boolean, default: false
    GeoLine.all.each do |line|
      line.update_attributes end_of_line: true
    end
  end
end
