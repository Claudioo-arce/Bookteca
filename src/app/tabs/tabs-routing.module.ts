import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'chat',
        loadChildren: () =>
          import('../pages/chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../pages/perfil/perfil.module').then((m) => m.PerfilPageModule),
      },
      {
        path: 'historial',
        loadChildren: () =>
          import('../pages/historial/historial.module').then((m) => m.HistorialPageModule),
      },
      {
        path: 'favoritos',
        loadChildren: () =>
          import('../pages/favoritos/favoritos.module').then((m) => m.FavoritosPageModule),
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
