import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  currentPage: number = 1;
  itemsPerPage: number = 6; // change this to show 6 products per page
  totalPages: number = 1;

  constructor() { }

  /**
   * Calculate total pages based on total items
   */
  calculateTotalPages(totalItems: number): number {
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return this.totalPages;
  }

  /**
   * Return a slice of the items for the current page
   */
 paginate<T>(items: T[], page: number = this.currentPage): T[] {
  // Calculate total pages dynamically
  this.totalPages = Math.ceil(items.length / this.itemsPerPage);

  // Ensure current page is never out of bounds
  this.currentPage = Math.min(Math.max(page, 1), this.totalPages || 1); 

  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;

  console.log(`Paginating: page ${this.currentPage} of ${this.totalPages}`, { startIndex, endIndex });
  return items.slice(startIndex, endIndex);
}


  /**
   * Go to next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Go to previous page
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Set items per page
   */
  setItemsPerPage(count: number): void {
    this.itemsPerPage = count;
  }

  /**
   * Reset pagination to page 1
   */
  reset(): void {
    this.currentPage = 1;
  }
}
