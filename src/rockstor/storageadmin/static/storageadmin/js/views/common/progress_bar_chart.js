/*
 *
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this page.
 *
 * Copyright (c) 2016 RockStor, Inc. <http://rockstor.com>
 * This file is part of RockStor.
 *
 * RockStor is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 *
 * RockStor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

var ProgressBarChart = Backbone.View.extend({
//     collection: ProgressData,

    initialize: function() {
        this.template = window.JST.charts_progress_bar;
        this.collection.on('add', this.addBar, this);
        this.collection.on('remove', this.removeBar, this);
    },

    addBar: function(model) {
        this.$el.append(this.template({model: model.attributes}));
        return this;
    },

    removeBar: function(model) {
        this.$('div.progress-container').has('#' + model.get('name')).remove();
        return this;
    },
});

Handlebars.registerHelper('barColor', function(percentage) {
    var type = 'progress-bar-';
    if (percentage > 90) {
        type += 'danger';
    }else if (percentage > 75){
        type += 'warning';
    }else{
        type += 'success';
    }
    return type;
});
