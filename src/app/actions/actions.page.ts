import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  public items: any = [];

  constructor(private contacts: Contacts, private plt: Platform) {   
    this.plt.ready().then((readySource) => {
       console.log('Platform ready from', readySource);
       // Platform now ready, execute any required native code
      //  this.initContacts();
     });
    this.items = [
      { title: "Ask a teacher or principal at your school", expanded: false},
      { title: "Contact community organizations", expanded: false },
      { title: "Talk to other parents, guardians, and grandparents", expanded: false },
      { title: "Call or email local child care resource and referral office", expanded: false },
      { title: "Afterschool is often part of larger programs", expanded: false },
    ];
  }

  initContacts(): void {
    // let contact: Contact = this.contacts.create();
 
    // contact.name = new ContactName(null, 'Smith', 'John');
    // contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    // contact.save().then(
    //   () => console.log('Contact saved!', contact),
    //   (error: any) => console.error('Error saving contact.', error)
    // );
 
    // If you want to open the native contacts screen and select the contacts from there use pickContact()
 
    this.contacts.pickContact()
                 .then((response: Contact) => { 
                    console.log(response)
                 });
 }

  expandItem(index): void {
    let item = this.items[index];
    console.log("1223")
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ngOnInit() {
  }

}
