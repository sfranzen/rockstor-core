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

var DashboardCard = Backbone.View.extend({
    className: 'col-xs-12 col-md-6 col-lg-3',

    initialize: function(options) {
        _.extend(this, options);
        this.template = window.JST.dashboard_cards_base;
    },

    render: function() {
        this.$el.html(this.template({view: this}));
        if (this.bodyContent)
            this.$('.card-pf-body').html(this.bodyContent.el);
        return this;
    }
});

/* The aggregate status card is smaller than a regular dashboard card and is
 * intended to display a few details and/or actions associated with a collection
 * of objects.
 */
var StatusCard = DashboardCard.extend({
    className: 'col-xs-6 col-md-3 col-lg-2',

    miniCard: false,

    initialize: function(options) {
        DashboardCard.prototype.initialize.call(this, options);
        this.template = window.JST.dashboard_cards_status;
        this.collection.on('reset', this.renderData, this);
    },

    render: function() {
        DashboardCard.prototype.render.call(this);
        this.$('.card-pf').addClass('card-pf-aggregate-status card-pf-accented');
        if (this.miniCard)
            this.$('.card-pf').addClass('card-pf-aggregate-status-mini');
        this.collection.fetch();
        return this;
    },

    renderData: function(collection) {
        this.$('.card-pf-aggregate-status-count').text(collection.length);
    }
});
