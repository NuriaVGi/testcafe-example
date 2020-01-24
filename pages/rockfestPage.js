import { Selector, t } from 'testcafe';
import BasePage from './basePage';

class RockfestPage extends BasePage {

  constructor() {
    super();

    this.totalPreu = Selector('tr.order-total').find('.woocommerce-Price-amount.amount');
    this.botoQuantitat = Selector('input[type="number"]');
    this.botoAfegirCarrito = Selector('button[type="submit"]').withText('Añadir al carrito');
    this.LinkTienda = Selector('a').withText('Tienda');
    this.botoTancar = Selector('#popup_box_close_26330');
    this.llistaTitols = Selector('#main-content').find('ul');
    this.accesorios = this.llistaTitols.child(0);
    this.llistaAccesoris = Selector('#left-area').find('ul');
    this.motxila = this.llistaAccesoris.child(2);
    this.botoCarrito = Selector('.button.wc-forward').withText('Ver carrito');
  }


  async checkTotalPrizeEquals(total) {
    return t.expect(this.totalPreu.textContent).contains(total);
  }

  async addCart(num) {
    return t
        .hover(this.botoQuantitat)
        .typeText(this.botoQuantitat, num, {replace: true})
        .click(this.botoAfegirCarrito);
  }

  async NavegarTiendaAccesoriosMotxila() {
    return t
        .click(this.botoTancar)
        .click(this.LinkTienda)
        .click(this.accesorios)
        .click(this.motxila)
        .click(this.botoCarrito);
  }
}


export default new RockfestPage();