$(document).ready(function(){

  var breakHeaders = document.getElementsByClassName("break-header")
  for (var i = 0 ; i < breakHeaders.length; i++) {
    breakHeaders[i].addEventListener('click', function() {
      $(this).next().slideToggle();
    });
  }

  $('#filter').selectize({
    persist: false,
    maxItems: null,
    options: [
      /*{group: 'highlights', value: 'highlights', name: 'highlights'},*/
      {group: 'technology', value: 'python', name: 'Python'},
      {group: 'technology', value: 'r', name: 'R'},
      {group: 'technology', value: 'sql', name: 'SQL'},
      {group: 'quant', value: 'machine-learning', name: 'machine learning'},
      {group: 'quant', value: 'network-analysis', name: 'network analysis'},
      {group: 'use-case', value: 'customer-churn-prediction', name: 'customer churn prediction'},
      {group: 'use-case', value: 'credit-risk-assessment', name: 'credit risk assessment'},
      /*{group: 'use-case', value: 'customer-segmentation', name: 'customer segmentation'},*/
      {group: 'use-case', value: 'dashboards-web-apps', name: 'dashboards and web apps'},
      /*{group: 'use-case', value: 'demand-forecasting', name: 'demand forecasting'},*/
      {group: 'use-case', value: 'optimisation', name: 'optimisation'},
      {group: 'use-case', value: 'recommender-engine', name: 'recommender engine'},
      {group: 'use-case', value: 'productivity-tools', name: 'productivity tools'},
      {group: 'use-case', value: 'qualitative-choice-analysis', name: 'qualitative choice analysis'}
    ],
    optgroups: [
      /*{value: 'highlights', name: ''},*/
      {value: 'technology', name: 'technology'},
      {value: 'use-case', name: 'use case'},
      {value: 'quant', name: 'quantitative method'}
    ],
    optgroupField: 'group',
    optgroupLabelField: 'name',
    optgroupValueField: 'value',
    labelField: 'name',
    searchField: ['name'],
    placeholder: 'Filter by…',
    delimiter: ','
  });

  function selectFilter(selection, content){
    for(var i = 0 ; i < selection.length; i++){
       if($.inArray(selection[i], content) == -1) return false;
    }
    return true;
  }

  $('#filter').change(function(){
    var selectedClasses = $(this).val();
    $('.portfolio.internal-grid > div').each(function(){
      if($.isEmptyObject(selectedClasses)) {
        $(this).show()
      } else {
        if (selectFilter(selectedClasses, $(this).attr('data-filter').split(' '))) {
          $(this).show()
        } else {
          $(this).hide()
        }
      }
    });
  });

});
