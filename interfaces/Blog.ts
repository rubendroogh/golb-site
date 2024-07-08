import { QueryDocumentSnapshot, DocumentData, SnapshotOptions } from "firebase/firestore";
import admin from 'firebase-admin';

export default interface Blog {
    title: string;
    intro: string;
    content: string;
    imageURL: string;
    contributors: string[];
}

// Firestore data converter
export const blogConverterClient = {
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
        return { title: data.title, intro: data.intro, imageURL: data.image, content: data.content, contributors: data.contributors } as Blog;
    }
};

export const blogConverterServer: admin.firestore.FirestoreDataConverter<Blog> = {
    toFirestore(blog: Blog): FirebaseFirestore.DocumentData {
        return {
            title: blog.title,
            intro: blog.intro,
            image: blog.imageURL,
            content: blog.content,
            contributors: blog.contributors
        };
    },
    fromFirestore(
        snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): Blog {
        const data = snapshot.data();
        return { title: data.title, intro: data.intro, imageURL: data.image, content: data.content, contributors: data.contributors } as Blog;
    }
}