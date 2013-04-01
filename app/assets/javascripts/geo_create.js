function GeoCreate() {

  var form_dom, this_delay;

  this.init = function(delay, form_id){
    this_delay = delay;
    form_dom = form_id
  };

  this.startGeo = function(){
    setInterval(getGeo, this_delay);
    setInterval(progressBar, 1000);
  }


  function getGeo(){
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
      alert('GPS not supported');
  }


  function successCallback(position) {
    $('#points_count_local').append("A_")
    $("#geo_point_lat")[0].value = position.coords.latitude;
    $("#geo_point_lon")[0].value = position.coords.longitude;
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