import { Component, OnInit } from '@angular/core';
import { COMMUNITY_DATA } from './community-data';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  public values = COMMUNITY_DATA;
  constructor() { }

  ngOnInit() {}

}
