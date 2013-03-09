class GeoLine < ActiveRecord::Base
  attr_accessible :name, :delay, :geo_point_ids

  has_many :geo_points

  def array_with_points_coordinate
    geo_points.select('lat, lon').collect{ |geo|[geo.lat.to_f, geo.lon.to_f] }
  end
end
