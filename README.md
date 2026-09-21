# Golpe ou Confiável? — Simulador de Golpes Digitais para Idosos

Projeto desenvolvido para a disciplina **Atividade Extensionista II** do curso de
Análise e Desenvolvimento de Sistemas (Uninter).

**Aluno:** Gabriel Zacharias Cardozo — RU 5085140
**Título do projeto:** Ensinando Idosos a Reconhecer Golpes Digitais
**ODS relacionados:** 04 (Educação de qualidade) e 16 (Paz, justiça e instituições eficazes)

## O problema

Idosos são um dos alvos preferidos de golpes digitais no Brasil: falso funcionário de
banco pedindo Pix, links de "prêmios" que roubam dados de cartão e mensagens de
"familiar em apuros" pedindo dinheiro urgente. Muitas vezes a vítima só percebe o
golpe depois de já ter transferido o dinheiro.

## A solução

Uma página web simples, sem instalação, que mostra **mensagens parecidas com as
que chegam no celular** dentro de uma tela de smartphone simulada. Em cada mensagem
o usuário escolhe **Confiável** ou **Golpe**. Ao responder, recebe uma explicação em
linguagem simples apontando os sinais de alerta (erros de português, links estranhos,
tom de urgência, pedido de Pix).

A ferramenta foi pensada para ser aplicada com os moradores de uma vila residencial
no bairro Santo Cristo (Rio de Janeiro/RJ) e fica disponível publicamente para
qualquer pessoa.

## Como usar

- **Online:** https://golpeouconfiavel.netlify.app/ (link principal, para os idosos)
- **Espelho no GitHub Pages:** https://gabrielcardozo92.github.io/simulador-golpes-digitais/
- **Código-fonte:** https://github.com/GabrielCardozo92/simulador-golpes-digitais
- **Localmente:** baixe a pasta e abra o arquivo `index.html` no navegador. Não
  precisa de servidor nem de instalação.

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem frameworks e sem etapa de build).
- Os cenários ficam em `js/cenarios.js`, o que facilita adicionar novos golpes sem
  mexer na lógica.

## Decisões de design (pensadas para idosos no celular)

- **Fonte Atkinson Hyperlegible**, criada pelo Braille Institute para leitores com
  baixa visão. Se não houver internet, cai para a fonte do sistema.
- **Tela cheia no celular:** o simulador ocupa a tela inteira, com o cabeçalho do
  chat no topo, a conversa no meio e os botões fixos embaixo, na zona do polegar.
  A moldura de celular só aparece no computador.
- **Feedback sem rolagem:** a explicação abre como uma folha de tela cheia e cada
  cenário tem no máximo 3 sinais curtos, para caber inteira em telas de 360×640.
- **Cores com significado conhecido:** verde para "confiável", vermelho para
  "golpe". Quando a pergunta é "O que você faz?", os dois botões têm a mesma cor
  para não entregar a resposta.
- **Botões empilhados**, com 60px de altura e largura total, fáceis de tocar.
- Respeita a preferência do sistema por menos animação (`prefers-reduced-motion`).

## Estrutura

```
simulador/
├── index.html        # telas: início, cenário (celular simulado) e final
├── css/estilo.css    # layout mobile-first, fonte grande, alto contraste
├── js/cenarios.js    # os cenários de golpe e as dicas finais
├── js/app.js         # fluxo, animação das mensagens, feedback e placar
└── assets/           # imagens e ícones (opcional)
```

## Cenários incluídos

O simulador mistura golpes e mensagens legítimas, para que o usuário precise
avaliar cada caso de verdade:

1. Falso funcionário do banco pedindo Pix para "conta segura" (golpe)
2. Aviso legítimo do banco orientando a ligar ou ir à agência (confiável)
3. SMS de prêmio falso pedindo para clicar em um link suspeito (golpe)
4. Compra falsa com link para "cancelar" — pergunta "O que você faz?" (golpe)
5. Conversa comum com familiar já salvo nos contatos (confiável)
6. Falso neto com número novo pedindo Pix urgente (golpe)
7. Falso INSS ameaçando suspender o benefício e pedindo senha do gov.br (golpe)

## Como adicionar um cenário

Abra `js/cenarios.js` e acrescente um objeto à lista `CENARIOS` seguindo o modelo
dos existentes. Use `golpe: true` ou `golpe: false` para indicar se a mensagem é
fraude ou legítima. Por padrão os botões são "Confiável" e "Golpe"; para trocar a
pergunta e as opções (por exemplo "Ignorar" e "Clicar no link"), preencha os campos
`pergunta` e `opcoes`.

## Licença

Uso educacional e livre.
