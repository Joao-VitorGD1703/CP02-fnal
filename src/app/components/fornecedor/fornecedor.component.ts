import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../interfaces/fornecedor';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores: Fornecedor[] = [];
  fornecedorForm: FormGroup = new FormGroup({})

  constructor(private fornecedorService: FornecedorService, private formbuilder: FormBuilder) {
    this.fornecedorForm = this.formbuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]
    })

  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir() {
    if (this.fornecedorForm.valid) {
      let fornecedorNovo: Fornecedor = {
        nome: this.fornecedorForm.value.nome,
        telefone: this.fornecedorForm.value.telefone,
        endereco: this.fornecedorForm.value.endereco,
        id: this.generateRandomString(6)
      }
      this.fornecedorForm.reset()
      this.fornecedores.push(fornecedorNovo)
      this.fornecedorService.adicionar(fornecedorNovo).subscribe()
      alert('Cliente cadastrado com sucesso!')
    }
  }

  listar(): void {
    this.fornecedorService.listar().subscribe((listFornecedor) => (this.fornecedores = listFornecedor))
  } ngOnInit(): void {
    this.listar();
  }
  remover(id: string): void {
    this.fornecedores = this.fornecedores.filter((c) => c.id !== id)
    this.fornecedorService.remover(id).subscribe()
    alert('removido com sucesso!')
  }

}
