class GeoLine < ActiveRecord::Base
  attr_accessible :name, :delay, :geo_point_ids

  has_many :geo_points

  def geo_points_coordinates
    geo_points.select('lat, lon').collect{ |geo|[geo.lat.to_f, geo.lon.to_f] }
  end

  def part_coordinates_of_geo_points(time)
    time_begin = time - 1.minute
    time_end = time
    geo_points.where("created_at >= :time_begin AND created_at <= :time_end", time_begin: time_begin, time_end: time_end)
  end
end
