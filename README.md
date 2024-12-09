<h1>Sobre o Projeto</h1>
<p>Este projeto foi desenvolvido com foco na utilização de APIs, utilizando um template pré-existente no qual foram realizados ajustes e a criação de algumas páginas do zero.</p>
<p>As principais tecnologias utilizadas foram:</p>
<ul>
  <li><strong>NextJS</strong> e <strong>ReactJS</strong> para a estrutura do projeto.</li>
  <li><strong>Tailwind CSS</strong> e <strong>Ant Design</strong> para estilização, incluindo algumas mensagens.</li>
  <li><strong>Hooks do React</strong> para gerenciamento de estado e lógica.</li>
  <li>Um arquivo <code>.env.local</code> foi criado para armazenar variáveis de ambiente, permitindo configurar o login necessário para realizar as requisições dos endpoints.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Next.js</strong></li>
  <li><strong>React.js</strong></li>
  <li><strong>Tailwind CSS</strong></li>
  <li><strong>Ant Design</strong></li>
</ul>

<h2>Como Rodar o Projeto</h2>
<ol>
  <li>
    <p>Clone o repositório:</p>
    <pre><code>git clone &lt;URL_DO_REPOSITORIO&gt;
cd &lt;PASTA_DO_PROJETO&gt;</code></pre>
  </li>
  <li>
    <p>Instale as dependências:</p>
    <pre><code>npm install</code></pre>
  </li>
  <li>
    <p>Configure as variáveis de ambiente:</p>
    <p>Crie um arquivo <code>.env.local</code> na raiz do projeto com o seguinte conteúdo:</p>
    <pre><code>NEXT_PUBLIC_API_USERNAME={username} # Substitua {username} pelo nome de usuário
NEXT_PUBLIC_API_PASSWORD={password} # Substitua {password} pela senha</code></pre>
    <p><strong>Atenção:</strong> Sem este arquivo, as requisições aos endpoints não irão funcionar.</p>
  </li>
  <li>
    <p>Inicie o servidor de desenvolvimento:</p>
    <pre><code>npm run dev</code></pre>
  </li>
  <li>
    <p>Acesse o projeto no navegador:</p>
    <p>O servidor estará disponível em: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
  </li>
</ol>

<h2>Observações</h2>
<ul>
  <li>Certifique-se de que as variáveis de ambiente estão corretamente configuradas.</li>
  <li>Este projeto utiliza autenticação para acessar as APIs; sem o login configurado, as requisições não terão sucesso.</li>
</ul>
