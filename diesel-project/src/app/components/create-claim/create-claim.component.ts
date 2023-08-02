import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../Services/claim.service';
import { Claim } from '../../Models/claim';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
})
export class CreateClaimComponent implements OnInit {
  claim: Claim = {
    userId: Number(localStorage.getItem('userId')) || null,
    title: '',
    claimDetails: '',
    claimStatus: 'New',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  isEditMode = false;

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.claimService.getCurrentClaim().subscribe((claim) => {
      if (claim) {
        this.claim = claim;
        this.isEditMode = true;
      } else {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.claim = {
      userId: Number(localStorage.getItem('userId')) || null,
      title: '',
      claimDetails: '',
      claimStatus: 'New',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.isEditMode = false;
  }

  confirm(e: any): void {
    const { title, claimDetails, userId, claimStatus, createdAt, updatedAt } = this.claim;
    if (!claimDetails?.trim() || !userId || !title?.trim()) {
      notify('Please fill out all required fields', 'error', 2000);
      e.event.preventDefault();
      return;
    }
    if (this.isEditMode) {
      this.claimService.updateClaim(this.claim)
        .subscribe(
          () => {
            this.claimService.clearCurrentClaim();
          },
          (error) => {
            notify('Something went wrong. Please try again later', 'error', 2000);
          }
        );
    } else {
      this.claimService.createClaim(this.claim)
        .subscribe(
          (response) => {
            this.claimService.clearCurrentClaim();
          },
          (error) => {
            notify('Something went wrong. Please try again later', 'error', 2000);
          }
        );
    }
  }
}
