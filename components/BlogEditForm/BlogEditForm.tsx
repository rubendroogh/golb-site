'use client'

import Blog from '@/interfaces/Blog';
import { Button, Input, LoadingOverlay, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { Markdown } from 'tiptap-markdown';
import { db } from '@/firebase/clientApp';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

export function BlogEditForm(props: {blog: Blog | undefined, slug: string }) {
    if (props?.blog == undefined && props.slug != 'create') {
        window.location.href = '/dashboard';
        return;
    }

    const content = props?.blog?.content.replaceAll('\\n', '\n') ?? '';
    const isNew = props.slug == 'create';

    const [title, setTitle] = useState(props?.blog?.title ?? '');
    const [intro, setIntro] = useState(props?.blog?.intro ?? '');
    const [imageURL, setImageURL] = useState(props?.blog?.imageURL ?? '');
    const [contributors, setContributors] = useState(props?.blog?.contributors ?? []);
    const [currentSlug, setCurrentSlug] = useState(isNew ? '' : props.slug);
    const [isSaving, setIsSaving] = useState(false);

    const editor = useEditor({
        extensions: [
          StarterKit,
          Link,
          Markdown,
        ],
        content,
    });

    useEffect(() => {
        if (isNew) {
            setCurrentSlug(
                title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, ''));
        }
    }, [title]);

    const updateOrSaveBlog = async () => {
        setIsSaving(true);
        const existingDoc = await getDoc(doc(db, 'blogs', currentSlug));
        let createdAt = Date.now();

        if (existingDoc.exists()) {
            createdAt = existingDoc.data().createdTimestamp ?? Date.now();
        }

        await setDoc(doc(db, "blogs", currentSlug), {
            title: title,
            intro: intro,
            image: imageURL,
            createdTimestamp: createdAt,
            updatedTimestamp: Date.now(),
            content: editor?.storage.markdown.getMarkdown() ?? '',
            contributors: contributors
        });

        if (!existingDoc.exists()) {
            window.location.href = `/dashboard/blog/${currentSlug}`;
        }

        setIsSaving(false);
    }

    return (
        <>
            <LoadingOverlay visible={isSaving} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
            <Button
                onClick={updateOrSaveBlog}
                mt={16}
                rightSection={<IconDeviceFloppy size={14} />}
            >
                Save
            </Button>
        </>
    );
}
