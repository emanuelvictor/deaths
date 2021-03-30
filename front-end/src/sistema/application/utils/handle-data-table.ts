import {MatPaginator} from "@angular/material";

/**
 * Trata a paginação e devolve ela atualizada. 
 * 
 * @param hasAnyFilter Verifica se há algum filtro, caso exista, então será redirecionado para a primeira página
 * @param paginator
 * @param pageable
 */
export function handlePageable( hasAnyFilter: boolean, paginator: MatPaginator, pageable: any ) {

    const p = {
        pageSize : null,
        pageIndex : null,
    };

    if (paginator && paginator.pageSize)
        p.pageSize = paginator.pageSize;
    if (paginator && paginator.pageIndex)
        p.pageIndex = paginator.pageIndex;

    let refreshPageable = Object.assign({}, pageable);
    refreshPageable.size = p.pageSize;
    refreshPageable.page = !hasAnyFilter ? p.pageIndex : 0;
    return refreshPageable
}
