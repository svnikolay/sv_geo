class GeoPoint < ActiveRecord::Base
  attr_accessible :lat, :lon, :geo_line_id, :created_at

  belongs_to :geo_line
end

