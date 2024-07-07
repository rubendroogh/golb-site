import { QueryDocumentSnapshot, DocumentData, SnapshotOptions } from "firebase/firestore";

export default interface Blog {
    title: string;
    intro: string;
    content: string;
    imageURL: string;
    contributors: string[];
}

// Firestore data converter
export const blogConverter = {
    toFirestore: (blog: Blog) => {
        return {
                title: blog.title,
                intro: blog.intro,
                image: blog.imageURL,
                content: blog.content,
                contributors: blog.contributors
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options?: SnapshotOptions) => {
        const data = snapshot.data(options);
        return { title: data.title, intro: data.intro, imageURL: data.image, content: data.content } as Blog;
    }
};