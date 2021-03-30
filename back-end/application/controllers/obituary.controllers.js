const puppeteer = require('puppeteer');

exports.get = async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www3.pmfi.pr.gov.br/PSIPortal/SircofWeb/Formularios/wfrmSircObituario_Site.aspx');

  let deaths = await page.evaluate(() => {

    let data = [];
    let elements = document.getElementsByClassName('LabelTitulo');

    for (var i = 0; i < elements.length; i++) {
        death = {
            person : {}
        };

        death.person.name = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblNome0_' + i).textContent
        death.person.age = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblIdade0_' + i).textContent.toLowerCase().replace(' anos', '') //TODO ISOLATE

        const rawDate = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label14_' + i).textContent.toLowerCase()
        death.date = rawDate.substring(0, rawDate.indexOf('à') -1)

        const cause = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label13_' + i).textContent

        if(cause.indexOf('COVID - 19') > -1){

          death.covid = true

          if(cause.indexOf('NÃO DETECTADO') > -1)
            death.covid = false

        }
        else
          death.covid = false

        if(cause.indexOf('AGUARDANDO') > -1)
          death.covid = undefined

        data.push(death)
    }

    return data;
  });

  await browser.close();

  const resume = {MORTES_POR_COVID : 0, MORTES_POR_OUTROS_MOTIVOS : 0, AGUARDANDO_RESULTADOS_DE_EXAMES:0, TOTAL : 0}
  for (var i = 0; i < deaths.length; i++) {
    if(deaths[i].covid === true)
      resume.MORTES_POR_COVID = resume.MORTES_POR_COVID + 1;
    if(deaths[i].covid === false)
      resume.MORTES_POR_OUTROS_MOTIVOS = resume.MORTES_POR_OUTROS_MOTIVOS + 1;
    if(deaths[i].covid === undefined)
      resume.AGUARDANDO_RESULTADOS_DE_EXAMES = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + 1;
  }

  resume.TOTAL = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + resume.MORTES_POR_COVID +  resume.MORTES_POR_OUTROS_MOTIVOS;
  res.status(200).send(resume)
};
