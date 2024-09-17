import { ProdutoDTO } from "src/models/produto.dto";

export interface CartItem {
    quantidade: number,
    produto: ProdutoDTO
}
