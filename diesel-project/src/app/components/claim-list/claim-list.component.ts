import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/Services/claim.service';
import { UserService } from 'src/app/Services/user.service';
import { Claim } from 'src/app/Models/claim';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];
  error: boolean = false;

  constructor(private claimService: ClaimService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe(userId => {
      if (userId) {
        this.getClaims(userId);
      }
    });

    this.claimService.claims$.subscribe((claims) => {
      this.claims = claims;
    });
  }

  getClaims(userId: number): void {
    this.claimService.getClaimsByUserId(userId)
      .subscribe(
        claims => this.claims = claims,
        err => {
          console.error(err);
          this.error = true;
        }
      );
  }

  editClaim(claim: Claim): void {
    this.claimService.changeCurrentClaim(claim);
  }

  deleteClaim(claimId: number): void {
    this.claimService.deleteClaim(claimId)
      .subscribe(
        () => {},
        err => {
          console.error(err);
          alert('An error occurred while deleting the claim. Please try again later.');
        }
      );
  }
}
