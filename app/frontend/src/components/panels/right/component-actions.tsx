
import { useI18n } from '@/i18n';
interface ComponentActionsProps {
}

export function ComponentActions({ }: ComponentActionsProps) {
  const { t } = useI18n();
  return (
    <div className="p-2 flex justify-between flex-shrink-0 items-center border-b mt-4">
      <span className="text-primary text-sm font-medium ml-4">{t('Components')}</span>
      {/* <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-6 w-6 text-primary hover:bg-ramp-grey-700"
          aria-label={t('Toggle sidebar')}
          title={`Toggle Components Panel (${formatKeyboardShortcut('B')})`}
        >
          <PanelRight size={16} />
        </Button>
      </div> */}
    </div>
  );
} 