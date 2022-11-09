import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  constructor(private formbuilder: FormBuilder, private api: ApiService,
    private matdailog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA ) public editdata:any ){ }
  userForm!: FormGroup;
  actionBtn: string = "save";
  ngOnInit(): void {
    
    this.userForm = this.formbuilder.group({
      
      Name: ['', Validators.required],
      Email: ['', Validators.required]

    });

    if (this.editdata) {
      this.actionBtn="update"
      this.userForm.controls["Id"].setValue(this.editdata.Id);
      this.userForm.controls["Name"].setValue(this.editdata.Name);
      this.userForm.controls["Email"].setValue(this.editdata.Email);
    }

  }
  adduser() {
    // console.log(this.userForm.value);
    if (!this.editdata) {
      if (this.userForm.valid) {
        this.api.postuser(this.userForm.value)
          .subscribe({
            next: (res) => {
              alert("add");
              this.userForm.reset();
              this.matdailog.close('save');
            },
            error: () => { alert("error") }
          })
      }
    }
    else {
      this.updateUser();
      

    }
  }
    updateUser(){
      this.api.putuser(this.userForm.value , this.editdata.id)
        .subscribe({
          next: (res) => {
            alert("add");
            this.userForm.reset();
            this.matdailog.close('update');
          },
          error: () => { alert("error") }
        })
    }
   
  
 

}
