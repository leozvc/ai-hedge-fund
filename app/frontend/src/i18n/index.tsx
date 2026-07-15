import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// ponytail: 字典单文件, 不引第三方 i18n 库。fallback = key (英文不动)
// ponytail: 持久化仅 localStorage, 不上服务端

export type Locale = 'en' | 'zh';

type Dict = Record<string, string>;

const en: Dict = {
  // nav
  'nav.flows': 'Flows',
  'nav.templates': 'Templates',
  'nav.components': 'Components',
  'nav.settings': 'Settings',
  'nav.models': 'Models',
  'nav.api_keys': 'API Keys',
  'nav.output': 'Output',
  // actions
  'action.run': 'Run',
  'action.backtest': 'Backtest',
  'action.save': 'Save',
  'action.delete': 'Delete',
  'action.duplicate': 'Duplicate',
  'action.create': 'Create',
  'action.cancel': 'Cancel',
  'action.confirm': 'Confirm',
  'action.close': 'Close',
  'action.edit': 'Edit',
  'action.search': 'Search',
  'action.copy': 'Copy to clipboard',
  // panels
  'panel.left_side_bar': 'Toggle Left Side Bar',
  'panel.bottom_panel': 'Toggle Bottom Panel',
  'panel.right_side_bar': 'Toggle Right Side Bar',
  'panel.settings': 'Open Settings',
  // flow
  'flow.new': 'Create New Flow',
  'flow.edit': 'Edit Flow',
  'flow.name_placeholder': 'Enter flow name',
  'flow.desc_placeholder': 'Enter flow description (optional)',
  'flow.no_flows': 'No flows saved yet',
  'flow.first_flow': 'Create your first flow to get started',
  'flow.recent': 'Recent Flows',
  'flow.search_placeholder': 'Search flows...',
  'flow.tab_open_hint': 'Flows now open in tabs',
  'flow.save_title': 'Save current flow',
  'flow.create_title': 'Create new flow',
  // components panel
  'components.search_placeholder': 'Search components...',
  'components.empty': 'No components available',
  'components.will_appear': 'Components will appear here when loaded',
  // table headers
  'table.date': 'Date',
  'table.ticker': 'Ticker',
  'table.action': 'Action',
  'table.quantity': 'Quantity',
  'table.price': 'Price',
  'table.confidence': 'Confidence',
  'table.shares': 'Shares',
  'table.position_value': 'Position Value',
  'table.long_shares': 'Long Shares',
  'table.short_shares': 'Short Shares',
  'table.long_cost_basis': 'Long Cost Basis',
  'table.short_cost_basis': 'Short Cost Basis',
  'table.bullish': 'Bullish',
  'table.bearish': 'Bearish',
  'table.neutral': 'Neutral',
  'table.agent': 'Agent',
  'table.signal': 'Signal',
  'table.reasoning': 'Reasoning',
  'table.property': 'Property',
  'table.value': 'Value',
  // output
  'output.progress': 'Progress',
  'output.analysis': 'Analysis',
  'output.activity': 'Activity',
  'output.error': 'Error',
  // backtest / portfolio
  'portfolio.summary': 'Portfolio Summary',
  'portfolio.performance': 'Performance',
  'portfolio.performance_metrics': 'Performance Metrics',
  'portfolio.exposure_metrics': 'Exposure Metrics',
  'portfolio.current_value': 'Current Value',
  'portfolio.initial_value': 'Initial Value',
  'portfolio.max_drawdown': 'Max Drawdown',
  'portfolio.long_short_ratio': 'Long/Short Ratio',
  'portfolio.periods_traded': 'Periods Traded',
  'portfolio.final_positions': 'Final Positions',
  'portfolio.investment_report': 'Investment Report',
  'portfolio.analyst_signals': 'Analyst Signals',
  'portfolio.backtest_progress': 'Backtest Progress',
  'portfolio.backtest_results': 'Backtest Results',
  'portfolio.backtest_runner': 'Backtest Runner',
  // models
  'models.ollama': 'Ollama',
  'models.ollama_not_installed': 'Ollama Not Installed',
  'models.ollama_server': 'Ollama Server',
  'models.available': 'Available Models',
  'models.no_models': 'No models available',
  // misc
  'misc.reset_flow': 'Reset Flow',
  'misc.more_options': 'More options',
  'misc.api_key_placeholder': 'Enter API key',
};

