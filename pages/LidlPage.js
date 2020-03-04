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
        this.menuOption ="";
        this.menuArrowButton = "";
        this.menuList = Selector('div.navigation__container.navigation__container--strict-oneline li');
        this.cityEntry = Selector('input#city.form__input');
        this.findShopButton = Selector('.storesearch__searchbox button[type="submit"]');
        const scroll = ClientFunction(function() {
            window.scrollBy(0,500)
        });
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
        for (let i = 0; i < await this.h3List.count; i++) {
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

    async jobOffers(pos) {
        let studiesButton = Selector('.handler-click.dropdown1');
        let studiesList = Selector('.dropdown-list');

        await t
            .click(studiesButton)
            .click(studiesList.child(pos));
        const getPageUrl = ClientFunction(() => window.location.href);
        const offersList = Selector('article');

        console.log(await getPageUrl() + ' url');
        for (let i = 2; i < await offersList.count; i++) {
            await t
                .click(offersList.nth(i))
                .navigateTo(await getPageUrl());

        }

    }

    async nextPrevPageA() {

        let prevNextList = Selector('nav.pagination ul');
        let count = await prevNextList.childElementCount;
        let clickNextPage = await Selector('nav.pagination a[rel="next"]');
        let clickPrevPage = Selector('nav.pagination a[rel="prev"]');

        for (let i = 0; i < count - 1; i++) {
            await t.click(clickNextPage);

        }

        for (let i = count; i > 1; i--) {
            await t.click(await clickPrevPage);
        }
    }

    async nextPrevPageB() {

        let nextPage = Selector('li.nav').withText('Página siguiente »');//await prevNextList.child(count - 1).textContent;
        let clickNextPage = Selector('nav.pagination a[rel="next"]');
        let clickPrevPage = Selector('nav.pagination a[rel="prev"]');

        while (await nextPage.exists) {
            await t.click(clickNextPage);
        }

        let prevPage = Selector('li.nav').withText('« Página anterior');

        while (await prevPage.exists) {
            await t.click(clickPrevPage);
        }
    }

    async recipesMenu(recetas) { //

        this.menuArrowButton = Selector('button[data-controller="slider/next"]').nth(1);

        switch (recetas) {
            case 'Recetas para niños': // Fails to click menuArrowButton
                await this.clickArrowIfNotVisible('div.navigation__item a[href="/Recetas-para-ninos"]','Recetas para niños');
                await t
                    .expect(Selector('section.teaser h2').nth(0).innerText).eql('Recetas a partir de 6 meses')
                    .expect(Selector('section.teaser h2').nth(1).innerText).eql('Recetas a partir de 12 meses')
                    .expect(Selector('section.teaser h2').nth(2).innerText).eql('Recetas a partir de 2 años')
                    .expect(Selector('section.teaser h2').nth(3).innerText).eql('Recetas a partir de 3 años');

                break;
            case 'Todas las recetas':
                await this.clickArrowIfNotVisible('div.navigation__item a[href="/Todas-las-recetas"]','Todas las recetas');
                let recipesList;
                let i = 0;

                while(Selector('a').withText('Ver más').exists) {
                    recipesList = Selector('div .container.content.view-content.themeworld--content a.teaser-link.ng-scope');
                    // console.log('recipes count ' + await recipesList.count);
                    // console.log('i count ' + i);
                    // console.log('-----');
                    for (i; i<await recipesList.count;i++) {
                        await t
                            .click(recipesList.nth(i))
                            .expect(Selector('div .video-container').exists).ok()//image section -video
                            .expect(Selector('section.instructions').exists).ok()// instructions section
                            .expect(Selector('section#ingredients_display').exists).ok() // ingredients section
                            .expect(Selector('div.facts').exists).ok()// nutrients section
                            .navigateTo(`https://recetas.lidl.es/Todas-las-recetas`);
                    }
                    await t.click(Selector('a').withText('Ver más'));
                }
                break;
            case 'San Valentín':
                await this.clickArrowIfNotVisible('div.navigation__item a[href="/Recetas-de-San-Valentin-originales"]','San Valentín');
                break;
            case 'Recetas del mundo':
                await this.clickArrowIfNotVisible('div.navigation__item a[href="/Recetas-del-mundo"]','Recetas del mundo');
                break;
            default:
                console.log("Incorrect option");
                break;
            // code block
        }
    }
        // ********** recipesMenu() Switch Functions **************

        async clickArrowIfNotVisible(selector, title) { //'div.navigation__item a[href="/Recetas-del-mundo"]'
            this.menuOption = Selector(selector);
            let menuList = Selector('div.slick-track span');
            let pos;
            for(let i=0; i<await menuList.count; i++) {
                if(title === await menuList.nth(i).innerText) {
                    pos = i;
                }
            }
            if(pos>5) {
                await t.click(this.menuArrowButton);
            }
            await t.click( this.menuOption);
            // if(!(await this.menuOption.visible)) {
            //     await t.click(this.menuArrowButton);
            // }
            // await t.click(this.menuOption);
        }


    //      checkRecipiesSections() {
    //
    //
    // }

    // *************************NAVIGATION USER MENU ****************************************

    async navigationUserMenu() { // Navigate Right Top Menu
        // console.log('Items num ' + await this.menuList.count);
        // console.log('Titles: ' +await this.menuList.nth(0).innerText + ', '+ await menuList.nth(1).innerText + ', ' + await menuList.nth(2).innerText + ', ' + await menuList.nth(3).innerText);
        await this.shopSearcher();
        await this.pamphlet();
        await this.newsletter(); // switch iframe
        await this.socialNetworks();
    }

    async shopSearcher() {

        await t
            .click(this.menuList.nth(0))
            .typeText(this.cityEntry, 'Sant Cugat del Valles')
            .click(await this.findShopButton);
    }

    async pamphlet() {
        let onlineButton = Selector('div.leafletcontainer__browse-text').withText('Ver online');
        let nextPageButton = await Selector('button[type="button"][aria-label="Página siguiente"]');
        let prevPageButton = await Selector('button[type="button"][aria-label="Página previa"]');
        let numbPages;
        let lastPage;
        let downloadPDF;
        await t
            .click(this.menuList.nth(1))
            .click(Selector('h2.hint__title').withText('Selecciona tu región para ver tus productos'))
            .typeText(this.cityEntry, 'Sant Cugat del Valles')
            .click(this.findShopButton)
            // check if exists list of shops and map
            .expect(Selector('div.storesearch__filterandresultwrapper ul').exists).ok()
            .expect(Selector('div.MicrosoftMap').exists).ok()
            .navigateTo(`https://www.lidl.es/es/folleto-online.htm`)
            //navigate to healthy recipes pamphlet
            .click(onlineButton.nth(0));
        numbPages = await Selector('button.stepper').textContent;
        lastPage = numbPages.split(" ");
        let count = lastPage[2];
        for(let i=0; i<count; i++) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!
            await t.click(nextPageButton);
        }
        for(let i=count; i>0; i--) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            await t.click(prevPageButton);
        }
        //Download PDF
        await t.navigateTo(`https://www.lidl.es/es/folleto-online.htm`);
        downloadPDF = await Selector('span.download__text');
        await t.click(downloadPDF);
    }

    async newsletter() { // ********** switchToIframe *********************
        const getLocation = ClientFunction(() => window.location.href);
        console.log(await getLocation());

        let textIntro;
        await t
            .navigateTo(`https://www.lidl.es/es/index.htm`)
            .click(this.menuList.nth(2));
        //Check if text introduction is ok
        textIntro = Selector('div.textbody.textbody--padding-horizontal.textbody--links-brand-primary p');
        await t
            .expect(textIntro.nth(0).textContent).eql('Regístrate y no dejes pasar ninguna oferta.')
            .expect(textIntro.nth(1).textContent).eql('Descubre en el newsletter de Lidl ofertas semanales, campañas de productos rebajados, sorteos, recetas y mucho más. Solo tienes que suscribirte con tu dirección de correo electrónico. Si deseas recibir información más personalizada, indica también tu nombre y apellido.');
        //  .switchToMainWindow()
        //Sign
        let genderButton = await Selector('#xi-sel-1_1');
        let nameBox = await Selector('#xi-tf-1');
        let surnamesBox = await Selector('#xi-tf-6');
        let PC = await Selector('#xi-tf-7');
        let mail = await Selector('#xi-tf-3');
        let birthDateLabel = await Selector('label.label-top');
        let monthNextButton = await Selector('span.ui-icon.ui-icon-circle-triangle-e').withText('Sig');
        let birthYearButton = await Selector('select.ui-datepicker-year');
        let birthYearDropMenu = birthYearButton.find('option'); // drop-down list
        let birthDay = await Selector('a.ui-state-default');
        let childNumber = Selector('#xi-sel-2_2');
        let interests = Selector('label.label-icon-checkbox');
        let gdpr = await Selector('label.label-right.required');
        let sendButton = await Selector('#xi-btn-1_btn0');
        let message = await Selector('div.alert.alert-success.mt-1');
        let okMessage = 'El alta se ha realizado correctamente. En breve recibirás un correo electrónico que te permitirá confirmar y finalizar tu suscripción. De esta forma protegemos tus datos personales de un uso indebido por parte de terceros. En el caso de que no hayas recibido ningún correo electrónico, mira también en la carpeta de correo no deseado de tu buzón, es posible que tu confirmación se haya guardado en esta carpeta.';
        await t.wait(3000);
        await t
            .switchToIframe('#iframe-4967');
            console.log(await getLocation());
            await t
            .click(genderButton)
            .typeText(await nameBox, 'Núria')
            .typeText(surnamesBox, 'Viñas Gilabert')
            .typeText(PC, '08198')
            .typeText(mail, 'nvg33@gmail.com')
            .click(birthDateLabel.nth(5))
            .click(birthYearButton)
            .click(birthYearDropMenu.withText('1983'))
            .click(monthNextButton)
            .click(birthDay.nth(2))
            // .debug()
            .click(childNumber)
            .click(interests.nth(5))
            .click(interests.nth(16))
            .click(gdpr)
            .click(sendButton)
            .expect(message.innerText).contains(okMessage);

    }

    async socialNetworks() {
        console.log('Entra');
        await t.navigateTo(`https://www.lidl.es/es/index.htm`);
        let cookiesButton = await Selector('button[type="submit"]').withText('X');
        let menuTitle = await Selector('span.navigation__text.navigation__text--center').withText('Redes sociales');
        await t
            .click(cookiesButton)
            .hover(menuTitle);
        let list = await Selector('div.flyout.flyout--socialmedia ul');
        let socialNetworksList = await list.nth(0);
        for(let i=0; i<await socialNetworksList.childElementCount; i++) {
           await t
                .click(socialNetworksList.child(i))
                .navigateTo(`https://www.lidl.es/es/folleto-online.htm#`)
                .click(cookiesButton)
                .hover(menuTitle);
        }


        // *******************************************************************************
    // ********************** MASTHEAD NAVIGATION MENU *******************************




        // ***************************************************************************


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
}
        export default new LidlPage();



