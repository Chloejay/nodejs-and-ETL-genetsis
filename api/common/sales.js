'use strict';

const jugglerUtils = require('loopback-datasource-juggler/lib/utils');
/**
 * Merge include options of default scope with runtime include option.
 * exhibits the _.extend behaviour. Property value of source overrides
 * property value of destination if property name collision occurs
 * @param {String|Array|Object} destination The default value of `include` option
 * @param {String|Array|Object} source The runtime value of `include` option
 * @returns {Object}
 */

module.exports = function(Model) {
  let app;

  Model.once('attached', (a) => {
    app = a;

    /** *************** REMOTE HOOK *************** **/

    Model.beforeRemote('find', (ctx, _, next) => {
      let currentFilter = ctx.args.filter || {};
      let includeRelations = {};
      Object.keys(Model.relations).forEach((related) => {
        includeRelations[related] = null;
      });
      // override current filter include
      if (currentFilter.include) {
        currentFilter.include =
          jugglerUtils.mergeIncludes(includeRelations, currentFilter.include);
      } else {
        currentFilter.include =
          jugglerUtils.mergeIncludes(includeRelations, currentFilter.include);
      }

      ctx.args.filter = currentFilter;
      /* istanbul ignore next */
      next();
    });

    /** ************* OPERATION HOOK ************* **/

    Model.observe('before save', (ctx, next) => {
      ctx.hookState.relations = {};
      if (ctx.isNewInstance && ctx.instance) {
        Object.keys(Model.relations).forEach((related) => {
          ctx.hookState.relations[related] = ctx.instance[related]();
        });
      } else if (ctx.instance) {
        Object.keys(Model.relations).forEach((related) => {
          ctx.hookState.relations[related] = ctx.instance[related]();
        });
      }
      /* istanbul ignore next */
      next();
    });

    Model.observe('after save', (ctx, next) => {
      const promises = [];
      if (ctx.instance) {
        ctx.instance.modifiedAt = new Date();
        Object.keys(Model.relations).forEach((related) => {
          let promiseArray = [];
          const data = Object.values(ctx.hookState.relations[related]);
          const ids = Object.keys(ctx.hookState.relations[related]);
          if (typeof data !== 'undefined') {
            data.forEach((value, key) => {
              const relatedId = Model.relations[related].modelTo.getIdName();
              let promise = Promise.resolve('ready');
              /* istanbul ignore if [cannot access ctx object] */
              value.salesId = ctx.instance.sale_no; // eslint-disable-line
              ctx.instance[related].exists(value.id, (err, exists) => {
                if (!exists) {
                  promise = ctx.instance[related].create(value);
                } else {
                  promise = ctx.instance[related].updateById(value.item_id, value); // eslint-disable-line
                }
              });

              promise = promise.then((record) => {
                ctx.instance.__data[related] = record;
                return ctx;
              });
              promises.push(promise);
            });
          }
        });
        Promise.all(promises).then(() => next()).catch(err => next(err));
      }
    });
  });
};
