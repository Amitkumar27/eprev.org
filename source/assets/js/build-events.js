if (window.EventSource) {
  var source = new EventSource('/build-events');
  source.addEventListener('build-success', event => {
    location.reload();
  });
  source.addEventListener('build-error', event => {
    const error = JSON.parse(event.data);
    console.info(error);
  });
}
