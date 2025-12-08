'use client';

import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { TooltipButton } from '@/components/custom/tooltip-button';
import { ButtonGroup } from '@/components/ui/button-group';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTooltipGroup } from '@/hooks/use-tooltip-group';

export function ThemeModeToggle() {
  const tooltipGroup = useTooltipGroup();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <ButtonGroup onMouseLeave={tooltipGroup.onGroupMouseLeave}>
        <TooltipButton
          {...tooltipGroup.getTooltipProps()}
          size="icon-sm"
          tooltip="Light theme"
          variant={theme === 'light' ? 'secondary' : 'ghost'}
          onClick={() => {
            setTheme('light');
          }}
        >
          <SunIcon className="size-3.5" />
        </TooltipButton>
        <TooltipButton
          {...tooltipGroup.getTooltipProps()}
          size="icon-sm"
          tooltip="System theme"
          variant={theme === 'system' ? 'secondary' : 'ghost'}
          onClick={() => {
            setTheme('system');
          }}
        >
          <MonitorIcon className="size-3.5" />
        </TooltipButton>
        <TooltipButton
          {...tooltipGroup.getTooltipProps()}
          size="icon-sm"
          tooltip="Dark theme"
          variant={theme === 'dark' ? 'secondary' : 'ghost'}
          onClick={() => {
            setTheme('dark');
          }}
        >
          <MoonIcon className="size-3.5" />
        </TooltipButton>
      </ButtonGroup>
    </TooltipProvider>
  );
}
