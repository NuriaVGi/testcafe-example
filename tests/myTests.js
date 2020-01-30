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

