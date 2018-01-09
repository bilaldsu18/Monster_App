import { BlockCycleComponent } from './components/block-cycle/block-cycle.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 

 
const routes: Routes = [
    { 
      path: '',
      loadChildren: './pages/starter/starter.module' 
    },
    { 
      path: 'blank',
      loadChildren: './pages/blank/blank.module' 
    },{ 
      path: 'accordion',
      loadChildren: './pages/component/accordion/accordion.module' 
    },{ 
      path: 'alert',
      loadChildren: './pages/component/alert/alert.module' 
    },{ 
      path: 'carousel',
      loadChildren: './pages/component/carousel/carousel.module' 
    },{ 
      path: 'datepicker',
      loadChildren: './pages/component/datepicker/datepicker.module' 
    },{ 
      path: 'dropdown', 
      loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module' 
    },{ 
      path: 'modal',
      loadChildren: './pages/component/modal/modal.module' 
    },{ 
      path: 'pagination',
      loadChildren: './pages/component/pagination/pagination.module' 
    },{ 
      path: 'Popovertooltip',
      loadChildren: './pages/component/popover-tooltip/popover-tooltip.module' 
    },{ 
      path: 'progressbar',
      loadChildren: './pages/component/progressbar/progressbar.module' 
    },{ 
      path: 'rating',
      loadChildren: './pages/component/rating/rating.module' 
    },{ 
      path: 'tabs',
      loadChildren: './pages/component/tabs/tabs.module' 
    },{ 
      path: 'timepicker',
      loadChildren: './pages/component/timepicker/timepicker.module' 
    },{ 
      path: 'typehead',
      loadChildren: './pages/component/typehead/typehead.module' 
    },{ 
      path: 'fontawesome',
      loadChildren: './pages/icons/fontawesome/fontawesome.module' 
    },{ 
      path: 'simpleline',
      loadChildren: './pages/icons/simpleline/simpleline.module' 
    },
    { path: 'blockcycle',
      data: {
      title: 'Block Cycle',
      urls: [{title: 'Dashboard',url: '/'},{title: 'Block Cycle'}]
    }, component: BlockCycleComponent },
  ];
   
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}