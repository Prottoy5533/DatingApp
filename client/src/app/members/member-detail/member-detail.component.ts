import { MembersService } from 'src/app/_services/members.service';
import { Member } from './../../_models/member';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { timeDifference } from 'src/app/date-utils';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';


@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule,
    TimeagoModule,
    MemberMessagesComponent,
  ],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs?: TabsetComponent;
  member: Member ={} as Member;
  messages: Message[] = [];
  xxx: Date = new Date();
  yy: Date = new Date();
  timeDiff: { days: number; hours: number; minutes: number; seconds: number };
  images: GalleryItem[] = [];
  activeTab?: TabDirective;

  constructor(
    private membersService: MembersService,
    private messageService:MessageService,
    private route: ActivatedRoute,
    public presenceService:PresenceService
  ) {
    this.timeDiff = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data=>this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
         params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.getImages();
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }

  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: (messages) => (this.messages = messages),
      });
    }
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    const currentTime = new Date();

    if (!username) return;
    this.membersService.getMember(username).subscribe({
      next: (member) => {
        (this.member = member) ;
      },
    });
  }

  getImages() {
    if (!this.member) return;

    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
}
