import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [

  ],
  standalone: true,
})
export default class HomeComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  isAuthenticated = false;




}