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

var PoolUsageCard = DashboardCard.extend({
    title: 'Pool Usage',

    collection: new PoolCollection(),

    data: new ProgressData(),

    initialize: function() {
        DashboardCard.prototype.initialize.call(this);
        this.bodyContent = new ProgressBarChart({collection: this.data});
        this.collection.on('reset', this.update, this);
        this.collection.on('remove', this.removeModel, this);
    },

    render: function() {
        DashboardCard.prototype.render.call(this);
        this.collection.fetch();
        return this;
    },

    update: function(pools) {
        pools.each(this.addModel, this);
    },

    addModel: function(pool) {
        var sizeBytes = pool.get('size') * 1024;
        var freeBytes = pool.get('free') * 1024;
        var size = filesize(sizeBytes, {output: 'object'});
        var exp = filesize(sizeBytes, {output: 'exponent'});
        var used = filesize(sizeBytes - freeBytes, {exponent: exp, output: 'object'});
        this.data.add({
            name: pool.get('name'),
            unit: size.symbol,
            total: size.value,
            progress: used.value
        });
    },

    removeModel: function(pool) {
        this.data.destroy(
            this.data.where({name: pool.get('name')})
        );
    },
});