const zh: Dict = {
  'nav.flows': '流程',
  'nav.templates': '模板',
  'nav.components': '组件',
  'nav.settings': '设置',
  'nav.models': '模型',
  'nav.api_keys': 'API 密钥',
  'nav.output': '输出',
  'action.run': '运行',
  'action.backtest': '回测',
  'action.save': '保存',
  'action.delete': '删除',
  'action.duplicate': '复制',
  'action.create': '创建',
  'action.cancel': '取消',
  'action.confirm': '确认',
  'action.close': '关闭',
  'action.edit': '编辑',
  'action.search': '搜索',
  'action.copy': '复制到剪贴板',
  'panel.left_side_bar': '切换左侧栏',
  'panel.bottom_panel': '切换底部面板',
  'panel.right_side_bar': '切换右侧栏',
  'panel.settings': '打开设置',
  'flow.new': '新建流程',
  'flow.edit': '编辑流程',
  'flow.name_placeholder': '输入流程名称',
  'flow.desc_placeholder': '输入流程描述（可选）',
  'flow.no_flows': '暂无保存的流程',
  'flow.first_flow': '创建你的第一个流程开始使用',
  'flow.recent': '最近流程',
  'flow.search_placeholder': '搜索流程...',
  'flow.tab_open_hint': '流程现在在标签页中打开',
  'flow.save_title': '保存当前流程',
  'flow.create_title': '新建流程',
  'components.search_placeholder': '搜索组件...',
  'components.empty': '暂无组件',
  'components.will_appear': '加载后组件将显示在这里',
  'table.date': '日期',
  'table.ticker': '代码',
  'table.action': '操作',
  'table.quantity': '数量',
  'table.price': '价格',
  'table.confidence': '置信度',
  'table.shares': '股数',
  'table.position_value': '持仓市值',
  'table.long_shares': '多头股数',
  'table.short_shares': '空头股数',
  'table.long_cost_basis': '多头成本',
  'table.short_cost_basis': '空头成本',
  'table.bullish': '看多',
  'table.bearish': '看空',
  'table.neutral': '中性',
  'table.agent': '分析师',
  'table.signal': '信号',
  'table.reasoning': '推理',
  'table.property': '属性',
  'table.value': '值',
  'output.progress': '进度',
  'output.analysis': '分析',
  'output.activity': '活动',
  'output.error': '错误',
  'portfolio.summary': '组合摘要',
  'portfolio.performance': '业绩',
  'portfolio.performance_metrics': '业绩指标',
  'portfolio.exposure_metrics': '敞口指标',
  'portfolio.current_value': '当前价值',
  'portfolio.initial_value': '初始价值',
  'portfolio.max_drawdown': '最大回撤',
  'portfolio.long_short_ratio': '多空比',
  'portfolio.periods_traded': '交易周期',
  'portfolio.final_positions': '最终持仓',
  'portfolio.investment_report': '投资报告',
  'portfolio.analyst_signals': '分析师信号',
  'portfolio.backtest_progress': '回测进度',
  'portfolio.backtest_results': '回测结果',
  'portfolio.backtest_runner': '回测运行',
  'models.ollama': 'Ollama',
  'models.ollama_not_installed': '未安装 Ollama',
  'models.ollama_server': 'Ollama 服务',
  'models.available': '可用模型',
  'models.no_models': '暂无模型',
  'misc.reset_flow': '重置流程',
  'misc.more_options': '更多选项',
  'misc.api_key_placeholder': '输入 API 密钥',
};

const dicts: Record<Locale, Dict> = { en, zh };

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = 'ahf_locale';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === 'en' || stored === 'zh') return stored;
  const nav = window.navigator.language.toLowerCase();
  return nav.startsWith('zh') ? 'zh' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);
  const t = useCallback((key: string, fallback?: string) => {
    return dicts[locale][key] ?? fallback ?? key;
  }, [locale]);
  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n outside I18nProvider');
  return ctx;
}