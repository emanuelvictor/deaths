import {Abstract} from '../abstract/abstract.model';

export class Death extends Abstract {

  /**
   *
   */
  public date: Date;

  /**
   *
   */
  public cause: string;

/**
   *
   */
    get covid(): boolean {
        return true;
    }

}

