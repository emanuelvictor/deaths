import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DeathRepository extends BaseRepository<any> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'deaths');
  }

  getResume(): Promise<any> {
    return this.httpClient.get<any>(this.collectionName).toPromise();
  }
}
