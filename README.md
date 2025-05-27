# **Dr.Agenda - Sistema de Agendamento Médico**  

📅 **Aplicativo web para gestão de clínicas e agendamento de consultas**  

---

## **🚀 Como Rodar o Projeto**  

### **Pré-requisitos**  
- Node.js 18+  
- PostgreSQL (ou [Neon](https://neon.tech/) para serverless)  
- Git  

### **Passos Iniciais**  
```bash
# 1. Clone o repositório
git clone https://github.com/camoredev/doutor-agenda.git

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env
cp .env.example .env
# Edite com suas credenciais do banco de dados

# 4. Execute as migrações do Drizzle ORM
npx drizzle-kit push:pg

# 5. Inicie o servidor
npm run dev
```

### **Principais Tecnologias**  
- **Frontend**: Next.js 15 + Tailwind CSS  
- **Backend**: API Routes (Next.js)  
- **Banco de Dados**: PostgreSQL + Drizzle ORM  
- **Ferramentas**: ESLint, Prettier, Conventional Commits  

---

## **💡 Comandos Úteis**  
| Comando                | Descrição                          |
|------------------------|-----------------------------------|
| `npm run dev`          | Inicia o servidor de desenvolvimento |
| `npm run lint`         | Verifica erros de código           |
| `npm run format`       | Formata o código automaticamente   |
| `npx drizzle-kit push` | Sincroniza schema com o banco      |

---

## **📌 Dicas Rápidas**  
- Acesse `http://localhost:3000` após iniciar  
- Use `npx drizzle-kit studio` para visualizar o banco de dados  
- Configure o VS Code com as extensões recomendadas  

Projeto pronto para desenvolvimento! ✨  

*(Consulte [DOCS.md](./DOCS.md) para detalhes completos de configuração)*
