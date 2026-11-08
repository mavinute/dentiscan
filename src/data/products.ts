export type StoreProduct = {
  id: string
  name: string
  subtitle: string
  description: string
  price: number | null
  images: string[]
  tag?: string
}

// Edite este arquivo para cadastrar os três produtos reais.
// Coloque as fotos em public/produtos/ e informe os caminhos em images.
export const products: StoreProduct[] = [
  {
    id: 'produto-1',
    name: 'Kit Dental',
    subtitle: 'Título curto para destacar o principal benefício',
    description:
      'Adicione aqui uma descrição objetiva do produto, seus diferenciais, características, dimensões e informações importantes para a compra.',
    price: null,
    images: [],
    tag: 'Destaque',
  },
  {
    id: 'produto-2',
    name: 'Produto 02',
    subtitle: 'Apresente o que torna este produto especial',
    description:
      'Adicione aqui os detalhes do segundo produto. Explique para quem ele é indicado e quais características o diferenciam.',
    price: null,
    images: [],
  },
  {
    id: 'produto-3',
    name: 'Produto 03',
    subtitle: 'Uma descrição breve e direta',
    description:
      'Adicione aqui as informações do terceiro produto, incluindo materiais, medidas, conteúdo da embalagem ou outras especificações.',
    price: null,
    images: [],
  },
]
