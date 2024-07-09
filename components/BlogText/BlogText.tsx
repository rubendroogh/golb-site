'use client'

import Markdown from 'react-markdown';

export function BlogText(props: {text: string | undefined}) {
    return (
        <Markdown>
            {props.text}
        </Markdown>
    );
}
