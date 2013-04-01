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

<<<<<<< HEAD
  context 'array with all geo_points coordinates'
=======
  context 'array with points coordinate'
>>>>>>> 3b87b1ab57c0687962136a8f422ff7ede91bd824
    it 'should return array coordinate' do
      geo_line = Fabricate(:geo_line)
      geo_points = 2.times.collect{ Fabricate(:geo_point) }

      geo_line.geo_points = geo_points
      geo_line.save

      lat = geo_line.geo_points.first.lat
      lon = geo_line.geo_points.first.lon
<<<<<<< HEAD
      GeoLine.last.geo_points_coordinates.should eq [[lat, lon], [lat, lon]]
    end

  context 'array with part geo_point coordinates'
    let(:delay) { 1000 }
    let(:geo_points){
      geo_points = []
      4.times.each do |i|
        geo_points_past = 10.times.collect{ Fabricate(:geo_point, created_at: Time.now - i.minute) }
        geo_points.concat(geo_points_past)
      end
      geo_points
    }

    it 'success create geo_points' do
      geo_points.count.should eq 40
    end

    it 'if client time post eq delivery time' do
      geo_line = Fabricate(:geo_line, delay: delay)
      geo_line.geo_points = geo_points

      geo_line.part_coordinates_of_geo_points(Time.now).count.should eq 10
    end

    it 'if client time post > delivery_time' do
      geo_line = Fabricate(:geo_line, delay: delay)
      geo_line.geo_points = geo_points

      geo_line.part_coordinates_of_geo_points(Time.now + 0.9.minute).count.should eq 10
    end

    it 'if client time post < delivery_time' do
      geo_line = Fabricate(:geo_line, delay: delay)
      geo_line.geo_points = geo_points

      geo_line.part_coordinates_of_geo_points(Time.now - 1.minute).count.should eq 10
=======
      GeoLine.last.array_with_points_coordinate.should eq [[lat, lon], [lat, lon]]
>>>>>>> 3b87b1ab57c0687962136a8f422ff7ede91bd824
    end
end