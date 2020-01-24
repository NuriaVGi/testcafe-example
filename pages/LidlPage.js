import { Selector, t } from 'testcafe';
import BasePage from './basePage';
import minimist from "minimist";

class LidlPage extends BasePage {

    constructor() {
        super();
        //this.productNavigationCategories = Selector('ul.product-navigation.second-level.not-mobile');
        this.productNavigationCategories = Selector('.wrapper.space.p-lr ul');
        this.userSearch = Selector('#mainsearch-input');
        this.searchBut = Selector('#mainsearch-input button[type="submit"]').withText('Buscar');
        this.butRegist = Selector('.btn.proceed.newsletter-banner__button');
        this.mailBox = Selector('#email-subscribe-newsletter');
        this.acceptTerms = Selector('#legal-two-newsletter-checkout');
        this.SubsBut = Selector('#button-subscribe');
        this.messSuccess = Selector('.message.success');
        this.image = Selector('img.data-image src');

    }

    //Entrar a tots els apartats de compra online
    async OnlineShoppingNavigation() {

            for(let i=0; i<await this.productNavigationCategories.childElementCount;i++){//productNavigationCategories.length
                await t
                .click(this.productNavigationCategories.child(i))//.find('a'))
                .navigateTo(`https://www.lidlonline.es/`);
            }

    }

    async SearchBuyProduct(product) {
        return t
            .typeText(this.userSearch, product)
            .click(this.searchBut);

    }

    async lidlSubscription(mail) { //Suscríbete al Newsletter de Lidl
        return t
            .click(this.butRegist)
            .typeText(this.mailBox, mail)
            .click(this.acceptTerms)
            .click(this.SubsBut)
            .expect(this.messSuccess.textContent).contains('Muchas gracias por tu suscripción. En breve recibirás un correo electrónico que te permitirá confirmar y finalizar tu suscripción. De esta forma protegemos tus datos personales de un uso indebido por parte de terceros. En el caso de que no hayas recibido ningún correo electrónico, mira también en la carpeta de correo no deseado de tu buzón, es posible que tu confirmación se haya guardado en esta carpeta.');
     }

    async CheckImages() {
        return t
            .expect(this.image).child(0).eql('/es/asset/images/ESPECIAL_BANNER-3x1-VINOS_380x285_.jpg');

    }
}


export default new LidlPage();