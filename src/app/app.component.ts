import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profile: LIFFUserProfile;
  message: string;
  title = 'liff-demo';
  ngOnInit() {
    new Promise<LIFFUserProfile>(resolve => {
      liff.init(data => {
        // https://developers.line.biz/en/reference/liff/#initialize-liff-app
        // data.language == "zh-TW"
        // data.context.type = utou | room | group | none
        // data.context.utouId
        // data.context.roomId
        // data.context.groupId
        // data.context.userId
        // data.context.viewType = compact | tall | full
        resolve(liff.getProfile());
      }, err => {
        // LIFF initialization failed
        // err.code;
      });
    })
      .then((profile) => {
        // profile.userId
        // profile.displayName
        // profile.pictureUrl
        // profile.statusMessage
        this.profile = profile;
        if (profile.displayName === 'CK Sun') {
          this.message = 'Hello';
        } else {
          this.message = 'Hi';
        }
      });
  }
}
