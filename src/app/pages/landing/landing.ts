import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
