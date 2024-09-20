## Casos de uso
* [x] Deve ser possível cadastrar um usuário
* [x] Deve ser possível fazer login com um usuário já cadastrado
* [x] Deve ser possível o usuário fazer logout da conta
* [x] Deve ser possível o usuário ver quantos pontos tem acumulados na conta 
* [ ] Deve ser possível fazer parte do top 10 usuários com maior pontuação na classificação
* [ ] Deve ser possível ver a classificação de pontos
* [ ] Deve ser possível assinar o plano premium
* [ ] Deve ser possível cancelar o plano premium
* [ ] Deve ser possível criar um quiz
* [ ] Deve ser possível jogar um quiz
* [ ] Deve salvar o quiz assim que terminar a partida
* [ ] Deve ser possível incrementar a pontuação atual do usuário ao finalizar um quiz
  
-> 🥇 🥈 🥉

## Regras de negócio
* [x] Só deve ser possível cadastrar um usuário cujo e-mail ainda não foi cadastrado
* [x] Só deve ser possível fazer login para usuários já cadastrados
* [x] Ao cadastrar um usuário no banco de dados, deve-se também cadastrá-lo no Stripe
* [ ] Só deve aparecer na classificação os usuários que assinam o premium
* [ ] Não é necessário estar autenticado para ver a classificação de pontos
* [ ] O usuário precisa estar autenticado para assinar o plano premium
* [ ] O usuário precisa estar autenticado para cancelar o plano premium
* [x] O usuário deve estar autenticado para criar um quiz
* [x] O usuário deve estar autenticado para jogar um quiz
* [ ] Um usuário na versão free só pode jogar 1 quiz por dia
* [ ] Um usuário na versão free só pode criar quizzes com 5 perguntas
* [ ] Um usuário na versão premium pode jogar até 10 quizzes por dia
* [ ] Um usuário na versão premium pode criar quizzes com 5, 10 ou 15 perguntas
* [ ] Um usuário não-autenticado não pode acessar páginas que requerem autenticação (middleware)
  
## Requisitos não-técnicos
* [x] O cadastro deve ser por meio de login social com Google
* [x] Usar o Mongodb como banco de dados
* [x] Usar o Stripe como gateway de pagamento