"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "./ui/input";

export function Combobox({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'us' } },
    debounce: 300,
    cache: 86400,
  });
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {currentValue
            ? currentValue
            : "Find a space..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 min-w-[300px] md:min-w-[400px]" align="start" >
        <Command>
          <Input
            value={value}
            disabled={!ready}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Coffee shop, library, 1234 Main St, etc."
            className="focus:ring-0 focus:outline-none focus:shadow-none focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-transparent focus-visible:border-primary"
          />
          <CommandGroup>
            {status === 'OK' ? data.map((suggestion) => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
              } = suggestion;

              const formattedSuggestion = `${main_text} ${secondary_text}`;

              return (
                <CommandItem
                  key={place_id}
                  value={description}
                  onSelect={(prevValue) => {
                    setValue(description, false);
                    clearSuggestions();
                    onAddressSelect && onAddressSelect(description);
                    setCurrentValue(prevValue === value ? "" : formattedSuggestion);
                    setOpen(false);
                  }}
                  className="flex flex-wrap items-center gap-2 cursor-pointer"
                >
                  <span className="font-bold">{main_text}</span><span>{secondary_text}</span>
                </CommandItem>
              );
            }) : (
              <div>No results.</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
