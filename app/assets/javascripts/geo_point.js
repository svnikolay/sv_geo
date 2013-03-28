function GeoPoint() {

  var form_dom, this_delay;

  this.init = function(delay, form_id){
    this_delay = delay;
    form_dom = form_id
  };

  this.startGeoNavigation = function(){
    setInterval(createGeoPoint, this_delay);
    setInterval(progressBar, 1000);
  }


  function createGeoPoint(){
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
      alert('GPS not supported');
  }


  function successCallback(position) {
    $("#geo_point_lat").val(position.coords.latitude);
    $("#geo_point_lon").val(position.coords.longitude);
    $(form_dom).submit();
  }

  function errorCallback(error) {
    alert('Error getting GPS:'+error);
  }


  function progressBar(){
    now_width = parseInt($('.bar').width())
    new_width = (now_width > 300)? -100 : now_width + 100
    $('.bar').css('width', new_width + 'px');
  }
};