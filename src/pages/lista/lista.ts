import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroPage } from '../../pages/cadastro/cadastro';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {

  usuarios = [];

  constructor(private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.listagemDeUsuarios();
  }


  listagemDeUsuarios() {
    this.storage.get('usuarios').then((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  pressEvent(usuario) {
    this.showConfirm(usuario);
  }


  adicionar() {
    this.navCtrl.push(CadastroPage);
  }

  excluirUsuario(usuario) {
    this.usuarios.splice(this.usuarios.indexOf(usuario), 1);
    this.storage.set('usuarios', this.usuarios);
    console.log(this.usuarios);
  }

  itemSelecionado(usuario) {
    this.navCtrl.push(CadastroPage, { 'usuario': usuario });
  }

  showConfirm(usuario) {
    let confirm = this.alertCtrl.create({
      title: 'Aviso!',
      message: 'Você deseja excluir o usuário?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirUsuario(usuario);
          }
        }
      ]
    });
    confirm.present();
  }
}
