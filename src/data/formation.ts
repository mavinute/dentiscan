export interface FormationItem {
  code: string
  theme: 'blue' | 'green' | 'yellow'
  title: string
  org: string
  description: string
  activities: string[]
}

export const formation: FormationItem[] = [
  {
    code: 'CORTE 01 · Graduação',
    theme: 'yellow',
    title: 'Graduação em Odontologia' ,
    org: 'UNINASSAU',
    description:
      'Formação acadêmica em odontologia, com ênfase em diagnóstico por imagem e reabilitação oral, proporcionando uma base sólida para a prática clínica e pesquisa científica.',
    activities: [
      'Odontologia geral e especializada',
      'Tecnicas de diagnóstico por imagem',
      'Planejamento e execução de tratamentos reabilitadores',
    ],
  },
  {
    code: 'CORTE 02 · DIAGNÓSTICO',
    theme: 'blue',
    title: 'LAIO — Liga Acadêmica de Radiologia Odontológica',
    org: 'UFPI · Universidade Federal do Piauí',
    description:
      'Atuação voltada à interpretação de exames de imagem e ao diagnóstico por radiologia odontológica, com participação em atividades teóricas e práticas da liga.',
    activities: [
      'Estudo de exames radiográficos e tomográficos',
      'Discussão de casos clínicos em radiologia',
      'Participação em atividades científicas da liga',
    ],
  },
  {
    code: 'CORTE 03 · REABILITAÇÃO',
    theme: 'green',
    title: 'LAERO Focus — Liga Acadêmica de Reabilitação Oral',
    org: 'Focus Educacional',
    description:
      'Aprofundamento em reabilitação oral, do planejamento à execução, conectando o diagnóstico obtido por imagem às soluções clínicas de reabilitação.',
    activities: [
      'Estudo de planejamento reabilitador',
      'Discussão de protocolos clínicos',
      'Participação em atividades formativas da liga',
    ],
  },
]
