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

var HostInfoCard = DashboardCard.extend({
    collection: new ApplianceCollection(),

    initialize: function() {
        DashboardCard.prototype.initialize.call(this);
        this.content = window.JST.dashboard_cards_host_info;
        this.collection.on('all', this.renderData, this);
        this.collection.fetch();
        _.bindAll(this, 'renderData');
    },

    render: function() {
        this.$el.html(this.template({title: "System Details"}));
        this.$('.card-pf-body').html(this.content());
        return this;
    },

    renderData: function(model) {
        var model = this.collection.find(function(appliance) {
            return appliance.get('current_appliance');
        });

        if (model.get('current_appliance')) {
            this.$('#hostname').text(model.get('hostname'));
            this.$('#ip').text(model.get('ip'));
        }
        return this;
    },
});
