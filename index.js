const express = require('express');
const puppeteer = require('puppeteer');
// import * as puppeteer from 'puppeteer';
const chromium = require('chrome-aws-lambda');
const app = express();

app.get('/', async (req, res) => {

try {
//  const browser = await puppeteer.launch({
//                     headless: true,
//                     'args' : [
//                       '--no-sandbox',
//                       '--disable-setuid-sandbox'
//                     ]
//                   });
const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

   const page = await browser.newPage();
   await page.goto('http://www3.pmfi.pr.gov.br/PSIPortal/SircofWeb/Formularios/wfrmSircObituario_Site.aspx')
var teste = 'antes';
    await page.screenshot({path: 'example.png', fullPage: true });
   teste = 'depois';
    res.status(200).send(teste)
//   res.sendFile(__dirname + '\\back-end\\example.png');


//   let deaths = await page.evaluate(() => {
//
//     let data = [];
//
// //    let elements = JSON.parse(document.getElementsByTagName('pre')[0].textContent); //document.getElementsByClassName('LabelTitulo');
// //return elements;
//     let elements = document.getElementsByClassName('LabelTitulo');
//
//     for (var i = 0; i < elements.length; i++) {
//         death = {
//             person : {}
//         };
//
//         death.person.name = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblNome0_' + i).textContent
//         death.person.age = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_lblIdade0_' + i).textContent.toLowerCase().replace(' anos', '')
//
//         const rawDate = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label14_' + i).textContent.toLowerCase()
//         death.date = rawDate.substring(0, rawDate.indexOf('à') -1)
//
//         const cause = document.getElementById('wucSircObituario_DataList1_dtlFalecimentos_Label13_' + i).textContent
//
//         if(cause.indexOf('COVID - 19') > -1){
//
//           death.covid = true
//
//           if(cause.indexOf('NÃO DETECTADO') > -1)
//             death.covid = false
//
//         }
//         else
//           death.covid = false
//
//         if(cause.indexOf('AGUARDANDO') > -1)
//           death.covid = undefined
//
//         data.push(death)
//     }
//
//     return data;
//   });
//
//  res.status(200).send(deaths)

}
catch (e) {
    console.log(e)
    res.status(200).send({'erro':e})
 // statements to handle any exceptions
 }



});

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));