// adapted from http://kilianvalkhof.com/2010/javascript/how-to-build-a-fast-simple-list-filter-with-jquery/
// with the optimizations indicated in the comments (caching the list)


/*
(function ($) {
  // custom css expression for a case-insensitive contains()
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };


  function listFilter(header, list) { // header is any element, list is an unordered list

    $("#journal_list_filter")
      .change( function () {
        var filter = $(this).val();
        if(filter) {
          // this finds all links in a list that contain the input,
          // and hide the ones not containing the input while showing the ones that do
          $matches = $(list).find('a:Contains(' + filter + ')').parent();
          $('li', list).not($matches).slideUp();
          $matches.slideDown();
        } else {
          $(list).find("li").slideDown();
        }
        return false;
      })
    .keyup( function () {
        // fire the above change event after every letter
        $(this).change();
    });
  }


  //ondomready
  $(function () {
    listFilter($("#journal_list"), $("#list"));
  });
}(jQuery));



function set_search_form(search_selector, search_string) {
  if (search_string == '') {
      search_string = 'filter this list...';
  }

  $(search_selector).val(search_string);
  $(search_selector).focus(
    function() {
     if ($(this).val() == search_string) {
       jQuery(this).val('');
     }
    });
  $(search_selector).blur(
    function() {
     if ($(this).val() == '') {
       $(this).val(search_string);
     }
    });
}
*/

function sort_journals(a,b) {
  var astring = a.TITLE.toLowerCase().split(' ').join('');
  var bstring = b.TITLE.toLowerCase().split(' ').join('');
  if (astring < bstring) {return -1}
  if (astring > bstring) {return 1}
  return 0;
}

function create_catalog_link(bibid) {
 // return "https://catalog.library.cornell.edu/cgi-bin/Pwebrecon.cgi?BBID=" + bibid + "&DB=local";
  return "https://newcatalog.library.cornell.edu/catalog/" + bibid;
}

function enable_alpha_nav() {

    $('a.alpha_nav').each (function () {
        var url = $(this).attr('href');

        $(this).removeAttr('onclick');
        $(this).attr('href', 'javascript: void(0)');

        $(this).click(function() {
            display_journal_list(url);
            $('a.alpha_nav').removeClass('ln-selected');
            $(this).addClass('ln-selected');
        });

    });
}

function display_journal_list(get_list_url) {

    var hideThis = "#journal_list_spinner";
    var populateThis = "#journal_list #list";

    $(populateThis).empty();

    $.getJSON(get_list_url, function(data) {
      $(hideThis).removeAttr('style');
      if (data.results) {
          data.results.sort(sort_journals);

          var num = 0;
          $.each(data.results, function(key, value) {
            var zebra_class = 'odd';
            if (num %2 == 0) {
                zebra_class = 'even';
            }
            var displayThis = '<a href="' + create_catalog_link(value.BIB_ID) + '">' + value.TITLE.replace(/\?\?/g, "") + '</a>: ' + value.DISPLAY_CALL_NO;
            $(populateThis).append($("<li></li>").addClass(zebra_class).html(displayThis));
            num++;
          });
      } else {
          $(populateThis).html("No items to display.");
      }
      $(hideThis).attr('style', 'display: none');
    });

}

