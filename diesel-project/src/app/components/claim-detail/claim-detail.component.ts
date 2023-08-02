import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Claim } from '../../Models/claim';
import { ClaimService } from '../../Services/claim.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
})
export class ClaimDetailComponent implements OnInit {
  claim?: Claim;

  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService,
    private location: Location
  ) {}

  updateClaim(): void {
    if (this.claim && this.claim.id) {
      this.claim.title = 'Updated title';
      this.claim.claimDetails = 'Updated details';

      this.claimService.updateClaim(this.claim).subscribe(
        (updatedClaim) => {
          this.claim = updatedClaim;
          this.claimService.clearCurrentClaim();
          notify('Claim updated successfully', 'success', 2000);
        },
        (error) => {
          notify('Something went wrong. Please try again later', 'error', 2000);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getClaim();
  }

  getClaim(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.claimService.getClaim(id).subscribe((claim) => (this.claim = claim));
  }

  goBack(): void {
    this.location.back();
  }

  deleteClaim(): void {
    if (this.claim && this.claim.id) {
      this.claimService.deleteClaim(this.claim.id).subscribe(() => {
        notify('Claim deleted successfully', 'success', 2000);
        this.goBack();
      });
    }
  }
}
