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

    // Type should be default or status
    type: 'default',

    initialize: function() {
        this.template = window.JST.dashboard_cards_base;
    },

    render: function() {
        this.$el.html(this.template({title: this.title}));
        if (this.type == 'status') {
            this.$('.card-pf').addClass('card-pf-aggregate-status card-pf-accented');
        }
        this.$('.card-pf-body').append(this.bodyContent.el);
        return this;
    },
});
