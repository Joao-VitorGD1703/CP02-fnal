import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../interfaces/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private fornecedorUrl = "http://localhost:3000/clientes"
  constructor(private http:HttpClient) {

  }

  //Esta lista virá da API
  clientes:Fornecedor[] = [];

  listar():Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.fornecedorUrl) as Observable<Fornecedor[]>
    //return this.Fornecedors;
  }

  getById(id:string):Observable<Fornecedor>{
    return this.http.get(`${this.fornecedorUrl}/${id}`) as Observable<Fornecedor>
  }

  remover(id:string){
    // const Fornecedor = this.Fornecedors.find(c => c.id == id);

    // if(Fornecedor){
    //    const index = this.Fornecedors.indexOf(Fornecedor);
    //    this.Fornecedors.splice(index,1);
    // }

    return this.http.delete(`${this.fornecedorUrl}/${id}`)
  }


  httpHeader =  {
    headers:{
      "Content-Type":"application/json"
    }
  };

  atualizar(fornecedor:Fornecedor){
    return this.http.put(`${this.fornecedorUrl}/${fornecedor.id}`, fornecedor, this.httpHeader)
  }

  adicionar(fornecedor:Fornecedor){

    return this.http.post(this.fornecedorUrl, fornecedor, this.httpHeader)

    // this.Fornecedors.push(Fornecedor);
  }
}
