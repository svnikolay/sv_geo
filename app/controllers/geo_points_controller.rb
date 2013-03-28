# encoding: utf-8
class GeoPointsController < ApplicationController
  def new
    @geo = GeoPoint.new
  end


  def create
    geo_line = createGeoPoints()
    respond_to do |format|
      format.html { redirect_to root_path}
      format.js {@geo_points_count = geo_line.geo_points.count}
    end
  end

  def show
    @geo = GeoPoint.find params[:id]
  end

  def index
    @geos = GeoPoint.all
  end

  def createGeoPoints
    geo_line_id = params[:geo_point][:geo_line_id]

    params[:geo_point][:lat].each_index do |index|
      lat = params[:geo_point][:lat][index]
      lon = params[:geo_point][:lon][index]
      GeoPoint.create(lat: lat, lon: lon, geo_line_id: geo_line_id)
    end
    GeoLine.find geo_line_id
  end

end
