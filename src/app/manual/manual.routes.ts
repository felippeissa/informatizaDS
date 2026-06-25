import { Routes } from '@angular/router';
import { ManualLayout } from './manual-layout';
import { GodevManual } from '../godev/godev-manual';

export const manualRoutes: Routes = [
    {
        path: '',
        component: ManualLayout,
        children: [
            { path: '', component: GodevManual },
        ],
    },
];
