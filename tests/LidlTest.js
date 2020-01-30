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

test.only('Choose screenshot ', async t => {

    await LidlPage.screenshotTest2('id','content');
    await LidlPage.screenshotTest2('class','body-inner');
    await LidlPage.screenshotTest2('p',0); //--> arreglar
    await LidlPage.screenshotTest2('img','[src="/statics/career-lidl-es/ds_img/layout/Logo-Header_250x90.png"]');

});



