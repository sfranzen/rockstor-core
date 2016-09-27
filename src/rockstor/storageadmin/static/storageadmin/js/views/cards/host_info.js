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

var HostInfoView = Backbone.View.extend({
    tagName: 'dl',

    className: 'dl-horizontal',

    initialize: function() {
        this.template = window.JST.dashboard_cards_host_info;
    },

    render: function() {
        this.$el.append(this.template());
        return this;
    }
});

var HostInfoCard = DashboardCard.extend({
    title: 'System Details',

    collection: new ApplianceCollection(),

    initialize: function() {
        DashboardCard.prototype.initialize.call(this);
        this.bodyContent = new HostInfoView();
        _.bindAll(this, 'renderData', 'updateUptime', 'updateVersion', 'updateKernelVersion');
    },

    render: function() {
        DashboardCard.prototype.render.call(this);
        this.bodyContent.render();
        this.collection.fetch({success: this.renderData});
        RockStorSocket.sysinfo.on('sysinfo:uptime', this.updateUptime);
        RockStorSocket.sysinfo.on('sysinfo:software-update', this.updateVersion);
        RockStorSocket.sysinfo.on('sysinfo:kernel_info', this.updateKernelVersion);
        return this;
    },

    renderData: function(appliances) {
        current = appliances.find(function(app) {
            return app.get('current_appliance');
        });
        if (current) {
            this.$('#hostname').text(current.get('hostname'));
            this.$('#ip').text(current.get('ip'));
        }
        return this;
    },

    updateUptime: function(data) {
        this.$('#up-time').text(formatDuration(data.data));
    },

    // TODO: add link to rockstor update page
    updateVersion: function(data) {
        this.$('#version').text(data[0]);
        if (data[0] !== data[1]) {
            this.$('#version').append(' <span class="fa fa-arrow-circle-o-up"></span>');
        }
    },

    updateKernelVersion: function(data) {
        this.$('#kernel').text(data.data);
    }
});
