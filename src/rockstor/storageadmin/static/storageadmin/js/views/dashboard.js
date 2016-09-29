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

var DashboardLayoutView = RockstorLayoutView.extend({
    className: 'container-cards-pf',

    initialize: function() {
        this.template = window.JST.dashboard_dashboard;
        rows = [];
        rows.push(new CardRow({cards: [
            new StatusCard({
                title: 'Disks',
                collection: new DiskCollection(),
                icon: 'pficon pficon-container-node'
            }),
            new StatusCard({
                title: 'Pools',
                collection: new PoolCollection(),
                icon: 'pficon pficon-volume'
            }),
            new StatusCard({
                title: 'Shares',
                collection: new ShareCollection(),
                icon: 'pficon pficon-folder-open'
            })
        ]}));
        rows.push(new CardRow({cards: [
            new HostInfoCard(),
            new PoolUsageCard(),
            new TopSharesCard(),
        ]}));
        this.rows = rows;
    },

    render: function() {
        $('#sidebar').css('width', '200px');
        this.$el.html(this.template);
        _.each(this.rows, this.renderRow, this);
        return this;
    },

    renderRow: function(row) {
        this.$el.append(row.render().el);
    },
});
