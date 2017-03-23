/**
 * Created by macbook on 2017/3/23.
 */

$(function(){
  console.log("in this");
  var aForm = AForm();
  $('.js-add-param-btn').click(aForm.addParamRow);
  $(document).on('click', '.js-remove-row', aForm.removeParamRow);
  $(document).on('click', '.js-save-path-btn', aForm.serializeData);
});

var AForm = function() {
  var $form = $('.js-path-form');

  var _this = {
    addParamRow: function(e) {
      e.preventDefault();
      var row = Handlebars.templates.forms['param-table']({});
      $('.js-param-table tbody').append(row);
    },
    removeParamRow: function(e) {
      $(e.currentTarget).parents('tr').remove();
    },

    serializeData: function(e) {
      e.preventDefault();
      var getVal = function(name) {
        return $form.find(name).val();
      };
      var path = {};
      var pathObj = path[getVal('.js-path-value')] = {};
      var methodObj = pathObj[getVal('.js-method-value')] = {};
      methodObj['tags'] = getVal('.js-tags-value');
      methodObj['summary'] = getVal('.js-summary-value');
      methodObj['consumes'] = getVal('.js-consumes-value');
      methodObj['produces'] = getVal('.js-produces-value');
      var parameters = [];
      $form.find('.js-param-table tbody tr').each(function(i, item, a) {
        parameters.push(_this.serializeParam($(item)));
      });
      methodObj['parameters'] = parameters;
      console.log(path);

    },
    serializeParam: function(row) {
      return {
        name: row.find('input[name=name]').val(),
        in: row.find('select[name=in]').val(),
        description: row.find('input[name=description]').val(),
        required: row.find('input[name=required]').is(':checked'),
        type: row.find('select[name=type]').val()
      }
    }

  }

  return _this;

};