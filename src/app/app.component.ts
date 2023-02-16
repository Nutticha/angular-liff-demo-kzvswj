import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
import { Observable } from 'rxjs';

type UnPromise<T> = T extends Promise<infer X> ? X : T;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  os: ReturnType<typeof liff.getOS>;
  profile: LIFFUserProfile;
  message: string;
  title = 'liff-demo';
  ngOnInit(): void {
    liff
      .init({ liffId: '1657913371-rgJXaEG9' })
      .then(() => {
        this.os = liff.getOS();
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              profile.email = liff.getDecodedIDToken().email;
              this.profile = profile;
            })
            .catch(console.error);
        } else {
          liff.login();
        }
      })
      .catch(console.error);
    // new Promise<LIFFUserProfile>(resolve => {
    //   liff.init(data => {
    //     // https://developers.line.biz/en/reference/liff/#initialize-liff-app
    //     // data.language == "zh-TW"
    //     // data.context.type = utou | room | group | none
    //     // data.context.utouId
    //     // data.context.roomId
    //     // data.context.groupId
    //     // data.context.userId
    //     // data.context.viewType = compact | tall | full
    //     resolve(liff.getProfile());
    //   }, err => {
    //     // LIFF initialization failed
    //     // err.code;
    //   });
    // })
    //   .then((profile) => {
    //     // profile.userId
    //     // profile.displayName
    //     // profile.pictureUrl
    //     // profile.statusMessage
    //     this.profile = profile;
    //     if (profile.displayName === 'CK Sun') {
    //       this.message = 'Hello';
    //     } else {
    //       this.message = 'Hi';
    //     }
    //   });
  }
}
