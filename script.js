var isChrome = !!window.chrome;

$(document).ready(function(){

  // apply styling based on dimensions (done in JS because of issues in Safari with vh and vw in CSS)
  var dialogs = document.getElementsByTagName('dialog');
  for (let dialog of dialogs) {
    dialog.style.width = window.innerWidth + 'px';
    dialog.style.height = window.innerHeight + 'px';
  }
  $('dialog > a').css('top', window.innerHeight / 2);

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

  function selectFilter(selection, content){
    for (var i = 0 ; i < selection.length; i++) {
       if($.inArray(selection[i], content) == -1) return false;
    }
    return true;
  }

  $('#filter').change(function(){
    var selectedClasses = $(this).val();
    $('.portfolio.internal-grid > div').each(function() {
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

  var portfolioLinks = document.getElementsByClassName('portfolio-link');
  for (let link of portfolioLinks) {
    link.addEventListener('click', function() {
      var modal = link.nextElementSibling;
      // modal.showModal(); // not currently supported in browsers other than Chrome
      modal.style.display = 'block';
      var childrenImages = modal.getElementsByTagName('img');
      for (let child of childrenImages) {
        child.style.maxHeight = Math.round(window.innerHeight * 0.80) + 'px';
        child.style.maxWidth = Math.round(window.innerWidth * 0.80) + 'px';
        child.style.marginTop = Math.round(window.innerHeight * 0.10) + 'px';
      }
      setPaginationArrows = function() {
        var imgWidth = $('dialog > img').filter(':visible').width();
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
      displayNextImage = function() {
        childrenImages[i].style.display = 'block';
        setPaginationArrows();
      }
      var i = 0;
      displayNextImage();
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
      window.onclick = function(event) {
        if (event.target == modal) {
          // modal.close(); // not currently supported in browsers other than Chrome
          modal.style.display = 'none';
        }
      }
    });
  }

  // console.log('the width of the image is: ' + childrenImages[i].offsetWidth);



});
