import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface Product {
  id: number;
  part_number: string;
  remain_part_number: string;
  part_description: string;
  fg_wison_part_number: string;
  super_ss_number: string;
  weight: string;
  coo: string;
  hs_code: string;
  image: string;
  sub_category: string;
}

@Component({
  selector: 'app-adminportal',
  standalone: true,
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.scss'],
  imports: [AgGridAngular, FormsModule, ReactiveFormsModule, CommonModule],
})
export class AdminportalComponent implements OnInit {
  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];
  apiUrl = 'https://morris.koyeb.app/part';
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMjg0MTUwOSwiaWF0IjoxNzIyODQxNTA5fQ.QwY-_-nZul24Md6rC079pt8-Z1LnKJmwtXUiMNTDtrY';
  products: Product[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      part: ['', Validators.required],
      remainPartNumber: ['', Validators.required],
      partDescription: ['', Validators.required],
      fg_wison_part_number: ['', Validators.required],
      super_ss_number: ['', Validators.required],
      weight: ['', Validators.required],
      coo: ['', Validators.required],
      hsCode: ['', Validators.required],
      image: [null],
      subCategory: ['', Validators.required],
    });
  }

  http = inject(HttpClient);
  gridApi: any;
  gridColumnApi: any;
  form: FormGroup;





  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.http.get<Product[]>(`${this.apiUrl}`, { headers }).subscribe({
      next: (response) => {
    
        // this.products = [...this.products, ...response];
        this.rowData = response;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  customers: any[] = [
    {
      id: 2,
      part_number: '20007',
      remain_part_number: '',
      part_description: 'BALL',
      fg_wison_part_number: '',
      super_ss_number: '',
      weight: '0.04',
      coo: 'GB',
      hs_code: '84819000',
      image: '',
      sub_category: '',
    },
    {
      id: 3,
      part_number: '40014',
      remain_part_number: '',
      part_description: 'BEARING BALL',
      fg_wison_part_number: '',
      super_ss_number: '',
      weight: '0.04',
      coo: 'TW',
      hs_code: '84833080',
      image: '',
      sub_category: '',
    },
  ];

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  rowData: Product[] = [];

  colDefs: ColDef[] = [
    {
      headerName: 'Actions',
      pinned: 'left',
      width: 100,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.className = 'action-buttons'; // Optional: Add a wrapper class for styling

        // Edit button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary edit-btn btn-sm me-2'; // Add your Bootstrap or custom classes
        editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>'; // FontAwesome edit icon
        editButton.title = 'Edit'; // Tooltip for accessibility
        editButton.onclick = () => {
          this.editItem(params.data); // Send entire row data to edit function
        };
        container.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger delete-btn btn-sm'; // Add your Bootstrap or custom classes
        deleteButton.innerHTML = '<i class="bi bi-trash3"></i>'; // FontAwesome delete icon
        deleteButton.title = 'Delete'; // Tooltip for accessibility
        deleteButton.onclick = () => {
          this.deleteItem(params.data.id); // Send ID to delete function
        };
        container.appendChild(deleteButton);

        return container;
      },
    },
    { field: 'id', width: 100 },
    { field: 'part_number', editable: true, width: 120 },
    { field: 'remain_part_number', editable: true, width: 130 },
    { field: 'part_description', editable: true, width: 150 },
    { field: 'fg_wison_part_number', editable: true },
    { field: 'super_ss_number', editable: true },
    { field: 'weight', editable: true, width: 100 },
    { field: 'coo', editable: true, width: 100 },
    { field: 'hs_code', editable: true },
    {
      field: 'image',
      headerName: 'Image',
      cellRenderer: (params: any) => {
        if (params.value) {
          return `<img src="${params.value}" style="width: 50px; height: 50px; object-fit: cover;" />`;
        } else {
          return `<span>No image</span>`;
        }
      },
    },
    { field: 'sub_category', editable: true },
  ];

  editItem(data: Product): void {


    // Set form values based on the data from the selected row
    this.form.patchValue({
      part: data.part_number,
      remainPartNumber: data.remain_part_number,
      partDescription: data.part_description,
      fg_wison_part_number: data.fg_wison_part_number,
      super_ss_number: data.super_ss_number,
      weight: data.weight,
      coo: data.coo,
      hsCode: data.hs_code,
      image: data.image,
      subCategory: data.sub_category,
    });

    // Show the modal
    this.showModal();
  }

  deleteItem(id: number): void {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete this item?')) {
      // this.apiService.delete<any>(`${this.apiUrl}/${id}`, { headers }).subscribe({
      //   next: (response) => {
      //
      //     this.fetchData();
      //   },
      //   error: (err) => {
      //     console.error('Error occurred:', err);
      //   },
      // });
    }
  }

  showModal() {
    // const modalElement = this.modal.nativeElement;
    // modalElement.classList.add('show');
    // modalElement.style.display = 'block';
    // modalElement.setAttribute('aria-modal', 'true');
  }

  hideModal() {
    // const modalElement = this.modal.nativeElement;
    // modalElement.classList.remove('show');
    // modalElement.style.display = 'none';
    // modalElement.removeAttribute('aria-modal');
    // this.form.reset();
  }
}
