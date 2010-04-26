jQuery(document).ready(function($) {
  var UNPROCESSABLE_ENTITY = 422;
  $.extend({
    failable: function(selector, options) {
      var defaults = {
        errorContainer: 'li',
        errorClass: 'error',
        messageClass: 'message',
        makeError: function(msg) {
          var elt = $('<p>' + msg + '</p>');
          return elt;
        }
      };
      var opts = $.extend(defaults, options);
      var resetForm = function($f) {
        $f.find('.alert').show();
        $f.find('.' + opts.messageClass).remove();
        $f.find('.' + opts.errorClass).removeClass('error');
      };
      $(selector).live('ajax:failure', function(event, xhr, status) {
        if (xhr.status == UNPROCESSABLE_ENTITY) {
          var data = JSON.parse(xhr.responseText);
          var $form = $(this);
          resetForm($form);
          $.each(data, function(model) {
            $.each(this, function(field) {
              var name = model + '[' + field + ']';
              var elt = $('[name=' + name + ']', $form);
              $.each(this, function() {
                var msg = opts.makeError(this).addClass(opts.messageClass);
                elt.parent().append(msg);
              });
              $(elt, $form).closest(opts.errorContainer).addClass(opts.errorClass);
            });
          });
        }
      });
      $(selector).live('ajax:success', function(event, data, status) {
        resetForm($(this));
        $('.success', this).show();
      });
    }
  });
});