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

// A bar chart that renders and updates automatically to a ChartData model.
var HorizontalBarChart = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change', this.render, this);
        _.bindAll(this, 'setTooltipValue');

        // Retrieve and adapt PatternFly configuration
        var config = $().c3ChartDefaults().getDefaultBarConfig();
        config.bindto = this.el;
        config.data = {
            type: 'bar',
            order: null,
            // Color to match the default PF progress bar
            color: function() { return '#39a5dc'; }
        };
        config.axis = {
            rotated: true,
            x: {
                type: 'category',
                tick: {
                    outer: false
                }
            },
            y: {
                tick: {
                    outer: false
                }
            }
        };
        config.bar = {
            width: 20
        };
        config.grid = {
            y: {
                show: false
            }
        };
        config.tooltip = {
            format: {
                value: this.setTooltipValue
            }
        };
        this.chartConfig = config;
    },

    render: function(model) {
        var categories = model.get('labels');
        var columns = [[model.get('name')].concat(model.get('values'))];
        if (!this.chart) {
            this.chartConfig.axis.x.categories = categories;
            this.chartConfig.data.columns = columns;
            this.chart = c3.generate(this.chartConfig);
        } else {
            this.chart.load({
                categories: categories,
                columns: columns
            });
        }
        this.chart.axis.labels({ y: this.model.get('unit') });

        // This produces a sleek look similar to the css-style progress bars
        this.chart.resize({ height: 50 * categories.length });
        this.$('.c3-axis .tick line').css('display', 'none');
    },

    setTooltipValue: function(name) {
        return [name, this.model.get('unit')].join(' ');
    },
});

