export interface SkillGroup {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Diagnóstico por imagem',
    skills: [
      'Radiografia periapical',
      'Radiografia panorâmica',
      'Tomografia cone beam',
      'Interpretação radiográfica',
    ],
  },
  {
    title: 'Reabilitação oral',
    skills: ['Planejamento reabilitador', 'Prótese', 'Oclusão'],
  },
  {
    title: 'Tecnologia',
    skills: [
      'Softwares de imagem',
      'Planejamento digital',
      'Ferramentas de IA aplicadas à saúde',
    ],
  },
  {
    title: 'Acadêmico',
    skills: [
      'Apresentação de casos',
      'Produção científica',
      'Trabalho em liga acadêmica',
    ],
  },
]
