import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../programs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.page.html',
  styleUrls: ['./shortlist.page.scss'],
})
export class ShortlistPage implements OnInit {
  public shortListedPrograms: any;
  constructor(private programsService:ProgramsService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.programsService.getPrograms(1).subscribe(data => {
      console.log(data);
      const recommendedPrograms = [...data['programs']];
      this.shortListedPrograms = recommendedPrograms.slice(3,4);
    })
  }

  navigateToDetail(programId: Number) {
    this.router.navigate(["/categories/landing/1/programs", programId], {
      queryParams: { catId: 1 },
      relativeTo: this.route,
    });
  }

}
