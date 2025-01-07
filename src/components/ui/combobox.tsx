"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value?: string
  onSelect: (value: string) => void
  placeholder?: string
  emptyText?: string
}

export function Combobox({
  options,
  value,
  onSelect,
  placeholder = "Select an option",
  emptyText = "No results found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])

  const handleSelect = React.useCallback((selectedValue: string) => {
    const option = options.find((opt) => opt.value === selectedValue)
    if (option) {
      onSelect(option.value)
      setOpen(false)
      setSearchQuery("")
    }
  }, [onSelect, options])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command className="w-full" shouldFilter={false}>
          <CommandInput 
            placeholder="Search templates..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{option.label}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 