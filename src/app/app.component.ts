import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {

      // SwUpdate.isEnabled() 检查是否启用了 Angular Service Worker。
      if (this.swUpdate.isEnabled) {

          this.swUpdate.available.subscribe(() => {

              if(confirm("New version available. Load New Version?")) {

                  window.location.reload();
              }
          });

          // 只要有新的应用程序版本可用，就会发出 UpdateAvailableEvent 事件。
          this.swUpdate.available.subscribe(event => {
            console.log('current version is', event.current);
            console.log('available version is', event.available);
          });

          // 每当应用程序更新到新版本时，都会发出 UpdateActivatedEvent 事件。
          this.swUpdate.activated.subscribe(event => {
            console.log('old version was', event.previous);
            console.log('new version is', event.current);
          });
      }        
  }
}