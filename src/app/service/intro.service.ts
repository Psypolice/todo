import { Injectable } from '@angular/core';
import introJs from "intro.js";

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private static INTRO_VIEWED_KEY = 'intro-viewed';
  private static INTRO_VIEWED_VALUE = 'done';

  private introJS = introJs();

  constructor() { }

  public startIntroJS(checkViewed: boolean) {
    if (checkViewed ===true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOptions(
      {
        nextLabel: 'след.>',
        prevLabel: '< пред.',
        doneLabel: 'Готово',
        skipLabel: 'Пропустить',
        exitOnEsc: true,
        exitOnOverlayClick: true
      });

    this.introJS.start();


    this.introJS.onexit(function() {
      localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE)
    });
  }
}
