# 🧪 Testes de Performance com k6 - Projeto `teste2-qa`

Este projeto tem como objetivo realizar testes de performance para a aplicação de câmbio ExchangeRate API utilizando a ferramenta **k6**, abrangendo testes de carga (load), fumaça (smoke) e estresse (stress).

Os testes foram criados utilizando como base os exemplos oficiais da documentação do [k6](https://k6.io/docs/), adaptados para as necessidades específicas da aplicação.

> Projeto desenvolvido como base para validar a performance e estabilidade da aplicação de câmbio ExchangeRate API.

---

## 📁 Estrutura do Projeto

```
cambio-k6-test/
├── summary-load.html # Relatório HTML gerado após o teste de carga
├── summary-smoke.html # Relatório HTML gerado após o teste de fumaça
├── summary-stress.html # Relatório HTML gerado após o teste de stress
├── test-cambio-load.js # Script de teste de carga (load test)
├── test-cambio-smoke.js # Script de teste de fumaça (smoke test)
├── test-cambio-stress.js # Script de teste de estresse (stress test)
├── test-cambio.js # Script geral / base para testes
README.md
```

---

## 🚀 Como Clonar e Rodar o Projeto

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse o diretório
cd cambio-k6-test

# Execute os testes

# Teste de carga
k6 run test-cambio-load.js

# Teste de fumaça
k6 run test-cambio-smoke.js

# Teste de estresse
k6 run test-cambio-stress.js

---

## 📌 Tecnologias e Padrões Utilizados

- k6 para testes de performance

- Scripts organizados por tipo de teste: carga, fumaça e estresse

- Base dos testes criada a partir dos exemplos oficiais da documentação do k6

- Relatórios em HTML gerados automaticamente para visualização dos resultados

- Código modular e organizado para fácil manutenção e expansão

- A aplicação ExchangeRate API utilizada para os testes pode ser consultada no endereço: (https://github.com/toddmotto/public-apis) 

---

## 👩‍💻 Desenvolvido por

**Stella Marques**  
[GitHub: @StellaMarques06](https://github.com/StellaMarques06)
