'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DEFAULT_PLACEHOLDER = `<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        margin: 0 auto;
        font-family: Arial, sans-serif;
      }
      .header {
        background-color: #46e5e5;
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        background-color: #ffffff;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #46e5e5;
        color: white;
        text-decoration: none;
        border-radius: 6px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome!</h1>
      </div>
      <div class="content">
        <p>Thanks for signing up. Click below to get started.</p>
        <a href="#" class="button">Get Started</a>
      </div>
    </div>
  </body>
</html>`;

export function EmailContentInput({ onChange, placeholder, value }: EmailInputProps) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleLoadExample = React.useCallback(() => {
    onChange(DEFAULT_PLACEHOLDER);
  }, [onChange]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-border flex items-center justify-between border-b px-3 py-2">
        <h2 className="font-semibold">HTML Input</h2>
        <Button size="sm" variant="secondary" onClick={handleLoadExample}>
          Load Example
        </Button>
      </div>
      <Textarea
        value={value}
        spellCheck={false}
        onChange={handleChange}
        placeholder={placeholder || 'Paste your email HTML here...'}
        className="flex-1 resize-none rounded-none p-4 font-mono text-sm outline-none focus-visible:ring-0"
      />
    </div>
  );
}
