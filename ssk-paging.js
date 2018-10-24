angular.module('ssk.paging', []).directive('sskPagination',function(){
	return {
				restrict:'E',
				
				template: function(el, attrs){
						return '<button ng-click="Prev()" data-ng-disabled="currentPage == 1" class="pagination-btns pagination-previous">Previous</button><ul class="pagination"> ' +
							'<li ' +
								'data-ng-class="{active:Item.value == currentPage}" data-ng-repeat="Item in Pages"> ' +
									'<a ' +	
										'data-ng-click="Item.click(Item)" ' +
										'data-ng-bind="Item.value">'+ 
									'</a> ' +
							'</li>' +
						'</ul><button data-ng-disabled="currentPage == lastPage" ng-click="Next()" class="pagination-btns pagination-next">Next</button>' 
				},
				
				link: function(scope, el, attrs) {	
						
						// console.log(scope);
						
						// Hook in our watched items
						scope.$watchCollection('[currentPage,lastPage,total,disabled]', function () {
						});
						generatePaginationRange(scope);
						
						
						
					},
				scope: {
					currentPage: "=",
					lastPage: "=",
					pageSize: "=",
					step: "=",
					total: "=",
					pagingAction: "&",
					disabled: "@"
				}
			}
			
			function generatePaginationRange(scope){
				scope.Pages = [];
				// add pages by number (from [start] to [finish])
						scope.Add = function(s, f) {
							for (var i = s; i < f; i++) {
								scope.Pages.push({
									value:i,
									click:function(item){
										clickPage(item);
									},
								})
							}
						},

						// add last page with separator
						scope.Last = function() {
							for (var i = 0; i < 2; i++) {
								if(i == 0){
									scope.Pages.push({
										value:'...',
										click:function(item){
										
										},
									})
								}else{
									scope.Pages.push({
										value:scope.lastPage,
										click:function(item){
											clickPage(item);
										},
									})
								}
							}
						},

						// add first page with separator
						scope.First = function() {
							
						};
						function clickPage(item){							
							scope.currentPage = item.value;
							scope.Start();
							
						};
						// previous page
						scope.Prev = function() {
							scope.currentPage--;
							if (scope.currentPage < 1) {
								scope.currentPage = 1;
							}
							scope.Start();
						};

						// next page
						scope.Next = function() {
							scope.currentPage++;
							if (scope.currentPage > scope.lastPage) {
								scope.currentPage = scope.lastPage;
							}
							scope.Start();
						};
						// find pagination
						scope.Start =  function() {
							scope.Pages = [];
							// Pass our parameters to the paging action
							scope.pagingAction({
								page: scope.currentPage,
								pageSize: scope.pageSize,
								total: scope.total
							});
							if (scope.lastPage < scope.step * 2 + 2) {
								scope.Add(1, scope.lastPage + 1);
							}
							else if (scope.currentPage < scope.step * 2 + 1) {
								scope.Add(1, scope.step * 2 + 2);
								scope.Last();
							}
							else if (scope.currentPage > scope.lastPage - scope.step * 2) {
								scope.First();
								scope.Add(scope.lastPage - scope.step * 2 - 2, scope.lastPage + 1);
							}
							else {
								scope.First();
								scope.Add(scope.currentPage - scope.step, scope.currentPage + scope.step + 1);
								scope.Last();
							}
						};
						scope.Start();
			};
			
			
			
});
