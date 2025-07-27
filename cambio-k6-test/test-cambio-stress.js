import http from 'k6/http'
import { sleep, check } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Aumenta gradualmente de 0 para 100 usuários virtuais em 2 minutos
    { duration: '5m', target: 100 },  // Mantém 100 usuários por 5 minutos (estabilização)
    { duration: '2m', target: 200 },  // Sobe para 200 usuários em mais 2 minutos
    { duration: '5m', target: 200 },  // Mantém 200 usuários por 5 minutos
    { duration: '2m', target: 300 },  // Sobe para 300 usuários em 2 minutos
    { duration: '5m', target: 300 },  // Mantém 300 usuários por 5 minutos
    { duration: '2m', target: 400 },  // Sobe para 400 usuários em 2 minutos
    { duration: '5m', target: 400 },  // Mantém 400 usuários por 5 minutos
    { duration: '10m', target: 0 }    // Diminui gradualmente de 400 para 0 usuários em 10 minutos (rampa de saída)
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem ser respondidas em menos de 2s
    http_req_failed: ['rate<0.01']     // No máximo 1% das requisições pode falhar
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
    'summary-stress.html': htmlReport(data),
  };
}

