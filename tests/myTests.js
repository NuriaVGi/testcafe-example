import rockfestPage from '../pages/rockFestPage';
import { Selector } from 'testcafe';


fixture `My fixture`
    .page `http://www.google.com/`;

test('Type', async t => {
let nameInput = Selector('.gLFyf.gsfi');
let clicar = Selector('input[type="submit"]');
let Plink = Selector('#search a');
    await t
        .typeText(nameInput, 'Rock Fest BCN 2020')
        .click(clicar)
        .click(Plink);
});

test.page `https://www.rockfestbarcelona.com/`
('Comprobar nom primer link menu', async t => {

  const llista = Selector('#top-menu-nav').find('ul');
  const primerLink = llista.child(0);

    await t
        .expect(primerLink.textContent).eql('Noticias');

});

test.page `https://www.rockfestbarcelona.com/`
('Add 3 backpacks and check price is 37.50€', async t => {

    await t

        rockfestPage.NavegarTiendaAccesoriosMotxila()
        rockfestPage.addCart('3')
        rockfestPage.checkTotalPrizeEquals('37,50');

});

/*
const comboBox = Selector('.combo-box');
.hover(comboBox)
const windowsRadioButton  = Selector('.radio-button').withText('Windows');
const selectedRadioButton = Selector('.radio-button').withAttribute('selected');
const buttonWrapper = Selector('.article-content').find('#share-button').parent();
Selector('ul').nth(5); //Selector('div').nth(-1); counted from the end
Selector('.container').withExactText('foo');
const windowsLabel = Selector('label').withText('Windows');
Selector('ul').find('label').parent('div.someClass')
const id = await Selector('ul').find('label').parent('div.someClass').id;
const id = await Selector('ul').find('label').parent('div.someClass').nth(2).id;
Selector('.container').parent(1).nth(0).find('.content').withText('yo!').child('span');

<div id="j9dk399sd304" class="container">
            <div id="dsf054k45o3e">Item 1</div>
            <div id="lk94km904wfv">Item 2</div>
</div>
    const container = Selector('div').withAttribute('class', 'container');
    const item1     = Selector('div').withText('Item 1');
    const item2     = container.child(1);

test('My test', async t => {
    const checkboxes    = Selector('legend').withText('Which features are important to you:').parent(0).find('input');
    const checkboxCount = await checkboxes.count;

    for(let i = 0; i < checkboxCount; i++)
        await t.click(checkboxes.nth(i));
});

.expect(label.innerHTML).contains('type="checkbox"')
.expect(label.tabIndex).eql(2)
.expect(label.lang).eql('en');
*/