  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10', 
  center: campground.geometry.coordinates,
  zoom: 12 
  });
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 35})
    .setHTML(
      `<h6>${campground.title}</h6><p>${campground.location}</p>`
    )
  )
  .addTo(map)
  