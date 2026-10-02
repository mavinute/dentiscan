export interface SkillGroup {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Dentistica',
    skills: [
      'Restauração direta',
      'Restauração indireta',
    ],
  },
  {
    title: 'Periodontia',
    skills: [
      'Raspagem e alisamento radicular'
    ],
  },
  {
    title: 'Endodontia',
    skills: [
      'Tratamento endodôntico'
    ],
  },
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
    skills: ['Planejamento reabilitador'],
  },
  {
    title: 'Tecnologia',
    skills: [
      'Softwares de imagem',
      'Planejamento digital',
      'Ferramentas de IA aplicadas à saúde',
    ],
  }
]
