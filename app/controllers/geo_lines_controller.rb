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
      format.html {
        geo_line = GeoLine.find params[:geo_line][:id]
        geo_line.update_attributes end_of_line: true
        redirect_to root_path, notice: 'Успешно создан'
      }
    end
  end

  def show
    @geo_line = GeoLine.find params[:id]

    @points_array = @geo_line.part_coordinates_of_geo_points(Time.now,  @geo_line.step_of_post/1000)
    @url = "/geo_lines/#{@geo_line.id}"
    @end_of_line = @geo_line.end_of_line
    @delay = @geo_line.delay
    @step_of_post = @geo_line.step_of_post
    @part_geo_points= @geo_line.part_geo_points(Time.now,  @geo_line.step_of_post/1000)

    respond_to do |format|
      format.html
      format.json { render json: { points_array: @points_array, end_of_line: @end_of_line, point_ids: @part_geo_points.pluck(:id) }}
    end
  end

  def show_model
    @geo_line = GeoLine.find params[:id]
    @@x = @@x || @geo_line.geo_points.first.created_at
    @@x = @@x +  @geo_line.step_of_post/1000

    @points_array = @geo_line.part_coordinates_of_geo_points(@@x,  @geo_line.step_of_post/1000)
    @delay = 1000
    @url = "/geo_lines/#{@geo_line.id}/show_model"
    @end_of_line = @geo_line.end_of_line && (@@x > @geo_line.geo_points.last.created_at)
    @step_of_post = @geo_line.step_of_post
    @part_geo_points= @geo_line.part_geo_points(@@x,  @geo_line.step_of_post/1000)

    respond_to do |format|
      format.html { render 'show' }
      format.json { render json: { points_array: @points_array, end_of_line: @end_of_line, point_ids: @part_geo_points.pluck(:id) }}
    end
  end

  def show_full_line
    @geo_line = GeoLine.find params[:id]
    @points_array = @geo_line.full_geo_points()
    @url = "/geo_lines"
    @end_of_line = true
    @step_of_post = @geo_line.step_of_post

    render 'show'
  end
end