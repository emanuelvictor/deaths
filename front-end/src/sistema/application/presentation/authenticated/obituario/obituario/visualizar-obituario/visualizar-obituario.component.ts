import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DeathRepository } from "../../../../../../domain/repository/death.repository";

// @ts-ignore
@Component({
  selector: 'visualizar-obituario',
  templateUrl: './visualizar-obituario.component.html',
  styleUrls: ['../obituario.scss'],
})
export class VisualizarObituarioComponent implements OnInit {

  /**
     *
     */
  single2: any[] = [];

  /**
   *
   */
  single3: any[] = [];

  /**
   *
   * @param router
   * @param dialog
   * @param dialogService
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param authenticationService
   * @param deathsRepository
   */
  constructor(private deathRepository: DeathRepository) {

    //     homeView.toolbar.subhead = 'Obituário / Foz do Iguaçu'

  }

  init_date = null;
  final_date = null;



  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /**
   *
   */
  ngOnInit() {
    this.deathRepository.getResume().then(deaths => {

      const resume = { MORTES_POR_COVID: 0, MORTES_POR_OUTROS_MOTIVOS: 0, AGUARDANDO_RESULTADOS_DE_EXAMES: 0, TOTAL: 0 }
      const resume3 = { MORTES_POR_COVID_0_10: 0, MORTES_POR_COVID_10_20: 0, MORTES_POR_COVID_20_30: 0, MORTES_POR_COVID_30_40: 0, MORTES_POR_COVID_40_50: 0, MORTES_POR_COVID_50_60: 0, MORTES_POR_COVID_60_70: 0, MORTES_POR_COVID_70_80: 0, MORTES_POR_COVID_80_90: 0, MORTES_POR_COVID_90_100: 0 }

      for (var i = 0; i < deaths.length; i++) {

        if (!this.init_date)
          this.init_date = moment(deaths[i].date, 'DD/MM/YYYY');
        else if (moment(deaths[i].date, 'DD/MM/YYYY') < this.init_date)
          this.init_date = moment(deaths[i].date, 'DD/MM/YYYY');

        if (!this.final_date)
          this.final_date = moment(deaths[i].date, 'DD/MM/YYYY');
        else if (moment(deaths[i].date, 'DD/MM/YYYY') > this.final_date)
          this.final_date = moment(deaths[i].date, 'DD/MM/YYYY');

        if (deaths[i].covid === true)
          resume.MORTES_POR_COVID = resume.MORTES_POR_COVID + 1;
        if (deaths[i].covid === false)
          resume.MORTES_POR_OUTROS_MOTIVOS = resume.MORTES_POR_OUTROS_MOTIVOS + 1;
        if (deaths[i].covid === undefined)
          resume.AGUARDANDO_RESULTADOS_DE_EXAMES = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + 1;

        // grouping the covid deaths per age
        if (deaths[i].covid) {
          if (deaths[i].person.age < 11)
            resume3.MORTES_POR_COVID_0_10 = resume3.MORTES_POR_COVID_0_10 + 1;
          if (deaths[i].person.age < 21 && deaths[i].person.age >= 11)
            resume3.MORTES_POR_COVID_10_20 = resume3.MORTES_POR_COVID_10_20 + 1;
          if (deaths[i].person.age < 31 && deaths[i].person.age >= 21)
            resume3.MORTES_POR_COVID_20_30 = resume3.MORTES_POR_COVID_20_30 + 1;
          if (deaths[i].person.age < 41 && deaths[i].person.age >= 31)
            resume3.MORTES_POR_COVID_30_40 = resume3.MORTES_POR_COVID_30_40 + 1;
          if (deaths[i].person.age < 51 && deaths[i].person.age >= 41)
            resume3.MORTES_POR_COVID_40_50 = resume3.MORTES_POR_COVID_40_50 + 1;

          if (deaths[i].person.age < 61 && deaths[i].person.age >= 51)
            resume3.MORTES_POR_COVID_50_60 = resume3.MORTES_POR_COVID_50_60 + 1;
          if (deaths[i].person.age < 71 && deaths[i].person.age >= 61)
            resume3.MORTES_POR_COVID_60_70 = resume3.MORTES_POR_COVID_60_70 + 1;
          if (deaths[i].person.age < 81 && deaths[i].person.age >= 71)
            resume3.MORTES_POR_COVID_70_80 = resume3.MORTES_POR_COVID_70_80 + 1;
          if (deaths[i].person.age < 91 && deaths[i].person.age >= 81)
            resume3.MORTES_POR_COVID_80_90 = resume3.MORTES_POR_COVID_80_90 + 1;
          if (deaths[i].person.age < 101 && deaths[i].person.age >= 91)
            resume3.MORTES_POR_COVID_90_100 = resume3.MORTES_POR_COVID_90_100 + 1;
        }

      }

      this.init_date = this.init_date.format('DD/MM/YYYY')
      this.final_date = this.final_date.format('DD/MM/YYYY')

      resume.TOTAL = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + resume.MORTES_POR_COVID + resume.MORTES_POR_OUTROS_MOTIVOS;

      this.single2 = [
        {
          'name': 'Mortes por COVID-19',
          'value': resume.MORTES_POR_COVID
        },
        {
          'name': 'Outras causas',
          'value': resume.MORTES_POR_OUTROS_MOTIVOS
        },
        {
          'name': 'Aguardando exames',
          'value': resume.AGUARDANDO_RESULTADOS_DE_EXAMES
        }
      ]

      this.single3 = [
        {
          "name": "0 a 10 anos",
          "value": resume3.MORTES_POR_COVID_0_10
        },
        {
          "name": "10 a 20 anos",
          "value": resume3.MORTES_POR_COVID_10_20
        },
        {
          "name": "20 a 30 anos",
          "value": resume3.MORTES_POR_COVID_20_30
        },
        {
          "name": "30 a 40 anos",
          "value": resume3.MORTES_POR_COVID_30_40
        },
        {
          "name": "40 a 50 anos",
          "value": resume3.MORTES_POR_COVID_40_50
        },
        {
          "name": "50 a 60 anos",
          "value": resume3.MORTES_POR_COVID_50_60
        },
        {
          "name": "60 a 70 anos",
          "value": resume3.MORTES_POR_COVID_60_70
        },
        {
          "name": "70 a 80 anos",
          "value": resume3.MORTES_POR_COVID_70_80
        },
        {
          "name": "80 a 90 anos",
          "value": resume3.MORTES_POR_COVID_80_90
        },
        {
          "name": "100 a 110 anos",
          "value": resume3.MORTES_POR_COVID_90_100
        },
      ];
    })
  }
}
