import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  getWindow(): any {
    return window;
  }

  get nativeWindow(): any {
    return this.getWindow();
  }
}
