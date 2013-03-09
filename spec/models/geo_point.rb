require 'spec_helper'

describe GeoPoint do
  context '#create'
    it 'should be success' do
      geo_point_data = Fabricate.attributes_for(:geo_point)
      geo_point = GeoPoint.create geo_point_data

      GeoPoint.last.should eq geo_point
    end
end