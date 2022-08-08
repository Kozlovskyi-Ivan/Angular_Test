import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy  } from '@angular/core';
import { PopUpModalService } from 'src/app/services/pop-up-modal.service';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @Input() id!: string;
  private element: any;
  private temp: number = 0;

  constructor(private popUpService:PopUpModalService, el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }

    //before </body>
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
        if (el.target.className === 'pop-up-modal') {
            this.close();
        }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.popUpService.add(this);
    //this.popUpService;
}

// remove self from modal service when component is destroyed
ngOnDestroy(): void {
    this.popUpService.remove(this.id);
    this.element.remove();
}

// open modal
open(): void {
    this.temp++;
    console.log(this.temp);
    this.element.style.display = 'block';
    document.body.classList.add('pop-up-modal-open');
}

// close modal
close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('pop-up-modal-open');
}

}
