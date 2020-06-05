import { ProgramsService } from "./programs.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.page.html",
  styleUrls: ["./programs.page.scss"],
})
export class ProgramsPage implements OnInit {
  constructor(private programService: ProgramsService) {}

  ngOnInit() {}
}
