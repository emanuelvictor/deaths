const puppeteer = require('puppeteer');

exports.get = async (req, res) => {

  const browser = await puppeteer.launch({
                    'args' : [
                      '--no-sandbox',
                      '--disable-setuid-sandbox'
                    ]
                  });
  const page = await browser.newPage();
  await page.goto('http://7ce5526e8b48.ngrok.io/feriados/aa/aa');

  let deaths = await page.evaluate(() => {

    let data = [];
    let elements = {'foi': document.getElementsByTagName('pre').length}; //document.getElementsByClassName('LabelTitulo');
    return elements;
//    for (var i = 0; i < elements.length; i++) {
//        death = {
//            person : {}
//        };
//
//        death.person.name = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblNome0_' + i).textContent
//        death.person.age = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblIdade0_' + i).textContent.toLowerCase().replace(' anos', '') //TODO ISOLATE
//
//        const rawDate = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label14_' + i).textContent.toLowerCase()
//        death.date = rawDate.substring(0, rawDate.indexOf('à') -1)
//
//        const cause = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label13_' + i).textContent
//
//        if(cause.indexOf('COVID - 19') > -1){
//
//          death.covid = true
//
//          if(cause.indexOf('NÃO DETECTADO') > -1)
//            death.covid = false
//
//        }
//        else
//          death.covid = false
//
//        if(cause.indexOf('AGUARDANDO') > -1)
//          death.covid = undefined
//
//        data.push(death)
//    }
//
//    return data;
  });

  const version = await browser.version();

  res.status(200).send(deaths)
};
