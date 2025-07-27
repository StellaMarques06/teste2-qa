import http from 'k6/http'
import { sleep, check } from 'k6'

// Configuração do teste
export const options = {
  vus: 10,              // 10 usuários virtuais simultâneos
  duration: '30s',      // por 30 segundos
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2 segundos
    http_req_failed: ['rate<0.01']     // Máximo de 1% de falhas permitidas
  }
}

export default function () {
  const url = 'https://open.er-api.com/v6/latest/USD' // Endpoint para consultar câmbio a partir do USD

  // Faz uma requisição GET à API
  const res = http.get(url)

  // Exibe parte da resposta no terminal
  console.log(res.body.substring(0, 100)) // imprime os 100 primeiros caracteres da resposta

  // Verificações automáticas do resultado
  check(res, {
    'status é 200': (r) => r.status === 200,         // Verifica se a resposta foi OK
    'contém BRL': (r) => r.body.includes('"BRL"'),   // Verifica se a moeda brasileira está presente
    'contém EUR': (r) => r.body.includes('"EUR"')    // Verifica se a moeda Euro está presente
  })

  sleep(1) // Pausa de 1 segundo entre as execuções do usuário virtual
}
