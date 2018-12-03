import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers/auth/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';
import { CadastroClientePage } from '../cadastro-cliente/cadastro-cliente';
import { MenuPage } from '../menu/menu';
import { OpcaoUsuarioPage } from '../opcao-usuario/opcao-usuario';
import { ListaPage } from '../lista/lista';


@IonicPage()
@Component
({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  user : User = new User();
  @ViewChild ('form') form : NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public authService: AuthService) {
  

  }
  ionViewDidLoad() 
  {
  	console.log('ionViewDidLoad HomePage');
  }
  goToClientePage()
  {
  this.navCtrl.push(CadastroClientePage)
  }
  goToMenuPage()
  {
  this.navCtrl.push(MenuPage)
  }
  
  goToOpcaoUsuarioPage()
  {
    this.navCtrl.push(OpcaoUsuarioPage)
  }

  goTolistapage()
  {
    this.navCtrl.push(ListaPage)
  }

  signIn()
  {
    if(this.form.form.valid)
    {
      
      let toast = this.toastCtrl.create({
        message: '',
        duration: 3000,
        position: 'bottom'
      });
      
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      this.authService.signIn(this.user)

      
    
      .then((user: any) => 
      {
        this.goToMenuPage()
        
        
        toast.setMessage('Usuário logado com sucesso!' );
        toast.present(({duration: 3000}));
        this.navCtrl.setRoot(MenuPage);
        
        
      })

      .catch((error: any) => 
      {
        if(error.code =='auth/invalid-email')
        {
          toast.setMessage('Usuario invalido!');
        }

        else if(error.code =='auth/user-disabled ')
        {
          toast.setMessage('Usuario desabilitado!');
        }

        else if(error.code =='auth/user-not-found')
        {
          toast.setMessage('Usuario não encontrado!');
        }

        else if(error.code =='auth/wrong-password')
        {
          toast.setMessage('Senha errada');
        }
        toast.present();
        
      
      });
  }  }
}
