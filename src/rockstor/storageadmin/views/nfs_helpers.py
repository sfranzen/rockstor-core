"""
Copyright (c) 2012-2013 RockStor, Inc. <http://rockstor.com>
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

from django.conf import settings
from storageadmin.models import (Share, NFSExport)


def client_input(export):
    eg = export.export_group
    ci = {'client_str': eg.host_str,
          'option_list': ('%s,%s,%s,no_root_squash' % (eg.editable,
                                                       eg.syncable,
                                                       eg.mount_security))}
    if (eg.nohide):
        ci['option_list'] = ('%s,nohide' % ci['options_list'])
    ci['mnt_pt'] = export.mount.replace(settings.NFS_EXPORT_ROOT,
                                        settings.MNT_PT)
    return ci

def create_nfs_export_input(exports):
    exports_d = {}
    for e in exports:
        e_list = []
        export_pt = ('%s%s' % (settings.NFS_EXPORT_ROOT, e.share.name))
        if (e.export_group.nohide):
            snap_name = e.mount.split(e.share.name + '_')[-1]
            export_pt = ('%s/%s' % (export_pt, snap_name))
        if (export_pt in exports_d):
            e_list = exports_d[export_pt]
        e_list.append(client_input(e))
        exports_d[export_pt] = e_list
    return exports_d

def parse_options(request):
    options = {
        'host_str': '*',
        'mod_choice': 'ro',
        'sync_choice': 'async',
        'security': 'insecure',
        'id': -1,
        }
    if ('host_str' in request.DATA):
        options['host_str'] = request.DATA['host_str']
    if ('mod_choice' in request.DATA):
        options['mod_choice'] = request.DATA['mod_choice']
    if ('sync_choice' in request.DATA):
        options['sync_choice'] = request.DATA['sync_choice']
    return options
