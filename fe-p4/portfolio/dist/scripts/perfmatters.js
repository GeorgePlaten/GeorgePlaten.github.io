// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

'use strict';

function logCRP() {
  var t = window.performance.timing,
    dcl = t.domContentLoadedEventStart - t.domLoading,
    complete = t.domComplete - t.domLoading;
  var stats = document.getElementById('crp-stats');
  stats.textContent = 'DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

window.addEventListener('load', function(event) {
  logCRP();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzL3BlcmZtYXR0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1lYXN1cmluZyB0aGUgQ3JpdGljYWwgUmVuZGVyaW5nIFBhdGggd2l0aCBOYXZpZ2F0aW9uIFRpbWluZ1xuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9wZXJmb3JtYW5jZS9jcml0aWNhbC1yZW5kZXJpbmctcGF0aC9tZWFzdXJlLWNycFxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGxvZ0NSUCgpIHtcbiAgdmFyIHQgPSB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLFxuICAgIGRjbCA9IHQuZG9tQ29udGVudExvYWRlZEV2ZW50U3RhcnQgLSB0LmRvbUxvYWRpbmcsXG4gICAgY29tcGxldGUgPSB0LmRvbUNvbXBsZXRlIC0gdC5kb21Mb2FkaW5nO1xuICB2YXIgc3RhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JwLXN0YXRzJyk7XG4gIHN0YXRzLnRleHRDb250ZW50ID0gJ0RDTDogJyArIGRjbCArICdtcywgb25sb2FkOiAnICsgY29tcGxldGUgKyAnbXMnO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxvZ0NSUCgpO1xufSk7XG4iXSwiZmlsZSI6InNjcmlwdHMvcGVyZm1hdHRlcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==