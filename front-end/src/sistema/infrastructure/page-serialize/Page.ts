export abstract class Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  pageable: any; // TODO Must be Pageable Interface or PageRequest Concrete Class
}
