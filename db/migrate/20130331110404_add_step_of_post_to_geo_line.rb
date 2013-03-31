class AddStepOfPostToGeoLine < ActiveRecord::Migration
  def change
    add_column :geo_lines, :step_of_post, :integer
    GeoLine.all.each do |line|
      line.update_attributes step_of_post: 1.minute
    end
  end
end
