var isChrome = !!window.chrome;

$(document).ready(function(){

  // display content below a header when the header is clicked on
  var breakHeaders = document.getElementsByClassName('break-header');
  for (let header of breakHeaders) {
    header.addEventListener('click', function() {
      $(this).next().slideToggle();
      if ($(this).html().substring(0, 1) == '+') {
        $(this).html('–' + $(this).html().substring(1));
      } else {
        $(this).html('+' + $(this).html().substring(1));
      }
    });
  }

  // render the select input in the portfolio section as a selectize.js input
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
      /*{group: 'use-case', value: 'credit-risk-assessment', name: 'credit risk assessment'},*/
      /*{group: 'use-case', value: 'customer-segmentation', name: 'customer segmentation'},*/
      {group: 'use-case', value: 'dashboards-web-apps', name: 'dashboards and web apps'},
      /*{group: 'use-case', value: 'demand-forecasting', name: 'demand forecasting'},*/
      {group: 'use-case', value: 'optimisation', name: 'optimisation'},
      {group: 'use-case', value: 'recommender-engine', name: 'recommender engine'},
      /*{group: 'use-case', value: 'productivity-tools', name: 'productivity tools'},*/
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

  // define a function to determine if portfolio content matches the select input
  function contentMatchesInput(selection, content){
    for (var i = 0 ; i < selection.length; i++) {
       if($.inArray(selection[i], content) == -1) return false;
    }
    return true;
  }

  // filter portfolio content in response to select input
  $('#filter').change(function(){
    var selectedClasses = $(this).val();
    $('.portfolio.internal-grid > div').each(function() {
      if($.isEmptyObject(selectedClasses)) {
        $(this).show()
      } else {
        if (contentMatchesInput(selectedClasses, $(this).attr('data-filter').split(' '))) {
          $(this).show()
        } else {
          $(this).hide()
        }
      }
    });
  });

  // display images as a modal when the relevant link is clicked on
  var portfolioLinks = document.getElementsByClassName('portfolio-link');
  for (let link of portfolioLinks) {
    link.addEventListener('click', function() {

      // correclty size and layout the dialog element
      var modal = link.nextElementSibling;
      // modal.showModal(); // not currently supported in browsers other than Chrome
      modal.style.display = 'block';
      modal.style.width = window.innerWidth + 'px';
      modal.style.height = Math.round(window.innerHeight * 1.10) + 'px';
      var childrenImages = modal.getElementsByTagName('img');

      // define function to correctly align pagination arrows with displayed image
      setPaginationArrows = function() {
        var imgWidth = $('dialog > img').filter(':visible').width();
        $('dialog > a').css('top', window.innerHeight / 2);
        $('dialog > a.pagination-left').css('left', ((window.innerWidth - imgWidth) / 2) - 25);
        $('dialog > a.pagination-right').css('right', ((window.innerWidth - imgWidth) / 2) - 25);
        $('dialog > a').show();
        if (i == 0) {
          $('a.pagination-left').hide();
        }
        if (i == childrenImages.length - 1) {
          $('a.pagination-right').hide();
        }
      }

      // define function to correctly display image within window dimensions
      displayNextImage = function() {
        childrenImages[i].style.display = 'block';
        childrenImages[i].style.maxHeight = Math.round(window.innerHeight * 0.80) + 'px';
        childrenImages[i].style.maxWidth = Math.round(window.innerWidth * 0.80) + 'px';
        childrenImages[i].style.marginTop = Math.round((window.innerHeight - childrenImages[i].offsetHeight) / 2) + 'px';
        console.log('the margin from the top is: ' + Math.round((window.innerHeight - childrenImages[i].offsetHeight) / 2));
        setPaginationArrows();
      }

      // display first image when modal is opened
      var i = 0;
      displayNextImage();

      // change the displayed image in response to arrow-key keystrokes and pagination arrow clicks
      document.addEventListener('keydown', (event) => {
        if (event.keyCode == '39' & i < childrenImages.length - 1) {
          childrenImages[i].style.display = 'none';
          i = i + 1;
          displayNextImage();
        }
        if (event.keyCode == '37' & i > 0) {
          childrenImages[i].style.display = 'none';
          i = i - 1;
          displayNextImage();
        }
        if (event.keyCode == '27') {
          modal.style.display = 'none';
        }
      });
      var paginationArrows = $('dialog > a');
      for (arrow of paginationArrows) {
        arrow.addEventListener('click', function() {
          if (this.className == 'pagination-right' & i < childrenImages.length - 1) {
            childrenImages[i].style.display = 'none';
            i = i + 1;
            displayNextImage();
          }
          if (this.className == 'pagination-left' & i > 0) {
            childrenImages[i].style.display = 'none';
            i = i - 1;
            displayNextImage();
          }
        });
      }
      modal.addEventListener('click', function(event) {
        if (event.target == modal) {
          // modal.close(); // not currently supported in browsers other than Chrome
          modal.style.display = 'none';
        }
      });
      modal.addEventListener('click touch', function(event) {
        if (event.target == modal) {
          // modal.close(); // not currently supported in browsers other than Chrome
          modal.style.display = 'none';
        }
      });

    });
  }

});
