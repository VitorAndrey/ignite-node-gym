JWT: JSON Web Token

1 - Usuário faz login enviando E-MAIL/PASSWORD;
2 - Backend cria um token ÚNICO, não modificável e STATELESS;
3 - Ao Criar o Token ele usa uma PALAVRA_CHAVE (string);

- Email/password: header.payload.sign
- Stateless: não armazenado em nenhuma estrutura de persistência;
- Palavra-chave: fjpoaheuiopfioevvfpeabonibivfapeiobofhgiasueb;

// Como somente o backend tem a palavra-chave, somente ele pode criar
// e validar o token.
