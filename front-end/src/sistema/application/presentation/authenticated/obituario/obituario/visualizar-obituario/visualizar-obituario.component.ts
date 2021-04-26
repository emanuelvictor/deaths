import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DeathRepository} from "../../../../../../domain/repository/death.repository";

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

  /**
   *
   */
  ngOnInit() {
        this.deathRepository.getResume().then( deaths => {
          
          const resume = {MORTES_POR_COVID : 0, MORTES_POR_OUTROS_MOTIVOS : 0, AGUARDANDO_RESULTADOS_DE_EXAMES:0, TOTAL : 0}
          for (var i = 0; i < deaths.length; i++) {
            
            if(!this.init_date)
              this.init_date = moment(deaths[i].date, 'DD/MM/YYYY');
            else if(moment(deaths[i].date, 'DD/MM/YYYY') < this.init_date)
              this.init_date = moment(deaths[i].date, 'DD/MM/YYYY');

            if(!this.final_date)
              this.final_date = moment(deaths[i].date, 'DD/MM/YYYY');
            else if(moment(deaths[i].date, 'DD/MM/YYYY') > this.final_date)
              this.final_date = moment(deaths[i].date, 'DD/MM/YYYY');

            if(deaths[i].covid === true)
              resume.MORTES_POR_COVID = resume.MORTES_POR_COVID + 1;
            if(deaths[i].covid === false)
              resume.MORTES_POR_OUTROS_MOTIVOS = resume.MORTES_POR_OUTROS_MOTIVOS + 1;
            if(deaths[i].covid === undefined)
              resume.AGUARDANDO_RESULTADOS_DE_EXAMES = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + 1;
          }

          this.init_date = this.init_date.format('DD/MM/YYYY')
          this.final_date = this.final_date.format('DD/MM/YYYY')
          
          resume.TOTAL = resume.AGUARDANDO_RESULTADOS_DE_EXAMES + resume.MORTES_POR_COVID +  resume.MORTES_POR_OUTROS_MOTIVOS;

          this.single2 = [
              {
                'name': 'Mortes por COVID-19',
                'value': resume.MORTES_POR_COVID
              },
              {
                'name': 'Outras causas',
                'value':  resume.MORTES_POR_OUTROS_MOTIVOS
              },
              {
                'name': 'Aguardando exames',
                'value': resume.AGUARDANDO_RESULTADOS_DE_EXAMES
              }
            ]
        })
  }
}
