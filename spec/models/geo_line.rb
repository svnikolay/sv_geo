require 'spec_helper.rb'

describe GeoLine do
  context '#create'
    it 'should be success' do
      geo_line_data = Fabricate.attributes_for(:geo_line)

      geo_line = GeoLine.create geo_line_data

      GeoLine.last.should eq geo_line
    end

  context 'references'
    it 'should have geo_points' do
      geo_line = Fabricate(:geo_line)
      geo_points = 4.times.collect{ Fabricate(:geo_point) }

      geo_line.geo_points = geo_points
      geo_line.save

      GeoLine.last.geo_points.size.should eq 4
    end

  context 'array with points coordinate'
    it 'should return array coordinate' do
      geo_line = Fabricate(:geo_line)
      geo_points = 2.times.collect{ Fabricate(:geo_point) }

      geo_line.geo_points = geo_points
      geo_line.save

      lat = geo_line.geo_points.first.lat
      lon = geo_line.geo_points.first.lon
      GeoLine.last.array_with_points_coordinate.should eq [[lat, lon], [lat, lon]]
    end
end