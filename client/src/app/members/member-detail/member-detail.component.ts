import { MembersService } from 'src/app/_services/members.service';
import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { timeDifference } from 'src/app/date-utils';

@Component({
  selector: 'app-member-detail',
  standalone:true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports:[CommonModule,TabsModule,GalleryModule,TimeagoModule]
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  xxx: Date = new Date();
  yy: Date = new Date();
  timeDiff: { days: number, hours: number, minutes: number, seconds: number };
  images:GalleryItem[]=[];


  constructor(private membersService: MembersService, private route: ActivatedRoute) {
    this.timeDiff = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    const username = this.route.snapshot.paramMap.get('username');
    const currentTime = new Date();

    if (!username) return;
    this.membersService.getMember(username).subscribe({
      next:member=>{
        (this.member = member),
          this.getImages(),
          (this.timeDiff = timeDifference(currentTime, member.lastActive));
      }
    })
  }

  getImages(){
    if (!this.member) return;

    for(const photo of this.member.photos){
      this.images.push(new ImageItem({src:photo.url, thumb:photo.url}))
    }

  }

}
