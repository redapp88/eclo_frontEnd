import {Component, Input, OnInit} from '@angular/core';
import {AppUser} from '../../models/appUser.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input()user:any
  constructor() { }

  ngOnInit() {}

}
