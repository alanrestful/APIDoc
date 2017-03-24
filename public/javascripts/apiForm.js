/**
 * Created by macbook on 2017/3/23.
 */

$(function(){
  console.log("in this");
  var $apiForm = AForm('.js-path-form');
  var $defForm = DForm('.js-definition-form');


});

var DForm = function(dom) {
  var $form = $(dom);

  var _this = {
    addDefinitionRow: function(e) {
      e.preventDefault();
      var row = Handlebars.templates.forms['properties-table']({});
      $('.js-definition-table tbody').append(row);
    },
    removeParamRow: function(e) {
      $(e.currentTarget).parents('tr').remove();
    },
    onTypeChange: function(e) {
      var s = $(e.currentTarget);
      var option = s.children(':selected');
      if (option.data('type') === 'array-object' || option.data('type') === 'object') {
        _this.getDefinitions(function(data) {
          s.parents('tr').find('td.js-items-td').html(Handlebars.templates.forms['select']({
            name: '$ref', class: 'js-items-value', data: data.map(function(item, i, array) {
              var k = Object.keys(item['definition_json'])[0];
              return {key: k, value: '#/definitions/'+k}
            })
          }));
        })
      } else if (option.data('type') === 'array-base') {
        s.parents('tr').find('td.js-items-td').html(Handlebars.templates.forms['definition-type']());
      } else {
        s.parents('tr').find('td.js-items-td').html('');
      }
    },
    serializeData: function(e) {
      var res = {};
      var model = res[$form.find('.js-model-name-value').val()] = {};
      model.type = $form.find('.js-model-type-value').val();
      var properties = {};
      $form.find('.js-definition-table tbody tr').each(function(i, item, array) {
        var property = {};
        item = $(item);
        var unit = properties[item.find('input[name=name]').val()] = {};
        var $type = item.find('select.js-type-value').children(':checked');
        unit.type = $type.val();
        unit.description = item.find('input[name=description]').val();
        if ($type.text() === 'object' || $type.text() === 'array-object') {
          var items = item.find('select.js-items-value');
          unit.items = {$ref: items.val()}
        } else if ($type.text() === 'array-base') {
          var items = item.find('select.js-items-type-value');
          unit.items = {type: items.val()};
          if (items.data('format')) {
            unit.items.format = items.data('format');
          }
        } else {
          var items = item.find('select.js-type-value').children(':checked');
          if (items.data('format')) {
            unit.format = items.data('format');
          }
        }
        // properties. =(property);
      });
      model.properties = properties;

      console.log(res);
      return res;
    },
    getDefinitions: function(success) {
      $.ajax({
        url: '/api-form/api/models?appId='+ $('.app-header').data('aid'),
        success: success,
      });
    },
    save: function(e) {
      e.preventDefault();

      var data = _this.serializeData(e);
      $.ajax({
        url: '/api-form/api/models/save',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({data: data, appId: $('.app-header').data('aid')}),
        success: function(data) {

        }
      })

    }
  };

  $(document).on('click', dom + ' .js-add-param-btn', _this.addDefinitionRow)
  $(document).on('click', dom + ' .js-remove-row', _this.removeParamRow);
  $(document).on('change', dom + ' .js-type-value', _this.onTypeChange);
  $(document).on('click', dom + ' .js-save-path-btn', _this.save);
  return _this;
};

var AForm = function(dom) {
  var $form = $(dom);

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
        type: row.find('select[name=type]').val(),
        schema: {$ref: row.find('.js-schema-value').val()}
      }
    },
    onParamPositionChange: function(e) {
      var s = $(e.currentTarget);
      if (s.val() === 'body') {
        $.ajax({
          url: '/api-form/api/models?appId='+ $form.data('appId'),
          success: function(data) {
            s.parents('tr').find('.js-type-value').addClass('hide');
            s.parents('tr').find('.js-type-td').append(Handlebars.templates.forms['select']({
              name: '$ref', class: 'js-schema-value', data: data.map(function(item, i, array) {
                var k = Object.keys(item['definition_json'])[0]
                return {key: k, value: '#/definitions/'+k}
              })
            }));
          }
        });
      } else {
        s.parents('tr').find('.js-type-value').removeClass('hide');
        s.parents('tr').find('.js-schema-value').remove();
      }
    },
    resetForm: function() {
      $form.find('input').val('');
      $form.find('tbody').html('');
    }

  };

  $('.js-path-form .js-add-param-btn').click(_this.addParamRow);
  $(document).on('click', '.js-path-form .js-remove-row', _this.removeParamRow);
  $(document).on('click', '.js-path-form .js-save-path-btn', _this.serializeData);
  $(document).on('change', '.js-path-form .js-position-value', _this.onParamPositionChange)

  return _this;

};