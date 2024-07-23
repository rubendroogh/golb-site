'use client'

import Markdown from 'react-markdown';
import classes from './BlogText.module.css';

export function BlogText(props: {text: string | undefined}) {
    return (
        <Markdown className={classes.blogText}>
            {props.text}
        </Markdown>
    );
}
