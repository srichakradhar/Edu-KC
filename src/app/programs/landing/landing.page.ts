import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CATEGORIES } from './../categories-data';
import { ProgramsService } from '../programs.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  public categories: any;
  constructor(private router:Router, private route:ActivatedRoute, private programService: ProgramsService) { }

  ngOnInit() {
    this.programService.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {title : e.title, id: e.id, count: e.programs.length}
      })
      console.log(this.categories)
    })
  }

  openCategory(category) {
    console.log(category)
    console.log(this.router)
    // /:catId/programs
    this.router.navigate(['./', category.id, 'programs'], {relativeTo: this.route});
  }
}
