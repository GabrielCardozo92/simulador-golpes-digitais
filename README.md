# Golpe ou Confiável?

Simulador de golpes digitais para idosos, desenvolvido como projeto da disciplina
Atividade Extensionista II, do curso de Análise e Desenvolvimento de Sistemas da Uninter.

## O que é

Uma página web que mostra, dentro de uma tela de celular simulada, mensagens
parecidas com as que chegam por WhatsApp e SMS. Em cada mensagem a pessoa escolhe
entre "Confiável" e "Golpe" e recebe em seguida uma explicação curta com os sinais
de alerta: pedido de Pix, link estranho, pressa, erro de português etc.

O objetivo é ajudar idosos a reconhecer os golpes mais comuns antes de cair neles.

Acesso: https://golpeouconfiavel.netlify.app/

## Como foi feito

HTML, CSS e JavaScript, sem framework. A interface foi pensada para idosos usando o
celular: fonte grande, alto contraste, botões grandes na parte de baixo da tela e
explicações que cabem na tela sem rolar.

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
