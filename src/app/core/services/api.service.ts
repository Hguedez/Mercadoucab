import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.apiUrl;

  httpOptions:any = new Headers(
  {'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*'
  })
  httpOptions2:any;
  httpOptions3:any;
  constructor(protected http: HttpClient) { }
}
