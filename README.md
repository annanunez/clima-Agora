# ClimaCell Weather App

Uma aplicação web moderna e responsiva para consulta de dados meteorológicos utilizando a API Tomorrow.io (antiga ClimaCell). A aplicação apresenta uma interface elegante com tema azul, elementos gráficos atraentes e funcionalidades interativas.

## 🌟 Características

### Design e Interface
- **Tema Azul Moderno**: Interface com gradientes e elementos gráficos em tons de azul
- **Responsivo**: Adaptável a diferentes tamanhos de tela (desktop, tablet, mobile)
- **Modo Escuro/Claro**: Alternância entre temas com um clique
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Glassmorphism**: Efeitos de vidro fosco com backdrop-filter

### Funcionalidades
- **Busca por Localização**: Digite qualquer cidade para obter dados meteorológicos
- **Geolocalização**: Use sua localização atual automaticamente
- **Dados Atuais**: Temperatura, sensação térmica, umidade, vento, pressão, visibilidade
- **Previsão Horária**: Próximas 24 horas com ícones e temperaturas
- **Previsão de 5 Dias**: Temperaturas máximas e mínimas com condições
- **Detalhes Meteorológicos**: Índice UV, ponto de orvalho, cobertura de nuvens, probabilidade de chuva

### Recursos Avançados
- **Atalhos de Teclado**: Ctrl+K para busca, Ctrl+L para localização atual
- **Armazenamento Local**: Lembra da última localização pesquisada
- **Dados Simulados**: Funciona mesmo sem chave da API para demonstração
- **Interface Multilíngue**: Totalmente em português brasileiro

## 🚀 Como Usar

### Configuração Básica
1. Abra o arquivo `script.js`
2. Substitua `YOUR_API_KEY_HERE` pela sua chave da API Tomorrow.io
3. Abra `index.html` em um navegador web

### Obter Chave da API
1. Acesse [Tomorrow.io](https://tomorrow.io)
2. Crie uma conta gratuita
3. Obtenha sua chave da API no dashboard
4. A conta gratuita permite até 1000 chamadas por dia

### Modo Demonstração
A aplicação funciona em modo demonstração com dados simulados mesmo sem uma chave da API válida, permitindo testar todas as funcionalidades da interface.

## 📁 Estrutura dos Arquivos

```
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS com tema azul
├── script.js           # Lógica JavaScript e integração com API
└── README.md           # Este arquivo
```

## 🎨 Paleta de Cores

- **Azul Primário**: #1e40af
- **Azul Secundário**: #3b82f6
- **Azul Claro**: #60a5fa
- **Azul Céu**: #0ea5e9
- **Azul Escuro**: #1e3a8a
- **Azul Marinho**: #1e293b

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, Custom Properties, Animações
- **JavaScript ES6+**: Classes, Async/Await, Modules
- **Tomorrow.io API**: Dados meteorológicos em tempo real
- **Google Fonts**: Tipografia Inter
- **Responsive Design**: Mobile-first approach

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resolução**: Otimizado para todas as resoluções

## ⌨️ Atalhos de Teclado

- `Ctrl + K` ou `Cmd + K`: Focar no campo de busca
- `Ctrl + L` ou `Cmd + L`: Usar localização atual
- `Enter`: Executar busca quando o campo estiver focado

## 🌐 API Integration

### Endpoints Utilizados
- **Weather Forecast**: `/v4/weather/forecast`
- **Realtime Weather**: `/v4/weather/realtime`

### Parâmetros Suportados
- **location**: Cidade, coordenadas, CEP
- **timesteps**: Intervalos de tempo (1h, 1d)
- **units**: Sistema de unidades (metric, imperial)

### Tratamento de Erros
- Validação de entrada do usuário
- Fallback para dados simulados
- Mensagens de erro amigáveis
- Botão de retry para nova tentativa

## 🔧 Personalização

### Modificar Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-blue: #1e40af;
    --secondary-blue: #3b82f6;
    /* ... outras variáveis */
}
```

### Adicionar Novos Idiomas
Modifique os textos no arquivo `script.js` na seção de mapeamento de códigos meteorológicos.

### Customizar Animações
Ajuste as animações CSS no arquivo `styles.css` nas seções `@keyframes`.

## 📊 Dados Meteorológicos

### Métricas Principais
- Temperatura atual e sensação térmica
- Umidade relativa do ar
- Velocidade e direção do vento
- Pressão atmosférica
- Visibilidade
- Índice UV
- Ponto de orvalho
- Cobertura de nuvens
- Probabilidade de precipitação

### Códigos de Condições Meteorológicas
A aplicação mapeia códigos numéricos da API para ícones e descrições em português:
- 1000: Céu limpo ☀️
- 1100: Parcialmente nublado 🌤️
- 4200: Chuva leve 🌧️
- E muitos outros...

## 🚀 Melhorias Futuras

- [ ] Gráficos interativos com Chart.js
- [ ] Notificações push para alertas meteorológicos
- [ ] Integração com mapas meteorológicos
- [ ] Histórico de consultas
- [ ] Comparação entre cidades
- [ ] Widget para incorporar em outros sites
- [ ] Progressive Web App (PWA)
- [ ] Suporte offline com Service Worker

## 📄 Licença

Este projeto é fornecido como exemplo educacional. Os dados meteorológicos são fornecidos pela Tomorrow.io e estão sujeitos aos termos de uso da plataforma.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Algumas áreas que podem ser aprimoradas:

- Otimização de performance
- Acessibilidade (ARIA labels, navegação por teclado)
- Testes automatizados
- Documentação adicional
- Internacionalização (i18n)

## 📞 Suporte

Para questões relacionadas à API Tomorrow.io, consulte a [documentação oficial](https://docs.tomorrow.io/).

---

**Desenvolvido com ❤️ usando tecnologias web modernas**
