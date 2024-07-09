'use client'

import Blog from '@/interfaces/Blog';
import { Input, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { Markdown } from 'tiptap-markdown';

const content =
  '## Test titel \nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\n Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

export function BlogEditForm(props: {blog: Blog | undefined, slug: string}) {
    if (props?.blog == undefined) {
        window.location.href = '/dashboard';
        return;
    }

    const [title, setTitle] = useState(props.blog.title);
    const [intro, setIntro] = useState(props.blog.intro);
    const [imageURL, setImageURL] = useState(props.blog.imageURL);
    const [contributors, setContributors] = useState(props.blog.contributors);
    const [currentSlug, setCurrentSlug] = useState(props.slug);

    const editor = useEditor({
        extensions: [
          StarterKit,
          Link,
          Markdown,
        ],
        content,
    });

    useEffect(() => {
        // setCurrentSlug();
    }, [title]);

    return (
        <>
            <TextInput
                label="Title"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
            />
            <TextInput disabled mt={8} label="Slug" description="The URL value of the blog, based on the title." value={currentSlug} />
            <Textarea
                autosize
                minRows={3}
                mt={8}
                label="Introduction"
                description="The first paragraph of the blog, appears above the main image."
                value={intro}
                onChange={(event) => setIntro(event.currentTarget.value)}
            />
            <TextInput
                mt={8}
                label="Main image URL"
                description="Enter the URL of the main image here"
                placeholder='https://placehold.co/600x400'
                value={imageURL}
                onChange={(event) => setImageURL(event.currentTarget.value)}
            />
            <MultiSelect
                mt={8}
                label="Contributors"
                placeholder="Pick value"
                data={['Ruben Droogh', 'Mart Weghorst']}
                value={contributors}
                onChange={setContributors}
            />
            <Input.Wrapper label="Main content" mt={8}>
                <RichTextEditor editor={editor}>
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1 />
                            <RichTextEditor.H2 />
                            <RichTextEditor.H3 />
                            <RichTextEditor.H4 />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Blockquote />
                            <RichTextEditor.Hr />
                            <RichTextEditor.BulletList />
                            <RichTextEditor.OrderedList />
                            <RichTextEditor.Subscript />
                            <RichTextEditor.Superscript />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Link />
                            <RichTextEditor.Unlink />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
            </Input.Wrapper>
        </>
    );
}
