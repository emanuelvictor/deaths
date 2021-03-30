import {Component, OnInit} from '@angular/core';
import {DeathRepository} from "../../../../../../domain/repository/death.repository";

// @ts-ignore
@Component({
  selector: 'visualizar-inventario',
  templateUrl: './visualizar-inventario.component.html',
  styleUrls: ['../inventarios.scss'],
})
export class VisualizarInventarioComponent implements OnInit {

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
   * @param inventarioRepository
   * @param centroCustoInventarioRepository
   */
  constructor(private deathRepository: DeathRepository) {

//     homeView.toolbar.subhead = 'Obituário / Foz do Iguaçu'

  }

  /**
   *
   */
  ngOnInit() {
        this.deathRepository.getResume().then( deaths => {

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
