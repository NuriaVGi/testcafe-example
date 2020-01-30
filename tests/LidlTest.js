import LidlPage from '../pages/LidlPage';
import { Selector } from 'testcafe';
//import { Selector, ClientFunction } from 'testcafe';


fixture `My LIDL fixture`
    .page `https://www.lidlonline.es/`;

test('Online shopping navigation' , async t => {

    await LidlPage.OnlineShoppingNavigation();

});

test.only('Search, add to cart and buy', async t => {

    await LidlPage.SearchBuyProduct('vajilla');

});

test('LIDL Newsletter Suscription', async t => {

    await LidlPage.lidlSubscription('nvg.warp@gmail.com');

});

test('Check images', async t => {

    await LidlPage.CheckImages();

});




