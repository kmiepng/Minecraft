export function getConfig(): JogoConfig
{
  let config = carrega_config();
  if (!config)
  {
    salva_config();
    config = carrega_config();
  }

  return config!;
}

// Função assíncrona para carregar configuração
export function carrega_config(): JogoConfig | null
{
  const rawData = localStorage.getItem('jogo_config');
  if (!rawData)
  {
    console.warn('Nenhuma configuração encontrada no localStorage.');
    return null;
  }

  try
  {
    const config: JogoConfig = JSON.parse(rawData);
    return config;
  }
  catch (error)
  {
    console.error('Erro ao interpretar configuração:', error);
    return null;
  }
}

// Função para salvar a configuração no localStorage
export function salva_config(): void
{
  const dados: JogoConfig = {
    geral: {
      nome_do_jogo: "Minecraft",
      versao: "alpha 1",
      idioma_padrao: "pt-br",
      tema: "escuro",
      som: true,
      musica: true
    },
    unidades: {
      preco_base_cursor: 10,
      preco_base_vovo: 70,
      preco_base_fazenda: 400,
      valor_base_cursor: 0.2,
      valor_base_vovo: 1.5,
      valor_base_fazenda: 10
    },
    upgrades: {
      preco_base_cursor_soma: 50,
      acrescimo_cursor_soma: 0.1,
      preco_base_cursor_multiplicacao: 150,
      preco_base_vovo_soma: 300,
      acrescimo_vovo_soma: 2,
      preco_base_vovo_multiplicacao: 900,
      preco_base_fazenda_soma: 1200,
      acrescimo_fazenda_soma: 10,
      preco_base_fazenda_multiplicacao: 3600
    }
  };

  try
  {
    localStorage.setItem('jogo_config', JSON.stringify(dados));
    console.log("Configuração salva com sucesso!");
  }
  catch (error)
  {
    console.error("Erro ao salvar a configuração:", error);
  }
}