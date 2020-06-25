import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  updateform: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.info;
      console.log('RRRRRRRRRRRRREEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSPPPPPPPOOOOOOOOOOOONNNNNNNNNSSSSSSSSSSSEEEEEEEEEEE');
      console.log(res);
      console.log('username = '+res.info.username);
      console.log(this.currentUser);


      this.updateform.setValue({
        name: res.info.username,
        _id: res.info._id,
        password: ''
      });


    })

    this.updateform = this.fb.group({
      name: [''],
      password: [''],
      _id:['']
    })


  }

  ngOnInit() { }

  updateUser() {
    console.log("this.updateform");
    console.log(this.updateform);
    this.authService.updateuser(this.updateform.value)
  }

}
