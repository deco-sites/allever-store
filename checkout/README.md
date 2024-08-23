# allever VTEX

Este repositório abriga os projetos VTEX da allever, dividida em três partes principais: Checkout, Storefront e My Account.

## Checkout (src/)

A parte do Checkout é responsável por gerenciar o processo de compra na loja allever. Os arquivos fonte estão localizados na pasta `src/`, e os arquivos compilados são gerados na pasta `dist/` na raiz do projeto.

### Como executar

Para executar o Checkout localmente, utilize o seguinte comando:

```bash
npm run start
```

Também será necessário fazer um proxy dos arquivos do Checkout, interceptando os arquivos js e css do navegador e substituindo pelos arquivos locais que são gerados na pasta dist/ a cada atualização de código. Algumas recomendações para fazer esse processo é usar o [Requestly](https://requestly.com/), [Request Interceptor](https://chromewebstore.google.com/detail/request-interceptor/bfgblailifedppfilabonohepkofbkpm) ou [Fiddler](https://www.telerik.com/download/fiddler)

### Build

Para gerar os arquivos de build do Checkout, utilize o seguinte comando:

```bash
npm run build
```

## Storefront (theme/)

A pasta theme/ contém os arquivos relacionados ao tema da loja allever. Como o front-end é realizado na deco.cx, o tema foi principalmente criado para abrigar outros APPs VTEX como Wishlist e o próprio My Account.

## My Account (account/)

A pasta account/ contém o aplicativo desenvolvido para estilizar a área de "Minha Conta" da loja allever. Isso proporciona aos usuários uma experiência personalizada ao gerenciar suas contas e informações.

A estilização da página é feita toda no arquivo *account/styles/css/vtex.my-account.css*.
Algumas customizações manuais foram inseridas via Javascript pelo arquivo *account/pixel/head.html*.

Para executar e começar a fazer alterações no My Account, utilize o CLI do VTEX IO para fazer login na loja da allever, em seguida basta executar:

```bash
vtex link
```