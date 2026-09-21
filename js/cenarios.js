const CENARIOS = [
  {
    id: 1,
    tipo: "Golpe do falso funcionário do banco (Pix)",
    golpe: true,
    canal: "WhatsApp",
    remetente: "Central de Segurança",
    avatar: "🏦",
    mensagens: [
      { de: "eles", texto: "Bom dia! Aqui é o Carlos, da Central de Segurança do seu banco." },
      { de: "eles", texto: "Identificamos uma tentativa de fraude na sua conta agora pouco. Seu dinheiro está em risco!" },
      { de: "eles", texto: "Para proteger seu saldo, o senhor precisa transferir o valor para uma CONTA SEGURA via Pix. Chave: 21 99874-3310" },
      { de: "eles", texto: "É urjente. Se não fizer em 10 minutos, a conta será bloqueada e o dinheiro perdido." }
    ],
    correta: "golpe",
    resumo: "Banco nenhum pede Pix para uma \"conta segura\". Isso não existe.",
    sinais: [
      "Pede Pix para uma chave de celular, e não para o banco.",
      "Cria medo e pressa: \"em 10 minutos\".",
      "Erro de português: \"urjente\"."
    ]
  },
  {
    id: 2,
    tipo: "Aviso legítimo do banco",
    golpe: false,
    canal: "SMS",
    remetente: "Banco",
    avatar: "🏦",
    mensagens: [
      { de: "eles", texto: "Banco informa: identificamos uma compra fora do seu padrão no cartão final 4471." },
      { de: "eles", texto: "Se não reconhece a compra, ligue para o número que está atrás do seu cartão ou procure sua agência." },
      { de: "eles", texto: "Nunca informe senha ou faça transferências a pedido de terceiros. Não responda esta mensagem." }
    ],
    correta: "confiavel",
    resumo: "O banco só avisou e mandou você ligar para o número oficial ou ir à agência.",
    sinais: [
      "Não pede senha, Pix nem dados do cartão.",
      "Não tem link para clicar.",
      "Manda procurar o banco pelo canal oficial, sem pressa."
    ]
  },
  {
    id: 3,
    tipo: "Golpe do link falso (phishing)",
    golpe: true,
    canal: "SMS",
    remetente: "+55 11 9 8322-0417",
    avatar: "📩",
    mensagens: [
      { de: "eles", texto: "PARABENS!! Voce foi sorteado na promoçao Cliente Premiado e ganhou R$ 5.000,00 em vale compras." },
      { de: "eles", texto: "Para resgatar seu premio, clique no link abaixo em ate 24h:\nhttp://premio-clientes.xyz/resgate" }
    ],
    correta: "golpe",
    resumo: "Você não participou de sorteio nenhum. Prêmio que aparece do nada é golpe, e o link leva a um site falso.",
    sinais: [
      "Prêmio de um sorteio em que você nunca se inscreveu.",
      "Link estranho, que não é de loja conhecida.",
      "Palavras sem acento: \"PARABENS\", \"Voce\", \"premio\"."
    ]
  },
  {
    id: 4,
    tipo: "Golpe da compra falsa (link para \"cancelar\")",
    golpe: true,
    canal: "SMS",
    remetente: "+55 11 9 5501-7783",
    avatar: "🛒",
    mensagens: [
      { de: "eles", texto: "Compra APROVADA no seu cartão: iPhone 15 - R$ 6.499,00 na loja Mercado Eletronico." },
      { de: "eles", texto: "Caso nao reconheça essa compra, cancele AGORA pelo link: http://cancelar-compra-seguro.com/br" }
    ],
    pergunta: "O que você faz?",
    opcoes: [
      { rotulo: "🙅 Ignorar", valor: "ignorar", estilo: "neutro" },
      { rotulo: "🔗 Clicar no link", valor: "clicar", estilo: "neutro" }
    ],
    correta: "ignorar",
    resumo: "O susto da compra cara é a isca. O link leva a um site falso que rouba os dados do cartão. Na dúvida, ligue para o número atrás do cartão.",
    sinais: [
      "Compra que você nunca fez, com valor alto para assustar.",
      "Manda clicar para \"cancelar\". Banco manda ligar, não clicar.",
      "Pressa e erros: \"cancele AGORA\", \"nao\"."
    ]
  },
  {
    id: 5,
    tipo: "Mensagem de familiar em contato salvo",
    golpe: false,
    canal: "WhatsApp",
    remetente: "Ana (filha)",
    avatar: "👩",
    mensagens: [
      { de: "eles", texto: "Oi mãe, tudo bem? Passei no médico hoje e deu tudo certo." },
      { de: "eles", texto: "Domingo eu vou aí almoçar com as crianças. Quer que eu leve alguma coisa do mercado?" },
      { de: "voce", texto: "Que bom, filha! Traz um pão de queijo." }
    ],
    correta: "confiavel",
    resumo: "Conversa normal, de um contato que já estava salvo no seu celular.",
    sinais: [
      "O contato já está salvo; não é número novo.",
      "Não pede dinheiro, senha nem dados.",
      "Sem link, sem pressa, sem susto."
    ]
  },
  {
    id: 6,
    tipo: "Golpe do falso familiar (urgência emocional)",
    golpe: true,
    canal: "WhatsApp",
    remetente: "+55 21 9 7715-2890",
    avatar: "👤",
    mensagens: [
      { de: "eles", texto: "Oi vó, sou eu, o Lucas. Troquei de número, salva esse aqui." },
      { de: "eles", texto: "Tô numa situação muito séria, bati o carro e tô na delegacia. Preciso de R$ 1.800 agora senão vou ficar preso." },
      { de: "eles", texto: "Não liga pro meu número antigo, o celular quebrou. Faz um Pix pra essa chave que é de um amigo meu: 21 97715-2890. Por favor vó, é rápido!" }
    ],
    correta: "golpe",
    resumo: "Familiar com número novo pedindo Pix urgente é um dos golpes mais comuns. Ligue no número antigo e confirme.",
    sinais: [
      "Número desconhecido dizendo que \"trocou de número\".",
      "Pede dinheiro urgente e joga com o medo.",
      "Pede para NÃO ligar no número antigo."
    ]
  },
  {
    id: 7,
    tipo: "Golpe do falso INSS (prova de vida / benefício bloqueado)",
    golpe: true,
    canal: "WhatsApp",
    remetente: "INSS Atendimento",
    avatar: "🏛️",
    mensagens: [
      { de: "eles", texto: "Prezado(a) segurado(a), o INSS informa que seu beneficio será SUSPENSO por falta de prova de vida." },
      { de: "eles", texto: "Para regularizar e não perder o pagamento deste mês, envie foto do seu documento e informe seu CPF e a senha do gov.br." },
      { de: "eles", texto: "Prazo: 48 horas. Após isso o beneficio sera cancelado definitivamente." }
    ],
    correta: "golpe",
    resumo: "O INSS nunca pede senha ou documento pelo WhatsApp. O canal oficial é o app Meu INSS ou o telefone 135.",
    sinais: [
      "Pede a senha do gov.br. Senha é sua, ninguém pede.",
      "Ameaça cortar o benefício em 48 horas.",
      "Sem acento: \"beneficio\", \"sera\"."
    ]
  }
];

const DICAS_FINAIS = [
  "Banco nunca pede Pix, senha ou transferência para \"conta segura\".",
  "Desconfie de pressa: golpista sempre diz que é urgente.",
  "Não clique em links que você não esperava. Na dúvida, ligue para o número atrás do cartão.",
  "Familiar com número novo pedindo dinheiro? Ligue no número antigo.",
  "INSS e governo não pedem senha por mensagem. Use o app Meu INSS ou ligue 135.",
  "Na dúvida, não faça nada. Peça ajuda a alguém de confiança."
];
