"""
Copyright (c) 2016 RockStor, Inc. <http://rockstor.com>
This file is part of RockStor.

RockStor is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published
by the Free Software Foundation; either version 2 of the License,
or (at your option) any later version.

RockStor is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
"""

from django.conf.urls import patterns, url
from storageadmin import views


urlpatterns = patterns(
    '',
    url(r'^$', views.SnapperConfigList.as_view()),
    url(r'^/([\w-]+)$', views.SnapperConfigDetail.as_view()),
    url(r'^/([\w-]+)/snapshots$', views.SnapperSnapshotList.as_view()),
    url(r'^/([\w-]+)/snapshots/([0-9]+)$',
        views.SnapperSnapshotDetail.as_view()),
)