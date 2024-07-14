import { QueryDocumentSnapshot, DocumentData, SnapshotOptions } from "firebase/firestore";
import admin from 'firebase-admin';

export default interface Blog {
    title: string;
    intro: string;
    content: string;
    imageURL: string;
    slug: string;
    createdTimestamp: number;
    updatedTimestamp: number;
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
            createdTimestamp: blog.createdTimestamp,
            updatedTimestamp: blog.updatedTimestamp,
            contributors: blog.contributors
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options?: SnapshotOptions) => {
        const data = snapshot.data(options);
        return {
            title: data.title,
            intro: data.intro,
            imageURL: data.image,
            content: data.content,
            slug: snapshot.id,
            createdTimestamp: data.createdTimestamp,
            updatedTimestamp: data.updatedTimestamp,
            contributors: data.contributors
        } as Blog;
    }
};

export const blogConverterServer: admin.firestore.FirestoreDataConverter<Blog> = {
    toFirestore(blog: Blog): FirebaseFirestore.DocumentData {
        return {
            title: blog.title,
            intro: blog.intro,
            image: blog.imageURL,
            content: blog.content,
            createdTimestamp: blog.createdTimestamp,
            updatedTimestamp: blog.updatedTimestamp,
            contributors: blog.contributors
        };
    },
    fromFirestore(
        snapshot: FirebaseFirestore.QueryDocumentSnapshot
    ): Blog {
        const data = snapshot.data();
        return {
            title: data.title,
            intro: data.intro,
            imageURL: data.image,
            content: data.content,
            slug: snapshot.id,
            createdTimestamp: data.createdTimestamp,
            updatedTimestamp: data.updatedTimestamp,
            contributors: data.contributors
        } as Blog;
    }
}