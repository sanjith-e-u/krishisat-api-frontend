import os

def fix_colors(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace hardcoded light theme colors with semantic tokens
    replacements = {
        'bg-white': 'bg-background',
        'bg-slate-50': 'bg-subtle',
        'text-slate-900': 'text-foreground',
        'text-slate-800': 'text-foreground',
        'text-slate-500': 'text-muted-foreground',
        'border-slate-100': 'border-border',
        'border-slate-200': 'border-border',
        'border-slate-105': 'border-border',
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_colors(r'd:\API\frontend\src\app\pricing\page.tsx')
fix_colors(r'd:\API\frontend\src\app\docs\page.tsx')
