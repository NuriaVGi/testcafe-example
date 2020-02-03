import { Selector, t, ClientFunction } from 'testcafe';
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
        this.section = Selector('section').nth(16);
        this.imageFix = Selector('.only-image-teaser img[alt="Deportivas mujer"]');
        //this.arrowButList = Selector('em.icon-arrow-right');
        this.arrowButList = Selector('section.teaser-carousel[innerText="Calzado cómodo FootFlex"]').find('a.carousel-next[href="#"]');
        //this.arrowBut = this.arrowButList.find('a[href="#"]');
        this.paragr = Selector('p');
        this.firstChildElement = this.paragr.child(0);
        this.logoLidl = Selector('img[src="/imgs/llogo.png"]');
        this.h3List = Selector('#content h3');
        this.lastItem = Selector('.widestcontent:last-child');

    }

    //Entrar a tots els apartats de compra online
    async onlineShoppingNavigation() {

        for (let i = 0; i < await this.productNavigationCategories.childElementCount; i++) {//productNavigationCategories.length
            await t
                .click(this.productNavigationCategories.child(i))//.find('a'))
                .navigateTo(`https://www.lidlonline.es/`);
        }

    }

    async searchBuyProduct(product) {
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

    async checkImages() {

        if (!(await this.imageFix.exists)) {

            await t.click(this.arrowButList)//(this.arrowButList.nth(9));
            if (!await this.imageFix.exists) {
                await t.click(this.arrowButList)//(this.arrowButList.nth(9));
                return t
                    .click(this.imageFix);

            } else {
                return t
                    .click(this.imageFix);

            }

        } else {
            console.log('Apareix imatge directament');
            return t
                .click(this.imageFix);

        }
    }

//Arreglar -->
    async verifyBodyContent() { //test that verifies text content of the body's first child node

        await t
            .navigateTo(`https://recetas.lidl.es/?_ga=2.75888413.92735449.1580292941-997088935.1580292941`)
            .expect(this.firstChildElement.textContent).contains('¿Te cuesta a veces decidir qué cocinar? ¿Te apetece preparar un plato delicioso y no sabes cómo?');
    }

    async screenshotTest() { //screenshot logo lidl

        await t
            .takeElementScreenshot(this.logoLidl);

    }

    async screenshotTest2(idType, nameDesc) { //choose screenshot
        let screenElem;
        if (idType === 'id') {
            await t.navigateTo(`https://empleo.lidl.es/es/index.htm`);
            screenElem = await Selector('#' + nameDesc);
        } else if (idType === 'class') {
            await t.navigateTo(`https://empleo.lidl.es/es/index.htm`);
            screenElem = await Selector('.' + nameDesc);
        } else {
            await t.navigateTo(`https://empleo.lidl.es/es/recursos-humanos.htm`);
            if (idType === 'p') {
                screenElem = await Selector(idType);
            } else {
                screenElem = await Selector(idType + nameDesc);
            }
        }
        return t.takeElementScreenshot(screenElem);
    }

    async h3Test() {
        //console.log(await this.h3List.nth(0).innerText);
        for(let i = 0; i < await this.h3List.count; i++) {
            console.log(await this.h3List.nth(i).innerText);
        }
        await t
            .expect(await this.h3List.nth(0).innerText).eql('Gerente de Logística Regional')
            .expect(await this.h3List.nth(1).innerText).eql('Jefe/a de Almacén')
            .expect(await this.h3List.nth(2).innerText).eql('Jefe/a de Mantenimiento')
            .expect(await this.h3List.nth(3).innerText).eql('Responsable de Almacén')
            .expect(await this.h3List.nth(4).innerText).eql('Personal de Almacén');
            //.print();
    }

    async jobOffers(pos) { //screenshot logo lidl
        let studiesButton = Selector('.handler-click.dropdown1');
        let studiesList = Selector('.dropdown-list');

        await t
            .click(studiesButton)
            .click(studiesList.child(pos));
        const getPageUrl = ClientFunction(() => window.location.href);
        const offersList = Selector('article');

        console.log(await getPageUrl() + ' url');
        for(let i = 2; i < await offersList.count; i++){
        await t.click(offersList.nth(i))
            .navigateTo(await getPageUrl());

        }

    }

    // async childTest() {
    //    // return t
    //      //   .click(this.lastItem)
    //     await t.click(() => {
    //         if('p' === true) {
    //             return this.h3List
    //         }
    //         else return this.section;
    //     });
    // }
}
export default new LidlPage();


