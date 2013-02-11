class GeosController < ApplicationController
  def new
    @geo = Geo.new
  end

  def new2
    @geo = Geo.new
  end

  def create
    Geo.create params[:geo]
    respond_to do |format|
      format.html { redirect_to root_path}
      format.js
    end
  end
  
  def show
    @geo = Geo.find params[:id]
  end

  def index
    @geos = Geo.all
  end

end
