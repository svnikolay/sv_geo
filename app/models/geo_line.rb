class GeoLine < ActiveRecord::Base
  attr_accessible :name, :delay, :geo_point_ids

  has_many :geo_points

  def geo_points_coordinates
    objects_to_array(geo_points)
  end

  def part_coordinates_of_geo_points(time)
    #time = geo_points.last.created_at #!!!

    time_begin = time - 0.3.minute
    time_end = time
    part_geo_points = geo_points.where("created_at >= :time_begin AND created_at <= :time_end", time_begin: time_begin, time_end: time_end)

    objects_to_array(part_geo_points)
  end

  def objects_to_array(geo_points)
    geo_points.select('lat, lon').collect{ |geo|[geo.lat.to_f, geo.lon.to_f] }
  end
end
