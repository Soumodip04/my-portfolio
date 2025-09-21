import { FC } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { useTheme } from '../context/ThemeContext';

// Register languages
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language }) => {
  const { theme } = useTheme();
  const style = theme === 'dark' ? oneDark : oneLight;

  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={{
          padding: '1.25rem',
          borderRadius: '0.5rem',
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
