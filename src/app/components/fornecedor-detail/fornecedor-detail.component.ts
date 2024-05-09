import { Component } from '@angular/core';
import { Fornecedor } from '../../interfaces/fornecedor';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {
  fornecedor?:Fornecedor;
  fornecedorForm2: FormGroup = new FormGroup({})
  constructor(
    private route: ActivatedRoute,
    private fornecedorService:FornecedorService,
    private formbuilder: FormBuilder
    ){
    this.getClientById()
    }
    id?:string;
    getClientById(){
      this.id = this.route.snapshot.paramMap.get('id') ?? ''
      this.fornecedorService.getById(this.id).subscribe((fornecedorResponse) => this.fornecedor = fornecedorResponse)
  
      this.fornecedorForm2 = this.formbuilder.group({
        nome: [this.fornecedor?.nome],
        telefone: [this.fornecedor?.telefone],
        endereco: [this.fornecedor?.endereco],
        id: [this.fornecedor?.id]
      })
    }

    update():void{
      if(this.fornecedorForm2.valid){
        const fornecedorAlterado:Fornecedor = {
          nome: this.fornecedorForm2.value.nome,
          telefone: this.fornecedorForm2.value.telefone,
          endereco: this.fornecedorForm2.value.endereco,
          id: this.fornecedorForm2.value.id
        }
        this.fornecedorService.atualizar(fornecedorAlterado).subscribe()
        alert('Alterado com sucesso!')
    }
  }


}
