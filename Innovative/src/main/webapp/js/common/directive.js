/*angular.module('otc.directives', []).directive('grid', function(){
	return {
		restrict: 'EAC',
		replace: true,
		link:  function($scope, element, attrs){
			$scope.$watch("showGrid", function(newVal, oldVal){
				if(newVal){
					element.dataTable({
						aLengthMenu: [
							[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]
						],
						bRetrieve:true,
						bSearchable:true,
						bSortable:true
					});
				}
			})
		}
	}
})
*/
angular.module('otc.directives', []).directive('grid', function () {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                //
                scope.$watch('showGrid', function (newValue, oldValue) {
                    if (newValue != undefined) {
                        if (newValue.length > 0) {
                            var rows = element.find("tbody").find('tr');
                           // var fixedColumn = 6;
                            if ($.fn.dataTable.isDataTable(element)) {
                                var tbl = $(element).dataTable();
                                tbl.fnClearTable();
                                for (var i = 0; i < rows.length; i++) {
                                    tbl.fnAddData($(rows[i]));
                                }
                            }
                            else {
                                element.DataTable({ paging: true, sorting: true, "order": [[0, "asc"]], columnDefs: [{ orderable: false },] });
                            }
                            element.find('tbody').on('click', 'tr', function () {
                                $(this).addClass('selected');
                                $(this).siblings('tr').removeClass('selected');
                            });
                            element.fadeIn();
                        }
                    }
                }, true);
            }
        }
    });
app.directive('inputCurrency', function ($filter, $locale) {
    return {
        terminal: true,
        restrict: 'A',        
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {

            if (!ngModel)
                return; // do nothing if no ng-model

            // get the number format
            var formats = $locale.NUMBER_FORMATS;

            // fix up the incoming number to make sure it will parse into a number correctly
            var fixNumber = function (number) {
                if (number) {
                    if (typeof number !== 'number') {
                        number = number.replace(',', '');
                        number = parseFloat(number);
                    }
                }
                return number;
            }

            // function to do the rounding
            var roundMe = function (number) {
                number = fixNumber(number);
                if (number) {
                    return $filter('number')(number, 0);
                }
            }

            // Listen for change events to enable binding
            element.bind('blur', function () {                                
                element.val(roundMe(ngModel.$modelValue));
            });          

            // push a formatter so the model knows how to render
            ngModel.$formatters.push(function (value) {
                if (value) {
                    return roundMe(value);
                }
            });

            // push a parser to remove any special rendering and make sure the inputted number is rounded
            ngModel.$parsers.push(function (value) {
                return value;
            });
        }
    };
});