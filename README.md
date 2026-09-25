# Golpe ou Confiável?

Simulador de golpes digitais para idosos, feito como projeto da disciplina
Atividade Extensionista II do curso de Análise e Desenvolvimento de Sistemas (Uninter).

Aluno: Gabriel Zacharias Cardozo (RU 5085140)
Projeto: Ensinando Idosos a Reconhecer Golpes Digitais
ODS: 04 (Educação de qualidade) e 16 (Paz, justiça e instituições eficazes)

## Sobre

A página mostra mensagens parecidas com as que chegam no celular (WhatsApp e SMS)
dentro de uma tela de celular simulada. Em cada mensagem a pessoa escolhe entre
"Confiável" e "Golpe". Depois de responder, aparece uma explicação curta com os
sinais de alerta daquela mensagem: pedido de Pix, link estranho, pressa, erro de
português etc.

O simulador foi aplicado com moradores de uma vila no bairro Santo Cristo, no Rio
de Janeiro, e continua disponível para qualquer pessoa usar.

## Acesso

- Site: https://golpeouconfiavel.netlify.app/
- GitHub Pages: https://gabrielcardozo92.github.io/simulador-golpes-digitais/
- Para rodar no computador, basta baixar a pasta e abrir o `index.html` no navegador.
  Não precisa instalar nada.

## Tecnologias

HTML, CSS e JavaScript puro, sem framework e sem build. Os cenários ficam no
arquivo `js/cenarios.js`, separados da lógica, para facilitar a inclusão de novos golpes.

## Acessibilidade

Como o público são idosos usando o celular, o layout foi feito pensando nisso:

- fonte grande (Atkinson Hyperlegible, feita para baixa visão) e alto contraste;
- botões grandes, na parte de baixo da tela;
- verde para "confiável" e vermelho para "golpe";
- a explicação de cada resposta cabe na tela sem precisar rolar;
- respeita a opção de reduzir animações do sistema.

## Estrutura

```
index.html        telas de início, cenário e resultado
css/estilo.css    estilos
js/cenarios.js    cenários e dicas finais
js/app.js         fluxo das telas, mensagens e feedback
```

## Cenários

1. Falso funcionário do banco pedindo Pix para "conta segura" (golpe)
2. Aviso do banco orientando a ligar para o número oficial (confiável)
3. SMS de prêmio falso com link (golpe)
4. Compra falsa com link para "cancelar" (golpe)
5. Conversa normal com familiar salvo nos contatos (confiável)
6. Falso neto com número novo pedindo Pix urgente (golpe)
7. Falso INSS ameaçando suspender o benefício (golpe)

## Adicionando um cenário

Abra `js/cenarios.js` e copie um dos objetos da lista `CENARIOS`, ajustando os
textos. O campo `golpe` indica se a mensagem é fraude ou não. Se quiser outra
pergunta e outros botões (por exemplo "Ignorar" e "Clicar no link"), preencha os
campos `pergunta` e `opcoes`.

## Licença

Uso livre para fins educacionais.
