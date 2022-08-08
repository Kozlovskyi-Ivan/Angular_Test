import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpModalService {

  private modals: any[] = [];

  constructor() { }

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find(x => x.id === id);
    console.log(id);
    console.log(this.modals);
    modal.open();
  }

  close(id: string) {
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }

}
