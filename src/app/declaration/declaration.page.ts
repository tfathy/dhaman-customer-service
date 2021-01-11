import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeclarationService } from "../services/declaration.service";
import { IDeclaration } from "../shared/models/declaration";

@Component({
  selector: "app-declaration",
  templateUrl: "./declaration.page.html",
  styleUrls: ["./declaration.page.scss"],
})
export class DeclarationPage implements OnInit {
  declarations: IDeclaration[]=[];
  constructor(private router: Router, private declarationService: DeclarationService) {}

  ngOnInit() {
    this.declarationService.getAll().subscribe(data=>{
      this.declarations = data;
    })
  }
  createDeclaration() {
    this.router.navigate(["/", "declaration", "declaration-form"]);
  }
  onEdit(declaration){
    this.router.navigate(["/", "declaration", "declaration-form"]);
  }
}
