import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    if (this.members.length > 0)
      return of(this.members);
    return this.http.get<Member[]>(
      this.baseUrl + 'users'
    ).pipe(map(members => {
      this.members = members;
      return members;
    }));
  }

  getMember(username: string) {

    return this.http.get<Member>(this.baseUrl + 'users/' + username );
  }

  updateMember(member: Member)
  {
    return this.http.put(this.baseUrl + 'users', member);
  }


}
