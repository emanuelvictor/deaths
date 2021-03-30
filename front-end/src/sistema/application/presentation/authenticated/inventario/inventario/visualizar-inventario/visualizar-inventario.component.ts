import {Component, OnInit} from '@angular/core';
import {viewAnimation} from "../../../../../utils/utils";
import {DeathRepository} from "../../../../../../domain/repository/death.repository";

// @ts-ignore
@Component({
  selector: 'visualizar-inventario',
  templateUrl: './visualizar-inventario.component.html',
  styleUrls: ['../inventarios.scss'],
  animations: [
    viewAnimation
  ]
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
        this.deathRepository.getResume().then( result => {
            this.single2 = [
                  {
                    'name': 'Mortes por COVID-19',
                    'value': result.MORTES_POR_COVID
                  },
                  {
                    'name': 'Outras causas',
                    'value':  result.MORTES_POR_OUTROS_MOTIVOS
                  },
                  {
                    'name': 'Aguardando exames',
                    'value': result.AGUARDANDO_RESULTADOS_DE_EXAMES
                  }
                ]
        })
  }
}
