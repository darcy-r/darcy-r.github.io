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
      {group: 'highlights', value: 'highlights', name: 'highlights'},
      {group: 'use-case', value: 'customer-churn-prediction', name: 'customer churn prediction'},
      {group: 'use-case', value: 'credit-risk-assessment', name: 'credit risk assessment'},
      {group: 'use-case', value: 'demand-forecasting', name: 'demand forecasting'},
      {group: 'use-case', value: 'qualitative-choice-analysis', name: 'qualitative choice analysis'},
      {group: 'use-case', value: 'customer-segmentation', name: 'customer segmentation'},
      {group: 'use-case', value: 'recommender-engine', name: 'recommender engine'},
      {group: 'use-case', value: 'human-resources-optimisation', name: 'human resources optimisation'},
      {group: 'use-case', value: 'productivity-tools', name: 'productivity tools'},
      {group: 'technology', value: 'python', name: 'Python'},
      {group: 'technology', value: 'r', name: 'R'},
      {group: 'technology', value: 'sql', name: 'SQL'},
      {group: 'quant', value: 'machine-learning', name: 'machine learning'},
      {group: 'quant', value: 'network-analysis', name: 'network analysis'}
    ],
    optgroups: [
      {value: 'highlights', name: ''},
      {value: 'use-case', name: 'use case'},
      {value: 'technology', name: 'technology'},
      {value: 'quant', name: 'quant method'}
    ],
    optgroupField: 'group',
    optgroupLabelField: 'name',
    optgroupValueField: 'value',
    labelField: 'name',
    searchField: ['name'],
    placeholder: 'Filter by…',
    delimiter: ','
  });


  $('#filter').change(function(){
    var selectedClasses = $(this).val();
    $('.portfolio.internal-grid > div').each(function(){
      if($.isEmptyObject(selectedClasses)) {
        $(this).show()
      } else {
        if ($.inArray($(this).attr('class'), selectedClasses) < 0) {
          $(this).hide()
        } else {
          $(this).show()
        }
      }
    });
  });

});
