import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useI18n, type Locale } from '@/i18n';
import { Globe } from 'lucide-react';

interface TopBarProps {
  isLeftCollapsed: boolean;
  isRightCollapsed: boolean;
  isBottomCollapsed: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onToggleBottom: () => void;
  onSettingsClick: () => void;
}

// ponytail: 单按钮在中英间切换, 不做下拉。两语言够用。
export function TopBar({
  isLeftCollapsed,
  isRightCollapsed,
  isBottomCollapsed,
  onToggleLeft,
  onToggleRight,
  onToggleBottom,
  onSettingsClick,
}: TopBarProps) {
  const { t, locale, setLocale } = useI18n();
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  return (
    <div className="absolute top-0 right-0 z-40 flex items-center gap-0 py-1 px-2 bg-panel/80">
      {/* Left Sidebar Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleLeft}
        className={cn(
          "h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-ramp-grey-700 transition-colors",
          !isLeftCollapsed && "text-foreground"
        )}
        aria-label={t('panel.left_side_bar')}
        title={t('panel.left_side_bar') + ' (⌘B)'}
      >
        <PanelLeft size={16} />
      </Button>

      {/* Bottom Panel Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleBottom}
        className={cn(
          "h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-ramp-grey-700 transition-colors",
          !isBottomCollapsed && "text-foreground"
        )}
        aria-label={t('panel.bottom_panel')}
        title={t('panel.bottom_panel') + ' (⌘J)'}
      >
        <PanelBottom size={16} />
      </Button>

      {/* Right Sidebar Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleRight}
        className={cn(
          "h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-ramp-grey-700 transition-colors",
          !isRightCollapsed && "text-foreground"
        )}
        aria-label={t('panel.right_side_bar')}
        title={t('panel.right_side_bar') + ' (⌘I)'}
      >
        <PanelRight size={16} />
      </Button>

      {/* Divider */}
      <div className="w-px h-5 bg-ramp-grey-700 mx-1" />

      {/* Locale switch — ponytail: inline next to settings, no dropdown */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLocale(otherLocale)}
        className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-ramp-grey-700 transition-colors text-xs font-mono"
        aria-label={t('Switch language')}
        title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        <Globe size={14} className="mr-1" />
        {otherLocale.toUpperCase()}
      </Button>

      {/* Settings */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSettingsClick}
        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-ramp-grey-700 transition-colors"
        aria-label={t('panel.settings')}
        title={t('panel.settings') + ' (⌘,)'}
      >
        <Settings size={16} />
      </Button>
    </div>
  );
}