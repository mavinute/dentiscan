export type CaseCategory = 'radiologia' | 'reabilitacao' | 'IA' | 'SUS'

export interface CaseItem {
  code: string
  title: string
  description: string
  category: CaseCategory
}

// Troque os itens abaixo pelos seus casos, resumos, pôsteres e artigos reais.
export const cases: CaseItem[] = [
  {
    code: 'CASO-01',
    title: 'ESCANEAMENTO INTRAORAL VERSUS MOLDAGEM CONVENCIONAL EM PRÓTESE FIXA: UMA ANÁLISE CRÍTICA DA ACURÁCIA E EFICIÊNCIA CLÍNICA',
    description:
      'Os estudos mostram que o escaneamento intraoral apresenta acurácia semelhante ou superior à moldagem convencional em casos unitários e de pequena extensão, além de proporcionar maior eficiência clínica, com redução do tempo de atendimento e maior conforto ao paciente',
    category: 'reabilitacao',
  },
  {
    code: 'CASO-02',
    title: 'DESAFIOS E AVANÇOS NA ATENÇÃO PRIMÁRIA EM SAÚDE NO BRASIL: UMA REVISÃO INTEGRATIVA',
    description:
      'A APS detém diversas problemáticas desafiadoras e significativas tanto a níveis estruturais físicos quanto organizacionais que comprometem a assistência aos usuários, bem como influem no processo de trabalho das equipes de saúde devido a falta de infraestrutura e recursos humanos qualificados.',
    category: 'SUS',
  },
  {
    code: 'CASO-03',
    title: 'DESAFIOS ÉTICOS NO USO DA INTELIGÊNCIA ARTIFICIAL NA SAÚDE PÚBLICA: UMA REVISÃO BASEADA EM ESTUDOS RECENTES',
    description:
      'O avanço da inteligência artificial (IA) tem impactado profundamente a saúde pública, promovendo melhorias em diagnósticos, tratamentos, gestão hospitalar e pesquisa médica.',
    category: 'IA',
  },
  {
    code: 'CASO-04',
    title: 'URGENCIA NO ATENDIMENTO E INOVACOES TECNOLOGICAS NO ACIDENTE VASCULAR CEREBRAL: UMA REVISÃO DA LITERATURA',
    description: 'O Acidente Vascular Cerebral (AVC) É uma condição neurológica grave e uma das principais causas de incapacidade e mortalidade no mundo. Classificado em isquêmico e hemorrágico, o AVC apresenta alta prevalência e exige atendimento rápido para minimizar sequelas e óbitos.',
    category: 'reabilitacao',
  },
  // {
  //   code: 'CASO-05',
  //   title: 'Título do caso clínico',
  //   description: 'Breve descrição do caso. Substitua por um caso real do seu acervo.',
  //   category: 'radiologia',
  // },
  // {
  //   code: 'CASO-06',
  //   title: 'Artigo ou publicação',
  //   description: 'Nome da publicação, veículo e ano. Substitua pela sua produção científica.',
  //   category: 'reabilitacao',
  // },
]
