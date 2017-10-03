import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  usuario = {
    id: "",
    nome: "",
    email: "",
    telefone: ""
  };

  usuarios = [];

  constructor(private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {

    if (navParams.get('usuario')) {
      this.usuario = navParams.get('usuario');
    }

  }

  cadastrar() {

    this.storage.get('usuarios').then((usuarios) => {
      if (usuarios) {
        if (this.usuario.id.length > 0) {
          this.usuarios = usuarios;
         for(var i = 0; i < this.usuarios.length; i++){
          if(this.usuarios[i].id == this.usuario.id){
            this.usuarios[i] = this.usuario;
            this.storage.set('usuarios', usuarios);
          }
         }
        } else {
          this.usuario.id = this.stringAleatorio(5);
          usuarios.push(this.usuario);
          this.storage.set('usuarios', usuarios);
        }
      } else {
        this.usuario.id = this.stringAleatorio(5);
        this.usuarios.push(this.usuario);
        this.storage.set('usuarios', this.usuarios);
      }

    }).catch((e) => console.log(e));

  }

  stringAleatorio(tamanho) {
    var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var aleatorio = '';
    for (var i = 0; i < tamanho; i++) {
      var random = Math.floor(Math.random() * letras.length);
      aleatorio += letras.substring(random, random + 1);
    }
    return aleatorio;
  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Aviso!',
      message: 'Você deseja prosseguir?',
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
            console.log('Sim clicked');
            this.cadastrar();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}


