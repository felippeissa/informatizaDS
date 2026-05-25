import { Routes } from '@angular/router';
import { IncluirIpofTemplate } from './incluir-ipof';
import { ListaFiltrosTemplate } from './lista-filtros';

export default [
    { path: 'incluir-ipof',  data: { breadcrumb: 'Incluir IPOF' },       component: IncluirIpofTemplate },
    { path: 'lista-filtros', data: { breadcrumb: 'Lista com Filtros' },   component: ListaFiltrosTemplate },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
