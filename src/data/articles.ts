import type { StaticImageData } from 'next/image'
import scanImage from '@/images/scan.png'
import IMG2 from '@/images/img1.png'

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  image?: StaticImageData
  content: string[]
}

// Adicione novos artigos aqui. Cada item vira um card na seção "Artigos" da
// home e uma página própria em /artigos/[slug].
export const articles: Article[] = [
  {
    slug: 'saude-bucal-muito-mais-que-estetica',
    title: 'Saúde bucal: muito mais do que estética',
    excerpt:
      'Escovar os dentes de qualquer jeito, pular o fio dental e adiar o dentista são hábitos comuns que podem custar caro — não só para o sorriso, mas para a saúde como um todo.',
    category: 'Prevenção',
    date: '2026-09-06',
    readTime: '5 min',
    author: 'Matheus Vinute',
    image: scanImage,
    content: [
      'Quando falamos em cuidar da saúde, lembramos de exercícios, alimentação e consultas médicas, mas a boca costuma ficar esquecida.',
      'Cuidar dos dentes vai além da estética. A boca é a porta de entrada do corpo: é por ela que passam alimentos, ar e também bactérias que podem causar problemas sérios se não forem controladas.',
      'Pesquisas mostram que a saúde bucal está ligada à saúde do corpo todo. Uma gengiva inflamada ou uma infecção não tratada pode:',
      'Afetar o coração, já que bactérias da boca podem entrar na corrente sanguínea, Dificultar o controle do diabetes, Aumentar riscos na gravidez, como parto prematuro, Piorar doenças respiratórias.',
      'Ou seja: cuidar da boca é também cuidar do coração e do metabolismo. A boa notícia é que prevenir é simples. Alguns hábitos fazem toda a diferença:',
      'Escovar os dentes ao menos duas vezes ao dia, principalmente antes de dormir, Usar fio dental diariamente, Reduzir o açúcar entre as refeições, Beber bastante água, Evitar o cigarro.',
      'Outro erro comum é só procurar o dentista quando já há dor. O ideal são consultas de rotina a cada seis meses, para identificar problemas antes que evoluam. Uma cárie pequena é fácil de tratar; ignorada, pode virar uma infecção grave.',
      'O cuidado bucal deve acompanhar todas as fases da vida: crianças precisam aprender a escovar os dentes cedo; adultos devem ficar atentos a sinais como sangramento e mau hálito; idosos merecem atenção redobrada, especialmente com próteses e medicamentos.',
      'Cuidar da saúde bucal é um pequeno investimento diário que evita dores, tratamentos complexos e complicações em outras partes do corpo — além de fortalecer a confiança e o bem-estar no dia a dia.',
    ],
  },
  {
    slug: 'saude-bucal-desempenho-esportivo',
    title: 'Saúde bucal e desempenho esportivo: uma conexão que poucos atletas conhecem',
    excerpt:
      'Quem pratica esportes costuma cuidar bem do corpo: treina com regularidade, cuida da alimentação e do descanso.',
    category: 'Odontologia Esportiva',
    date: '2026-09-03',
    readTime: '5 min',
    author: 'Matheus Vinute',
    image: IMG2,
    content: [
      'Quem pratica esportes costuma cuidar bem do corpo: treina com regularidade, cuida da alimentação e do descanso. Mas um detalhe fica de fora: a saúde da boca. E, ao contrário do que parece, ela tem impacto direto no desempenho físico.',
      'Durante o esforço, o corpo muda — e a boca também. Respiração mais acelerada, boca seca, consumo de géis e isotônicos ricos em açúcar, além do cansaço que faz muita gente relaxar na escovação. Tudo isso cria um ambiente propício a problemas bucais que vão além do desconforto. Por que o atleta deve se preocupar:',
      'Inflamação bucal gera uma resposta que consome energia e pode contribuir para o cansaço, Isotônicos e géis, ricos em açúcar e ácidos, aumentam o risco de cárie e desgaste do esmalte, Respirar pela boca no esforço reduz a saliva, uma das principais defesas contra bactérias, Uma infecção não tratada pode gerar dor, inchaço e até tirar o atleta dos treinos, Problemas bucais mal cuidados podem afetar até o sistema cardiovascular, algo relevante em esportes de alto rendimento cardíaco.',
      'Cuidados essenciais para quem treina pesado: Beba água durante e depois do esforço, para repor a saliva e reduzir o efeito do açúcar das bebidas esportivas, Evite escovar os dentes logo após bebidas ácidas — espere cerca de 30 minutos, Use protetor bucal em esportes de contato, como o futebol, Escove os dentes e use fio dental mesmo em dias de treino pesado, Fique atento a sinais como sangramento na gengiva ou mau hálito persistente, Mantenha consultas odontológicas regulares, especialmente quem compete com frequência.',
      'Cuidar da saúde bucal não substitui a preparação física, mas caminha lado a lado com ela. Um corpo saudável começa também pela boca: menos inflamação, mais disposição e menos imprevistos.',
      'Seja na corrida, no futebol, na bike ou no vôlei, o cuidado com os dentes merece o mesmo compromisso dedicado ao treino físico. Um atleta completo cuida do corpo como um todo — da ponta dos pés até o sorriso.',
    ],
  },
]
