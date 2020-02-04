import LidlPage from '../pages/LidlPage';
import { Selector } from 'testcafe';
//import { Selector, ClientFunction } from 'testcafe';


fixture `My LIDL fixture`
    .page `https://www.lidlonline.es/`;

test('Online shopping navigation' , async t => {

    await LidlPage.onlineShoppingNavigation();

});

test('Search, add to cart and buy', async t => {

    await LidlPage.searchBuyProduct('vajilla');

});

test('LIDL Newsletter Suscription', async t => {

    await LidlPage.lidlSubscription('nvg.warp@gmail.com');

});

test('Check images', async t => {

    await LidlPage.checkImages();

});

test('Verify body content', async t => {

    await LidlPage.verifyBodyContent();

});


test('Screenshot logo Lidl', async t => {

    await LidlPage.screenshotTest();

});

test('Choose screenshot ', async t => {

    await LidlPage.screenshotTest2('id','content');
    await LidlPage.screenshotTest2('class','body-inner');
    await LidlPage.screenshotTest2('p',0); //--> arreglar
    await LidlPage.screenshotTest2('img','[src="/statics/career-lidl-es/ds_img/layout/Logo-Header_250x90.png"]');

});


test.page `https://empleo.lidl.es/es/oportunidades-almacen.htm`
    ('h3 Test', async t => {

    await LidlPage.h3Test();

});

// test.only.page `https://empleo.lidl.es/es/oportunidades-almacen.htm`
//     ('Child Test', async t => {
//
//     await LidlPage.childTest();
//
// });

test.page `https://empleo.lidl.es/es/busqueda.htm?rdeLocaleAttr=es`
('Job Offerts Test', async t => {

    await LidlPage.jobOffers(1);

});

test.page `https://empleo.lidl.es/es/busqueda.htm?rdeLocaleAttr=es`
('Next/Prev page Test 1', async t => {

    await LidlPage.nextPrevPageA();

});

test.only.page `https://empleo.lidl.es/es/busqueda.htm?rdeLocaleAttr=es`
('Next/Prev page Test 2', async t => {

    await LidlPage.nextPrevPageB();

});

test.page `https://recetas.lidl.es/`
('Switch Recipes', async t => {

    await LidlPage.menuOptions('Recetas para niños');

});

