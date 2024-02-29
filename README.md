# Node Gym

gympass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível o validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não pode se cadastrar com um email duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academmia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL
- [x] Todas listas de dados precisam estar paginadas com 20 item por página;
- [ ] O usuário devem ser identificados por JWT (json web token)

## Patterns ulizados

- Repositories - Abstrai a interação com o banco de dados em um módulo espeçifico.
- Factories - Abstrai a instanciação de multiplas dependências
- Controllers - Abstrai o handler das rotas para outro módulo.
- Use cases / Services - Abstrai casos de uso comuns da aplicação para uma camada de servicos.
- Inversão de dependêcias - Desacopla módulos permitindo que eles funcionem de forma mais independente.
