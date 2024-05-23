import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const STORE_BASE_URL = 'https://fakestoreapi.com;'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }
}
