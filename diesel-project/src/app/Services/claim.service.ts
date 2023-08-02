import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Claim } from 'src/app/Models/claim';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'https://localhost:7200/claim';
  private currentClaim = new BehaviorSubject<Claim | null>(null);
  private currentClaim$ = this.currentClaim.asObservable();

  private claims = new BehaviorSubject<Claim[]>([]);
  public claims$ = this.claims.asObservable();

  constructor(private http: HttpClient) { }

  getClaimsByUserId(userId: number): Observable<Claim[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Claim[]>(url).pipe(
      tap((claims) => {
        this.claims.next(claims);
      })
    );
  }

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl).pipe(
      tap((claims) => {
        this.claims.next(claims);
      })
    );
  }

  getClaim(id: number): Observable<Claim> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Claim>(url);
  }

  updateClaim(claim: Claim): Observable<any> {
    const url = `${this.apiUrl}/${claim.id}`;
    return this.http.put(url, claim)
      .pipe(tap(() => {
        this.currentClaim.next(claim);
      }));
  }

  createClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim)
      .pipe(tap((newClaim) => {
        this.currentClaim.next(newClaim);
        this.addClaim(newClaim);
      }));
  }

  deleteClaim(id: number): Observable<Claim> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Claim>(url).pipe(
      tap(() => {
        const updatedClaims = this.claims.value.filter(claim => claim.id !== id);
        this.claims.next(updatedClaims);
      })
    );
  }

  getCurrentClaim(): Observable<Claim | null> {
    return this.currentClaim$;
  }

  changeCurrentClaim(claim: Claim): void {
    this.currentClaim.next(claim);
  }

  addClaim(claim: Claim): void {
    const currentClaims = this.claims.value;
    this.claims.next([...currentClaims, claim]);
  }

  clearCurrentClaim(): void {
    this.currentClaim.next(null);
  }
}
