import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, Header, Footer, RouterLinkWithHref],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
