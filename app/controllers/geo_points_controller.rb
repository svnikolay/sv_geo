# encoding: utf-8
class GeoPointsController < ApplicationController
  def new
    @geo = GeoPoint.new
  end


  def create
    geo_point = GeoPoint.create params[:geo_point]
    respond_to do |format|
      format.html { redirect_to root_path}
      format.js {@geo_points_count = geo_point.geo_line.geo_points.count}
    end
  end

  def show
    @geo = GeoPoint.find params[:id]
  end

  def index
    @geos = GeoPoint.all
  end

end
