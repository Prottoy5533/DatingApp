import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { timeDifference } from 'src/app/date-utils';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member: Member | undefined;
  user: User | null = null;
  timeDiff: { days: number; hours: number; minutes: number; seconds: number };

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
    this.timeDiff = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
     const currentTime = new Date();
    if (!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: (member) => (
        this.member = member,
        this.timeDiff = timeDifference(currentTime, member.lastActive)
      ),

    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      },
    });
  }
}
