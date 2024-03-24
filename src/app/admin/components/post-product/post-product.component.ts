import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: [ './post-product.component.scss' ]
})
export class PostProductComponent implements OnInit {
  produtForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  listOfCategories: any = [];

  constructor (
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdminService,
  ) { }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[ 0 ];
    this.previewImage()
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.produtForm = this.formBuilder.group({
      categoryId: [ null, [ Validators.required ] ],
      name: [ null, [ Validators.required ] ],
      price: [ null, [ Validators.required ] ],
      description: [ null, [ Validators.required ] ],
    });
    this.getAllCategories();
  }
  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) => {
      this.listOfCategories = res;
    })
  }

  addProduct() {

  }

}
