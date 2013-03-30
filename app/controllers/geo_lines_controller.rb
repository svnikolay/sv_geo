# encoding: utf-8
class GeoLinesController < ApplicationController
  def index
    @geo_lines = GeoLine.all
  end

  def new
    @geo_line = GeoLine.new
    @geo_point = GeoPoint.new
  end


  def create
    respond_to do |format|
      format.js  { @geo = GeoLine.create params[:geo_line] }
      format.html { redirect_to root_path, notice: 'Успешно создан' }
    end
  end


  def show
    @geo_line = GeoLine.find params[:id]
    @@x = @@x || @geo_line.geo_points.first.created_at
    @@x = @@x + 0.3.minute

    @points_array = @geo_line.part_coordinates_of_geo_points(@@x)
    @id = @geo_line.id

    respond_to do |format|
      format.js
      format.html
      format.json { render json: @points_array }
    end
  end
end