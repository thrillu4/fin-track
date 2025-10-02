'use client'

import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useThemeConfig } from './active-theme'

const DEFAULT_THEMES = [
  {
    name: 'Default',
    value: 'default',
  },
  {
    name: 'Blue',
    value: 'blue',
  },
  {
    name: 'Purple',
    value: 'purple',
  },
  {
    name: 'Red',
    value: 'red',
  },
  {
    name: 'Pink',
    value: 'pink',
  },
  {
    name: 'Cyan',
    value: 'cyan',
  },
  {
    name: 'Teal',
    value: 'teal',
  },
  {
    name: 'Green',
    value: 'green',
  },
  {
    name: 'Amber',
    value: 'amber',
  },
  {
    name: 'Indigo',
    value: 'indigo',
  },
]

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="justify-start *:data-[slot=select-value]:w-12"
        >
          <span className="text-muted-foreground hidden sm:block">
            Select a theme:
          </span>
          <span className="text-muted-foreground block sm:hidden">Theme</span>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map(theme => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
    </div>
  )
}
