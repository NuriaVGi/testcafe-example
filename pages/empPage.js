import { Selector, t } from 'testcafe';
import BasePage from './basePage';

class empPage extends BasePage {

    constructor() {
        super();

       // this.totalPreu = Selector('tr.order-total').find('.woocommerce-Price-amount.amount');
        this.cuadroTextBuscar = Selector('#q').withText('¿Qué buscas?');
        this.botoBuscar = Selector('button[type="submit"]');
    }

    async introducirTextoBuscar(text) {
        return t
            .typeText(this.cuadroTextBuscar, text)
            .click(this.botoBuscar);
        //.expect(this.totalPreu.textContent).contains(total);
        //.typeText(nameInput, 'Rock Fest BCN 2020')
    }

    async comprarProducto(text,talla) {
        return t
            .typeText(this.cuadroTextBuscar(text))
            .click(this.botoBuscar);
            //talla, afegir carrito, anar carrito i comprar
    }

    async verProducto(text) {
        return t
            .typeText(this.cuadroTextBuscar(text))
            .click(this.botoBuscar);
            //veure fotos

    }



}


export default new empPage();