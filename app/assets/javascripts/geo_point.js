function GeoPoint() {

  var form_dom, this_delay, post_delay, interval, points_count = 0, coordinates_block;

  this.init = function(delay, form_id, form_post_delay){
    this_delay = delay;
    form_dom = form_id
    post_delay = form_post_delay
    coordinates_block = $(form_dom).find('#coordinates')
  };

  this.startGeoNavigation = function(){
    iterval = setInterval(createGeoPoint, this_delay);
    interval_progress_bar = setInterval(progressBar, 1000);
  }

  this.pauseGeoNavigation = function(){
    clearInterval(iterval)
    clearInterval(interval_progress_bar)
  }


  function createGeoPoint(){
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
      alert('GPS not supported');
  }


  function successCallback(position) {
    addNewInputFields(position.coords.latitude, position.coords.longitude);
    points_count++;
    trySubmitForm()
  }

  function errorCallback(error) {
    alert('Error getting GPS:'+error);
  }


  function addNewInputFields(lat, lon){
    coordinates.append('<input id="geo_point_lat" type="hidden" name="geo_point[lat][]" value='+lat+'>')
    coordinates.append('<input id="geo_point_lon" type="hidden" name="geo_point[lon][]" value='+lon+'>')
  }

  function trySubmitForm(){
    if((points_count*this_delay) > post_delay){
      $(form_dom).submit();
      coordinates_block.empty();
      points_count = 0;
    }

  }

  function progressBar(){
    now_width = parseInt($('.bar').width())
    new_width = (now_width > 300)? -100 : now_width + 100
    $('.bar').css('width', new_width + 'px');
  }
};