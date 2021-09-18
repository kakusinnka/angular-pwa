import { Component, OnInit, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
  }

  ngOnInit() {

    // SwUpdate.isEnabled() 检查是否启用了 Angular Service Worker。
    if (this.swUpdate.isEnabled) {

      // swUpdate.available：有可用更新
      // 只要有新的应用程序版本可用，就会发出 UpdateAvailableEvent 事件。
      this.swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        if (confirm("New version available. Load New Version?")) {

          // this.swUpdate.activateUpdate：强制激活更新
          // 如果当前标签页需要立即更新到最新的应用版本，可以通过 activateUpdate() 方法来要求立即这么做
          this.swUpdate.activateUpdate().then(() => location.reload());
          // this.swUpdate.activateUpdate().then(() => console.log("app updated!!!"));
        }
      });

      // swUpdate.activated：已激活更新
      // 每当应用程序更新到新版本时，都会发出 UpdateActivatedEvent 事件。
      this.swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });

      // isStable: 返回一个 Observable，指示应用程序何时稳定或不稳定。
      this.appRef.isStable.subscribe(((isStable) => {
        if (isStable) {
          const timeInterval = interval(1000 * 60 * 1);

          timeInterval.subscribe(() => {

            // 检查更新 向服务器请求一次【ngsw.json】
            this.swUpdate.checkForUpdate().then(() => console.log('checked'));
            console.log('update checked');
          });
        }
      }));
    }
  }
}