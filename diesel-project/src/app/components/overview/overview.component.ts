import { Component, OnInit } from '@angular/core';
import { Claim } from '../../Models/claim';
import { ClaimService } from '../../Services/claim.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  claims: Claim[] = [];
  userId: number | null = null;

  constructor(private claimService: ClaimService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserId();
    this.subscribeToClaimChanges();
  }

  subscribeToClaimChanges(): void {
    this.claimService.claims$.subscribe(claims => this.claims = claims);
  }

  getUserId(): void {
    this.userService.currentUserId.subscribe(id => this.userId = id);
  }
}
