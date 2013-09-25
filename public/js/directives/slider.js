angular.module('rm.slider.directive', [])
.directive('slider', function() {
  return {
    scope: {
      name: '@'
    },
    templateUrl: '../views/slider.html',
    link: function(scope, elm, attrs) {
      scope.$watch('name', function() {
        if(scope.name === 'budgetSlider') {
          $('#budgetSlider').slider({
            min: 10,
            max: 2000,
            step: 5,
            //value: [attrs.minimum, attrs.minimum]
            value: [750, 1500]
          });
          scope.minValue = '$10';
          scope.maxValue = '$2000k+';
        } else if( scope.name === 'durationSlider') {
          $('#durationSlider').slider({
            min: 1,
            max: 36,
            step: 1,
            // value: [attrs.minimum, attrs.maximum]
            value: [6, 20]
          });
          scope.minValue = '1';
          scope.maxValue = '36+ mos';
        }
      });
    }
  };
});
