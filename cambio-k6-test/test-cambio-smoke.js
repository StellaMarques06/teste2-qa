import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

// Configurações do teste de carga
export const options = {
  vus: 1,                   // 1 usuário virtual
  duration: '1m',           // durante 1 minuto
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01']     // máximo de 1% de falhas permitidas
  }
};

export default function () {
  const url = 'https://open.er-api.com/v6/latest/USD' // Endpoint da API de câmbio

  const res = http.get(url) // Requisição GET

  // Exibe parte da resposta no terminal
  console.log(res.body.substring(0, 100))

  // Validações automáticas
  check(res, {
    'status é 200': (r) => r.status === 200,
    'contém BRL': (r) => r.body.includes('"BRL"'),
    'contém EUR': (r) => r.body.includes('"EUR"')
  })

  sleep(1) // Espera 1 segundo entre execuções
}

// Geração de relatório HTML após execução
export function handleSummary(data) {
  return {
    'summary-smoke.html': htmlReport(data),
  };
}
