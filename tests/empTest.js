import empPage from '../pages/empPage';
import { Selector } from 'testcafe';


fixture `EMP fixture`
    .page `http://www.emp-online.es/`;

test('Introduir text i buscar', async t => {

    await t.debug();
    await empPage.introducirTextoBuscar('Abrigo Elena');
    await t.debug();
});


//executar --> npx tescafe chrome tests/nomFitxer