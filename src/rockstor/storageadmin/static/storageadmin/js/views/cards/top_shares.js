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

var TopSharesCard = DashboardCard.extend({
    title: 'Top Shares by Size',

    collection: new ShareCollection(),

    model: new ChartData({name: 'Shares'}),

    initialize: function() {
        DashboardCard.prototype.initialize.call(this);
        this.bodyContent = new HorizontalBarChart({model: this.model});
        _.bindAll(this, 'updateModel');
    },

    render: function() {
        DashboardCard.prototype.render.call(this);
        this.collection.fetch({success: this.updateModel});
        return this;
    },

    updateModel: function(collection) {
        var biggest = collection.first().get('rusage') * 1024;
        var exponent = filesize(biggest, {output: 'exponent'});
        this.model.set({
            unit: filesize(biggest, {output: 'object'}).symbol,
            labels: collection.pluck('name'),
            values: collection.map(function(share) {
                return filesize(share.get('rusage') * 1024,
                                {exponent: exponent, output: 'object'}).value;
            }),
        });
        return this;
    }
});
